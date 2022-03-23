PREFIX = '^'
GAME_URL = "https://game.machin.dev"
DISCORD_TOKEN = File.read("../discord_token.key").chomp
DISCORD_CLIENT_ID = File.read("../discord_client_id.key").chomp
FIREBASE_BASE_URI = "https://machin-dev.firebaseio.com"
FIREBASE_TOKEN = File.open("../firebase.json").read

require 'bundler'
Bundler.setup(:default, :ci)

require 'json'

puts "\n"
puts "DISCORD_TOKEN=#{DISCORD_TOKEN}"
puts "DISCORD_CLIENT_ID=#{DISCORD_CLIENT_ID}"
puts "FIREBASE_CLIENT_ID=#{JSON.load(FIREBASE_TOKEN.to_s).dig("client_id")}"
puts "\n"

require 'rest-client'
ENV["DISCORDRB_NONACL"] = "true"
require 'discordrb' # https://www.rubydoc.info/gems/discordrb/3.2.1/
require 'firebase'


$firebase = Firebase::Client.new(FIREBASE_BASE_URI, FIREBASE_TOKEN)

def get_rooms()
    body = $firebase.get("mmo/rooms").body
    return body == nil ? {} : body
end

def get_players()
    body = $firebase.get("mmo/players").body
    return body == nil ? {} : body
end

def add_user(uid, name, otp)
    return $firebase.set("mmo/players/#{uid}", {
        "name": name, "otp": otp, "room": "spawn", "x": 200, "y": 200,
        "dir": [0, 0], "isMoving": false, "animFrame": 0, "playerType": "man", 
        "inventory": {}
    }).success?
end

def refresh_otp(uid, otp)
    data = get_players()[uid]
    data["otp"] = otp
    return $firebase.set("mmo/players/#{uid}", data).success?
end

def format_standard(str); return "```\n#{str}\n```"; end
def format_success(str); return "```diff\n+ #{str}\n```"; end
def format_error(str); return "```diff\n- #{str}\n```"; end
def format_usage(str); return "Command usage: ``#{PREFIX}#{str}``"; end
def format_help(str); return "```markdown\n#{str}\n```"; end
def invite_link(uid, otp); "#{GAME_URL}/?uid=#{uid}&otp=#{otp}"; end

$bot = Discordrb::Bot.new(token: DISCORD_TOKEN, client_id: DISCORD_CLIENT_ID)

$bot.message(start_with: PREFIX + 'join') do |event|
    uid, name, otp = event.user.id.to_s, event.author.display_name, (0...8).map { (65 + rand(26)).chr }.join
    success = get_players().key?(uid) ? refresh_otp(uid, otp) : add_user(uid, name, otp)
    event.author.dm invite_link(uid, otp) if success
    event.message.delete
    event.respond success ? format_success("Sent session link to #{name}!") : format_error("Could not send session link to #{name}!")
end

$bot.message(start_with: PREFIX + 'online') do |event|
    inactive_time = (Time.now - 10 * 60).to_f * 1000
    player_names = get_players().map { |uid, data| data["lastAction"] > inactive_time ? data["name"] : nil }.compact
    event.respond format_standard("Online players (#{player_names.length}): [#{player_names.join(", ")}]")
end

$bot.message(start_with: PREFIX + 'players') do |event|
    player_names = get_players().map { |uid, data| data["name"] }
    event.respond format_standard("Players (#{player_names.length}): [#{player_names.join(", ")}]")
end

$bot.message(start_with: PREFIX + 'rooms') do |event|
    room_ids = get_rooms().keys
    event.respond format_standard("Rooms (#{room_ids.length}): [#{room_ids.join(", ")}]")
end

$bot.message(start_with: PREFIX + 'help') do |event|
    message = File.readlines('./usage.txt').map { |line| line.chomp.gsub('^', PREFIX) }
    event.respond format_help(message.join("\n"))
end

$bot.message(start_with: PREFIX + 'welcome') do |event|
    event.respond "Type ``^join`` to receive a session link, or type ``^help`` to see a list of commands."
end

$bot.message(start_with: PREFIX + 'about') do |event|
    event.respond format_help(File.readlines('./about.txt').map { |line| line.chomp }.join("\n"))
end

$bot.message(start_with: PREFIX + 'gold') do |event|
    players, uid = get_players(), event.user.id.to_s
    if players.key?(uid)
        gold, name = players.dig(uid, "inventory", "GOLD"), players[uid]["name"]
        event.respond format_standard("Player #{name} has #{gold == nil ? 0 : gold} gold!")
    else
        event.respond format_error("Player not found in database!")
    end
end

$bot.message(start_with: PREFIX + 'top') do |event|
    players = get_players().map { |u, d| [d["name"], d.dig("inventory", "GOLD").to_i] }.sort! { |a, b| b[1] <=> a[1] }
    caption = players.first(20).map.with_index { |d, i| "#{(i + 1).to_s.rjust(2, " ")}. #{d[0].ljust(10, " ")} #{d[1]}" }.join("\n")
    event.respond format_standard(caption)
end

$bot.message(start_with: PREFIX + 'economy') do |event|
    gold = get_players().sum { |u, d| d.dig("inventory", "GOLD").to_i }
    event.respond format_standard("There is currently #{gold} gold in circulation!")
end

$bot.message(start_with: PREFIX + 'debug') do |event|
    players, uid = get_players(), event.user.id.to_s
    if players.key?(uid)
        puts JSON.pretty_generate(players[uid])
    end
    event.message.delete
end

$bot.message(start_with: PREFIX + 'logo') do |event|
    event.send_file(File.open("./assets/logo.png", 'r'))
    event.message.delete
end

$bot.run
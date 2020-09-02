# Require gems
require 'rubygems'
require 'bundler'
Bundler.setup(:default, :ci)
require 'firebase'
# Require room object
require './rb/room.rb'

room = Room.new(1)

room.fill('-')     									# Sets floor
room.row(0, '#')   									# Sets top wall
room.col(0, '=')   									# Sets left wall
room.col(room.w - 1, '=') 					# Sets right wall
				
room.draw()													# Draws room to console

room.replace('-', 'STONE_FLOOR')    # After layout is complete
room.replace('=', 'STONE_TOP')      # set true image values in
room.replace('#', 'STONE_BRICK')    # placeholders place

room.east = 2

room.save()													# Save map to database

def get_rooms()
  base_uri = 'https://machin-dev.firebaseio.com'
  auth_token = File.open("key.json").read
  firebase = Firebase::Client.new(base_uri, auth_token)
  result = []
  return firebase.get("mmo/rooms").raw_body
end

#puts get_rooms().inspect
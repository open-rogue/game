KEY_PATH = "./files/key.json"

REF = [
  [' ', 'GROUND'],
  ['G', 'GROUND'],
  ['"', 'GRASS'],
  ['*', 'FLOWERS'],
  ['O', 'OAK_TREE'],
  ['F', 'FIR_TREE'],
  ['P', 'PINE_TREE'],
  ['C', 'CHERUB_TREE'],
  ['─', 'WALL_EW'],
  ['┄', 'WALL_EW_ALT'],
  ['|', 'WALL_NS'],
  ['┌', 'WALL_ES'],
  ['┐', 'WALL_SW'],
  ['└', 'WALL_NE'],
  ['┘', 'WALL_NW'],
  ['┬', 'WALL_ESW'],
  ['┴', 'WALL_NEW'],
  ['╵', 'WALL_NS_N'],
  ['╷', 'WALL_NS_S'],
  ['^', 'STAIRS_UP'],
  ['˅', 'STAIRS_DOWN'],
  ['S', 'SIGN'],
  ['X', 'WARP_BLUE'],
  ['F', 'FIRE']
]

class Room
  attr_accessor :id, :data, :w, :h, :color, :weather
  attr_accessor :north, :east, :south, :west

  def initialize(room_id, map = nil)
    @id, @color = room_id, "#222323"
    @w, @h, @north, @east, @south, @west = 24, 16, nil, nil, nil, nil
    @data, @warps, @signs = Array.new(@w * @h), [[-1, -1, -1, -1, -1]], [[-1, -1, ""]]
    @weather = true
    @data = map.split("") unless (map == nil) || (map.length != @w * @h)
  end

  def ix(i, j); j * @w + i; end

  def fill(t); @data.map! { t }; end

  def tile(i, j, t); @data[ix(i, j)] = t; end
  
  def warp(i, j, r, x, y); @warps << [i, j, r, x, y]; end
  
  def sign(i, j, s); @signs << [i, j, s]; end

  def col(i, t); (0...@h).each { |j| @data[ix(i, j)] = t }; end

  def row(j, t); (0...@w).each { |i| @data[ix(i, j)] = t }; end
  
  def random_fill(t, r); @data.map! { |k| rand < r ? t : k }; end

  def scatter_fill(t); @data.map! { |k| t[(rand * t.length).floor] }; end

  def fill_area(a, t); (a[1]..a[3]).each { |j| (a[0]..a[2]).each { |i| @data[ix(i, j)] = t } }; end

  def scatter_area(a, t); (a[1]..a[3]).each { |j| (a[0]..a[2]).each { |i| @data[ix(i, j)] = t[(rand * t.length).floor] } }; end

  def overlay(map); map.split("").each_with_index { |k, i| @data[i] = k unless k == " " }; end

  def reformat(); REF.each { |a, b| @data.map! { |c| (a == c) ? b : c } }; end

  def draw(); (0...@h).each { |j| puts (0...@w).map { |i| @data[ix(i, j)][0] + " " }.join }; end

  def export()
    {
      :room_id => @id,
      :color => @color,
      :data => @data,
      :warps => @warps,
      :signs => @signs,
      :north => @north,
      :east => @east,
      :south => @south,
      :west => @west,
      :weather => @weather
    }
  end

  def save()
    base_uri = 'https://machin-dev.firebaseio.com'
    auth_token = File.open(KEY_PATH).read
    firebase = Firebase::Client.new(base_uri, auth_token)
    #firebase.set(path, id => data)
    response = firebase.set("mmo/rooms/#{@id}", export())
    puts response.success? ? "Room \"#{@id}\" added to database" : "Room could not be added"
    return response.success?
  end
end

def get_rooms()
  base_uri = 'https://machin-dev.firebaseio.com'
  auth_token = File.open(KEY_PATH).read
  firebase = Firebase::Client.new(base_uri, auth_token)
  result = []
  return firebase.get("mmo/rooms").body
end
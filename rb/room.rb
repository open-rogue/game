class Room
	attr_accessor :id, :data, :w, :h
	attr_accessor :north, :east, :south, :west

	def initialize(room_id)
		@w, @h, @north, @east, @south, @west = 24, 16, -1, -1, -1, -1
		@id, @data = room_id, Array.new(@w * @h)
	end

	def ix(i, j); j * @w + i; end

	def fill(t); @data.map! { t }; end

	def tile(i, j, t); @data[ix(i, j)] = t; end

	def col(i, t); (0...@h).each { |j| @data[ix(i, j)] = t }; end

  def row(j, t); (0...@w).each { |i| @data[ix(i, j)] = t }; end
  
  def random_fill(t, r); @data.map! { |k| rand < r ? t : k }; end

	def replace(a, b); @data.map! { |c| (a == c) ? b : c }; end

	def draw(); (0...@h).each { |j| puts (0...@w).map { |i| @data[ix(i, j)][0] + " " }.join }; end

  def export()
    { 
      :room_id => @id, 
      :data => @data,
      :north => @north,
      :east => @east,
      :south => @south,
      :west => @west
    }
  end

	def save()
		base_uri = 'https://machin-dev.firebaseio.com'
	  auth_token = File.open("./files/key.json").read
    firebase = Firebase::Client.new(base_uri, auth_token)
    #firebase.set(path, id => data)
    response = firebase.set("mmo/rooms", @id => export())
    puts response.success? ? "Room added to database" : "Room could not be added"
		return response.success?
	end
end
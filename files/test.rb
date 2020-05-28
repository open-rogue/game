require 'rubygems'
require 'bundler'
Bundler.setup(:default, :ci)
require 'firebase'

class Room
	attr_accessor :id, :data, :w, :h
	attr_accessor :north, :east, :south, :west

	def initialize(room_id)
		@w, @h, @north, @east, @south, @west = 16, 12, -1, -1, -1, -1
		@id, @data = room_id, Array.new(@w * @h)
	end

	def ix(i, j); j * @w + i; end

	def fill(t); @data.map! { t }; end

	def tile(i, j, t); @data[ix(i, j)] = t; end

	def col(i, t); (0...@h).each { |j| @data[ix(i, j)] = t }; end

	def row(j, t); (0...@w).each { |i| @data[ix(i, j)] = t }; end

	def replace(a, b); @data.map! { |c| (a == c) ? b : c }; end

	def draw(); (0...@h).each { |j| puts (0...@w).map { |i| @data[ix(i, j)][0] + " " }.join }; end

	def save()
		base_uri = 'https://machin-dev.firebaseio.com'
	  auth_token = File.open("key.json").read
	  firebase = Firebase::Client.new(base_uri, auth_token)
	  response = firebase.push("mmo/rooms", 
		  { 
		  	:room_id => @id, 
		  	:data => @data,
		  	:north => @north,
		  	:east => @east,
		  	:south => @south,
		  	:west => @west
		  }
	  )
		return response.success?
	end
end

room = Room.new(6)									# Create room with ID #6

room.fill('-')     									# Sets floor
room.row(0, '#')   									# Sets top wall
room.col(0, '=')   									# Sets left wall
room.col(room.w - 1, '=') 					# Sets right wall
				
room.draw()													# Draws room to console

room.replace('-', 'STONE_FLOOR')    # After layout is complete
room.replace('=', 'STONE_TOP')      # set true image values in
room.replace('#', 'STONE_BRICK')    # placeholders place

room.north(4)												# Set north link to room 4
room.west(7) 												# Set west link to room 7

room.save()													# Save map to database


def get_rooms()
  base_uri = 'https://machin-dev.firebaseio.com'
  auth_token = File.open("key.json").read
  firebase = Firebase::Client.new(base_uri, auth_token)
  result = []
  return firebase.get("mmo/rooms").raw_body
end

#puts get_rooms().inspect
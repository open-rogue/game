require './rb/include.rb'


room = Room.new(2)

room.fill(" ")
room.random_fill('*', 0.1)

map  = "OOOOOOOOOO    OOOOOOOOOO"
map += "O                      O"
map += "O                      O"
map += "O                      O"
map += "O                      O"
map += "O                      O"
map += "O                      O"
map += "O                      O"
map += "O                      O"
map += "O                      O"
map += "O                      O"
map += "O                      O"
map += "O                      O"
map += "O                      O"
map += "O                      O"
map += "OOOOOOOOOOOOOOOOOOOOOOOO"

room.overlay(map)

room.north = 1

room.reformat()
room.draw()

room.save()

#puts get_rooms().inspect
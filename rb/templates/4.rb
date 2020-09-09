require './rb/include.rb'

room = Room.new(4)
room.west = 2

room.fill(" ")
room.random_fill('*', 0.1)

       #012345678901234567890123
map  = "OOOOOOOOOOOOOOOOOOOOOOOO" #0
map += "OOOOOOOOOOOOOOOOOOOOOOOO" #1
map += "OOOOOOOOOOOOOOOOOOOOOOOO" #2
map += "OOOOOOOOO       OOOOOOOO" #3
map += "OOOOO               OOOO" #4
map += "OOOO                 OOO" #5
map += "            S         OO" #6
map += "                      OO" #7
map += "            X         OO" #8
map += "                      OO" #9
map += "OOOO                 OOO" #0
map += "OOOOO               OOOO" #1
map += "OOOOOOOOO       OOOOOOOO" #2
map += "OOOOOOOOOOOOOOOOOOOOOOOO" #3
map += "OOOOOOOOOOOOOOOOOOOOOOOO" #4
map += "OOOOOOOOOOOOOOOOOOOOOOOO" #5

room.overlay(map)

room.sign(12, 6, "To the Upside Downs")
room.warp(12, 8, 5, 12, 8)

room.reformat()

room.save()

#puts get_rooms().inspect
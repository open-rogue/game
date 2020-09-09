require './rb/include.rb'

room = Room.new(4)
room.west = 2

room.fill(" ")
room.random_fill('*', 0.1)

       #012345678901234567890123
map  = "OOOOOOOOOOOOOOOOOOOOOOOO" #0
map += "OOOOOOOOOOOOOOOOOOOOOOOO" #1
map += "OOOOOOOOOOOOOOOOOOOOOOOO" #2
map += "OOOOOOOOO      OOOOOOOOO" #3
map += "OOOOO              OOOOO" #4
map += "OOOO                OOOO" #5
map += "                     OOO" #6
map += "                     OOO" #7
map += "                     OOO" #8
map += "                     OOO" #9
map += "OOOO                OOOO" #0
map += "OOOOO              OOOOO" #1
map += "OOOOOOOOO      OOOOOOOOO" #2
map += "OOOOOOOOOOOOOOOOOOOOOOOO" #3
map += "OOOOOOOOOOOOOOOOOOOOOOOO" #4
map += "OOOOOOOOOOOOOOOOOOOOOOOO" #5

room.overlay(map)

room.reformat()

room.save()

#puts get_rooms().inspect
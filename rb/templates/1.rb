require './rb/include.rb'

room = Room.new(1)
room.south = 2

room.fill(" ")
room.random_fill('*', 0.1)

       #012345678901234567890123
map  = "OOOOOOOOOOOOOOOOOOOOOOOO" #0
map += "OOOOOO            OOOOOO" #1
map += "OOO                 OOOO" #2
map += "OO    ┌────┌─────┐    OO" #3
map += "O     <GGG^<GGGGGG     O" #4
map += "O     <GGGGGGGGGGG     O" #5
map += "O     <GGGGGGGGGGG     O" #6
map += "O     <GGGGGGGGGG>     O" #7
map += "O     <GGGGGGGGGG>     O" #8
map += "O     └────└─────┘     O" #9
map += "OO                     O" #0
map += "OO            S        O" #1
map += "OOO                   OO" #2
map += "OOOOOO               OOO" #3
map += "OOOOOOOO          OOOOOO" #4
map += "OOOOOOOOOO    OOOOOOOOOO" #5

room.overlay(map)
room.tile(17, 4, "WALL_NSE_N")
room.tile(17, 6, "WALL_NSE_S")
room.tile(11, 5, "WALL_NSW_N")
room.tile(11, 8, "WALL_NSW_S")
room.warp(10, 4, 3, 9, 6)
room.sign(14, 11, "This is a test sign")

room.reformat()

room.save()

#puts get_rooms().inspect
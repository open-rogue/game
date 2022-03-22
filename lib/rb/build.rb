require './rb/include.rb'

room = Room.new(1)
room.south = 2

room.fill(" ")
room.random_fill('*', 0.1)

       #012345678901234567890123
map  = "OOOOOOOOOOOOOOOOOOOOOOOO" #0
map += "O                      O" #1
map += "O                      O" #2
map += "O    ┌────┌─────┐      O" #3
map += "O    <GGG^<GGGGGG      O" #4
map += "O    <GGGGGGGGGGG      O" #5
map += "O    <GGGGGGGGGGG      O" #6
map += "O    <GGGGGGGGGG>      O" #7
map += "O    <GGGGGGGGGG>      O" #8
map += "O    └────└─────┘      O" #9
map += "O                      O" #0
map += "O                      O" #1
map += "O                      O" #2
map += "O                      O" #3
map += "O                      O" #4
map += "OOOOOOOOOO    OOOOOOOOOO" #5

room.overlay(map)
room.tile(16, 4, "WALL_NSE_N")
room.tile(16, 6, "WALL_NSE_S")
room.tile(10, 5, "WALL_NSW_N")
room.tile(10, 8, "WALL_NSW_S")
room.warp( 9, 4, 3)


room.reformat()
room.draw()

room.save()

#puts get_rooms().inspect
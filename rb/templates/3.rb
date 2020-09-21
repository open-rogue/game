require './rb/include.rb'

room = Room.new(3)
room.weather = false

room.fill(" ")

       #012345678901234567890123
map  = "                        " #0
map += "                        " #1
map += "                        " #2
map += "      ┌────┌─────┐      " #3
map += "      <GGG˅<G   G>      " #4
map += "      <GGGGGGGGGG>      " #5
map += "      <GGGGGGGGGG>      " #6
map += "      <GGGGGGGGGG>      " #7
map += "      <GGGGGGGGGG>      " #8
map += "      └──────────┘      " #9
map += "                        " #0
map += "                        " #1
map += "                        " #2
map += "                        " #3
map += "                        " #4
map += "                        " #5

room.overlay(map)
room.tile(13, 4, "CHAIR")
room.tile(14, 4, "TABLE")
room.tile(15, 4, "CHAIR")
room.tile(11, 5, "WALL_NSW_N")
room.warp(10, 4, 1, 9, 6)

room.reformat()

room.save()

#puts get_rooms().inspect
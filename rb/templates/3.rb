require './rb/include.rb'

room = Room.new(3)

room.fill(" ")

       #012345678901234567890123
map  = "                        " #0
map += "                        " #1
map += "                        " #2
map += "     ┌──────────┐       " #3
map += "     <GGG˅GGGGGG>       " #4
map += "     <GGGGGGGGGG>       " #5
map += "     <GGGGGGGGGG>       " #6
map += "     <GGGGGGGGGG>       " #7
map += "     <GGGGGGGGGG>       " #8
map += "     └──────────┘       " #9
map += "                        " #0
map += "                        " #1
map += "                        " #2
map += "                        " #3
map += "                        " #4
map += "                        " #5

room.overlay(map)
room.warp(9, 4, 1, 9, 6)


room.reformat()
room.draw()

room.save()

#puts get_rooms().inspect
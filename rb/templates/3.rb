require './rb/include.rb'

room = Room.new("test_house_upstairs")
room.weather = false

room.fill(" ")

       #012345678901234567890123
map  = "                        " #0
map += "                        " #1
map += "                        " #2
map += "      ┌────┬─────┐      " #3
map += "      |   ˅|     |      " #4
map += "      |    ╵     |      " #5
map += "      |          |      " #6
map += "      |    ╷     |      " #7
map += "      |    |     |      " #8
map += "      └────┴─────┘      " #9
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
room.warp(10, 4, "test_house", 9, 6)

room.reformat()

room.save()

#puts get_rooms().inspect
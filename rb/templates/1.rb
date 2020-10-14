require './rb/include.rb'

room = Room.new("test_house")
room.name = "Test House"
room.south = "spawn"

room.fill(" ")
room.random_fill('"', 0.1)
room.random_fill('*', 0.1)

       #012345678901234567890123
map  = "OOOOOOOOOOOOOOOOOOOOOOOO" #0
map += "OOOOOO            OOOOOO" #1
map += "OOO                 OOOO" #2
map += "OO    ┌──┄─┬─┄┄─┄┐    OO" #3
map += "O     |GGG^|GGGGG╵     O" #4
map += "O     |GGGG╵GGGGGG     O" #5
map += "O     |GGGGGGGGGG╷     O" #6
map += "O     |GGGG╷GGGGG|     O" #7
map += "O     |GGGG|GGGGG|     O" #8
map += "O     └┄───┴┄──┄─┘     O" #9
map += "OO                     O" #0
map += "OO            S        O" #1
map += "OOO                   OO" #2
map += "OOOOOO               OOO" #3
map += "OOOOOOOO          OOOOOO" #4
map += "OOOOOOOOOO    OOOOOOOOOO" #5

room.overlay(map)
room.warp(10, 4, "test_house_upstairs", 9, 6)
room.sign(14, 11, "This is a test sign")

room.scatter_replace("O", PLAINS_TREES)
room.reformat()

room.save()

#puts get_rooms().inspect
require_relative './include.rb'

room = Room.new("test_room")
room.name = "Test Room"

room.fill(" ")
room.random_fill("*", 0.1)
PLAINS_FLOWERS.each { |flower| room.random_fill(flower, 0.02) }

       #012345678901234567890123
map  = "OOOOOOOOOOOOOOOOOOOOOOOO" #0
map += "O                      O" #1
map += "O  ┌──┄┄┄─┬─┄┄┄┄─┄┐    O" #2
map += "O  |GGGGG^|GGGGGGG╵    O" #3
map += "O  |GGGGGG╵GGGGGGGG    O" #4
map += "O  |GGGGGGGGGGGGGG╷    O" #5
map += "O  |GGGGGG╷GGGGGGG|    O" #6
map += "O  |GGGGGG|GGGGGGG|    O" #7
map += "O  └─┬┄┄──┴┄─GG┄┄┬┘    O" #8
map += "O    |GGGGGGGGGG^|     O" #9
map += "O    |GGGGGGGGGGG|     O" #0
map += "O    |GGGGGGGGGGG|     O" #1
map += "O    └──┄GG──┄┄─┄┘     O" #2
map += "O                   S  O" #3
map += "O                      O" #4
map += "OOOOOOOOOOOOOOOOOOOOOOOO" #5

room.overlay(map)
room.sign(20, 13, "Test room")
room.tile(13, 3, "CHAIR")
room.tile(14, 3, "TABLE")
room.tile(15, 3, "CHAIR")

room.scatter_replace("O", PLAINS_TREES)
room.reformat()

room.save()

#puts get_rooms().inspect
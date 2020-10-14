require './rb/include.rb'

room = Room.new("spawn")
room.name = "Spawn"
#room.color = "#98BA5E"
room.north = "test_house"
room.east = "portal_room"

room.fill(" ")

room.random_fill("*", 0.1)

PLAINS_FLOWERS.each { |flower| room.random_fill(flower, 0.02) }

       #012345678901234567890123
map  = "OOOOOOOOOO    OOOOOOOOOO" #0
map += "OOOOOO            OOOOOO" #1
map += "OOO                  OOO" #2
map += "OO   S                OO" #3
map += "O                      O" #4
map += "O                      O" #5
map += "O                       " #6
map += "O                       " #7
map += "O                       " #8
map += "O                       " #9
map += "O                      O" #0
map += "O                      O" #1
map += "OO                    OO" #2
map += "OOO                  OOO" #3
map += "OOOOOO            OOOOOO" #4
map += "OOOOOOOOOOOOOOOOOOOOOOOO" #5

room.overlay(map)
room.sign(5, 3, "Test!")

room.scatter_replace("O", PLAINS_TREES)
room.reformat()

room.save()

#puts get_rooms().inspect
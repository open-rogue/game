require './rb/include.rb'

room = Room.new("portal_room")
room.name = "Portal Room"
room.west = "spawn"

room.fill(" ")
room.random_fill('*', 0.1)

       #012345678901234567890123
map  = "OCOOOOOOOOOOOOOCOOOOOOOO" #0
map += "OOOOOOCOOOOOOOOOOOOOOOOO" #1
map += "OOOOOOOOOOOOCOOOOOOOCOOO" #2
map += "OOOCOOOOO       OOOOOOOO" #3
map += "OOOOO               OOOO" #4
map += "OOOO                 OOO" #5
map += "            S         OO" #6
map += "                      OC" #7
map += "            X         OO" #8
map += "                      OO" #9
map += "OOOO                 COO" #0
map += "OCOOO               OOOO" #1
map += "OOOOCOOOO       OOCOOOOO" #2
map += "OOOOOOOOCOOOOOOOOOOOOOOC" #3
map += "OCOOOOOOOOOOOOOCOOOOOOOO" #4
map += "OOOOCOOOOOCOOOOOOOCOOOOO" #5

room.overlay(map)

room.sign(12, 6, "To the Upside Downs")
room.warp(12, 8, "upside_downs", 12, 8)

room.scatter_replace("O", PLAINS_TREES)
room.reformat()

room.save()

#puts get_rooms().inspect
require './rb/include.rb'

room = Room.new("example_home")
room.name = "Example Home"

room.fill(" ")

       #012345678901234567890123
map  = "                        " #0
map += "                        " #1
map += "  ┌──────────────────┐  " #2
map += "  |                  |  " #3
map += "  |                  |  " #4
map += "  |                  |  " #5
map += "  |    S             |  " #6
map += "  |                  |  " #7
map += "  |                  |  " #8
map += "  |                  |  " #9
map += "  |                  |  " #0
map += "  |                  |  " #1
map += "  |                  |  " #2
map += "  └┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┘  " #3
map += "                        " #4
map += "                        " #5

room.overlay(map)

room.reformat()

room.save()

#puts get_rooms().inspect
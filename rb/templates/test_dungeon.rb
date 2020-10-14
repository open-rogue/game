require './rb/include.rb'

room = Room.new("test_dungeon")
room.name = "Test Dungeon"
room.color = "#000000"

DUNGEON_FLOOR        = ["DUNGEON_FLOOR_0", "DUNGEON_FLOOR_0", "DUNGEON_FLOOR_0", "DUNGEON_FLOOR_0", "DUNGEON_FLOOR_0", "DUNGEON_FLOOR_0", "DUNGEON_FLOOR_0", "DUNGEON_FLOOR_0", "DUNGEON_FLOOR_0", "DUNGEON_FLOOR_0", "DUNGEON_FLOOR_0", "DUNGEON_FLOOR_0", "DUNGEON_FLOOR_0", "DUNGEON_FLOOR_0", "DUNGEON_FLOOR_1", "DUNGEON_FLOOR_2", "DUNGEON_FLOOR_3", "DUNGEON_FLOOR_4", "DUNGEON_FLOOR_5", "DUNGEON_FLOOR_6", "DUNGEON_FLOOR_7", "DUNGEON_FLOOR_8", "DUNGEON_FLOOR_9", "DUNGEON_FLOOR_10", "DUNGEON_FLOOR_11"]
DUNGEON_WALL         = ["DUNGEON_WALL_0", "DUNGEON_WALL_0", "DUNGEON_WALL_0", "DUNGEON_WALL_0", "DUNGEON_WALL_0", "DUNGEON_WALL_0", "DUNGEON_WALL_0", "DUNGEON_WALL_0", "DUNGEON_WALL_1", "DUNGEON_WALL_2", "DUNGEON_WALL_3", "DUNGEON_WALL_4", "DUNGEON_WALL_5", "DUNGEON_WALL_6"]
DUNGEON_CEILING_VERT = ["DUNGEON_CEILING_VERTICAL_0"]
DUNGEON_CEILING_HORZ = ["DUNGEON_CEILING_HORIZONTAL_0", "DUNGEON_CEILING_HORIZONTAL_0", "DUNGEON_CEILING_HORIZONTAL_0", "DUNGEON_CEILING_HORIZONTAL_0", "DUNGEON_CEILING_HORIZONTAL_1", "DUNGEON_CEILING_HORIZONTAL_2", "DUNGEON_CEILING_HORIZONTAL_3"]

room.fill(" ")

room.scatter_area([1, 2, 22, 11], DUNGEON_FLOOR)
#room.fill_area([1, 2, 22, 11], "DUNGEON_FLOOR_TEST")

room.scatter_area([1, 1, 22, 1],   DUNGEON_WALL)
room.scatter_area([0, 13, 23, 13], DUNGEON_WALL)

room.scatter_area([0, 0, 0, 11],   DUNGEON_CEILING_VERT)
room.scatter_area([23, 0, 23, 11], DUNGEON_CEILING_VERT)

room.scatter_area([1, 0, 22, 0],   DUNGEON_CEILING_HORZ)
room.scatter_area([0, 12, 23, 12], DUNGEON_CEILING_HORZ)

room.fill_area([0, 14, 23, 14], "DUNGEON_CLIFF_0")
room.fill_area([0, 15, 23, 15], "DUNGEON_CLIFF_1")

room.reformat()

room.save()

#puts get_rooms().inspect

#    012345678901234567890123
# 0 "V======================V " 0
# 1 "VWWWWWWWWWWWWWWWWWWWWWWV " 1
# 2 "V                      VV" 2
# 3 "V                      VV" 3
# 4 "V                      V" 4
# 5 "V                      V" 5
# 6 "V                      V" 6
# 7 "V                      V" 7
# 8 "V                      V" 8
# 9 "V                      V" 9
# 0 "V                      V" 0
# 1 "V                      V" 1
# 2 "========================" 2
# 3 "WWWWWWWWWWWWWWWWWWWWWWWW" 3
# 4 "CCCCCCCCCCCCCCCCCCCCCCCC" 4
# 5 "cccccccccccccccccccccccc" 5
#    012345678901234567890123
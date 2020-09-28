require './rb/include.rb'

room = Room.new("test_plains")
room.south = "spawn"

PLAINS_GRASS = ["PLAINS_GRASS_0", "PLAINS_GRASS_1", "PLAINS_GRASS_2", "PLAINS_GRASS_3", "PLAINS_GRASS_4"]

room.scatter_fill(PLAINS_GRASS)

room.reformat()

room.save()

#puts get_rooms().inspect
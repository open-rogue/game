require './rb/include.rb'

room = Room.new("test_plains")
room.south = "spawn"

PLAINS_GRASS = ["PLAINS_GRASS_0", "PLAINS_GRASS_1", "PLAINS_GRASS_2", "PLAINS_GRASS_3", "PLAINS_GRASS_4"]

PLAINS_FLOWERS = ["PLAINS_FLOWER_0", "PLAINS_FLOWER_1", "PLAINS_FLOWER_2", "PLAINS_FLOWER_3"]

room.scatter_fill(PLAINS_GRASS)

PLAINS_FLOWERS.each { |flower| room.random_fill(flower, 0.1) }

room.reformat()

room.save()

#puts get_rooms().inspect
<<<<<<< HEAD
require './rb/include.rb'

FARM_PLOTS = [
    ['0', 'FARM_PLOT_0'],
    ['1', 'FARM_PLOT_1'],
    ['2', 'FARM_PLOT_2']
]

room = Room.new("test_farm")
room.name = "Test Farm"

room.fill(" ")

room.random_fill("*", 0.1)

       #012345678901234567890123
map  = "OOOOOOOOOOOOOOOOOOOOOOOO" #0
map += "OOOOOO            OOOOOO" #1
map += "OOO                  OOO" #2
map += "OO   S                OO" #3
map += "O                      O" #4
map += "O      0  0  0         O" #5
map += "O      1  1  1         O" #6
map += "O      1  1  1         O" #7
map += "O      1  1  1         O" #8
map += "O      2  2  2         O" #9
map += "O                      O" #0
map += "O                      O" #1
map += "OO                    OO" #2
map += "OOO                  OOO" #3
map += "OOOOOO            OOOOOO" #4
map += "OOOOOOOOOOOOOOOOOOOOOOOO" #5

room.overlay(map)
room.sign(5, 3, "Test Farm!")

room.prop( 7, 5, "FARM_PUMPKIN_0")
room.prop( 7, 6, "FARM_PUMPKIN_0")
room.prop( 7, 7, "FARM_PUMPKIN_1")
room.prop( 7, 8, "FARM_PUMPKIN_1")
room.prop( 7, 9, "FARM_PUMPKIN_2")

room.prop(10, 5, "FARM_WHEAT_0")
room.prop(10, 6, "FARM_WHEAT_0")
room.prop(10, 7, "FARM_WHEAT_1")
room.prop(10, 8, "FARM_WHEAT_1")
room.prop(10, 9, "FARM_WHEAT_2")

room.prop(13, 5, "FARM_BERRIES_0")
room.prop(13, 6, "FARM_BERRIES_0")
room.prop(13, 7, "FARM_BERRIES_1")
room.prop(13, 8, "FARM_BERRIES_1")
room.prop(13, 9, "FARM_BERRIES_2")

room.scatter_replace("O", PLAINS_TREES)
room.reformat(FARM_PLOTS)
room.reformat()

room.save()

=======
require './rb/include.rb'

FARM_PLOTS = [
    ['0', 'FARM_PLOT_0'],
    ['1', 'FARM_PLOT_1'],
    ['2', 'FARM_PLOT_2']
]

room = Room.new("test_farm")
room.name = "Test Farm"

room.fill(" ")

room.random_fill("*", 0.1)

       #012345678901234567890123
map  = "OOOOOOOOOOOOOOOOOOOOOOOO" #0
map += "OOOOOO            OOOOOO" #1
map += "OOO                  OOO" #2
map += "OO   S                OO" #3
map += "O                      O" #4
map += "O      0  0  0         O" #5
map += "O      1  1  1         O" #6
map += "O      1  1  1         O" #7
map += "O      1  1  1         O" #8
map += "O      2  2  2         O" #9
map += "O                      O" #0
map += "O                      O" #1
map += "OO                    OO" #2
map += "OOO                  OOO" #3
map += "OOOOOO            OOOOOO" #4
map += "OOOOOOOOOOOOOOOOOOOOOOOO" #5

room.overlay(map)
room.sign(5, 3, "Test Farm!")

room.prop( 7, 5, "FARM_PUMPKIN_0")
room.prop( 7, 6, "FARM_PUMPKIN_0")
room.prop( 7, 7, "FARM_PUMPKIN_1")
room.prop( 7, 8, "FARM_PUMPKIN_1")
room.prop( 7, 9, "FARM_PUMPKIN_2")

room.prop(10, 5, "FARM_WHEAT_0")
room.prop(10, 6, "FARM_WHEAT_0")
room.prop(10, 7, "FARM_WHEAT_1")
room.prop(10, 8, "FARM_WHEAT_1")
room.prop(10, 9, "FARM_WHEAT_2")

room.prop(13, 5, "FARM_BERRIES_0")
room.prop(13, 6, "FARM_BERRIES_0")
room.prop(13, 7, "FARM_BERRIES_1")
room.prop(13, 8, "FARM_BERRIES_1")
room.prop(13, 9, "FARM_BERRIES_2")

room.scatter_replace("O", PLAINS_TREES)
room.reformat(FARM_PLOTS)
room.reformat()

room.save()

>>>>>>> 5901c1fd3c026caa79b720b1f3e1bb04ace908c5
#puts get_rooms().inspect
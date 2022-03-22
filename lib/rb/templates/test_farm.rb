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
map += "O      0 0 0           O" #5
map += "O      1 1 1           O" #6
map += "O      1 1 1           O" #7
map += "O      1 1 1           O" #8
map += "O      2 2 2           O" #9
map += "O                      O" #0
map += "O                      O" #1
map += "OO                    OO" #2
map += "OOO                  OOO" #3
map += "OOOOOO            OOOOOO" #4
map += "OOOOOOOOOOOOOOOOOOOOOOOO" #5

room.overlay(map)
room.sign(5, 3, "Test Farm!")

room.prop(7, 5, "FARM_PUMPKIN_0")
room.prop(7, 6, "FARM_PUMPKIN_0")
room.prop(7, 7, "FARM_PUMPKIN_1")
room.prop(7, 8, "FARM_PUMPKIN_1")
room.prop(7, 9, "FARM_PUMPKIN_2")

room.prop(9, 5, "FARM_WHEAT_0")
room.prop(9, 6, "FARM_WHEAT_0")
room.prop(9, 7, "FARM_WHEAT_1")
room.prop(9, 8, "FARM_WHEAT_1")
room.prop(9, 9, "FARM_WHEAT_2")

room.prop(11, 5, "FARM_BERRIES_0")
room.prop(11, 6, "FARM_BERRIES_0")
room.prop(11, 7, "FARM_BERRIES_1")
room.prop(11, 8, "FARM_BERRIES_1")
room.prop(11, 9, "FARM_BERRIES_2")

room.scatter_replace("O", PLAINS_TREES)
room.reformat(FARM_PLOTS)
room.reformat()

room.save()
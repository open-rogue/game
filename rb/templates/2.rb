require './rb/include.rb'

room = Room.new(2)
room.north = 1

room.fill(" ")
room.random_fill('*', 0.1)

       #012345678901234567890123
map  = "OOOOOOOOOO    OOOOOOOOOO" #0
map += "O                      O" #1
map += "O                      O" #2
map += "O    S                 O" #3
map += "O                      O" #4
map += "O                      O" #5
map += "O                      O" #6
map += "O                      O" #7
map += "O                      O" #8
map += "O                      O" #9
map += "O                      O" #0
map += "O                      O" #1
map += "O                      O" #2
map += "O                      O" #3
map += "O                      O" #4
map += "OOOOOOOOOOOOOOOOOOOOOOOO" #5

room.overlay(map)
room.sign(5, 3, "This game is in-development!")

room.reformat()
room.draw()

room.save()

#puts get_rooms().inspect
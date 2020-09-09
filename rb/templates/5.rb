require './rb/include.rb'

room = Room.new(5)
room.color = "#661010"

room.fill("GROUND")
room.random_fill('FIRE', 0.05)

       #012345678901234567890123
map  = "CCCCCCCCCCCCCCCCCCCCCCCC" #0
map += "CCCCCC            CCCCCC" #1
map += "CCC                  CCC" #2
map += "CC                    CC" #3
map += "C                      C" #4
map += "C                      C" #5
map += "C                      C" #6
map += "C                      C" #7
map += "C                      C" #8
map += "C                      C" #9
map += "C                      C" #0
map += "C                      C" #1
map += "CC                    CC" #2
map += "CCC                  CCC" #3
map += "CCCCCC            CCCCCC" #4
map += "CCCCCCCCCCCCCCCCCCCCCCCC" #5

room.overlay(map)

room.reformat()

room.save()

#puts get_rooms().inspect
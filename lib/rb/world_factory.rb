class WorldFactory
    attr_reader :world

    def initialize(seed = 0, width = 16, height = 8)
        srand(seed)
        @width, @height = width, height
        @world = Array.new(@height) { Array.new(@width) { " " } }
    end

    def w; return @width; end
    def h; return @height; end

    def scatter(n, r)
        @world.map! { |row| row.map { |t| rand < r ? n : t } }
    end

    def grow(n, r, c)
        (0..c).each do
            copy = @world.dup
            copy.map!.with_index do |row, j|
                row.map.with_index do |t, i|
                    (neighbors(i, j).include?(n) && (rand < r)) ? n : t
                end
            end
            @world = copy
        end
    end

    def neighbors(i, j)
        arr = []
        arr << @world[j + 0][i + 1] unless (i == w - 1)
        arr << @world[j + 0][i - 1] unless (i == 0)
        arr << @world[j + 1][i + 0] unless (j == h - 1)
        arr << @world[j - 1][i + 0] unless (j == 0)
        arr << @world[j + 1][i + 1] unless (i == w - 1) || (j == h - 1)
        arr << @world[j - 1][i + 1] unless (i == w - 1) || (j == 0)
        arr << @world[j + 1][i - 1] unless (i == 0) || (j == h - 1)
        arr << @world[j - 1][i - 1] unless (i == 0) || (j == 0)
        return arr
    end
end
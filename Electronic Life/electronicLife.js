// Project: Electronic Life

// The Plan
var plan = ["############################",
            "#      #    #      o      ##",
            "#                          #",
            "#          #####           #",
            "##         #   #    ##     #",
            "###           ##     #     #",
            "#           ###      #     #",
            "#   ####                   #",
            "#   ##       o             #",
            "# o  #         o       ### #",
            "#    #                     #",
            "############################"];



// Representing Space

function Vector(x, y) {
    this.x = x;
    this.y = y;
}

Vector.prototype.plus = function(other) {
    return new Vector(this.x + other.x, this.y + other.y);
};


// The grid

var grid = ["top left", "top middle", "top right",
            "bottom left", "bottom middle", "bottom right"]; // x + (y * width) -> grid[2 + (1 * 3)]

// The Grid Object
function Grid(width, height) {
    this.space = new Array(width * height);
    this.width = width;
    this.height = height;
}

Grid.prototype.isInside = function(vector) {
    return vector.x >= 0 && vector.x < this.width &&
           vector.y >= 0 && vector.y < this.height;
};

Grid.prototype.get = function(vector) {
    return this.space[vector.x + this.width * vector.y];
};

Grid.prototype.set = function(vector, value) {
    this.space[vector.x + this.width * vector.y] = value;
};


var grid = new Grid(5, 5);
grid.set(new Vector(1, 1), "X");
var test = grid.get(new Vector(1, 1));


// The world

function elementFromChar(legend, ch) {
    if (ch == " ") {
        return null;
    };
    var element = new legend[ch]();
    element.originChar = ch;
    return element;
}

function World(map, legend) {
    var grid = new Grid(map[0].length, map.length);
    this.grid = grid;
    this.legend = legend;
    
    map.forEach(function(line, y) {
        for (var x = 0; x < line.length; x++) {
            grid.set(new Vector(x, y), 
                     elementFromChar(legend, line[x]));
        }
    });
}


function charFromElement(element) {
    if (element == null) {
        return " ";
    } else {
        return element.originChar;
    }
}

World.prototype.toString = function() {
    var output = "";
    for (var y = 0; y < this.grid.height; y++) {
        for (var x = 0; x < this.grid.width; x++) {
            var element = this.grid.get(new Vector(x, y));
            output += charFromElement(element);
        }
        output += "\n";
    }
    
    return output;
};


function Wall() {};
function Critter() {};

var world = new World(plan, {"#": Wall,
                             "o": Critter});

var x = world.toString();
         
console.log(x); 

//Output Function
function output() {
    document.getElementById("welt").innerHTML = x;
}
output(x);

# Langton's Ant
---
The purpose of this program is to show an ant (cell) movement throughout the
2D grid of black, red, yellow, blue, and green cells. The initial state of the
cells are all black. The program should loop at least 1,000 moves.  

## How it works
---
As an ant crawls (4 steps)
* It first notices the color of the cell it is on
* Then changes its direction based on this color (More in ```Rules``` section)
* Then increments the color of the cell under it to the next color in sequence
* Finally, it moves one cell in its new direction

## Rules
---
* Cell turning states of LRLRL (L == Left, R == Right) - equivalent to binary 10101
* Each cell has 5 states (one for each binary digit position in the 5 bits, 11100)
and each state is represented on the grid by a color with the color/state sequence
as follows:
 * Black = 0 -> Red = 1 -> Yellow = 2 -> Blue = 3 -> Green = 4 -> Black = 0 (wrapped)
* Turns right on Red or Blue
* Else Turns left

## Instruction on how to run the program
---
$firefox index.html

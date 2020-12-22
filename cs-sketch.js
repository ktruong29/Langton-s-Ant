// Team Megabyte, CPSC 335, CSUF Fall 2020


// Make global g_canvas JS 'object': a key-value 'dictionary'.
var g_canvas = { cell_size:10, wid:41, hgt:41 }; // JS Global var, w canvas size info.
var g_frame_cnt = 0; // Setup a P5 display-frame counter, to do anim
var g_frame_mod = 25; // Update ever 'mod' frames.
var g_stop = 0; // Go by default.

var G_UP    = 0;
var G_RIGHT = 1;
var G_DOWN  = 2;
var G_LEFT  = 3;

var g_bot = { dir:G_UP, x:20, y:20, color:100 }; // Dir is 0..7 clock, w 0 up.
var g_box = { t:1, hgt:47, l:1, wid:63 }; // Box in which bot can move. --

function setup() // P5 Setup Fcn
{
    let sz = g_canvas.cell_size;
    let width = sz * g_canvas.wid;  // Our 'canvas' uses cells of given size, not 1x1 pixels.
    let height = sz * g_canvas.hgt;
    createCanvas( width, height );  // Make a P5 canvas.
    draw_grid( 10, 50, 'white', 'yellow' ); //draw line in white and text in yellow
}

function draw()  // P5 Frame Re-draw Fcn, Called for Every Frame.
{
    ++g_frame_cnt;
    if (0 == g_frame_cnt % g_frame_mod)
    {
        if (!g_stop) draw_update();
    }
}

function draw_bot( ) // Convert bot pox to grid pos & draw bot.
{
    //Run this loop at for 1500 times
    for(let i = 0; i < 1500; i++)
    {
      let sz = g_canvas.cell_size;
      let sz2 = sz / 2;
      let x = 1+ g_bot.x*sz; // Set x one pixel inside the sz-by-sz cell.
      let y = 1+ g_bot.y*sz;
      let big = sz -2; // Stay inside cell walls.

      let acolors = get( x + sz2, y + sz2 ); // Get cell interior pixel color [RGBA] array.
      //acolors[0] = [R] -- acolors[1] = [G] -- acolors[2] = [B]
      let pix = acolors[ 0 ] + acolors[ 1 ] + acolors[ 2 ];

      //Black cell -> red
      //Black -- rgb(0,0,0)
      if(pix == 0)
      {
        turnLeft();
        fill(color('red'));
      }
      //Red cell -> yellow
      //Red -- rgb(255,0,0)
      else if(pix == 255 && acolors[0] == 255)
      {
        turnRight();
        fill(color('yellow'));
      }
      //Yellow cell -> blue
      //Yellow -- rgb(255,255,0)
      else if(pix == 510)
      {
        turnLeft();
        fill(color('blue'));
      }
      //Blue cell -> green
      //Blue -- rgb(0,0,255)
      else if(pix == 255 && acolors[2] == 255){
        turnRight();
        fill(color('green'));
      }
      //Green cell -> black
      //Green -- rgb(0,128,0)
      else if(pix == 128)
      {
        turnLeft();
        fill(color('black'));
      }
      // console.log( "acolors,pix = " + acolors + "; " + pix );

      // Paint the cell.
      rect( x, y, big, big );

      move_bot();
  }//END for
  g_stop = 1;
}

function move_bot( )
{
    let dx = 0;
    let dy = 0;
    switch (g_bot.dir) { // Convert dir to x,y deltas: dir = clock w 0=Up,1=Rt,2=Dn,3=Left.
      case 0 : {         dy = -1; break; }  //UP
      case 1 : { dx = 1; break; }           //RIGHT
      case 2 : {         dy = 1; break; }   //DOWN
      case 3 : { dx = -1; break; }          //LEFT
    }
    let x = (g_bot.x + dx + g_box.wid) % g_box.wid; // Move-x.  Ensure positive b4 mod.
    let y = (g_bot.y + dy + g_box.hgt) % g_box.hgt; // Ditto y.

    g_bot.x = x; // Update bot x.
    g_bot.y = y; //Update bot y.
}

function draw_update()  // Update our display.
{
    //console.log( "g_frame_cnt = " + g_frame_cnt );
    move_bot( );
    draw_bot( );
}

function turnLeft()
{
  g_bot.dir--;
  if(g_bot.dir < G_UP){
    g_bot.dir = G_LEFT;
  }
}

function turnRight()
{
  g_bot.dir++;
  if(g_bot.dir > G_LEFT){
    g_bot.dir = G_UP;
  }
}

function keyPressed( )
{
    g_stop = ! g_stop;
}

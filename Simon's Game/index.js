// initial parameters for our code
var list = ["red", "blue", "green", "yellow"];
var lvl = 0;
var pattern = [];
var match = [];
var started = false;

// function to reset the code when game overs
function reset(){
  pattern=[];
  lvl=0;
  started=false;
}

// function for finding the next seq or pattern of colors for the next level
function nextseq()
{
  lvl++;
  $("h1").text("level " + lvl);
  match = [];
  var r = Math.random();
  r = Math.floor(r * 4);
  pattern.push(list[r]);
  var str = "." + pattern[pattern.length - 1];
  $(str).fadeIn(100).fadeOut(100).fadeIn(100);
  var kalu = "sounds/" + pattern[pattern.length - 1] + ".mp3";
  var ar = new Audio(kalu);
  ar.play();
}

// function to check whether the user is clicking the right buttons or not
function checking(i)
{
  if(match[i]===pattern[i])
  {
    if(match.length===pattern.length)
    {
      setTimeout(function(){
        nextseq();
      },1000);
    }
  }
  else
  {
    var wr=new Audio("sounds/wrong.mp3");
    wr.play();
    $("h1").text("Game over Press any key to Restart");
    $("body").addClass("gameover");
    setTimeout(function(){
      $("body").removeClass("gameover");
    },200);
    reset();
  }
}


// function to start the game with a keypress event
$(document).keypress(function() {
  if (!started) {
    nextseq();
    started = true;
  }
});


// function to let the user click on buttons and enjoy the game
// haha Now i have explain you the code Now play the game. 
$("button").click(function() {
  var check = this.classList[1];
  $("." + check).addClass("jumbo");
  setTimeout(function() {
    $("." + check).removeClass("jumbo");
  }, 100);
  var muni = "sounds/" + check + ".mp3";
  var tot = new Audio(muni);
  tot.play();
  match.push(check);
  checking(match.length-1);
});

document.querySelector("button").addEventListener("click",playy);

function playSound(){
  const track="./sound/diceRoll.mp3";
  const ply=new Audio(track);
  ply.play();
}
function playy()
{
playSound();  
var r=Math.random();
var l=Math.random();
r=Math.floor(r*6)+(+1);
l=Math.floor(l*6)+(+1);
var im1="images/"+"dice"+r+".png";
var im2="images/"+"dice"+l+".png";
document.querySelectorAll(".cdice")[0].style.visibility="hidden";
document.querySelectorAll(".cdice")[1].style.visibility="hidden";
setTimeout(function(){
  document.querySelectorAll(".cdice")[0].style.visibility="visible";
  document.querySelectorAll(".cdice")[1].style.visibility="visible";
  check();
},380);
document.querySelectorAll(".cdice")[0].setAttribute("src", im1);
document.querySelectorAll(".cdice")[1].setAttribute("src", im2);
function check(){
if(r>l)
{
  document.querySelector(".sec-h1").innerHTML="🚩Player 1 Wins";
  document.querySelector("p").innerHTML="🥳 Play Again";
}
else if(r<l)
{
  document.querySelector(".sec-h1").innerHTML="Player 2 Wins🚩";
  document.querySelector("p").innerHTML="🥳 Play Again";
}
else
{
  document.querySelector(".sec-h1").innerHTML="🚩Draw!🚩";
  document.querySelector("p").innerHTML="😒 Play Again";
}
}
}

//Create variables here
var dog, dogImage, happyDog, happyDogImage, database, foodS, foodStock;

function preload()
{
  //load images here
  dogImage=loadImage("Dog.png");
  happyDogImage=loadImage("happydog.png");

}

function setup() {
  createCanvas(500, 500);

database=firebase.database();
  
dog=createSprite(250,300,50,50);
  dog.addImage(dogImage);
  dog.scale=0.2;
  
  
  foodS=database.ref("Food");
  foodS.on("value",readStock);

}


function draw() {  
  background(46, 139, 87);
  
  if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(happyDogImage);
  }

  drawSprites();
  //add styles here
  textSize(15);
  fill("white");
  text("Press up arrow key to feed dog",160,100);
  text("Food : "+foodS,250,150);
}

function readStock(data){
  foodS=data.val();
}
function writeStock(x){

  if(x<=0){
    x=0
  }
  else{
   x=x-1
  }
  database.ref('/').update({
    Food : x
  })
}
$(function(){
  console.log("Ready to play Pasur!");

  var cardsObject         = {};
  var unplayedCards       = [];
  var playedCards         = [];
  var counter             = 0;
  var hasSelectedFromHand = false;
  var hasSelectedFromPool = false;


  var playerHand = [];
  var computerHand = [];
  var playerStagingArea = [];
  var computerStagingArea = [];
  var pool = [];

  var playerStash = [];
  var computerStash = [];
  var playerPoints = 0;
  var computerPoints = 0;
  var deckUnplayed = [];
  var message = "";

  function createPasurCards(){ 
    //initialising clubs:
    for(var i=1; i < 14; i++){
      cardsObject["c"+i] = {id     : "c"+i,
                            suit   : "c",
                            face   : i,
                            points : 1,
                            img    : "1_"+i+".png"};
    }
    cardsObject.c2.points = 2; //2 of clubs has 2 points     
    //initialising spades:
    for(var i=1; i < 14; i++){
      cardsObject["s"+i] = {id     : "s"+i,
                            suit   : "s",
                            face   : i,
                            points : 0,
                            img    : "2_"+i+".png"};
    }         
    //initialising hearts:
    for(var i=1; i < 14; i++){
      cardsObject["h"+i] = {id     : "h"+i,
                            suit   : "h",
                            face   : i,
                            points : 0,
                            img    : "3_"+i+".png"};
    }    
    //initialising diamonds:
    for(var i=1; i < 14; i++){
      cardsObject["d"+i] = {id     : "d"+i,
                            suit   : "d",
                            face   : i,
                            points : 0,
                            img    : "4_"+i+".png"};
    }       
    cardsObject.d10.points = 3; //3 of diamonds has 3 points
    //All jacks & aces have 1 point, regardless of suit. 
    cardsObject["c"+"11"].points = 1;
    cardsObject["c"+"1"].points  = 1;
    cardsObject["s"+"11"].points = 1;
    cardsObject["s"+"1"].points  = 1;
    cardsObject["h"+"11"].points = 1;
    cardsObject["h"+"1"].points  = 1;
    cardsObject["d"+"11"].points = 1;
    cardsObject["d"+"1"].points  = 1;
  }

  function clearBoard(){
    unplayedCards = Object.keys(cardsObject);
    playedCards = [];      
  }

  function pickCardFromUnplayedMoveToPlayed(){
    var pickedCardIndex = Math.floor(Math.random() * unplayedCards.length);
    playedCards.push(unplayedCards.splice(pickedCardIndex,1)[0]);
    return playedCards[playedCards.length -1];
  }
  
  function dealFour(array){
    for(var i=0; i < 4; i++){
      array.push(pickCardFromUnplayedMoveToPlayed());
    }
  }

  function initialDeal(){
    dealFour(playerHand);
    dealFour(computerHand);
    dealFour(pool);
  }

  function subsequentDeal(){
    dealFour(playerHand);
    dealFour(computerHand);
  }  

  function playHands(){
    while(playerHand.length === 0 && computerHand.length === 0){
      console.log("dealing to both");
      subsequentDeal();
    }
  }
  function appendCardToDiv(card,parentDiv){
    var htmlToAppend =
    '<div class="card" id="'+cardsObject[card].id+'">'+
      '<img src="./images/'+cardsObject[card].img+'">'+
    '</div>';
    parentDiv.append(htmlToAppend);
  }
  function removeCard(cardId){
    $('#'+cardId).remove();
  }

  function makeCardsInArrayClickable(array){
    for(var i=0; i < array.length; i++){
      $("#"+array[i]).addClass('.clickable');
    }
  }
  
  function makeCardsInArrayUnclickable(array){
    for(var i=0; i < array.length; i++){
      $("#"+array[i]).removeClass('.clickable');
    }
  }

  var numToSuit = {1:"c", 2:"s", 3:"h", 4:"d"};
  var suitToNum = {c:1, s:2, h:3, d:4};

  function checkPoints(arrayOfIds){
    var totalPoints = 0;
    for(var i=0; i < arrayOfIds.length; i++){
      totalPoints += cardsObject[arrayOfIds[i]].points;
    }
    return totalPoints;
  }
  
  function updatePoints(){
    $('#player-score').innerHTML = checkPoints(playerStash);
    $('#computer-score').innerHTML = checkPoints(computerStash);
  }

  createPasurCards(); // Now cardsObject is defined.
  clearBoard(); // ensures unplayedCards includes all cards & playedCards is empty.
  initialDeal();
  //when you hover over a card, highlight it if it's a playable move.
  //if it is the player's turn, make it possible for the player to play, but not the computer.

  //add

  if(counter % 2 === 0){
  //player's turn
  //only allow the player's cards to be clickable.
    
    if(hasSelectedFromHand){
      //make pool cards which add up to 11 clickable
      if(hasSelectedFromPool){

      }
    }

  } else {

  }


})
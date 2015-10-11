$(function(){
  console.log("Ready to play Pasur!");

  var cardsObject         = {};
  var unplayedCards       = [];
  var playedCards         = [];
  var counter             = 0;
  var hasSelectedFromHand = false;
  var hasSelectedFromPool = false;
  var selectedCardFromHand  = "";
  var selectedCardFromPool  = "";

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

  var matches = {"1":"10",
                 "2":"9",
                 "3":"8",
                 "4":"7",
                 "5":"6",
                 "6":"5",
                 "7":"4",
                 "8":"3",
                 "9":"2",
                 "10":"1",
                 "11":"11",
                 "12":"12",
                 "13":"13"
                 };

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
  /*************************************/
  function clearBoard(){
    unplayedCards = Object.keys(cardsObject);
    playedCards = [];      
  }

  function pickCardFromUnplayedMoveToPlayed(){
    var pickedCardIndex = Math.floor(Math.random() * unplayedCards.length);
    playedCards.push(unplayedCards.splice(pickedCardIndex,1)[0]);
    return playedCards[playedCards.length -1];
  }

  function appendCardToDiv(card,parentDivId){ //parentDivId is $('#player-hand')
    console.log("card is: "+card+" $(parentDivId) is: "+$(parentDivId));
    
    var htmlToAppend =
    '<div class="card" id="'+cardsObject[card].id+'">'+
      '<img src="./images/'+cardsObject[card].img+'">'+
    '</div>';
    console.log(htmlToAppend);    
    $(parentDivId).append(htmlToAppend);   
  }

  function removeCard(cardId){
    $('#'+cardId).remove();
  }
  
  function moveCardInDom(cardId, parentDivId, newParentDivId){
    removeCard(cardId);
    appendCardToDiv(cardId, newParentDivId);
  }

  function moveCardInArrays(cardId, array1, array2, i){
    if (i){
      var index = i;
    } else {
      var index = array1.indexOf(cardId);
    }
    array1.splice(index,1);
    array2.push(cardId);
  }

  /*************************************/
  
  function dealFour(array, arrayId){
    for(var i=0; i < 4; i++){
      var cardId = pickCardFromUnplayedMoveToPlayed();
      array.push(cardId);
      console.log($('#'+arrayId));
      moveCardInDom(cardId,null,$('#'+arrayId));
    }
  }

  function initialDeal(){
    dealFour(playerHand, 'player-hand');
    dealFour(computerHand, 'computer-hand');
    dealFour(pool, 'pool');
  }

  function subsequentDeal(){
    dealFour(playerHand, 'player-hand');
    dealFour(computerHand, 'computer-hand');
  }  

  function playHands(){
    while(playerHand.length === 0 && computerHand.length === 0){
      console.log("dealing to both");
      subsequentDeal();
    }
  }

  function addClassToId(className, id){
    $('#'+id).addClass('.'+className);
  }

  function addClassToArray(className, array){
    for(var i=0; i < array.length; i++){
      $('#'+array[i]).addClass('.'+className);
    }
  }

  function removeClassFromId(className, id){
    $('#'+id).removeClass('.'+className);
  }

  function removeClassFromArray(className, array){
    for(var i=0; i < array.length; i++){
      $('#'+array[i]).removeClass('.'+className);
    }
  }

  /*************************************/

  function addEventListenerClickToId(id){
    $('#'+id).on("click",function(){ 
      hasSelectedFromPool  = true;
      selectedCardFromPool = id;
      //when clicked, push from pool to the stagingArea.
      moveCardInArrays(id,pool,playerStagingArea);
      moveCardInDom(id,pool,playerStagingArea);
    });
  }
  
  function addEventListenerClickToArray(array){
    for(var i=0; i < array.length; i++){
      $('#'+array[i]).on("click",function(){ 
        hasSelectedFromHand  = true;
        selectedCardFromHand = array[i];
        
        var id = $(this).attr("id");
        console.log(id);
        moveCardInArrays(id,playerHand,playerStagingArea,i);
        console.log(playerHand);
        console.log("psa", playerStagingArea);
        moveCardInDom(id, playerHand, "#player-staging");
debugger
      });
    }
  }

  function addEventListenerHoverToId(id){
    $('#'+id).on("hover",function(){ 
      $(this).addClass('.highlight');
    });
  }

  function addEventListenerHoverToArray(array){
    for(var i=0; i < array.length; i++){
      $('#'+array[i]).on("hover",function(){ 
        $(this).addClass('.highlight');
      });
    }
  }

  function removeAllEventListenersFromId(id){
    $('#'+id).off();
  }
  
  function removeAllEventListenersFromArray(array){
    for(var i=0; i < array.length; i++){
      $('#'+array[i]).off();
    }
  }


  // function addClickableEventListenersToPoolItems(id, statement){
  //   if(statement){
  //     $('#'+id).on("click",function(){ 
  //       hasSelectedFromPool = true;
  //       selectedCardFromPool = id;
  //     });
  //   }
  // }

  /*************************************/
  
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

  /**********************************************************************/
  console.log("Starting initialisation");
  createPasurCards(); // Now cardsObject is defined.
  clearBoard(); // ensures unplayedCards includes all cards & playedCards is empty.

  initialDeal();
  console.log(cardsObject);
  console.log(unplayedCards.length);
  console.log(playedCards.length);
  console.log(computerHand);
  console.log(computerStagingArea);
  console.log(pool);
  console.log(playerStagingArea);
  console.log(playerHand);




  // If it is the player's turn, make it possible for the player to play, but not the computer.
  if(counter % 2 === 0){
    // Player's turn
    // Only allow the player's cards to be clickable (i.e. addClass("clickable"))
    addClassToArray("clickable", playerHand);
    addClassToArray("highlight", playerHand);
    addEventListenerHoverToArray(playerHand);
    addEventListenerClickToArray(playerHand);   

    console.log(hasSelectedFromHand);
    if(hasSelectedFromHand){//we now also have a selectedCardFromHand ="c1" (e.g) 
      //given selectedCardFromHand, loop through pool & tailor event listeners to the selectedCardFromHand's matched pair. 

      playerStagingArea.push(selectedCardFromHand);

      removeClassFromArray("clickable", playerHand);
      removeClassFromArray("highlight", playerHand);
      removeAllEventListenersFromArray(playerHand);

      for(var i=0; i < pool.length; i++){
        if(cardsObject[pool[i]].face === matches[cardsObject[chosenCardFromHand].face]){
          //make this card clickable & highlightable}
          addClassToId("clickable", pool[i]);
          addClassToId("highlight", pool[i]);
          addEventListenerHoverToId(pool[i]);
          addEventListenerClickToId(pool[i]); //NB. when clicked on, the selectedCardFromPool = pool[i]; i.e. a true value. 
        } else {
          //ensure this card is *not* clickable & *not* highlightable
          removeClassFromId("clickable", pool[i]);
          removeClassFromId("highlight", pool[i]);
        }
      }
      
      //Now there should be a card selected from the pool. 
      if(hasSelectedFromPool){
        //we know the card in selectedCardFromPool = "someId";
        //Need to 
        //move all to stash
        //delay for 1 second
        //counter++
        counter++;
      }
    }//closes if(hasSelectedFromHand)
  } else {
    console.log("It's the computer's turn");
    //NB. in addEventListenerClickToId we have hardcoded 'playerStagingArea'
  }


})
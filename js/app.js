$(function(){

  var cards               = {};
  var unplayedCards       = [];
  var playedCards         = [];

  var hasSelectedFromHand = false;
  var hasSelectedFromPool = false;
  var selectedFromHand  = "";
  var selectedFromPool  = "";

  var playerHand = [];
  var playerStagingArea = [];
  var pool = [];

  var playerStash = [];
  var playerPoints = 0;
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
  var timeTaken = 0; 
  var sumFaces  = 0;                
  createPasurCards();
  clearBoard();
  
  initialDeal();
  oneTurn();

  // while(playerHand.length !== 0){
  //   oneTurn();
  // }

  // for(var i=0; i<11;i++){
  //   subsequentDeal();
  //   while(playerHand.length !== 0){
  //     oneTurn();
  //   }
  // }

  // alert("End of game! You have"+document.getElementById("player-score").innerHTML+"points!"+"It took you"+timeTaken+".");

  function oneTurn(){
    resetHoldingVariables();
    removeEventListeners();

    for(var i=0; i < playerHand.length; i++){
      document.getElementById(playerHand[i]).addEventListener("click",function(){
        if(hasSelectedFromHand && (selectedFromHand.id !== this.id)){
          return "You have already clicked on another card. This not allowed.";
        }
        if(hasSelectedFromHand && (selectedFromHand.id === this.id)){
          selectedFromHand.classList.remove("selected");
          selectedFromHand = "";
          hasSelectedFromHand  = false;
          return "Unselected the card you just clicked on.";
        }
        selectedFromHand = this;
        hasSelectedFromHand  = true;
        selectedFromHand.classList.add("selected");
      });
    }
    
    document.getElementById("pool").addEventListener("click",function(){
      if(!hasSelectedFromHand){
        return "Select a card from the hand first!";
      }
      console.log("You've clicked on the pool!");
      moveSelectedFromHandToPool();
      resetHoldingVariables();
      removeEventListeners();
      // removeSelectedClass(document.getElementById("pool"));

      return "Have moved a card to the Pool";
    });

    for(var i=0; i < pool.length; i++){
      document.getElementById(pool[i]).addEventListener("click",function(){
        if(!hasSelectedFromHand){
          return "Select a card from the hand first!";
        }
        //this executes when (hasSelectedFromHand && hasSelectedFromPool)
        //and also when (hasSelectedFromHand && !hasSelectedFromPool)
        if(selectedFromPool.id === this.id){
          selectedFromPool.classList.remove("selected");
          selectedFromPool = "";
          hasSelectedFromPool = false; //this one
          return "Unselected the card you just clicked on.";
        }
        event.stopPropagation();
        selectedFromPool = this;
        hasSelectedFromPool  = true;
        selectedFromPool.classList.add("selected");

        var a = cards[selectedFromPool.id].face;
        var b = matches[cards[selectedFromHand.id].face];

        if(parseInt(a) === parseInt(b)){
          console.log("The cards match!");
          setTimeout(moveToStash,500);
        } else {
          console.log("Oops, they don't match. You lose the card. Try again!");
          // setTimeout(function(this){
          //   console.log(this);
          //   this.classList.remove("selected");
          // }, 500);
          //if the ones you pick don't add up to 11, then you have to place selectedFromHand into the pool
        }
      });
    }
    //reset all variables to original ones
  }

  // From jQuery JavaScript Library v1.11.3 documentation
  function hasClass(selector, element){
    var className = " " + selector + " ";
    var i = 0;
    var len = element.length;
    for ( ; i < len ; i++ ) {
      if ( element[i].nodeType === 1 && (" " + element[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
        return true;
      }
    }
    return false;
  }

  function resetHoldingVariables(){
    hasSelectedFromHand = false;
    hasSelectedFromPool = false;
    selectedFromHand  = "";
    selectedFromPool  = "";
  }

  function removeEventListeners(){
    for(var i=0; i < playerHand.length; i++){
      document.getElementById(playerHand[i]).removeEventListener();
    }
    
    for(var i=0; i < pool.length; i++){
      document.getElementById(pool[i]).removeEventListener();
    }
  }

  function removeSelectedClass(element){
    element.classList.remove("selected");
  }

  function moveToStash(){
    document.getElementById(selectedFromHand.id).firstChild.src = "./images/backside.png";
    document.getElementById(selectedFromPool.id).firstChild.src = "./images/backside.png";
    document.getElementById("player-stash").appendChild(document.getElementById(selectedFromHand.id));
    document.getElementById("player-stash").appendChild(document.getElementById(selectedFromPool.id));

    document.getElementById(selectedFromHand.id).classList.remove("selected");
    document.getElementById(selectedFromPool.id).classList.remove("selected");

    document.getElementById(selectedFromHand.id).classList.add("stashed");
    document.getElementById(selectedFromPool.id).classList.add("stashed");

    document.getElementById(selectedFromHand.id).style.cssFloat = "none";
    document.getElementById(selectedFromPool.id).style.cssFloat = "none";
    sumPointsInStash();
  }

  function moveSelectedFromHandToPool(){
    document.getElementById(selectedFromHand.id).classList.remove("selected");
    document.getElementById("pool").appendChild(document.getElementById(selectedFromHand.id));
  }

  function sumPointsInStash(){
    var cardsInStash = document.getElementsByClassName("stashed");
    var sum = 0;
    for(var i=0; i < cardsInStash.length; i++){
      sum += cards[cardsInStash[i].id].points;
    }
    document.getElementById("player-score").innerHTML = sum;
    return sum;
  }

//The following would be useful for selecting several cards & summing them all up!
// function sumFacesInStagingArea(){
//     var cardsInStagingArea = document.getElementsByClassName("staging-area");
//     var sum = 0;
//     for(var i=0; i < cardsInStagingArea.length; i++){
//       sum += cards[cardsInStagingArea[i].id].face;
//     }
//     return sum;
//   }

//  The above could be called if(sumFacesInStagingArea() === 11){moveAllToStash(); return "";}



  if(hasSelectedFromHand && selectedFromHand){

  }
    // $('#'+playerHand[i]).on("click",function(){ 
    //   hasSelectedFromHand  = true;
    //   selectedFromHand = playerHand[i];

    //   console.log("$(this): "+$(this));
    //   console.log("$(this): "+$(this));
    //   console.log("this.attr('face'): "+this.attr('face'));
    //   console.log("cards[this]: "+cards[this]);

      // var id = $(this).attr("id");
      // console.log(id);
      // moveCardInArrays(id,playerHand,playerStagingArea,i);
      // console.log(playerHand);
      // console.log("psa", playerStagingArea);
      // moveCardInDom(id, playerHand, "#player-staging");

    // });
  // }

                

  function createPasurCards(){

    //initialising clubs:
    for(var i=1; i < 14; i++){
      cards["c"+i] = {suit   : "c",
                      face   : i,
                      points : 1,
                      img    : "1_"+i+".png"};
    }
    cards.c2.points = 2; //2 of clubs has 2 points     
    //initialising spades:
    for(var i=1; i < 14; i++){
      cards["s"+i] = {suit   : "s",
                      face   : i,
                      points : 0,
                      img    : "2_"+i+".png"};
    }         
    //initialising hearts:
    for(var i=1; i < 14; i++){
      cards["h"+i] = {suit   : "h",
                      face   : i,
                      points : 0,
                      img    : "3_"+i+".png"};
    }    
    //initialising diamonds:
    for(var i=1; i < 14; i++){
      cards["d"+i] = {suit   : "d",
                      face   : i,
                      points : 0,
                      img    : "4_"+i+".png"};
    }       
    cards.d10.points = 3; //3 of diamonds has 3 points
    //All jacks & aces have 1 point, regardless of suit. 
    cards["c"+"11"].points = 1;
    cards["c"+"1"].points  = 1;
    cards["s"+"11"].points = 1;
    cards["s"+"1"].points  = 1;
    cards["h"+"11"].points = 1;
    cards["h"+"1"].points  = 1;
    cards["d"+"11"].points = 1;
    cards["d"+"1"].points  = 1;
  }
  /*************************************/
  function clearBoard(){
    unplayedCards = Object.keys(cards);
    playedCards = [];      
  }

  function pickCardFromUnplayedMoveToPlayed(){
    var pickedCardIndex = Math.floor(Math.random() * unplayedCards.length);
    playedCards.push(unplayedCards.splice(pickedCardIndex,1)[0]);
    return playedCards[playedCards.length -1];
  }

  function appendCardToDiv(card,parentDivId){ //parentDivId is $('#player-hand')
    // console.log("card is: "+card+" $(parentDivId) is: "+$(parentDivId));
    
    var htmlToAppend =
    '<div class="card" id="'+card+'">'+
      '<img src="./images/'+cards[card].img+'">'+
    '</div>';
    // console.log(htmlToAppend);    
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
      // console.log($('#'+arrayId));
      moveCardInDom(cardId,null,$('#'+arrayId));
    }
  }

  function initialDeal(){
    dealFour(playerHand, 'player-hand');
    dealFour(pool, 'pool');
  }

  function subsequentDeal(){
    dealFour(playerHand, 'player-hand');
  }  

  function playHands(){
    while(playerHand.length === 0){
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
      selectedFromPool = id;
      //when clicked, push from pool to the stagingArea.
      moveCardInArrays(id,pool,playerStagingArea);
      moveCardInDom(id,pool,playerStagingArea);
    });
  }

  function addEventListenerClickToArray(array){
    for(var i=0; i < array.length; i++){
      $('#'+array[i]).on("click",function(){ 
        hasSelectedFromHand  = true;
        selectedFromHand = array[i];
        
        var id = $(this).attr("id");
        // console.log(id);
        moveCardInArrays(id,playerHand,playerStagingArea,i);
        // console.log(playerHand);
        // console.log("psa", playerStagingArea);
        // moveCardInDom(id, playerHand, "#player-staging");

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
  //       selectedFromPool = id;
  //     });
  //   }
  // }

  /*************************************/

  var numToSuit = {1:"c", 2:"s", 3:"h", 4:"d"};
  var suitToNum = {c:1, s:2, h:3, d:4};

  function checkPoints(arrayOfIds){
    var totalPoints = 0;
    for(var i=0; i < arrayOfIds.length; i++){
      totalPoints += cards[arrayOfIds[i]].points;
    }
    return totalPoints;
  }

  function updatePoints(){
    $('#player-score').innerHTML = checkPoints(playerStash);
  }

  /**********************************************************************/
}); 
window.onload = function(){

  var cards               = {};
  var unplayedCards       = [];
  var playedCards         = [];
  var turn                = 0;

  var hasSelectedFromHand = false;
  var hasSelectedFromPool = false;
  var selectedFromHand  = "";
  var selectedFromPool  = "";

  var playerHand = [];
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

  /******************************************/                
  
  createPasurCards();
  clearBoard();  
  initialDeal();
  
  setEventListenerOnHandCards();
  setEventListenerOnPoolDiv();
  setEventListenerOnPoolCards();


  //when I call moveToStash() or moveToPool() I need to afterwards 

  // oneTurn();
//this works
  // if (playerHand !==0) {
  //   oneTurn();
  // } else {
  //   console.log("ran out!")
  // }

  // for (var i=0; i<2; i++){
  //   if (playerHand !==0) {
  //     console.log(i);
  //     oneTurn();
  //   } else {
  //     console.log("ran out!")
  //   }
  //   console.log()
  // }
 

  // while(turn<48){
  //   console.log("here");
  //   if(playerHand.length !== 0 ){
  //     console.log("hi");
  //       oneTurn();
  //   }
  //   //   subsequentDeal();
  //   //   oneTurn();
  //   // }
  //   // oneTurn();
  // }
  // playGame(); 
  // oneTurn();
  
  /******************************************/   
  /**************Functions******************/
  /****************************************/
  function playGame(){

  }
  function resetHoldingVariables(){
    hasSelectedFromHand = false;
    hasSelectedFromPool = false;
    selectedFromHand  = "";
    selectedFromPool  = "";
  }

  function removeEventListeners(){
    document.getElementById("pool").removeEventListener();
    for(var i=0; i < playerHand.length; i++){
      document.getElementById(playerHand[i]).removeEventListener();
    }   
    for(var i=0; i < pool.length; i++){
      document.getElementById(pool[i]).removeEventListener();
    }
  }

  function setEventListenerOnHandCards(){
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
  }

  function setEventListenerOnPoolCards(){
    for(var i=0; i < pool.length; i++){
      // console.log("pool[i]"+pool[i]);
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
        }
      });
    }
  }

  function setEventListenerOnPoolDiv(){
    document.getElementById("pool").addEventListener("click",function(){
      if(!hasSelectedFromHand){
        return "Select a card from the hand first!";
      }
      console.log("You've clicked on the pool!");
      moveSelectedFromHandToPool();
      return "Have moved a card to the Pool & reset holding variables";
    });
  }

  function oneTurn(){
    
    turn++;
    // resetHoldingVariables();

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
      return "Have moved a card to the Pool & reset holding variables";
    });

    for(var i=0; i < pool.length; i++){
      // console.log("pool[i]"+pool[i]);
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
        }
      });
    }
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
    resetHoldingVariables();
    document.getElementById(selectedFromHand.id).removeEventListener();
    document.getElementById(selectedFromPool.id).removeEventListener();
    dealOne(playerHand, 'player-hand');
  }

  function moveSelectedFromHandToPool(){
    document.getElementById(selectedFromHand.id).classList.remove("selected");
    document.getElementById("pool").appendChild(document.getElementById(selectedFromHand.id));
    resetHoldingVariables();
    document.getElementById(selectedFromHand.id).removeEventListener();
    document.getElementById(selectedFromPool.id).removeEventListener();
    dealOne(playerHand, 'player-hand');
    setEventListenerOnHandCard(selectedFromHand.id);
    setEventListenerOnPoolCard(selectedFromPool.id);
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

  function clearBoard(){
    unplayedCards = Object.keys(cards);
    playedCards = [];      
  }

  function pickCardFromUnplayedMoveToPlayed(){
    var pickedCardIndex = Math.floor(Math.random() * unplayedCards.length);
    playedCards.push(unplayedCards.splice(pickedCardIndex,1)[0]);
    return playedCards[playedCards.length -1];
  }

  function dealFour(array, arrayId){
    for(var i=0; i < 4; i++){
      console.log("arrived");
      var cardId = pickCardFromUnplayedMoveToPlayed();
      array.push(cardId);
      // console.log($('#'+arrayId));
      moveCardInDom(cardId,null,$('#'+arrayId));
    }
  }
  function dealOne(array, arrayId){
    // for(var i=0; i < 1; i++){
      var cardId = pickCardFromUnplayedMoveToPlayed();
      array.push(cardId);
      moveCardInDom(cardId,null,$('#'+arrayId));
    // }
    setEventListenerOnHandCard(cardId);
  }

  function setEventListenerOnHandCard(cardId){
    document.getElementById(cardId).addEventListener("click",function(){
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
   
  function setEventListenerOnPoolCard(cardId){
    document.getElementById(cardId).addEventListener("click",function(){
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
      }
    });
  }

  function initialDeal(){
    dealFour(playerHand, 'player-hand');
    dealFour(pool, 'pool');
  }

  function subsequentDeal(){
    dealFour(playerHand, 'player-hand');
  }

  function appendCardToDiv(card,parentDivId){   
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

}
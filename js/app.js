window.onload = function(){

  var cards               = {};
  var unplayedCards       = [];
  var playedCards         = [];

  var hasSelectedFromHand   = false;
  var hasSelectedFromPool   = false;
  var selectedFromHand      = "";
  var selectedFromPool      = "";
  var selectedFromPoolArray = [];
  var toBeStashed           = [];

  var playerHand   = [];
  var pool         = [];
  var playerStash  = [];
  var playerPoints = 0;
  var timeTaken    = 0;
  var endOfGame    = false;
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

  /******************************************/                
  
  createPasurCards();
  clearBoard();  
  initialDeal();
  
  setEventListenerOnIntro();
  setEventListenerOnGameOver();
  setEventListenerOnHandCards();
  setEventListenerOnPoolDiv();
  setEventListenerOnPoolCards();
  
  /******************************************/   
  /**************Functions******************/
  /****************************************/

  /******************************************/   
  /*********Initialisation Functions********/
  /****************************************/

  function playGame(){

  }

  function resetInitialVariables(){

    unplayedCards       = [];
    playedCards         = [];

    hasSelectedFromHand   = false;
    hasSelectedFromPool   = false;
    selectedFromHand      = "";
    selectedFromPool      = "";
    selectedFromPoolArray = [];
    toBeStashed           = [];

    playerHand   = [];
    pool         = [];
    playerStash  = [];
    playerPoints = 0;
    timeTaken    = 0;
    endOfGame    = false;
  }

  function resetHoldingVariables(){
    hasSelectedFromHand = false;
    hasSelectedFromPool = false;
    selectedFromHand  = "";
    selectedFromPool  = "";
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
      var cardId = pickCardFromUnplayedMoveToPlayed();
      array.push(cardId);
      moveCardInDom(cardId,$('#'+arrayId));
    }
  }

  function dealOne(array, arrayId){
    for(var i=0; i < 1; i++){
      var cardId = pickCardFromUnplayedMoveToPlayed();
      if(!cardId){
        endOfGame = true;
        displayEndOfGameSequence();
      }
      array.push(cardId);
      moveCardInDom(cardId,$('#'+arrayId));
    }
    setEventListenerOnHandCard(cardId);
  }

  function initialDeal(){
    dealFour(playerHand, 'player-hand');
    dealFour(pool, 'pool');
  }

  function subsequentDeal(){
    dealFour(playerHand, 'player-hand');
  }

  /******************************************/   
  /*********Event Listener Functions********/
  /****************************************/

  function setEventListenerOnIntro(){
    removeOnClick(document.getElementsByTagName("body")[0],document.getElementById("game-intro"));
  }

  function setEventListenerOnGameOver(){
    removeOnClick(document.getElementsByTagName("body")[0],document.getElementById("game-over"));
  }

  function removeOnClick(parentDomElement,domElement){
    domElement.addEventListener("click",function(){
      parentDomElement.removeChild(domElement);
    });
  }

  //will be called as ...("click",displayEndOfGameSequence("win"));
  //will be called as ...("click",displayEndOfGameSequence("lose"));
  //is called when: have reached the end of the pack. ALSO when pool.length > 8
  //append this message to the div.
  function gameOver(winOrLose){ 
    var finalMessage = "";
    var points = document.getElementById("horizontal-player-score").innerHTML;
    if(winOrLose === "win"){
      finalMessage = "You've Won! You have "+points+" points. Want to play again? Click here!";
    }else if(winOrLose === "lose"){
      finalMessage = "Game over! You've lost. Make sure to keep less than 8 cards in the pool next time. You have "+points+" points. Want to play again? Click here!";
    }
    //fade in the following
    appendMessageToDiv(finalMessage,$('#'+arrayId));
    //
    document.getElementById("game-over").addEventListener("click",function(){
      console.log("Reset all elements!");
        // window.location.reload();
    });
  }

  function setEventListenerOnPoolDiv(){
    document.getElementById("pool").addEventListener("click",function(){
      if(!hasSelectedFromHand){
        return "Select a card from the hand first!";
      }
      // console.log("You've clicked on the pool!");
      moveSelectedFromHandToPool();
      return "Have moved a card to the Pool & reset holding variables";
    });
  }

  function setEventListenerOnHandCards(){
    for(var i=0; i < playerHand.length; i++){
      setEventListenerOnHandCard(playerHand[i]);
    }
  }

  function setEventListenerOnHandCard(cardId){
    document.getElementById(cardId).addEventListener("click",handCardListener);
  }

  function removeEventListenerOnHandCard(cardId){
    document.getElementById(cardId).removeEventListener("click",handCardListener);
  }

  function handCardListener(){
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

    if(parseInt(cards[selectedFromHand.id].face) === 11){
      //If J, loop through the whole pool, finding all which are not K or Q:
      for(var i=0; i < pool.length; i++){
        if(parseInt(cards[pool[i]].face) < 12){
          selectedFromPoolArray.push(pool[i]);
        }
      }
      setTimeout(moveMany,300);
    }
  }

  function setEventListenerOnPoolCards(){
    for(var i=0; i < pool.length; i++){
      setEventListenerOnPoolCard(pool[i]);
    }
  }

  function setEventListenerOnPoolCard(cardId){
    document.getElementById(cardId).addEventListener("click",poolCardListener);
  }

  function removeEventListenerOnPoolCard(cardId){
    document.getElementById(cardId).removeEventListener("click",poolCardListener);
  }

  function poolCardListener(cardId){
    if(!hasSelectedFromHand){
      return "Select a card from the hand first!";
    }

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
      // console.log("The cards match!");
      setTimeout(moveTwo,300);
    } else {
      console.log("Oops, they don't match. You lose the card. Try again!");
    }
  }

  /******************************************/   
  /****************Matching*****************/
  /****************************************/
  
  function checkIfMatching(selectedFromHand,selectedFromPoolArray){

  }
  
  /******************************************/   
  /**********Moving Cards Functions*********/
  /****************************************/

  function moveTwo(){
    moveFromHandToStash(selectedFromHand.id);
    moveFromPoolToStash(selectedFromPool.id);

    sumPointsInStash();
    resetHoldingVariables();
    dealOne(playerHand, 'player-hand');
  }

  function moveMany(){
    moveFromHandToStash(selectedFromHand.id);
    moveManyFromPoolToStash(selectedFromPoolArray);

    sumPointsInStash();
    resetHoldingVariables();
    dealOne(playerHand, 'player-hand');
  }

  function moveToStash(){
    document.getElementById(selectedFromHand.id).firstChild.src = "./images/tazhib.png";
    document.getElementById(selectedFromPool.id).firstChild.src = "./images/tazhib.png";
    document.getElementById("horizontal-player-stash").appendChild(document.getElementById(selectedFromHand.id));
    document.getElementById("horizontal-player-stash").appendChild(document.getElementById(selectedFromPool.id));
    removeEventListenerOnHandCard(selectedFromHand.id);
    removeEventListenerOnPoolCard(selectedFromPool.id);

    document.getElementById(selectedFromHand.id).classList.remove("selected");
    document.getElementById(selectedFromPool.id).classList.remove("selected");

    document.getElementById(selectedFromHand.id).classList.add("stashed");
    document.getElementById(selectedFromPool.id).classList.add("stashed");

    document.getElementById(selectedFromHand.id).style.cssFloat = "none";
    document.getElementById(selectedFromPool.id).style.cssFloat = "none";
    sumPointsInStash();
    resetHoldingVariables();
    dealOne(playerHand, 'player-hand');    
  }

  function moveFromHandToStash(cardId){
    document.getElementById(cardId).firstChild.src = "./images/tazhib.png";
    document.getElementById("horizontal-player-stash").appendChild(document.getElementById(cardId));
    removeEventListenerOnHandCard(cardId);
    document.getElementById(cardId).classList.remove("selected");
    document.getElementById(cardId).classList.add("stashed");
    document.getElementById(cardId).style.cssFloat = "none";
    var index = playerHand.indexOf(cardId);    
    if (index > -1) {
      playerStash.push(playerHand[index]);
      playerHand.splice(index, 1);
    }
  }

  function moveFromPoolToStash(cardId){
    document.getElementById(cardId).firstChild.src = "./images/tazhib.png";
    document.getElementById("horizontal-player-stash").appendChild(document.getElementById(cardId));
    removeEventListenerOnPoolCard(cardId);
    document.getElementById(cardId).classList.remove("selected");
    document.getElementById(cardId).classList.add("stashed");
    document.getElementById(cardId).style.cssFloat = "none";
    var index = pool.indexOf(cardId);    
    if (index > -1) {
      playerStash.push(pool[index]);
      pool.splice(index, 1);
    }
  }

  function moveManyFromPoolToStash(){
    for(var i=0; i < selectedFromPoolArray.length; i++){
      moveFromPoolToStash(selectedFromPoolArray[i]);
    }
  }

  function moveSelectedFromHandToPool(){
    document.getElementById(selectedFromHand.id).classList.remove("selected");
    document.getElementById("pool").appendChild(document.getElementById(selectedFromHand.id));
    removeEventListenerOnHandCard(selectedFromHand.id);
    setEventListenerOnPoolCard(selectedFromHand.id);

    var index = playerHand.indexOf(selectedFromHand.id);    
    if (index > -1) {
      pool.push(playerHand[index]);
      playerHand.splice(index, 1);
    }

    resetHoldingVariables();
    dealOne(playerHand, 'player-hand');
  }

  function appendCardToDiv(card,parentDivId){   
    var htmlToAppend =
    '<div class="card" id="'+card+'">'+
      '<img src="./images/'+cards[card].img+'">'+
    '</div>'; 
    $(parentDivId).append(htmlToAppend);   
  }

  function removeCard(cardId){
    $('#'+cardId).remove();
  }

  function moveCardInDom(cardId, newParentDivId){
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

  /******************************************/   
  /*****************Points******************/
  /****************************************/
  
  function sumPointsInStash(){
    var cardsInStash = document.getElementsByClassName("stashed");
    var sum = 0;
    for(var i=0; i < cardsInStash.length; i++){
      sum += cards[cardsInStash[i].id].points;
    }
    document.getElementById("horizontal-player-score").innerHTML = sum;
    playerPoints = sum;
    return playerPoints;
  }

  function prependGameOver(message){
    var htmlToPrepend = '<div id="game-over">'+
    '<p class="intro-para">'+message+'</p>'+
    '</div>';
    $('body').append(htmlToAppend);
  }

  function appendMessageToDiv(finalMessage,parentDivId){   
    var htmlToAppend =
    
    '<div class="game-over" id="game-over-id">'+
      '<p class="final-message">'+finalMessage+'</p>'+
    '</div>';    
    $('body').append(htmlToAppend);   
  }
}
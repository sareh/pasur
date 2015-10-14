#Pasur

##Instructions

Pasur is a traditional Iranian card game, played by two (or more!) people.  It has an element of chance plus strategy. In my version here, you can play against the computer. 

###Game setup
1. Start with a deck of 52 cards
2. Shuffle the cards
3. Deal 4 cards to player 1 (visible to player)
4. Deal 4 cards to the computer array (not visible to player)
5. Deal 4 cards to the play area (visible to player - face-up)
6. If there are any Jacks in the play area, 
  1. count how many Jacks there are in the play area
  2. deal that many new cards. return the Jacks to random points in the deck
  3. loop back round to check if there are any more Jacks left in the area.
  4. once there are no more Jacks in the centre, proceed to start play

###Start play with player 1 (human)
1. Player 1 checks their cards & sees whether they can make 11 with one from their hand plus any others in the play area. 
  1. Insert logic for this - section 
2. If there is a 'playable move', then make that move. 
  1. Move the card in their hand plus card(s) from the play area into a "stash" to be stored, face-down until the end of the game.

###Repeat round until both players have no cards left

###Deal a new hand to both players

###Continue until all 

###Count who won!
1. Spread out all cards in player's 'stash' and those in computer's 'stash', face-up.
2. Position cards with  sliding up so they are clearly visible.
3. Showing results in numbers. Player 1: vs Computer. 
4. 
3. **Bonus**: Animate so that cards swirl upwards. 

###Bonus section
1. Add the 'sur' logic. Add the display for 'sur'.
2. Make the computer play 'intelligently' - play with point-holding cards first. 


###Scoring - check in each stash
- 10 of diamonds: 3 points
- 2 of clubs: 2 points
- Each Ace: 1 point
- Each Jack: 1 point
- Each Sur: 5 points
- Person with the most clubs gets 1 point.
  - Have a function: 
  ```
  $(function(){
    $.each(playerStashArray,checkNumberOfClubs);
  });

  function checkNumberOfClubs(i,card){
    if(card.
    return
  }
  ```

###Logic for game play
  Logic needs to be figured out the other way around: 
     
    1. put pool cards in an array,
      1. sort by .points, highest to lowest.
      2. optionally, then make same-"point" cards to be in order of highest face to lowest face (i.e. sort by .face). 
    2. sort player's hand in an array, in the same way as above.
    3. we have two arrays to play with: playerHand & pool.
      1. need to check, starting with playerHand[0], whether there are winningPickingUpCombination matches in the pool array.
      2. if none match, then 
    - find all combinations to get 11 - then see what cards you have that match.
    6. 
    7. remove the cards that have been 'won' from the pool array & the one from the player's hand array.
    8. put all of these cards into that player's 'stash'.
    9. Deal out the next round - 4 cards to each person!

###Example card objects

```
var card1 = {face: "2",
             suit: "heart",
             points: 0
             };
             
var card2 = {face: "10",
             suit: "diamond",
             points: 3
             };
var card3 = {face: "2",
             suit: "club",
             points: 2
             };
var card4 = {face: "A",
             suit: "heart",
             points: 1
             };
var card5 = {face: "J",
             suit: "heart",
             points: 1
             };
var card6 = {suit: "diamond",
             face: 10,
             points: 3
             };
```
Potentially, I could also include images:
```
var card1 = {suit: "diamond",
             face: 10,
             points: 3,
             backimg: "./assets/back.png"
             faceimg: "./assets/diamond-10.png"
             };
var card2 = {face: "J",
             suit: "heart",
             points: 1,
             backimg: "./assets/back.png"
             faceimg: "./assets/heart-J.png"
             };
```

###Computer's logic for checking number combinations to make 11
For the computer's automatic logic:

####Easy logic
- pick a card at random from the computer's hand.
- check if it, plus any in the pool, add up to 11. 
  - if they do, then scoop them up & put them in the computer's "stash"
  - if they don't, just add the card to the list. 
- have a visible  - shows how many points there are in each person's "stash"  

####Complex logic
- pick first card in computer's hand
- check if it is possible to win 11. If it is, note down the number of points those cards will have. Save that combination in an array. it in a variable. 
- loop around to check for all 
if (chosenCard.face === "J"){
  //Can pick up all non-picture cards, plus other jacks
}
I need to fix the following, so they have unique property names:
var allowedCombinations = {
  "J":["J"],
  "Q":["Q"],
  "K":["K"],
  "10":["A"],
  "9":["2"],
  "8":["3"],
  "7":["4"],
  "6":["5"],
  "5":["6"],
  "4":["7"],
  "3":["8"],
  "2":["9"],
  "A":["10"]
};

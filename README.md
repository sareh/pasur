# Sareh's Pasur

## Background

 - This is my first project during [General Assembly's Web Development Immersive](https://generalassemb.ly/education/web-development-immersive) - a 12 week full stack web dev course.
 - Up until the start of this project, I received 3 days' worth of HTML & CSS teaching, as well as 5 days of Javascript instruction. 
 - For this project, I had 4 days to design, code and deploy a functional MVP of a game of my choice. 
 - The main constraint was to use only HTML, CSS and JavaScript.

## The game - how to play

### Traditionally

 - Pasur is a traditional Iranian two-player game. 
 - Each player is dealt a hand of four cards and four are added to the central pool.
 - Players take turn to match a card from their hand with those in the pool - they have to reach 11. Kings & Queens pick up their own pictured card. Jacks pick up all numbers, plus other Jacks. 
 - Each card is worth a different number of points - the first player to 62 points, wins. 

### My version

 - It is a single-player game. 
 - The player's hand is at the top - the pool below it. 
 - On each turn, the player has to use one card in their hand and match to 11 with one in the pool. The matched cards then go into the 'stash' at the bottom. 

   - Numbers have to add up to 11 - e.g. 5 can pick up a 6.
   - Jacks pick up all numbers, plus other Jacks.
   - Kings & Queens can pick up their own pictured card.
 
 - If there isn't a match, the card chosen from the hand will be moved to the pool.
 - If you don't clear your pool quickly - it'll overflow & it's game over!
 - You win when you match all 52 cards in the pack. 

 
 - To increase the speed of play of the game, instead of waiting for all cards in a hand to empty before dealing another, I have made the game automatically deal a card as soon as one is played.

![A screenshot of Sareh's Pasur](https://github.com/sareh/pasur/blob/master/screenshots/ScreenShot1-GameDisplay.png)

## Process

 - At the start of the project, my aim was to recreate Pasur exactly -  with two players, (one user, one computer). 
 - Half-way through the project (at the end of day 2) I realised that to be able to complete the game in the given timeframe I would have to reduce the scope and make it a single-player game. As a result, I think the game is actually more enjoyable than the original version. 
 - I used a Trello board to keep track of several things:
   - Steps of the game logic
   - Tracking all bugs found, upon testing
   - Ensuring all of my important functionality was prioritised, with additional functionality added lower-down on the lists.
 - I have used plain JavaScript (instead of jQuery) for the DOM manipulation of the cards on the screen, as well as for the rest of the game logic.

## Tech used

 - HTML 5
 - CSS 3
 - Javascript - for DOM manipulation
 - Heroku - for deployment

## Summary

 - In just four days, I have designed, programmed, tested and deployed a functional MVP of a card game.  

/*
 * Create a list that holds all of your cards
 */

const cards = ["fa-diamond","fa-paper-plane-o","fa-anchor","fa-bolt","fa-cube","fa-bicycle","fa-bomb","fa-leaf"];
let opened = [];
let cardCounter=1;
let openCard, openCardSecond;
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
/*
***notes about the functions below***
first the selector was written to select the deck class and add the cards to the page. the selector statement needed the individual index of 'cards' to add to the page so it was added to a function and the array 'cards' is iterated over with a foreach loop. the second function 'callCard' was then created to be able to call a reset to the whole game later.
*/

function callCard() {


    for (let i = 0; i <= 1; i++) {
        shuffle(cards);
        cards.forEach(setCard);
    }

        function setCard(card) {
            $(".deck").append(` <li class="card"><i class="fa ${card}"> </i></li> `);
        }
    
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

callCard();

//this event listener opens/displays the card
// that has been clicked

function gamePlay() {
    $("li").click(function() {
        $(this).toggleClass('open show');//opens the card
        if(cardCounter === 1) {
           openCard = $(":first-child", this).attr('class');
            cardCounter++;
            
        }
        else {
            
            openCardSecond = $(":first-child", this).attr('class');
            cardCounter = 1;
            matchCards(openCard,openCardSecond);
            

        }
        
        

    });
}
gamePlay();

function matchCards(first,second) {
    if(first === second) {
        
    }
    else {
        alert("fall in else match");
        //$("i[class=" + first + "]").parent().removeClass('open show');
       // alert("first find i ");
        //$("i[class=" + second + "]").parent().removeClass('open show');
        //$("li",first).removeClass('open show');
        //$("li").find('i[class=' + first +  ']').removeClass('open show');
        $("li").find(first).toggleClass('open show');
        openCard =null;
        openCardSecond =null;

    }
}



/*
 * set up the event listener for a card. If a card is clicked:
 
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


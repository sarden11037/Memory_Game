/*
 * Create a list that holds all of your cards
 */

const cards = ["fa-diamond","fa-paper-plane-o","fa-anchor","fa-bolt","fa-cube","fa-bicycle","fa-bomb","fa-leaf"];
let movesCounter = 0;
let cardCounter=1;
let openCard;
let checker =true;
let sec = 0;

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



//this event listener opens/displays the card
// that has been clicked


    function gamePlay() {
        $("li").click(function() {
            
            if (cardCounter === 1) {
                $(this).toggleClass('open show');
                openCard = $(":first-child", this).attr('class');
                cardCounter++;
                movesStars();

            } else if (!$(this).hasClass('open show')) {
                $(this).toggleClass('open show');
                openCardSecond = $(":first-child", this).attr('class');
                cardCounter = 1;
                matchCards(openCard, openCardSecond);
                movesStars();
            }
        });
    }
function movesStars() {
    movesCounter++;
    $("span[class=moves]").html(movesCounter);
    if (movesCounter >=17 && movesCounter <=32 && checker == true) {
        $("ul[class=stars]").empty();
        $("ul[class=stars]").append('<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star-o"></i></li>');
        checker =false;
    }
    else if (movesCounter >= 33 && movesCounter <= 64 && checker === false) { 
        $("ul[class=stars]").empty();
        $("ul[class=stars]").append('<li><i class="fa fa-star"></i></li><li><i class="fa fa-star-o"></i></li><li><i class="fa fa-star-o"></i></li>');
        checker = true;
    }
    else if (movesCounter >65 && checker === true) {
        $("ul[class=stars]").empty();
        $("ul[class=stars]").append('<li><i class="fa fa-star-o"></i></li><li><i class="fa fa-star-o"></i></li><li><i class="fa fa-star-o"></i></li>');
    }
}

function matchCards(first, second) {
    if (first === second) {
        $('i[class="' + first + '"]').parent().removeClass('open show');
        $('i[class="' + second + '"]').parent().removeClass('open show');
        $('i[class="' + first + '"]').parent().addClass('match');
        $('i[class="' + second + '"]').parent().addClass('match');
        openCard = null;
        openCardSecond = null;

    } else {
        const delayInMilliseconds = 1000; //1 second
        setTimeout(function() {
            $('i[class="' + first + '"]').parent().removeClass('open show');
            $('i[class="' + second + '"]').parent().removeClass('open show');
            openCard = null;
            openCardSecond = null;
        }, delayInMilliseconds);
    }
}
function startGame() {
    callCard(); //sets the deck and shuffles
    gamePlay(); //enables the event listener
    const delayInMilliseconds = 2000;
    $("li").toggleClass('open show');
    setTimeout(function() {
        $("li").removeClass('open show');
    }, delayInMilliseconds);
    
}
startGame();
 
function pad(val) {
    return val > 9 ? val : "0" + val;
}
setInterval(function() {
    document.getElementById("seconds").innerHTML = pad(++sec % 60);
    document.getElementById("minutes").innerHTML = pad(parseInt(sec / 60, 10));
}, 1000);


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


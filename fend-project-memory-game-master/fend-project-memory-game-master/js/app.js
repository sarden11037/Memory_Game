// variables created to move the functionality of the //program
const cards = ["fa-diamond","fa-paper-plane-o","fa-anchor","fa-bolt","fa-cube","fa-bicycle","fa-bomb","fa-leaf"];
let movesCounter = 0;
let cardCounter=1;
let openCard;
let checker =true;
let sec = 0;
let winCounter = 0;
let timerReset;
let starsCounter =3;

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

//this function calls the array that holds all the cards.
// it then passes that array to the shuffle function and 
// loops through twice to complete all pairs 
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
/* the if-else statement being used is to check if the first or second card is being clicked. the class of the <i> frame is saved in two independant variables. the card counter resets on the second click. the two saved variables are passed into the 'match card' function to check for equality
*/

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
/* the moves stars function is used to count the number of moves made throughout the game as well as to determine which star quality should be given. 0-16 moves gives three stars, 17-32 moves gives 2 stars, 33-64 gives one star, and more than 64 moves gives zero stars.`checker` is used to make sure the stars are not added more than once.
*/
function movesStars() {
    movesCounter++;
    $("span[class=moves]").html(movesCounter);
    if (movesCounter >=17 && movesCounter <=32 && checker == true) {
        $("ul[class=stars]").empty();
        $("ul[class=stars]").append('<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star-o"></i></li>');
        checker =false;
        starsCounter =2;
    }
    else if (movesCounter >= 33 && movesCounter <= 64 && checker === false) { 
        $("ul[class=stars]").empty();
        $("ul[class=stars]").append('<li><i class="fa fa-star"></i></li><li><i class="fa fa-star-o"></i></li><li><i class="fa fa-star-o"></i></li>');
        checker = true;
        starsCounter = 1;
    }
    else if (movesCounter >65 && checker === true) {
        $("ul[class=stars]").empty();
        $("ul[class=stars]").append('<li><i class="fa fa-star-o"></i></li><li><i class="fa fa-star-o"></i></li><li><i class="fa fa-star-o"></i></li>');
        starsCounter = 0;
    }
}
/* the matchCards function check for equality from the cards clicked based on the class of the <i> frame. if the two match, the classes `open show` are removed from the parent <li>, and the class `match` is added. if they do not match, the two classes are removed and that is all. the function also contains a variable that count how many matched cards have been accepted. if 8 are accepted, the myFunction is caled. if the cards do not match, there is a small time function that is called to delay the cards reverting for 1 second.
*/
function matchCards(first, second) {
    if (first === second) {
        $('i[class="' + first + '"]').parent().removeClass('open show');
        $('i[class="' + second + '"]').parent().removeClass('open show');
        $('i[class="' + first + '"]').parent().addClass('match');
        $('i[class="' + second + '"]').parent().addClass('match');
        openCard = null;
        openCardSecond = null;
        winCounter++;
        if(winCounter === 8) {
            myFunction();
        }

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
/* the start game function calls all the beginner function to start the game, sets a small timing function to briefly display the cards at the beginning of the game, and calls the timer function which starts the timer.
*/
function startGame() {
    callCard(); //sets the deck and shuffles
    gamePlay(); //enables the event listener
    const delayInMilliseconds = 2000;
    $("li").toggleClass('open show');
    setTimeout(function() {
        $("li").removeClass('open show');
    }, delayInMilliseconds);
    timer();

}
startGame();
// timer function which keeps track of game play time
function timer() {
    function pad(val) {
        return val > 9 ? val : "0" + val;
    }
    timerReset = setInterval(function() {
        document.getElementById("seconds").innerHTML = pad(++sec % 60);
        document.getElementById("minutes").innerHTML = pad(parseInt(sec / 60, 10));
    }, 1000);
}

/* pop up that is displayed when the game is won. if user chooses to play again, the reset game function is called
*/
function myFunction() {
    var txt;
    if (confirm("Congratuations, You Won in " + sec + " seconds with " + movesCounter + " moves with " + starsCounter + " stars. Play Again?") == true) {
        resetGame();
    } else {
        txt = "You pressed Cancel!";
    }
    
}
//event listener for the reset button
$("div[class=restart]").click(function() {
    resetGame();
});
/* the reset game function clears the deck, calls the start game function, resets the moves counter, resets the number of cards matched counter, resets the seconds tracked, resets the stars, adds three full stars, and resets the timer
*/
function resetGame() {
    
    $("ul[class=deck]").empty();
    startGame();
    movesCounter = 0;
    $("span[class=moves]").empty();
    $("span[class=moves]").html(movesCounter);
    cardCounter=1;
    checker =true;
    sec = 0;
    winCounter = 0;
    $("ul[class=stars]").empty();
    $("ul[class=stars]").append('<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>');
    clearInterval(timerReset);
    starsCounter = 3;
        
}




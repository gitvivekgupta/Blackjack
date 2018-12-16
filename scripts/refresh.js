var request = new XMLHttpRequest();
var allCards = []; 
var player = [];
var dealer = [];
var playerSum=0 ;
var dealerSum=0 ;
var player_totalwin = 0;
var dealer_totalwin = 0;
var firstdeal;
var card_deck; 
var initial_cards, player_initial=0, dealer_initial=0;
var random_card;
var index_of_random;
var bid_money = 0;
var total_money=0;
var dealear_won;
var player_won;
var tie;


request.open("GET", "https://deckofcardsapi.com/api/deck/new/draw/?count=52", true);

function add() {

    bid_money+=500;
}

request.onreadystatechange = function() {

    if (this.readyState == 4 && this.status == 200) {

        card_deck = JSON.parse(request.responseText);
        firstdeal = card_deck.cards;

        for (var i = 0; i < firstdeal.length; i++) {
    
            if(firstdeal[i].value == "KING" || firstdeal[i].value == "QUEEN" || firstdeal[i].value == "JACK") {
    
                firstdeal[i].value = 10;
            }
    
            if(firstdeal[i].value == "ACE") {
    
                firstdeal[i].value = 11;
            }
                  
            if(firstdeal[i].value != "KING" && firstdeal[i].value != "QUEEN" && firstdeal[i].value != "JACK" && firstdeal[i].value != "ACE") {
    
                firstdeal[i].value = parseInt(firstdeal[i].value);
            }
        }
    
        allCards = firstdeal;
    


        for(dealer_initial; dealer_initial<1; dealer_initial++) {

            initial_cards = allCards[Math.floor(Math.random()*allCards.length)];
            allCards.splice(initial_cards,1);
            dealerSum+=initial_cards.value;
            dealer.push(initial_cards);

            document.getElementById("dealer").innerHTML+= "<img src="+(initial_cards.image)+">";
        }
       
        for(player_initial; player_initial<2; player_initial++) {

            initial_cards = allCards[Math.floor(Math.random()*allCards.length)];
            allCards.splice(initial_cards,1);
            playerSum+=initial_cards.value;
            player.push(initial_cards);
            document.getElementById("player").innerHTML+= "<img src="+(initial_cards.image)+">" ;
        }

    }

    
};

function Dealerhit() {

    random_card = allCards[Math.floor(Math.random()*allCards.length)];
    index_of_random = allCards.indexOf(random_card);
    allCards.splice(index_of_random,1);
    dealer.push(random_card);
    var str = random_card.image;
    dealerSum+=random_card.value;

    if(dealerSum > 21) {

        if(dealer['ACE'] == true) {

            dealerSum = dealerSum-10;
        }
    }

    document.getElementById("dealer").innerHTML+= "<img src="+(random_card.image) + ">";

              // document.getElementById("pl").innerHTML += "<img src=$(str)>";
}


function hit() {

    random_card = allCards[Math.floor(Math.random()*allCards.length)];
    index_of_random = allCards.indexOf(random_card);
    allCards.splice(index_of_random,1);
    player.push(random_card);
    document.getElementById("player").innerHTML+= "<img src="+(random_card.image)+">";

    playerSum += random_card.value;

    if(playerSum > 21) {

        if(player['ACE']==true) {

            playerSum -=10;
        }

        else {

            stand(); 
        }
    }
    // document.getElementById("player").innerHTML = "<img src='$(str)'>";
}

function stand() {

    if(playerSum>21) {

        dealear_won = 1;
        total_money-=bid_money;
        bid_money=0;
         // goto label;
         // document.getElementById("playerwin").disabled=false
    }
        
    else {

        while(dealerSum<17){
            Dealerhit();
        }

        if(dealerSum>21) {

            player_won =1;
            break;
        }

        if(dealerSum == playerSum) {

            tie = 1;
            break;
        }
       
        if(playerSum<dealerSum) {

            dealear_won = 1;
            total_money-=bid_money;
            bid_money=0;
        }

        else {

            total_money+=bid_money;
            bid_money=0;
         // goto label;
         // document.getElementById("dealerwin").disabled=false;
            player_won = 1;
        }
    }
}

request.send();
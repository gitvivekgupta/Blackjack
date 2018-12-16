var request_data = new XMLHttpRequest();
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
var min_principle_amount; 
var principle_amount;


request_data.open("GET", "https://deckofcardsapi.com/api/deck/new/draw/?count=52", true);


request_data.onreadystatechange = function() {

    if (this.readyState == 4 && this.status == 200) {

        card_deck = JSON.parse(request_data.responseText);
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

function add_amount() {

    let entered_principle_amount = document.getElementById("input-principle-amount").value;
    min_principle_amount = document.getElementById("input-principle-amount").min;

    if(parseInt(entered_principle_amount) < parseInt(min_principle_amount)) {

        let error = document.createTextNode("Invalid Amount! Please Enter Amount greater than 1000.");
        document.getElementById("show-error").innerHTML = ' ';
        document.getElementById("show-error").appendChild(error);
    }

    else {
        console.log("test");
        principle_amount = entered_principle_amount;
        console.log(principle_amount);
        let display_principle_sum = document.getElementsByClassName("play-feild");
        console.log(display_principle_sum);
        let display_principle_button = document.createElement("BUTTON");
        console.log(display_principle_button);
        let display_principle_button_value = document.createTextNode(`Sum: ${principle_amount}`);
        console.log(display_principle_button_value);
        document.display_principle_sum.appendChild(display_principle_button);
        display_principle_sum.appendChild(display_principle_button_value);
    }
}

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

request_data.send();
var request_data = new XMLHttpRequest();
var allCards = []; 
var player = [];
var dealer = [];
var playerSum=0;
var dealerSum=0;
var player_totalwin = 0;
var dealer_totalwin = 0;
var firstdeal;
var card_deck; 
var initial_cards, player_initial=0, dealer_initial=0;
var random_card_selection;
var index_of_random_selection;
var bid_money = 0;
var min_principle_amount; 
var principle_amount;
var confirmation_more_play;


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

            // var dealer_cards = document.createElement("IMG");
            // dealer_cards.src = 'initial_cards.image';
            // document.getElementById("dealer-card-id").appendChild(dealer_cards);
            document.getElementById("dealer-card-id").innerHTML+= "<img src="+(initial_cards.image)+">";
        }
       
        for(player_initial; player_initial<2; player_initial++) {

            initial_cards = allCards[Math.floor(Math.random()*allCards.length)];
            allCards.splice(initial_cards,1);
            playerSum+=initial_cards.value;
            player.push(initial_cards);
            document.getElementById("player-card-id").innerHTML+= "<img src="+(initial_cards.image)+">" ;
        }
    }
};



document.getElementById("btn-disable-1").disabled = true;
document.getElementById("btn-disable-2").disabled = true;
document.getElementById("btn-disable-3").disabled = true;
document.getElementById("btn-disable-4").disabled = true;
document.getElementById("btn-disable-5").disabled = true;

function add_amount() {

    let entered_principle_amount = document.getElementById("input-principle-amount").value;
    min_principle_amount = document.getElementById("input-principle-amount").min;

    if(parseInt(entered_principle_amount) < parseInt(min_principle_amount)) {

        let principle_amount_error_message = document.createTextNode("Invalid Amount! Please Enter Amount greater than 1000.");
        document.getElementById("show-error").innerHTML = ' ';
        document.getElementById("show-error").appendChild(principle_amount_error_message);
    }

    else {
        
        principle_amount = entered_principle_amount;
        let display_principle_button = document.createElement("BUTTON");
        display_principle_button.id = 'principle-sum-button-id';
        document.getElementById("table-data").appendChild(display_principle_button);
        let display_principle_button_value = document.createTextNode(`${principle_amount}`);
        document.getElementById("principle-sum-button-id").innerHTML = parseInt(principle_amount);
    }

    document.getElementById("principle-amount-submit-btn").disabled = true;
}

function Dealerhit() {

	random_card_selection = allCards[Math.floor(Math.random()*allCards.length)];
	index_of_random_selection = allCards.indexOf(random_card_selection);
	allCards.splice(index_of_random_selection,1);
	dealer.push(random_card_selection);
	dealerSum+=random_card_selection.value;

	if(dealerSum > 21) {

		if(dealer['ACE'] == true) {

			dealerSum -= 10;
		}
	}

	document.getElementById("dealer-card-id").innerHTML+= "<img src="+(random_card_selection.image) + ">";

              // document.getElementById("pl").innerHTML += "<img src=$(str)>";
}


function hit() {

    random_card_selection = allCards[Math.floor(Math.random()*allCards.length)];
    index_of_random_selection = allCards.indexOf(random_card_selection);
    allCards.splice(index_of_random_selection,1);
    player.push(random_card_selection);

    document.getElementById("player-card-id").innerHTML += "<img src="+(random_card_selection.image)+">";

    playerSum += random_card_selection.value;

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

function addbid() {

    bid_money += 500;
    document.getElementById("principle-sum-button-id").innerHTML = parseInt(principle_amount - bid_money);
}


function stand() {

	if(playerSum>21) {

        alert("dealear_won");

        document.getElementById("principle-sum-button-id").innerHTML = parseInt(principle_amount);        
        bid_money=0;
    }
        
    else {

    	while(dealerSum<17) {

    		Dealerhit();
    	}

    	setTimeout(function() {

            if(dealerSum>21) {

                principle_amount += 2*bid_money;

                alert("player_won");
                confirmation_more_play = confirm("Do you want to play more?");
    
                    if(confirmation_more_play == true) {
    
                        localStorage.setItem("Principle Amount of User", principle_amount);
                        // window.location = '../view/play_more.html';
                    }
    
                    else {
    
                        window.location = '../index.html';
                    }
            }

            if(dealerSum == playerSum) {

                alert("tie");
    
                    confirmation_more_play = confirm("Do you want to play more?");
    
                    if(confirmation_more_play == true) {
    
                        localStorage.setItem("Principle Amount of User", principle_amount);
                        // window.location = '../view/play_more.html';
                    }
    
                    else {
    
                        window.location = '../index.html';
                    }
            }
       
            if(playerSum<dealerSum) {

                alert("dealear_won");
    
                    confirmation_more_play = confirm("Do you want to play more?");
    
                    if(confirmation_more_play == true) {
    
                        localStorage.setItem("Principle Amount of User", principle_amount);
                        // window.location = '../view/play_more.html';
                    }
    
                    else {
    
                        window.location = '../index.html';
                    }
            }

            else {

                principle_amount += 2*bid_money;
                bid_money=0;
                
                alert("player_won");

                    confirmation_more_play = confirm("Do you want to play more?");
    
                    if(confirmation_more_play == true) {
    
                        localStorage.setItem("Principle Amount of User", principle_amount);
                        // window.location = '../view/play_more.html';
                    }
    
                    else {
    
                        window.location = '../index.html';
                    }       

            }}, 2000);
    }
}

function enable_buttons() {

    document.getElementById("add-amount-btn").disabled = true;
    document.getElementById("btn-disable-1").disabled = false;
    document.getElementById("btn-disable-2").disabled = false;
    document.getElementById("btn-disable-3").disabled = false;
    document.getElementById("btn-disable-4").disabled = false;
    document.getElementById("btn-disable-5").disabled = false;
    

}

request_data.send();
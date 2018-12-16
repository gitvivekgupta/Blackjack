var request = new XMLHttpRequest();
var allCards = []; 
var player = [];
var dealer = [];
var playerSum ;
var dealerSum ;
var dplayer_totalwin = 0;
var dealer_totalwin = 0;
var firstdeal;
var card_deck; 
var initial_cards, player_initial=0, dealer_initial=0;
var random_card;
var index_of_random;


request.open("GET", "https://deckofcardsapi.com/api/deck/new/draw/?count=52", true);

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
	

		for(player_initial; player_initial<2; player_initial++) {

			initial_cards = allCards[Math.floor(Math.random()*allCards.length)];
			allCards.splice(initial_cards,1);
			player.push(initial_cards);
			document.getElementById("player").setAttribute("src",card1.image);
		}

		for(dealer_initial; dealer_initial<2; dealer_initial++) {

			initial_cards = allCards[Math.floor(Math.random()*allCards.length)];
			allCards.splice(initial_cards,1);
			dealer.push(initial_cards);
			document.getElementById("dealer").setAttribute("src",card2.image);
		}
		
		
		playerSum = card1.value + card2.value;
		dealerSum = card3.value + card4.value;

	}

	if(dealerSum < 16) {


	}
};



function hit() {

	random_card = allCards[Math.floor(Math.random()*allCards.length)];
	index_of_random = allCards.indexOf(random_card);
	allCards.splice(index_of_random,1);
	player.push(random_card);

	playerSum += random_card;

	if(playerSum > 21) {

		conslole.log("dealer wins");
	}

	if(playerSum > 21) {

		conslole.log("dealer wins");
	}


	document.getElementById("player").innerHTML = "<img src='cardr.image'>";

}











request.send();
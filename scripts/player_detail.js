var i,j,k;
var insert_player_detail;
var new_player;
var select_number;
var selected_value;
var append_players;
var total_players;
var player;
var players_username = [];
var total_number_of_players;
var incoming_player;
var store_player_username;

function total_players(value) {

	select_number = document.getElementById("player-box");
	selected_value = select_number.options[select_number.selectedIndex].value;
	append_players = document.getElementById("display-players");
	append_players.innerHTML = '';

	for(i=1; i<=selected_value; i++) {
		
		new_player = document.createElement("div");
		new_player.id = 'player_details_div' + i;
		insert_player_detail = document.createTextNode('Enter Username: ' + i + '  ');
		let input = document.createElement('input');
		input.type = 'text';
		input.id = 'username' + i;
		new_player.appendChild(insert_player_detail);
		new_player.appendChild(input);
		append_players.appendChild(new_player);
	}
}

function submit_player_details() {

	for(k=1; k<=selected_value; k++) {

		player = document.getElementById('player_details_div' + i);
		console.log(player);
		incoming_player = document.getElementById('username' + i).value;
		console.log(incoming_player);

		for(j in players_username) {

			if(j != incoming_player) {

				let throw_user_exist_error = document.getElementById('inputdetail');
				let user_exist_error_message = document.createTextNode("User doesn't exists! Please register to play.");
				let created_user_error_para = document.createElement("P");
				created_user_error_para.id = 'user-error-para-id';
				created_user_error_para.appendChild(user_exist_error_message);
			}

			else {

				// open UI
			}

		}
	}

	console.log(players_username);
	
	let players_div = document.getElementById("display-players");

	NodeList.prototype.forEach = Array.prototype.forEach
	let players_data = players_div.childNodes;
	total_number_of_players = players_data.length;
}


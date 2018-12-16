var i;
var insert_details;
var new_element;
var selectBox;
var selectedValue;
var append_ui;
var total_players;
var players;


function total_players(value) {

	selectBox = document.getElementById("box");
	selectedValue = selectBox.options[selectBox.selectedIndex].value;
	append_ui = document.getElementById("displayui");
	append_ui.innerHTML = '';

	for(i=1; i<=selectedValue; i++) {
		
		new_element = document.createElement("div");
		new_element.id = 'player_details_div' + i;
		insert_details = document.createTextNode('Enter Username: ' + i + '  ');
		let input = document.createElement('input');
		input.type = 'text';
		new_element.appendChild(insert_details);
		new_element.appendChild(input);
		append_ui.appendChild(new_element);
	}
}

function submit_player_details() {

		players = document.getElementById("displayui");
		NodeList.prototype.forEach = Array.prototype.forEach
		players = players.childNodes;
		total_players = players.length;
}


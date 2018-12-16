var i=1;


function total_players(value) {

	var selectBox = document.getElementById("box");
	var selectedValue = selectBox.options[selectBox.selectedIndex].value;
	console.log(selectedValue);

	var append_ui = document.getElementById("displayui");

	append_ui.innerHTML = '';

	for(i=1; i<=selectedValue; i++) {
		
		var new_element = document.createElement("div");
		new_element.id = 'player_details_div' + i;
		var insert_details = document.createTextNode('username:' + i);
		let input = document.createElement('input');
		input.type = 'text';
		new_element.appendChild(insert_details);
		new_element.appendChild(input);
		append_ui.appendChild(new_element)
		console.log(new_element);
	}
}
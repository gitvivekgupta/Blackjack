var throw_username_exist_error;
var username_exist_error_message;
var created_username_error_para



function register_player() {

	player = document.getElementById('registerationform');
	console.log(player);
	incoming_username = document.getElementById('new_user_name').value;
	console.log(incoming_username);

	for(j in players_username) {

		if(j == incoming_username) {

			throw_username_exist_error = document.getElementById('registerationform');
			username_exist_error_message = document.createTextNode("User already taken! Please use another name.");
			created_username_error_para = document.createElement("P");
			created_username_error_para.id = 'username-error-para-id';
			created_username_error_para.appendChild(username_exist_error_message);
		}

		else {

			players_username.push(incoming_username);
		}
	}

}
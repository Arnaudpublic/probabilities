var Data = [], Number_of_changes = 0, Number_of_boxes = 0, Starting_box = 0, i = 0, j = 0;
var test_variable;
probabilite_totale = 0;

function first_analysis() {
	Number_of_changes = parseInt( document.getElementsByClassName('settings')[0].value)+1 // index bad
	Number_of_boxes = document.getElementsByClassName('settings')[1].value
	Starting_box = document.getElementsByClassName('settings')[2].value-1 // starts at 0 n all
	if (parseInt(Number_of_boxes)<Starting_box+1) {
		alert("The starting box should inferior or equal to the amount of boxes")
		return
	}
	output_table = document.getElementById('output')
	for (var i = output_table.getElementsByClassName("line").length - 1; i >= 0; i--) {
		remove_row = output_table.getElementsByClassName("line")[i]
		remove_row.remove()
	}
	Data = new Array(Number_of_changes);

	Data[0] = new Array(Number_of_boxes);

	for (i = 0; i <= Number_of_boxes - 1; i++) {
		Data[0][i] = 0;
	}

	Data[0][Starting_box] = 1;

	for (i = 1; i <= Number_of_changes; i++) {
		Data[i] = new Array(Number_of_boxes);
		Data[i][0] = Data[i - 1][0] / 2 + Data[i - 1][1] / 3;
		if (Number_of_boxes == 2 || Number_of_boxes == 3) {
			// cas particuliers
			if (Number_of_boxes == 2) {
				Data[i][0] = Data[i - 1][0] / 2 + Data[i - 1][1] / 2;
				Data[i][1] = Data[i - 1][0] / 2 + Data[i - 1][1] / 2;
			}
			if (Number_of_boxes == 3) {
				Data[i][0] = Data[i - 1][0] /2 + Data[i - 1][1] / 3;
				Data[i][1] = Data[i - 1][0] / 2 + Data[i - 1][1] / 3 + Data[i - 1][2] / 2;
				Data[i][2] = Data[i - 1][1] / 3 + Data[i - 1][2] / 2;
			}
		} else {
			// cas supérieurs ou égaux à 4
			Data[i][0] = Data[i - 1][0] / 2 + Data[i - 1][1] / 3;
			Data[i][1] = Data[i - 1][0] / 2 + Data[i - 1][1] / 3 + Data[i - 1][2] / 3;
			Data[i][Number_of_boxes - 2] = Data[i - 1][Number_of_boxes - 3] / 3 + Data[i - 1][Number_of_boxes - 2] / 3 + Data[i - 1][Number_of_boxes - 1] / 2;
			Data[i][Number_of_boxes - 1] = Data[i - 1][Number_of_boxes - 2] / 3 + Data[i - 1][Number_of_boxes - 1] / 2;
			for (j = 2; j <= Number_of_boxes - 3; j++) {
				Data[i][j] = Data[i - 1][j - 1] / 3 + Data[i - 1][j] / 3 + Data[i - 1][j + 1] / 3;
			}
		}
	}
	for (i = 0; i <= Number_of_changes - 1; i++) {
		let new_line = document.createElement('tr')
		output_table.appendChild(new_line)
		new_line.className = "line" 

		let box_info = document.createElement('th')
		box_info.className = "box_info" 
		new_line.appendChild(box_info)
		new_line.name = i
		box_info.innerText += "Move number " + i + ":"

		for (j = 0; j <= Number_of_boxes - 1; j++) {
			let new_box = document.createElement('td')
			new_line.appendChild(new_box)
			new_box.className = "box" 
			new_box.name = j
			new_box.addEventListener("click", 
				function(){
				addStarter(this)})
			new_box.addEventListener("contextmenu", 
				function(e){
				e.preventDefault()
				removeStarter(this)})
			let box_text = document.createElement("div")
			new_box.appendChild(box_text)
			box_text.className = "box_text" 
			//test_variable = new_box.getBoundingClientRect()
			//console.log(test_variable)
			box_selected = output_table.getElementsByClassName('line')[i].getElementsByClassName('box')[j]
			box_selected_text = Data[i][j].toString().substring(0,5)
			box_selected.getElementsByClassName('box_text')[0].innerText = box_selected_text
			if (Data[i][j]==1) {
				box_selected.style.backgroundImage = "url(https://bit.ly/red_connect_4)"
			} else if ((box_selected_text!="0")&&(box_selected_text!=0)) {
				box_selected.style.backgroundImage = "url(https://bit.ly/blue_connect_4)"
			} else {
				box_selected.style.backgroundImage = "url(https://bit.ly/white_connect_4)"
			}
		}	
	}
	starting_box_html = output_table.getElementsByClassName('line')[0].getElementsByClassName('box')[Starting_box]
	starting_box_html.classList.add("starting")
}

function addStarter(box_selected) {
	box_selected.classList.add("starting")
	second_analysis(box_selected.parentElement.name)
}

function removeStarter(box_selected) {
	box_selected.classList.remove("starting")
	second_analysis(box_selected.parentElement.name)
}

function second_analysis(line_selected) {
	Data = new Array(Number_of_changes);
	for (var i = 0; i < Number_of_changes; i++) {
		Data[i] = new Array(Number_of_boxes)
	}
	for (i = 0; i <= Number_of_boxes - 1; i++) {
		Data[0][i] = 0;
	}
	for (i = 0; i < Number_of_changes; i++) {
		for (j = 0; j < Number_of_boxes; j++) {
			box_selected = output_table.getElementsByClassName('line')[i].getElementsByClassName('box')[j]
			condition_check = box_selected.classList
			if (box_selected.classList.contains("starting")) {
				Data[i][j] = 1;
			} else {
				Data[i][j] = 0;
			}
		}
	}
	for (i = 1; i < Number_of_changes; i++) {
		//console.log(i)
		//Data[i][0] = Data[i - 1][0] / 2 + Data[i - 1][1] / 3;
		if (Number_of_boxes == 2 || Number_of_boxes == 3) {
			// cas particuliers
			if (Number_of_boxes == 2) {
				Data[i][0] += Data[i - 1][0] / 2 + Data[i - 1][1] / 2;
				Data[i][1] += Data[i - 1][0] / 2 + Data[i - 1][1] / 2;
			}
			if (Number_of_boxes == 3) {
				Data[i][0] += Data[i - 1][0] /2 + Data[i - 1][1] / 3;
				Data[i][1] += Data[i - 1][0] / 2 + Data[i - 1][1] / 3 + Data[i - 1][2] / 2;
				Data[i][2] += Data[i - 1][1] / 3 + Data[i - 1][2] / 2;
			}
		} else {
			// cas supérieurs ou égaux à 4
			Data[i][0] += Data[i - 1][0] / 2 + Data[i - 1][1] / 3;
			Data[i][1] += Data[i - 1][0] / 2 + Data[i - 1][1] / 3 + Data[i - 1][2] / 3;
			Data[i][Number_of_boxes - 2] += Data[i - 1][Number_of_boxes - 3] / 3 + Data[i - 1][Number_of_boxes - 2] / 3 + Data[i - 1][Number_of_boxes - 1] / 2;
			Data[i][Number_of_boxes - 1] += Data[i - 1][Number_of_boxes - 2] / 3 + Data[i - 1][Number_of_boxes - 1] / 2;
			for (j = 2; j <= Number_of_boxes - 3; j++) {
				Data[i][j] += Data[i - 1][j - 1] / 3 + Data[i - 1][j] / 3 + Data[i - 1][j + 1] / 3;
			}
		}
	}
	for (i = 0; i < Number_of_changes; i++) {
		for (j = 0; j < Number_of_boxes; j++) {
			box_selected = output_table.getElementsByClassName('line')[i].getElementsByClassName('box')[j]
			box_selected_text = Data[i][j].toString().substring(0,5)
			box_selected.getElementsByClassName('box_text')[0].innerText = box_selected_text
			if (box_selected.classList.contains("starting")) {
				box_selected.style.backgroundImage = "url(https://bit.ly/red_connect_4)"
			} else if ((box_selected_text!="0")&&(box_selected_text!=0)) {
				box_selected.style.backgroundImage = "url(https://bit.ly/blue_connect_4)"
			} else {
				box_selected.style.backgroundImage = "url(https://bit.ly/white_connect_4)"
			}
		}
	}
}
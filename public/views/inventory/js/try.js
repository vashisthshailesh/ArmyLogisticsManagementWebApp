$("#button6").click(function(){
		window.location ="mapsInventory.html";

	})

$("#ibutton1").click(function(){
		const request = new XMLHttpRequest();
		request.open("get", "http://localhost:8000/?inven=1&query=1");
		request.onload = () => {
			const unstructured = request.responseText.substring(1, request.responseText.length-1).split("\\").join("");
			const json =JSON.parse(unstructured);
			 populateTable(json);
		};
		request.send()

	})

$("#ibutton2").click(function(){
		const request = new XMLHttpRequest();
		request.open("get", "http://localhost:8000/?inven=1&query=2");
		request.onload = () => {
			const unstructured = request.responseText.substring(1, request.responseText.length-1).split("\\").join("");
			const json =JSON.parse(unstructured);
			 populateTable2(json);
		};
		request.send()

	})

function populateTable(json){
	const tablebody = document.querySelector("#iq1t > tbody");
		
	while(tablebody.firstChild){
		tablebody.removeChild(tablebody.firstChild);
	}
	const tr = document.createElement("tr");
	const td1 = document.createElement("th"); td1.textContent = "Inventory ID"; tr.appendChild(td1);
	const td8 = document.createElement("th"); td8.textContent = "Location"; tr.appendChild(td8);
	const td2 = document.createElement("th"); td2.textContent = "Required Ration"; tr.appendChild(td2);
	const td3 = document.createElement("th"); td3.textContent = "Actual Ration";tr.appendChild(td3);
	const td4 = document.createElement("th"); td4.textContent = "Required Ammo";tr.appendChild(td4);
	const td5 = document.createElement("th"); td5.textContent = "Actual Ammo";tr.appendChild(td5);
	const td6 = document.createElement("th"); td6.textContent = "required Guns";tr.appendChild(td6);
	const td7 = document.createElement("th"); td7.textContent = "Actual Guns";tr.appendChild(td7);
	tablebody.appendChild(tr);

	for (var i = 0; i < json.length; i++){
		const tr = document.createElement("tr");
		for(var j = 1; j< 9; j++){
			const td1 = document.createElement("td");
			td1.textContent = json[i][j];
			tr.appendChild(td1);

		}
		tablebody.appendChild(tr);
	}


}
function populateTable2(json){
	const tablebody = document.querySelector("#iq2t > tbody");
		
	while(tablebody.firstChild){
		tablebody.removeChild(tablebody.firstChild);
	}
	const tr = document.createElement("tr");
	const td1 = document.createElement("th"); td1.textContent = "SID"; tr.appendChild(td1);
	const td2 = document.createElement("th"); td2.textContent = "Soldeir Name"; tr.appendChild(td2);
	const td3 = document.createElement("th"); td3.textContent = "Diff in Ration";tr.appendChild(td3);
	const td4 = document.createElement("th"); td4.textContent = "Diff in Ammo";tr.appendChild(td4);
	const td5 = document.createElement("th"); td5.textContent = "Diff in Guns";tr.appendChild(td5);

	tablebody.appendChild(tr);

	for (var i = 0; i < json.length; i++){
		const tr = document.createElement("tr");
		for(var j = 1; j< 6; j++){
			const td1 = document.createElement("td");
			td1.textContent = json[i][j];
			tr.appendChild(td1);

		}
		tablebody.appendChild(tr);
	}


}
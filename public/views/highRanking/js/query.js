$(document).ready(function(){
	$("#hbutton1").click(function(){
		const request = new XMLHttpRequest();
		request.open("get", "http://localhost:8000/?high=1&query=1");
		request.onload = () => {
			const unstructured = request.responseText.substring(1, request.responseText.length-1).split("\\").join("");
			const json =JSON.parse(unstructured);
			 populateTable(json);
		};
		request.send()

	})

	$("#hbutton2").click(function(){
		const request = new XMLHttpRequest();
		var age = document.getElementById('hq2ia').value;
		var loc = document.getElementById('hq2il').value.toLowerCase();
		var x= ["ranchi", "dibrugarh", "bomdila", "gangtok", "zakhama", "rangia", "binnaguri", "leimaKhong", "missamari", "kalimpong", "panagarh", "pathankot", "dimapur", "tezpur", "siliguri", "leh", "baramulla", "akhnoor", "dras", "gurez", "rajouri", "yol", "srinagar", "nagrota", "pune", "ahmedabad", "jhansi", "jodhpur", "sagar", "hyderabad", "bhopal", "jaipur"];

		if(isNaN(age)){
			alert("age should be number");
		}
		else if(x.includes(loc)){
			if(age<18 || age >= 60){
				alert(" age should be in the given range");
			}
			else{
				request.open("get", "http://localhost:8000/?high=1&query=2&age="+age+"&loc="+loc);
				request.onload = () => {
					// const unstructured = request.responseText.substring(1, request.responseText.length-1).split("\\").join("");
					// const json =JSON.parse(unstructured);
					//populateTable2(json);
					populateTable2();
				};
				request.send()
			}
		}
		else {
			alert("location should belong to the mentioned locations")
		}

	})

	$("#hbutton3").click(function(){
		const request = new XMLHttpRequest();
		request.open("get", "http://localhost:8000/?high=1&query=3");
		request.onload = () => {
			const unstructured = request.responseText.substring(1, request.responseText.length-1).split("\\").join("");
			
			const json =JSON.parse(unstructured);
			populateTable3(json);
		};
		request.send()

		
	})


	$("#hbutton4").click(function(){
			const request = new XMLHttpRequest();
			request.open("get", "http://localhost:8000/?high=1&query=4");
			request.onload = () => {
				const unstructured = request.responseText.substring(1, request.responseText.length-1).split("\\").join("");
				const json =JSON.parse(unstructured);
				populateTable4(json);
			};
			request.send()
	})

	$("#hbutton5").click(function(){
		const request = new XMLHttpRequest();
		request.open("get", "http://localhost:8000/?high=1&query=5");
		request.onload = () => {
			const unstructured = request.responseText.substring(1, request.responseText.length-1).split("\\").join("");
			const json =JSON.parse(unstructured);
			populateTable5(json);
		};
		request.send()
	})

	$("#hbutton6").click(function(){
		const request = new XMLHttpRequest();
		var sid = document.getElementById('hq6i').value;
		if(isNaN(sid)){
			alert("SID should be number");
		}
		else{
			if(sid > 999999999 && sid <= 9999999999){
				request.open("get", "http://localhost:8000/?high=1&query=6&sid="+sid);
				request.onload = () => {
					const unstructured = request.responseText.substring(1, request.responseText.length-1).split("\\").join("");
					const json =JSON.parse(unstructured);
					populateTable6(json);
				};
				request.send()
			}
			else{
				alert('SID should be 10 digit number');
			}
		}
	})
})

function populateTable2(){
	document.getElementById("h2p").innerHTML = "query successfuly excuted , values are inserted in veteran table ."
}

function populateTable6(json){
		const tablebody = document.querySelector("#hq6t > tbody");
	var check = 0;
	if(json.length == 0){
		document.getElementById("h6p").innerHTML = " No dependents on this soldeir ."
	}
	else{
		console.log("sds");
		check =1;
		document.getElementById("h6p").innerHTML = "";
	}


	
	while(tablebody.firstChild){
		tablebody.removeChild(tablebody.firstChild);
	}
	if(check === 1){
		const tr = document.createElement("tr");
		const td1 = document.createElement("th"); td1.textContent = "Dependent's ID"; tr.appendChild(td1);
		const td2 = document.createElement("th"); td2.textContent = "Name"; tr.appendChild(td2);
		const td3 = document.createElement("th"); td3.textContent = "Location";tr.appendChild(td3);
		const td4 = document.createElement("th"); td4.textContent = "Age";tr.appendChild(td4);
		const td5 = document.createElement("th"); td5.textContent = "Sex";tr.appendChild(td5);
		tablebody.appendChild(tr);
	}

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

function populateTable5(json){
	const tablebody = document.querySelector("#hq5t > tbody");
	
	while(tablebody.firstChild){
		tablebody.removeChild(tablebody.firstChild);
	}

	const tr = document.createElement("tr");
	const td1 = document.createElement("th"); td1.textContent = "Location"; tr.appendChild(td1);
	const td2 = document.createElement("th"); td2.textContent = "total Civilian Casuality"; tr.appendChild(td2);
	const td3 = document.createElement("th"); td3.textContent = "Description of Attack";tr.appendChild(td3);
	tablebody.appendChild(tr);

	for (var i = 0; i < json.length; i++){
		const tr = document.createElement("tr");
		for(var j = 1; j< 4; j++){
			const td1 = document.createElement("td");
			td1.textContent = json[i][j];
			tr.appendChild(td1);
		}
		tablebody.appendChild(tr);
	}
}

function populateTable4(json){
	const tablebody = document.querySelector("#hq4t > tbody");
		
	while(tablebody.firstChild){
		tablebody.removeChild(tablebody.firstChild);
	}
	const tr = document.createElement("tr");
	const td1 = document.createElement("th"); td1.textContent = "SID"; tr.appendChild(td1);
	const td2 = document.createElement("th"); td2.textContent = "Name"; tr.appendChild(td2);
	const td3 = document.createElement("th"); td3.textContent = "Rank";tr.appendChild(td3);
	const td4 = document.createElement("th"); td4.textContent = "Current Posting";tr.appendChild(td4);
	const td5 = document.createElement("th"); td5.textContent = "Success Percentage";tr.appendChild(td5);
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

function populateTable3(json){
	const tablebody = document.querySelector("#hq3t > tbody");
	
	while(tablebody.firstChild){
		tablebody.removeChild(tablebody.firstChild);
	}
	if(json.length == 0){
		document.getElementById("h3p").innerHTML = " No such departments are there."
	}
	else{
		document.getElementById("h3p").innerHTML = ""
	}

	for (var i = 0; i < json.length; i++){
		const tr = document.createElement("tr");
		for(var j = 1; j< 7; j++){
			const td1 = document.createElement("td");
			td1.textContent = json[i][j];
			tr.appendChild(td1);

		}
		tablebody.appendChild(tr);
	}
}
function populateTable(json){
	const tablebody = document.querySelector("#hq1t > tbody");
		
	while(tablebody.firstChild){
		tablebody.removeChild(tablebody.firstChild);
	}
	const tr = document.createElement("tr");
	const td1 = document.createElement("th"); td1.textContent = "Name"; tr.appendChild(td1);
	const td2 = document.createElement("th"); td2.textContent = "Rank"; tr.appendChild(td2);
	const td3 = document.createElement("th"); td3.textContent = "Department";tr.appendChild(td3);
	const td4 = document.createElement("th"); td4.textContent = "Current Posting";tr.appendChild(td4);
	const td5 = document.createElement("th"); td5.textContent = "Home Town Location";tr.appendChild(td5);
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


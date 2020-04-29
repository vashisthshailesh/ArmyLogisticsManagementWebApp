$(document).ready(function(){
	$("#ebutton1").click(function(){
		const request = new XMLHttpRequest();
		request.open("get", "http://localhost:8000/?emp=1&query=1");
		request.onload = () => {
			const unstructured = request.responseText.substring(1, request.responseText.length-1).split("\\").join("");
			const json =JSON.parse(unstructured);
			 populateTable(json);
		};
		request.send()

	})

	$("#ebutton2").click(function(){
		const request = new XMLHttpRequest();
		var loc  = document.getElementById('eq2i').value.toLowerCase();
		request.open("get", "http://localhost:8000/?emp=1&query=2&loc="+loc);
		request.onload = () => {
			const unstructured = request.responseText.substring(1, request.responseText.length-1).split("\\").join("");
			const json =JSON.parse(unstructured);
			populateTable2(json);
		};
		request.send()
	})

	$("#ebutton3").click(function(){
		var rank  = document.getElementById('eq3i').value.toLowerCase();
		var rankarr = ["leimakhong", "dras", "yol", "gurez"];
		if(rankarr.includes(rank)){
			
		const request = new XMLHttpRequest();
			request.open("get", "http://localhost:8000/?emp=1&query=3&loc="+rank);
			request.onload = () => {
				const unstructured = request.responseText.substring(1, request.responseText.length-1).split("\\").join("");
				const json =JSON.parse(unstructured);
				populateTable3(json);
			};
		request.send()

		}
		else{
			console.log(rank);
			alert("Please choose a correct location ");
		}
	})


	$("#button4").click(function(){
		var xcor = document.getElementById('mq4ix').value.toLowerCase();
		var ycor = document.getElementById('mq4iy').value.toLowerCase();
		if(!isNaN(xcor) && !isNaN(ycor) ){
			if(xcor >= -90 && xcor<=90 && ycor >= -180 && ycor<=180 && xcor && ycor){
			
				
			const request = new XMLHttpRequest();
			request.open("get", "http://localhost:8000/?mod=1&query=4&x="+xcor+"&y="+ycor);
			request.onload = () => {
				const unstructured = request.responseText.substring(1, request.responseText.length-1).split("\\").join("");
				const json =JSON.parse(unstructured);
				populateTable4(json);
			};
			request.send()
			
			}
			else{
				alert("please input correct fields in correct range");
			}

		}
		else{

			alert("please input correct type of fields");
		}
	})

	$("#button5").click(function(){
		const request = new XMLHttpRequest();
		request.open("get", "http://localhost:8000/?mod=1&query=5");
		request.onload = () => {
			const unstructured = request.responseText.substring(1, request.responseText.length-1).split("\\").join("");
			const json =JSON.parse(unstructured);
			populateTable5(json);
		};
		request.send()
	})

	$("#button6").click(function(){
		window.location ="maps.html";

	})
})

function populateTable(json){
	const tablebody = document.querySelector("#eq1t > tbody");
		
	while(tablebody.firstChild){
		tablebody.removeChild(tablebody.firstChild);
	}
	const tr = document.createElement("tr");
	const td1 = document.createElement("th"); td1.textContent = "Name"; tr.appendChild(td1);
	const td2 = document.createElement("th"); td2.textContent = "Bank Account"; tr.appendChild(td2);
	const td3 = document.createElement("th"); td3.textContent = "Bonus";tr.appendChild(td3);

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


function populateTable3(json){
	const tablebody = document.querySelector("#eq3t > tbody");
		
	while(tablebody.firstChild){
		tablebody.removeChild(tablebody.firstChild);
	}
	const tr = document.createElement("tr");
	const td1 = document.createElement("th"); td1.textContent = "name"; tr.appendChild(td1);
	const td2 = document.createElement("th"); td2.textContent = "retirement rank"; tr.appendChild(td2);
	const td3 = document.createElement("th"); td3.textContent = "retirement date";tr.appendChild(td3);
	const td4 = document.createElement("th"); td4.textContent = "age";tr.appendChild(td4);

	tablebody.appendChild(tr);

	for (var i = 0; i < json.length; i++){
		const tr = document.createElement("tr");
		for(var j = 1; j< 5; j++){
			const td1 = document.createElement("td");
			td1.textContent = json[i][j];
			tr.appendChild(td1);

		}
		tablebody.appendChild(tr);
	}
}


function populateTable2(json){
	const tablebody = document.querySelector("#eq2t > tbody");
		
	while(tablebody.firstChild){
		tablebody.removeChild(tablebody.firstChild);
	}
	const tr = document.createElement("tr");
	const td1 = document.createElement("th"); td1.textContent = "Department"; tr.appendChild(td1);
	const td2 = document.createElement("th"); td2.textContent = "total emp"; tr.appendChild(td2);
	const td3 = document.createElement("th"); td3.textContent = "total budget";tr.appendChild(td3);

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
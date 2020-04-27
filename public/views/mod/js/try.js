$(document).ready(function(){
	$("#button1").click(function(){
		const request = new XMLHttpRequest();
		request.open("get", "http://localhost:8000/?mod=1&query=1");
		request.onload = () => {
			const unstructured = request.responseText.substring(1, request.responseText.length-1).split("\\").join("");
			const json =JSON.parse(unstructured);
			 populateTable(json);
		};
		request.send()

	})

	$("#button2").click(function(){
		const request = new XMLHttpRequest();
		request.open("get", "http://localhost:8000/?mod=1&query=2");
		request.onload = () => {
			const unstructured = request.responseText.substring(1, request.responseText.length-1).split("\\").join("");
			const json =JSON.parse(unstructured);
			populateTable2(json);
		};
		request.send()
	})

	$("#button3").click(function(){
		var rank  = document.getElementById('mq3i').value.toLowerCase();
		var rankarr = ["sepoy", "lance naik", "naik", "havildar", "subedar", "subedar major",  "lieutenant",
		"captain", "major", "lieutenant colonel", "colonel", "brigadier", "major general", "lieutenant general"];
		if(rankarr.includes(rank)){
			var y = rank.split(" ").join("_");
			
		const request = new XMLHttpRequest();
			request.open("get", "http://localhost:8000/?mod=1&query=3&val="+y);
			request.onload = () => {
				const unstructured = request.responseText.substring(1, request.responseText.length-1).split("\\").join("");
				const json =JSON.parse(unstructured);
				populateTable3(json);
			};
		request.send()

		}
		else{
			console.log(rank);
			alert("Please choose a correct rank ");
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
})

function populateTable5(json){
	const tablebody = document.querySelector("#mq5t > tbody");
		
	while(tablebody.firstChild){
		tablebody.removeChild(tablebody.firstChild);
	}
	for (var i = 0; i < json.length; i++){
		const tr = document.createElement("tr");
		for(var j = 1; j< 3; j++){
			const td1 = document.createElement("td");
			td1.textContent = json[i][j];
			tr.appendChild(td1);
		}
		tablebody.appendChild(tr);
	}
}
function populateTable4(json){
	const tablebody = document.querySelector("#mq4t > tbody");
		
	while(tablebody.firstChild){
		tablebody.removeChild(tablebody.firstChild);
	}
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
	const tablebody = document.querySelector("#mq3t > tbody");
		
	while(tablebody.firstChild){
		tablebody.removeChild(tablebody.firstChild);
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

function populateTable2(json){
	const tablebody = document.querySelector("#mq2t > tbody");
		
	while(tablebody.firstChild){
		tablebody.removeChild(tablebody.firstChild);
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
	const tablebody = document.querySelector("#mq1t > tbody");
	while(tablebody.firstChild){
		tablebody.removeChild(tablebody.firstChild);
	}

	for (var i = 0; i < json.length; i++){
		const tr = document.createElement("tr");
		const td1 = document.createElement("td");
		const td2 = document.createElement("td");
		td1.textContent = json[i].location;
		td2.textContent = json[i].num;
		tr.appendChild(td1);
		tr.appendChild(td2);
		tablebody.appendChild(tr);
		
	}
	

}
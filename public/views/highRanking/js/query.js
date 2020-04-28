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

	$("#button2").click(function(){
		const request = new XMLHttpRequest();
		request.open("get", "http://localhost:8000/?high=1&query=2");
		request.onload = () => {
			const unstructured = request.responseText.substring(1, request.responseText.length-1).split("\\").join("");
			const json =JSON.parse(unstructured);
			populateTable2(json);
		};
		request.send()
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
			// populateTable5(json);
		};
		request.send()
	})
})



function populateTable3(json){
	const tablebody = document.querySelector("#hq3t > tbody");
	
	while(tablebody.firstChild){
		tablebody.removeChild(tablebody.firstChild);
	}
	if(json.length == 0){
		document.getElementById("h3p").innerHTML = " No such departments are there."
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


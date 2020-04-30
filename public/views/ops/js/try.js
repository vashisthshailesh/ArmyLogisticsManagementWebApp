$("#button6").click(function(){
		window.location ="mapsOps.html";

	})

$("#obutton2").click(function(){
		window.location ="pie.html";

	})


$("#button1").click(function(){
 	var x= ["ranchi", "dibrugarh", "bomdila", "gangtok", "zakhama", "rangia", "binnaguri", "leimaKhong", "missamari", "kalimpong", "panagarh", "pathankot", "dimapur", "tezpur", "siliguri", "leh", "baramulla", "akhnoor", "dras", "gurez", "rajouri", "yol", "srinagar", "nagrota", "pune", "ahmedabad", "jhansi", "jodhpur", "sagar", "hyderabad", "bhopal", "jaipur"]
 	var rank  = document.getElementById('oq1i').value.toLowerCase();
 	if(x.includes(rank)){
		const request = new XMLHttpRequest();
		request.open("get", "http://localhost:8000/?ops=1&query=1&place="+rank);
		request.onload = () => {
			window.location ="mapsOps2.html";
		}
		request.send()
 	}
 	else{
 		alert("choose a proper location");
 	}
})

$("#button2").click(function(){
 	window.location ="mapsOps.html";
})

$("#obutton4").click(function(){
		const request = new XMLHttpRequest();
		request.open("get", "http://localhost:8000/?ops=1&query=4");
		request.onload = () => {
			const unstructured = request.responseText.substring(1, request.responseText.length-1).split("\\").join("");
			const json =JSON.parse(unstructured);
			 populateTable4(json);
		};
		request.send()

	})

function populateTable4(json){
		const tablebody = document.querySelector("#oq4t > tbody");
		
	while(tablebody.firstChild){
		tablebody.removeChild(tablebody.firstChild);
	}
	const tr = document.createElement("tr");
	const td1 = document.createElement("th"); td1.textContent = "Threat's Name"; tr.appendChild(td1);
	const td2 = document.createElement("th"); td2.textContent = "Soldier Name"; tr.appendChild(td2);
	const td3 = document.createElement("th"); td3.textContent = "Suspicion";tr.appendChild(td3);
	const td4 = document.createElement("th"); td4.textContent = "Area compromised";tr.appendChild(td4);

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


// 	$("#obutton3").click(function(){
// 		var rank  = document.getElementById('oq3i').value.toLowerCase();
// 		var x= ["ranchi", "dibrugarh", "bomdila", "gangtok", "zakhama", "rangia", "binnaguri",
// 		 "leimaKhong", "missamari", "kalimpong", "panagarh", "pathankot", "dimapur", 
// 		 "tezpur", "siliguri", "leh", "baramulla", "akhnoor", "dras", "gurez", "rajouri", 
// 		 "yol", "srinagar", "nagrota", "pune", "ahmedabad", "jhansi", "jodhpur", "sagar", 
// 		 "hyderabad", "bhopal", "jaipur"];
// 		if(x.includes(rank)){

			
// 		const request = new XMLHttpRequest();
// 			request.open("get", "http://localhost:8000/?ops=1&query=3&loc="+rank);
// 			request.onload = () => {
// 				const unstructured = request.responseText.substring(1, request.responseText.length-1).split("\\").join("");
// 				const json =JSON.parse(unstructured);
// 				populateTable3(json);
// 			};
// 		request.send()

// 		}
// 		else{
// 			console.log(rank);
// 			alert("Please choose a correct location ");
// 		}

// 	})

// function populateTable3(json){
// 	const tablebody = document.querySelector("#oq3t > tbody");
		
// 	while(tablebody.firstChild){
// 		tablebody.removeChild(tablebody.firstChild);
// 	}
// 	const tr = document.createElement("tr");
// 	const td1 = document.createElement("th"); td1.textContent = "Location"; tr.appendChild(td1);
// 	const td2 = document.createElement("th"); td2.textContent = "total salary"; tr.appendChild(td2);
// 	const td3 = document.createElement("th"); td3.textContent = "Ration cost";tr.appendChild(td3);

// 	tablebody.appendChild(tr);

// 	for (var i = 0; i < json.length; i++){
// 		const tr = document.createElement("tr");
// 		for(var j = 1; j< 4; j++){
// 			const td1 = document.createElement("td");
// 			td1.textContent = json[i][j];
// 			tr.appendChild(td1);

// 		}
// 		tablebody.appendChild(tr);
// 	}
// }



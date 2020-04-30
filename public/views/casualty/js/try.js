$("#button6").click(function(){
	window.location ="mapsCasualty.html";

})

$("#cbutton1").click(function(){
	var xcor = document.getElementById('cq1ix').value;
	var ycor = document.getElementById('cq1iy').value;
	if(!isNaN(xcor) && !isNaN(ycor) ){
		if(xcor >= -90 && xcor<=90 && ycor >= -180 && ycor<=180 && xcor && ycor){
		
			
		const request = new XMLHttpRequest();
		request.open("get", "http://localhost:8000/?cas=1&query=1&x="+xcor+"&y="+ycor);
		request.onload = () => {
			const unstructured = request.responseText.substring(1, request.responseText.length-1).split("\\").join("");
			const json =JSON.parse(unstructured);
			populateTable(json);
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

$("#cbutton2").click(function(){
	var xcor = document.getElementById('cq2ix').value;
	var ycor = document.getElementById('cq2iy').value;
	var blood = document.getElementById('cq2ib').value.toLowerCase();
	var type = ["a+","a-","b+","b-","ab+","ab-","o+","o-"];
	if(!type.includes(blood)){
		alert("pleae input correct type of blood group")
	}
	else if(!isNaN(xcor) && !isNaN(ycor) ){
		if(xcor >= -90 && xcor<=90 && ycor >= -180 && ycor<=180 && xcor && ycor){
		
		var f;
		const request = new XMLHttpRequest();
		if(blood.charAt(blood.length-1) === '+'){
			var f = blood.substring(0, blood.length-1) +"%2B";
		}
		else{
			var f = blood.substring(0, blood.length-1) +"%2D";
		}
		request.open("get", "http://localhost:8000/?cas=1&query=2&x="+xcor+"&y="+ycor+"&blood="+f);
		request.onload = () => {
			const unstructured = request.responseText.substring(1, request.responseText.length-1).split("\\").join("");
			const json =JSON.parse(unstructured);
			populateTable2(json);
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

$("#cbutton3").click(function(){
	const request = new XMLHttpRequest();
	request.open("get", "http://localhost:8000/?cas=1&query=3");
	request.onload = () => {
		const unstructured = request.responseText.substring(1, request.responseText.length-1).split("\\").join("");
		const json =JSON.parse(unstructured);
		populateTable3(json);
	};
	request.send()
})

function populateTable3(json){

	const tablebody = document.querySelector("#cq3t > tbody");
		
	while(tablebody.firstChild){
		tablebody.removeChild(tablebody.firstChild);
	}

	const tr = document.createElement("tr");
	const td1 = document.createElement("th"); td1.textContent = "Location"; tr.appendChild(td1);
	const td2 = document.createElement("th"); td2.textContent = "No. of Attacks"; tr.appendChild(td2);
	const td3 = document.createElement("th"); td3.textContent = "No. of soldeir";tr.appendChild(td3);
	const td4 = document.createElement("th"); td4.textContent = "Crtitcal Level"; tr.appendChild(td4);
	const td5 = document.createElement("th"); td5.textContent = "Security Level";tr.appendChild(td5);

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


function populateTable2(json){
	const tablebody = document.querySelector("#cq2t > tbody");
		
	while(tablebody.firstChild){
		tablebody.removeChild(tablebody.firstChild);
	}

	const tr = document.createElement("tr");
	const td1 = document.createElement("th"); td1.textContent = "soldeir ID"; tr.appendChild(td1);
	const td2 = document.createElement("th"); td2.textContent = "Name"; tr.appendChild(td2);
	const td3 = document.createElement("th"); td3.textContent = "Current posting";tr.appendChild(td3);
	const td4 = document.createElement("th"); td4.textContent = "Blood group"; tr.appendChild(td4);
	const td5 = document.createElement("th"); td5.textContent = "BMI";tr.appendChild(td5);

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

function populateTable(json){
	const tablebody = document.querySelector("#cq1t > tbody");
		
	while(tablebody.firstChild){
		tablebody.removeChild(tablebody.firstChild);
	}

	const tr = document.createElement("tr");
	const td1 = document.createElement("th"); td1.textContent = "Doctor ID"; tr.appendChild(td1);
	const td2 = document.createElement("th"); td2.textContent = "Name"; tr.appendChild(td2);
	const td3 = document.createElement("th"); td3.textContent = "Location";tr.appendChild(td3);

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
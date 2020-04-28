$("#button6").click(function(){
		window.location ="mapsOps.html";

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
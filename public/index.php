<?php

require '../vendor/autoload.php';
$app = new \Slim\App();


$container = $app->getContainer();


$container['view'] = function($container){
	$view = new \Slim\Views\Twig('views',[
		'cache' => false
	]);

	return $view;
};

function mylog($P ,$x){
			$myfile =fopen("$x", "w");
		fwrite($myfile, $P);
		fclose($myfile);
}

$app->get('/', function($request, $response, $args){
	$p = $request->getParams();



	$host = 'dbmsserver20.mysql.database.azure.com';
	$username = 'Rishabh@dbmsserver20';
	$password = 'DbMsGroup#2020#';
	$db_name = 'militaryDB';

	//Establishes the connection
	$conn = mysqli_init();
	mysqli_real_connect($conn, $host, $username, $password, $db_name, 3306);
	if (mysqli_connect_errno($conn)) {
		die('Failed to connect to MySQL: '.mysqli_connect_error());
	}



	if(isset($p['mod']) && isset($p['query']) ){
		if($p['query'] == 1){
			if($stmt = mysqli_prepare($conn,'select s.currentPosting, count(*) from
									Soldier s, Location l where l.criticalLevel >= 4 and l.name = s.currentPosting group by s.currentPosting;')){
				$locarray = array();
				mysqli_stmt_execute($stmt);
				mysqli_stmt_bind_result($stmt, $x, $y );
				$i = 0;
				
				while (mysqli_stmt_fetch($stmt)){
					
					$locarray[$i]["num"] =$y;
					$locarray[$i]["location"] = $x;

					$i= $i+1;
	        		
    			}
    			return $response->withJson(json_encode($locarray));
			}
		}

		else if($p['query'] == 2){
			if($stmt = mysqli_prepare($conn,'select s.hometownLocation, sum(s.salary) , 20*sum(i.expectedRation) , 5*sum(i.expectedAmmo) , 100*sum(i.expectedGuns) , sum(s.salary + i.expectedRation + i.expectedAmmo + i.expectedGuns) from soldier s, inventory i where s.hometownLocation = i.location group by s.hometownLocation order by sum(s.salary + i.expectedRation + i.expectedAmmo + i.expectedGuns) desc;'))
			{
				mysqli_stmt_execute($stmt);
				mysqli_stmt_bind_result($stmt, $x, $y ,$z, $a, $b, $c);
				$locarray = array();
				$i = 0;
				while (mysqli_stmt_fetch($stmt)) {
					$locarray[$i]["1"] = $x;
					$locarray[$i]["2"] = $y;
					$locarray[$i]["3"] = $z;
					$locarray[$i]["4"] = $a;
					$locarray[$i]["5"] = $b;
					$locarray[$i]["6"] = $c;
					$i= $i+1;
				}
		
				return $response->withJson(json_encode($locarray));
			}
		}

		else if($p['query'] == 3){

			if($stmt = mysqli_prepare($conn,'select s.name, s.department, s.currentPosting, s.successPercent, s.rank from Soldier s where s.rank = ? and s.SID not in (select p.SID from SpecialOpsAgents p) and s.SID not in (select i.SID from inventory i where i.expectedAmmo - i.actualAmmo > 50 or i.expectedRation - i.checkedRation > 100 or i.expectedGuns - checkedGuns > 50) and s.age >= 30 and s.noOfMissions > 5 and s.successPercent > 75 order by s.successPercent desc;'))
			{	
				$r =  $p['val'];
				$rank = str_replace("_"," ",$r);
				mysqli_stmt_bind_param($stmt, 's', $rank );
				mysqli_stmt_execute($stmt);
				mysqli_stmt_bind_result($stmt, $x, $y ,$z, $a, $b);
				$locarray = array();
				$i = 0;
				while (mysqli_stmt_fetch($stmt)) {
					$locarray[$i]["1"] = $x;
					$locarray[$i]["2"] = $y;
					$locarray[$i]["3"] = $z;
					$locarray[$i]["4"] = $a;
					$locarray[$i]["5"] = $b;
					$i= $i+1;
				}
				//var_dump($locarray);
				return $response->withJson(json_encode($locarray));
			}
		}

		else if($p['query'] == 4){
			$xcor = strval($p['x']);
			$ycor = strval($p['y']);
			$qu = 'select s.SID, s.name, s.rank from Soldier s, location l3 where s.noOfMissions > 2 and s.currentPosting = l3.name and s.department="Artillery" and l3.name in (select l2.name from location l2 where power(l2.latitude-'."$xcor".', 2) + power(l2.longitude-'."$ycor".', 2) in (select min(power(l.latitude-'."$xcor".', 2) + power(l.longitude - '."$ycor".', 2)) from Location l));';
			if($stmt = mysqli_prepare($conn,$qu))
			{	

				$art = "Artillery";
				//mysqli_stmt_bind_param($stmt, "dd" ,$xcor, $ycor );
				mysqli_stmt_execute($stmt);
				mysqli_stmt_bind_result($stmt, $x, $y ,$z);
				$locarray = array();
				$i = 0;
				while (mysqli_stmt_fetch($stmt)) {
					$locarray[$i]["1"] = $x;
					$locarray[$i]["2"] = $y;
					$locarray[$i]["3"] = $z;
					$i= $i+1;
				}

				return $response->withJson(json_encode($locarray));
			}
		}

		else if($p['query'] == 5){

			if($stmt = mysqli_prepare($conn,'select department, avg(successPercent) as efficiency 
				from soldier 
				group by department order by efficiency DESC;
				'))
			{	
				mysqli_stmt_execute($stmt);
				mysqli_stmt_bind_result($stmt, $x, $y );
				$locarray = array();
				$i = 0;
				while (mysqli_stmt_fetch($stmt)) {
					$locarray[$i]["1"] = $x;
					$locarray[$i]["2"] = $y;
					$i= $i+1;
				}
				return $response->withJson(json_encode($locarray));
			}
		}

		else if ($p['query'] == 6) {
					return  $this->view->render($response,"maps/index.html");
				}		
	}

	elseif (isset($p['high']) && $p['query']) {
		if($p['query'] == 1){
			if($stmt = mysqli_prepare($conn,'select s1.name, s1.rank, s1.department, s1.currentPosting, s1.hometownLocation
				from Soldier s1, Location l1, Location l2 where
				s1.currentPosting = l1.name and s1.hometownLocation = l2.name and
				(power(l1.latitude - l2.latitude, 2) + power(l1.longitude - l2.longitude, 2)) > 5000 and s1.numberOfDependents > 2;
				'))
			{	
				mysqli_stmt_execute($stmt);
				mysqli_stmt_bind_result($stmt, $x, $y ,$z, $a, $b);
				$locarray = array();
				$i = 0;
				while (mysqli_stmt_fetch($stmt)) {
					$locarray[$i]["1"] = $x;
					$locarray[$i]["2"] = $y;
					$locarray[$i]["3"] = $z;
					$locarray[$i]["4"] = $a;
					$locarray[$i]["5"] = $b;
					$i= $i+1;
				}
				return $response->withJson(json_encode($locarray));
			}
		}

		if($p['query'] == 3){
			if($stmt = mysqli_prepare($conn,'select s.currentPosting, s.department from soldier s
				where not exists
				(select s1.department from
				soldier s1, soldier s2, soldier s3 where
				s1.department = s2.department and s2.department = s3.department and
				s1.sid != s2.sid and s2.sid!=s3.sid and s1.sid != s3.sid and 
				s1.currentPosting = s2.currentPosting and s2.currentPosting = s3.currentPosting and  s3.currentPosting = s.currentPosting);
				'))
			{	
				mysqli_stmt_bind_result($stmt, $x, $y );
				$locarray = array();
				$i = 0;
				while (mysqli_stmt_fetch($stmt)) {
					$locarray[$i]["1"] = $x;
					$locarray[$i]["2"] = $y;
					$i= $i+1;
				}
				//var_dump($locarray);
				return $response->withJson(json_encode($locarray));
			}
		}
	}

	elseif (isset($p['ops']) && $p['query']) {
		if($p['query'] == 1){
			session_start();
			$_SESSION['place'] = $p['place'];
		}
	}

	else if(isset($p['map'])){
		if($p['map'] == 1){
			if($stmt = mysqli_prepare($conn,'select latitude, longitude, criticalLevel from location;
				'))
			{	
				mysqli_stmt_execute($stmt);
				mysqli_stmt_bind_result($stmt, $x, $y ,$z);
				$locarray = array();
				$i = 0;
				while (mysqli_stmt_fetch($stmt)) {
					$locarray[$i]["1"] = $x;
					$locarray[$i]["2"] = $y;
					$locarray[$i]["3"] = $z;
					$i= $i+1;
				}

				return $response->withJson(json_encode($locarray));
			}
		}
		else if($p['map'] == 2){
			if($stmt = mysqli_prepare($conn,'
				select l.latitude, l.longitude , (select count(*) from attacks a where a.location = l.name), 
				(select sum(civilianCasualties) from attacks where location = l.name),
				(select sum(serviceCasualties) from attacks where location = l.name)
				from location l;'))
			{	
				mysqli_stmt_execute($stmt);
				mysqli_stmt_bind_result($stmt, $x, $y ,$z, $a, $b);
				$locarray = array();
				$i = 0;
				if(is_null($a)){
					$a = 0;
				}
				if(is_null($b)){
					$b = 0;
				}
				while (mysqli_stmt_fetch($stmt)) {
					$locarray[$i]["1"] = $x;
					$locarray[$i]["2"] = $y;
					$locarray[$i]["3"] = $z;
					$locarray[$i]["4"] = $a;
					$locarray[$i]["5"] = $b;
					$i= $i+1;
				}
				//var_dump($locarray);
				return $response->withJson(json_encode($locarray));
			}
		}

		else if($p['map'] == 3){
			if($stmt = mysqli_prepare($conn,'
				select l.latitude, l.longitude , (select count(*) from inventory a where a.location = l.name),
				(select sum(a.checkedGuns) from inventory a where a.location = l.name),
				(select sum(a.checkedRation) from inventory a where a.location = l.name),
				(select sum(a.actualAmmo) from inventory a where a.location = l.name)
				from location l;'))
			{	
				mysqli_stmt_execute($stmt);
				mysqli_stmt_bind_result($stmt, $x, $y ,$z, $a, $b, $c);
				$locarray = array();
				$i = 0;
				if(is_null($a)){
					$a = 0;
				}
				if(is_null($b)){
					$b = 0;
				}
				while (mysqli_stmt_fetch($stmt)) {
					$locarray[$i]["1"] = $x;
					$locarray[$i]["2"] = $y;
					$locarray[$i]["3"] = $z;
					$locarray[$i]["4"] = $a;
					$locarray[$i]["5"] = $b;
					$locarray[$i]["6"] = $c;
					$i= $i+1;
				}
				//var_dump($locarray);
				return $response->withJson(json_encode($locarray));
			}

		}

		else if($p['map'] == 4){
			if($stmt = mysqli_prepare($conn,'
				select l.latitude, l.longitude, l.securitylevel, 
				(select count(*) from soldier where currentPosting = l.name),
				(select count(*) from specialOpsAgents where currentLocation = l.name) 
				from location l;
				'))
			{	
				mysqli_stmt_execute($stmt);
				mysqli_stmt_bind_result($stmt, $x, $y ,$z, $a, $b);
				$locarray = array();
				$i = 0;
				if(is_null($a)){
					$a = 0;
				}
				if(is_null($b)){
					$b = 0;
				}
				while (mysqli_stmt_fetch($stmt)) {
					$locarray[$i]["1"] = $x;
					$locarray[$i]["2"] = $y;
					$locarray[$i]["3"] = $z;
					$locarray[$i]["4"] = $a;
					$locarray[$i]["5"] = $b;
					$i= $i+1;
				}
				//var_dump($locarray);
				return $response->withJson(json_encode($locarray));
			}
		}

		else if($p['map'] == 5){
			if($stmt = mysqli_prepare($conn,' select l1.latitude, l1.longitude, l2.latitude, l2.longitude, 
			(select count(*) from communication where toLocation = l1.name and fromLocation = l2.name)
			from location l1, location l2 where l1.name = ?;'))
			{	session_start();
				$id = $_SESSION['place'];
				mysqli_stmt_bind_param($stmt, 's', $id );
				mysqli_stmt_execute($stmt);
				mysqli_stmt_bind_result($stmt, $x, $y ,$z, $a, $b);
				$locarray = array();
				$i = 0;
				if(is_null($a)){
					$a = 0;
				}
				if(is_null($b)){
					$b = 0;
				}
				while (mysqli_stmt_fetch($stmt)) {
					$locarray[$i]["1"] = $x;
					$locarray[$i]["2"] = $y;
					$locarray[$i]["3"] = $z;
					$locarray[$i]["4"] = $a;
					$locarray[$i]["5"] = $b;
					$i= $i+1;
					//echo $b;
				}
				//var_dump($locarray);
				return $response->withJson(json_encode($locarray));
			}
		}
	}
	else if(isset($p['email'])){

		if ($stmt = mysqli_prepare($conn, 'SELECT * FROM Log WHERE Id = ?')) {
			$id = $p['email'];

			mysqli_stmt_bind_param($stmt, 'i', $id );
			mysqli_stmt_execute($stmt);
			mysqli_stmt_bind_result($stmt, $name, $pas, $prior);
			$temp1 = -1;
			while (mysqli_stmt_fetch($stmt)){
				$temp1 = $prior;
        		printf ("%s (%s) - (%s) \n", $name, $pas, $prior);
    		}
    		//var_dump($temp1);
    		if($temp1 == 1){
    			return $this->view->render($response,"mod/index.html");
    		}
    		else if($temp1 == 2){
    			return $this->view->render($response,"highRanking/index.html"); 
    		}
    		else if($temp1 == 3){
    			return $this->view->render($response,"emp/index.html"); 

    		}
    		else if($temp1 == 4){
    			return $this->view->render($response,"casualty/index.html");
    		}
    		else if($temp1 == 5){
    			return $this->view->render($response,"inventory/index.html");
    		}
    		else if($temp1 == 6){
    			return $this->view->render($response,"ops/index.html");
    		}

			//Close the connection
			mysqli_stmt_close($stmt);
		}
		return;

	}

	// $host = 'dbmsserver20.mysql.database.azure.com';
	// $username = 'Rishabh@dbmsserver20';
	// $password = 'DbMsGroup#2020#';
	// $db_name = 'militaryDB';

	// //Establishes the connection
	// $conn = mysqli_init();
	// mysqli_real_connect($conn, $host, $username, $password, $db_name, 3306);
	// if (mysqli_connect_errno($conn)) {
	// 	die('Failed to connect to MySQL: '.mysqli_connect_error());
	// }

	// $res = mysqli_query($conn, 'SELECT * FROM Log');
	// while ($row = mysqli_fetch_assoc($res)) {
	// 	var_dump($row);
	// }
	// mysqli_close($conn);
	
	//return ;
	else{
		return $this->view->render($response,"index.html");
	}

	});

$app->run();

?>
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

$app->get('/', function($request, $response, $args){
	$p = $request->getParams();

	if(isset($p['email'])){

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
    		var_dump($temp1);
    		if($temp1 == 1){
    			return $this->view->render($response,"mod/index.html");;
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
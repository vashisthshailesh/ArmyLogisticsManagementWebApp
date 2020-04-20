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
	//echo "rr";

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
		return $this->view->render($response,"index.html");

	});

$app->run();

?>
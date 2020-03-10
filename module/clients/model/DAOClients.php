<?php
	// include("model/connectp.php");
	$path = $_SERVER['DOCUMENT_ROOT'] . '/MARC PROJECT/';
    include($path . "model/connectp.php");
    
	class DAOProducts{

		function select_all_product(){
			$sql = "SELECT codprod, product, ingredients, flavour, brand, kg, datecaducity, descr, price FROM products";

			$conexion = connect::con();

			$qu = $conexion->prepare($sql);
			$qu->execute();
			$res = $qu->fetchAll();
			
			connect::close($conexion);

            return $res;
		}

	}
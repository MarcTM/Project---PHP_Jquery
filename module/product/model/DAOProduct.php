<?php
	// include("model/connectp.php");
	$path = $_SERVER['DOCUMENT_ROOT'] . '/MARC PROJECT/';
    include($path . "model/connectp.php");
	
	

	class DAOProduct{
		function insert_product($datos){
			$codprod=$datos[codprod];
			$product=$datos[product];
        	$flavour=$datos[flavour];
        	$brand=$datos[brand];
        	$kg=$datos[kg];
			$datecaducity=$datos[datecaducity];
			$descr=$datos[descr];
			$price=$datos[price];
			$img=$datos[img];
        	foreach ($datos[ingredients] as $indice) {
        	    $ingredients=$ingredients."$indice:";
        	}

			$sql = "INSERT INTO products(codprod, product, ingredients, flavour, brand, kg, datecaducity, descr, price, img, views, cod_shop) VALUES ('$codprod', '$product', '$ingredients', '$flavour', '$brand', '$kg', '$datecaducity', '$descr', '$price', '$img', 0, 0)";
            
			$conexion = connect::con();
			
			$res = $conexion->query($sql);
			
			connect::close($conexion);
			return $res;
		}
		

		function select_all_product(){
			$sql = "SELECT * FROM products ORDER BY idproduct ASC";

			$conexion = connect::con();

			$qu = $conexion->prepare($sql);
			$qu->execute();
			$res = $qu->fetchAll();
			
			connect::close($conexion);

            return $res;
		}

		// function select_all_product(){
		// 	$sql = "SELECT * FROM products ORDER BY idproduct ASC";
			
		// 	$conexion = connect::con2();
			
		// 	$res = mysqli_query($conexion, $sql);

        //  connect::close2($conexion);
        //  return $res;
		// }
		
		function select_product($product){
			$sql = "SELECT * FROM products WHERE idproduct='$product'";
			
			$conexion = connect::con();

			$qu = $conexion->prepare($sql);
			$qu->execute();
			$res = $qu->fetchObject();

            connect::close($conexion);
            return $res;
		}


		function select_product_codprod($product){
			$sql = "SELECT * FROM products WHERE codprod='$product'";
			
			$conexion = connect::con();

			$qu = $conexion->query($sql);
			$qu->execute();
			$res = $qu->fetchObject();

            connect::close($conexion);
            return $res;
		}

		
		function update_product($datos){
			$idproduct=$datos[idproduct];
			$codprod=$datos[codprod];
			$product=$datos[product];
			foreach ($datos[ingredients] as $indice) {
        	    $ingredients=$ingredients."$indice:";
			}
        	$flavour=$datos[flavour];
        	$brand=$datos[brand];
        	$kg=$datos[kg];
			$datecad=$datos[datecaducity];
			$descr=$datos[descr];
			$price=$datos[price];
			$img=$datos[img];

        	
        	$sql = " UPDATE products SET idproduct='$idproduct', codprod='$codprod', product='$product', ingredients='$ingredients', flavour='$flavour', brand='$brand', kg='$kg', datecaducity='$datecad', descr='$descr', price='$price', img='$img' WHERE idproduct='$idproduct'";
            
            $conexion = connect::con();
			$res = $conexion->query($sql);
			
            connect::close($conexion);
			return $res;
		}


		function delete_product($product){
			$sql = "DELETE FROM products WHERE idproduct='$product'";
			
			$conexion = connect::con();
			$res = $conexion->query($sql);
			// $res = $qu->execute();
            connect::close($conexion);
            return $res;
		}


		function delete_all(){
			$sql = "DELETE FROM products";
			
			$conexion = connect::con();
			$res = $conexion->query($sql);
			$res->execute();

            connect::close($conexion);
            return $res;
		}

	}
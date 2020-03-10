<?php
	// include("model/connectp.php");
	$path = $_SERVER['DOCUMENT_ROOT'] . '/MARC PROJECT/';
    include($path . "model/connectp.php");
	
	

	class DAOCarousel{

		function select_carousel(){
            $sql = "SELECT * FROM carousel";
			
			$conexion = connect::con();

			$qu = $conexion->prepare($sql);
			$qu->execute();
			$res = $qu->fetchAll();
			
			connect::close($conexion);

            return $res;
		}


		function select_category($offset){
            $sql = "SELECT * FROM category ORDER BY views DESC LIMIT 4 OFFSET $offset";
            
			$conexion = connect::con();

			$qu = $conexion->prepare($sql);
			$qu->execute();
			$res = $qu->fetchAll();
			
			connect::close($conexion);

            return $res;
		}

		function update_views_cat($cat){
			$sql = "UPDATE category SET views = views + 1 WHERE id='$cat'";
			
			$conexion = connect::con();

			$qu = $conexion->prepare($sql);
			$qu->execute();
            connect::close($conexion);
		}

		function count_cat(){
			$sql = "SELECT COUNT(*) cuenta FROM category";
			
			$conexion = connect::con();
			
			$qu = $conexion->prepare($sql);
			$qu->execute();
			$res = $qu->fetchObject();

			connect::close($conexion);

			return $res;
		}


		function count_prods(){
			$sql = "SELECT COUNT(*) cuenta FROM products";
			
			$conexion = connect::con();
			
			$qu = $conexion->prepare($sql);
			$qu->execute();
			$res = $qu->fetchObject();

			connect::close($conexion);

			return $res;
		}


		function select_views($offset){
            $sql = "SELECT * FROM products ORDER BY views DESC LIMIT 4 OFFSET $offset";
            
			$conexion = connect::con();

			$qu = $conexion->prepare($sql);
			$qu->execute();
			$res = $qu->fetchAll();
			
			connect::close($conexion);

            return $res;
		}


		function update_views($product){
			$sql = "UPDATE products SET views = views + 1 WHERE idproduct='$product'";
			
			$conexion = connect::con();

			$qu = $conexion->prepare($sql);
			$qu->execute();
            connect::close($conexion);
		}


		function select_product($product){
			$sql = "SELECT * FROM products WHERE idproduct='$product'";
			
			$conexion = connect::con();

			$qu = $conexion->prepare($sql);
			$qu->execute();
			$res = $qu->fetchObject();
            connect::close($conexion);
            return $res;
		}

	}
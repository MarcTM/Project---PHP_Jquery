<?php
	// include("model/connectp.php");
	$path = $_SERVER['DOCUMENT_ROOT'] . '/MARC PROJECT/';
    include($path . "model/connectp.php");
	
	

	class DAOShop{

		function select_all_product($offset){
			$sql = "SELECT * FROM products ORDER BY views DESC LIMIT 4 OFFSET $offset";
			
			$conexion = connect::con();

			$qu = $conexion->prepare($sql);
			$qu->execute();
			$res = $qu->fetchAll();
			
			connect::close($conexion);

            return $res;
		}

		
		function select_cat($cat, $offset){
			$sql = "SELECT * FROM products WHERE product='$cat' ORDER BY views DESC LIMIT 4 OFFSET $offset";
			
			$conexion = connect::con();

			$qu = $conexion->prepare($sql);
			$qu->execute();
			$res = $qu->fetchAll();
			
			connect::close($conexion);

            return $res;
		}


		function select_car($car, $offset){
			if($car==='bcaas'){
				$sql = "SELECT * FROM products WHERE product='Bcaa' ORDER BY views DESC LIMIT 4 OFFSET $offset";

			}else if($car==='packs'){
				$sql = "SELECT * FROM products WHERE product='Vitamin' ORDER BY views DESC LIMIT 4 OFFSET $offset";

			}else if($car==='liquidacion'){
				$sql = "SELECT * FROM products WHERE product='Mass_gainer' ORDER BY views DESC LIMIT 4 OFFSET $offset";

			}else if($car==='dto'){
				$sql = "SELECT * FROM products WHERE product='Creatine' ORDER BY views DESC LIMIT 4 OFFSET $offset";

			}

			$conexion = connect::con();

			$qu = $conexion->prepare($sql);
			$qu->execute();
			$res = $qu->fetchAll();
			
			connect::close($conexion);

            return $res;
		}



		function select_search($province, $shop, $product, $offset){
			$sql = "SELECT p.* FROM products p, shops s WHERE p.cod_shop = s.cod_shop AND s.city = '$province' AND s.name = '$shop' AND p.product = '$product' LIMIT 4 OFFSET $offset";
			
			$conexion = connect::con();

			$qu = $conexion->prepare($sql);
			$qu->execute();
			$res = $qu->fetchAll();
			
			connect::close($conexion);

            return $res;
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


		function update_views($product){
			$sql = "UPDATE products SET views = views + 1 WHERE idproduct='$product'";
			
			$conexion = connect::con();

			$qu = $conexion->prepare($sql);
			$qu->execute();
            connect::close($conexion);
		}


		function filter($checks, $count){
			if ($count === '0'){
				$sql = "SELECT * FROM products";
			
				$conexion = connect::con2();
				
				$res = mysqli_query($conexion, $sql);
				connect::close2($conexion);
				return $res;
			}else{
				$sql = "SELECT * FROM products WHERE 0 $checks";
			
				$conexion = connect::con2();
				
				$res = mysqli_query($conexion, $sql);
				connect::close2($conexion);
				return $res;
			}
		}
		
		
		function get_maps() {
			$sql = "SELECT * FROM shops";
						
			$conexion = connect::con();

			$qu = $conexion->prepare($sql);
			$qu->execute();
			$res = $qu->fetchAll();
			
			connect::close($conexion);

            return $res;
		}
        
	}
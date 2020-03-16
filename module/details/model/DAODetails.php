<?php
	$path = $_SERVER['DOCUMENT_ROOT'] . '/MARC PROJECT/';
    include($path . "model/connectp.php");
	
	

	class DAODetails{

///////////////////////
////READ PRODUCT
//////////////////////
		function select_product($product){
			$sql = "SELECT * FROM products WHERE idproduct='$product'";
			
			$conexion = connect::con();

			$qu = $conexion->prepare($sql);
			$qu->execute();
			$res = $qu->fetchObject();

            connect::close($conexion);
            return $res;
		}


///////////////////////
////UPDATE VIEWS
//////////////////////
		function update_views($product){
			$sql = "UPDATE products SET views = views + 1 WHERE idproduct='$product'";
			
			$conexion = connect::con();

			$qu = $conexion->prepare($sql);
			$qu->execute();
            connect::close($conexion);
		}
		
		
///////////////////////
////MAPS (SHOP)
//////////////////////
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
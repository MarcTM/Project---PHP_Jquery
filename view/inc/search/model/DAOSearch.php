<?php
	// include("model/connectp.php");
	$path = $_SERVER['DOCUMENT_ROOT'] . '/MARC PROJECT/';
    include($path . "model/connectp.php");



    class DAOSearch{

         function readProvince(){
            $sql = "SELECT DISTINCT city FROM shops ORDER BY city ASC";
            $conexion = connect::con2();
            $res = mysqli_query($conexion, $sql);
            connect::close2($conexion);
            return $res;
         }


         function readShops($province){
            $sql = "SELECT name FROM shops WHERE city='$province'";
            $conexion = connect::con2();
            $res = mysqli_query($conexion, $sql);
            connect::close2($conexion);
            return $res;
         }


         function autocomplete(){
            $val = $_POST['auto'];
            $shop = $_POST['shop'];
            $sql = "SELECT DISTINCT p.* FROM products p, shops s WHERE p.cod_shop = s.cod_shop AND s.name = '$shop' AND p.product LIKE '".$val. "%'";
            $conexion = connect::con2();
            $res = mysqli_query($conexion, $sql);
            connect::close2($conexion);
            return $res;
         }

    }

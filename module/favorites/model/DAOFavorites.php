<?php
	// include("model/connectp.php");
	$path = $_SERVER['DOCUMENT_ROOT'] . '/MARC PROJECT/';
    include($path . "model/connectp.php");
	
	

	class DAOFavorites{

		function add_fav($id){
            $email = $_SESSION['email'];

            $sql = "INSERT INTO favorites VALUES ('$email','$id')";
            
            $conexion = connect::con();

			$qu = $conexion->prepare($sql);
			$qu->execute();
			
			connect::close($conexion);
        }
        

        function del_fav($id){
            $email = $_SESSION['email'];

            $sql = "DELETE FROM favorites WHERE email = '$email' AND prod = '$id'";
            
            $conexion = connect::con();

			$qu = $conexion->prepare($sql);
			$qu->execute();
			
			connect::close($conexion);
		}



        function check_fav(){
            $email = $_SESSION['email'];

            $sql = "SELECT DISTINCT prod FROM favorites WHERE email = '$email'";
            
            $conexion = connect::con();

			$qu = $conexion->prepare($sql);
			$qu->execute();
			$res = $qu->fetchAll();
			
			connect::close($conexion);

			return $res;
		}

    }
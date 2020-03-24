<?php
	// include("model/connectp.php");
	$path = $_SERVER['DOCUMENT_ROOT'] . '/MARC PROJECT/';
    include($path . "model/connectp.php");
	
	

	class DAOLogin{

		function select_email_r($email){
			$sql = "SELECT * FROM users WHERE email='$email'";
			
			$conexion = connect::con();

			$qu = $conexion->query($sql);
			$qu->execute();
			$res = $qu->fetchObject();

            connect::close($conexion);
            return $res;
		}


		function select_user_r($user){
			$sql = "SELECT * FROM users WHERE user='$user'";
			
			$conexion = connect::con();

			$qu = $conexion->query($sql);
			$qu->execute();
			$res = $qu->fetchObject();

            connect::close($conexion);
			return $res;
		}



		function select_email_l($email){
			$sql = "SELECT * FROM users WHERE email='$email'";
			
			$conexion = connect::con();

			$qu = $conexion->query($sql);
			$qu->execute();
			$res = $qu->fetchObject();

            connect::close($conexion);
            return $res;
		}


		function select_pass_l($email, $pass){
			$sql = "SELECT pass FROM users WHERE email='$email' AND pass='$pass'";
			
			$conexion = connect::con();

			$qu = $conexion->query($sql);
			$qu->execute();
			$res = $qu->fetchObject();

            connect::close($conexion);
            return $res;
		}



		function select_user($email){
			$sql = "SELECT * FROM users WHERE email='$email'";
			
			$conexion = connect::con();

			$qu = $conexion->query($sql);
			$qu->execute();
			$res = $qu->fetchObject();
			
            connect::close($conexion);
			return $res;
		}



		function insert_user($user, $email, $pass){
			$passhash = password_hash($pass, PASSWORD_DEFAULT);

			$sql = "INSERT INTO users (user, email, pass) VALUES ('$user','$email','$passhash')";
            
			$conexion = connect::con();
			
			$res = $conexion->query($sql);
			
			connect::close($conexion);
			return $res;
		}

	}
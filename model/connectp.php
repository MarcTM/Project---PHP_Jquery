<?php
	class connect{

		// PDO
		public static function con(){
			$host = 'localhost';  
    		$user = "root";                     
    		$pass = "root";                             
    		$db = "project";                      
    		
			try {
				$conexion = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
				// set the PDO error mode to exception
				$conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
				}
			catch(PDOException $e)
				{
				echo "Connection failed: " . $e->getMessage();
				}

			return $conexion;
		}

		public static function close($conexion){
			$conexion = null;
		}


		// MYSQLI
		public static function con2(){
			$host = 'localhost';  
    		$user = "root";                     
    		$pass = "root";                             
    		$db = "project";                      
    		
			$conexion = mysqli_connect($host, $user, $pass, $db)or die(mysql_error());

			return $conexion;
		}

		public static function close2($conexion){
			mysqli_close($conexion);
		}
	
	}
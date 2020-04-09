<?php
    $path = $_SERVER['DOCUMENT_ROOT'] . '/MARC PROJECT/';
    include($path . "module/login/model/DAOLogin.php");
    session_start();
    
    
    switch($_GET['op']){

        //CHECK SESSION
        case 'check_session';
            if ($_SESSION['user']){
                echo "yes";
                exit();
            }else{
                echo "no";
                exit();
            }
            break;



        // LIST LOGIN
        case 'list_login';
            include("module/login/model/validate_login.php");

            if ($_POST){
                $check = validate_login();
 
                if($check['check']){
                    try {
                        $daologin = new DAOLogin();
                        $sel = $daologin->select_user($_POST['email']);
                    } catch (Exception $e) {
                        echo "Error at logging in";
                        exit();
                    }
                    if(!$sel){
                        echo "Error at logging in";
                        exit();
                    }else{
                        $info = get_object_vars($sel);

                        $_SESSION['type']=$info['type'];
                        $_SESSION['user']=$info['user'];
                        $_SESSION['email']=$info['email'];
                        $_SESSION['avatar']=$info['avatar'];
                        $_SESSION["time"] = time(); //Returns actual time

                        if($_GET['purch'] || $_GET['needlogin']){
                            $callback = 'index.php?page=controller_cart&op=list';

                        }else{
                            $callback = 'index.php?page=controller_homepage&op=list';

                        }
                        die('<script>window.location.href="'.$callback .'";</script>');
                    }	
                }
            }
            include("module/login/view/login.php");
            break;



        case 'list_login_purch';
            include("module/login/model/validate_login.php");

            if ($_POST){
                $check = validate_login();
 
                if($check['check']){
                    try {
                        $daologin = new DAOLogin();
                        $sel = $daologin->select_user($_POST['email']);
                    } catch (Exception $e) {
                        echo "Error at logging in";
                        exit();
                    }
                    if(!$sel){
                        echo "Error at logging in";
                        exit();
                    }else{
                        $info = get_object_vars($sel);

                        $_SESSION['type']=$info['type'];
                        $_SESSION['user']=$info['user'];
                        $_SESSION['email']=$info['email'];
                        $_SESSION['avatar']=$info['avatar'];
                        $_SESSION["time"] = time(); //Returns actual time

                        $callback = 'index.php?page=controller_homepage&op=list';
                        die('<script>window.location.href="'.$callback .'";</script>');
                    }	
                }
            }
            include("module/login/view/login.php");
            break;



        // LIST REGISTER
        case 'list_register';
            include("module/login/model/validate_register.php");

            if($_POST){
                $valide = validate_register();

                if($valide['check']){
                    try {
                        $daologin = new DAOLogin();
                        $rlt = $daologin->insert_user($_POST['user'], $_POST['email'], $_POST['pass']);
                        $sel = $daologin->select_user($_POST['email']);
                    } catch (Exception $e) {
                        echo "Error al registrarse";
                        exit();
                    }
                    if(!$rlt){
                        echo "Error al registrarse";
                        exit();
                    }else{
                        $info = get_object_vars($sel);

                        $_SESSION['type']=$info['type'];
                        $_SESSION['user']=$info['user'];
                        $_SESSION['email']=$info['email'];
                        $_SESSION['avatar']=$info['avatar'];
                        $_SESSION["time"] = time();

                        $callback = 'index.php?page=controller_homepage&op=list';
                        die('<script>window.location.href="'.$callback .'";</script>');
                    }	
                }
            }
            include("module/login/view/register.php");
            break;



        // LOGOUT
        case 'logout';
            session_destroy();
            session_unset();
            $callback = 'index.php?page=controller_homepage&op=list';
            die('<script>window.location.href="'.$callback .'";</script>');
            break;



        //REGENERATE TIME
        case 'regenerate_time';
            if($_SESSION['user']){
                $_SESSION['time'] = time();
            }
            break;


        
        //ACTIVITY
        case 'activity';
            if (isset($_SESSION["time"])) {
                if((time() - $_SESSION["time"]) >= 300) { //5 minutes inactive
                    echo "inactive"; 
                    exit();
                }else{
                    echo "active";
                    session_regenerate_id(); //Reloads/Regenerates session id every 30 seconds
                    exit();
                }
            }else{
                echo "active"; 
            }
            break;



        //CLICKS AND MOUSE MOVEMENT
        case 'checksession';
            if (isset($_SESSION['user'])) {
                echo "s";
                exit();
            }else{
                echo "n";
                exit();
            }
            break;
    }
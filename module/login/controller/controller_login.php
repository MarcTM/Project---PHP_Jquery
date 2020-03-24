<?php
    $path = $_SERVER['DOCUMENT_ROOT'] . '/MARC PROJECT/';
    include($path . "module/login/model/DAOLogin.php");
    session_start();
    
    
    switch($_GET['op']){

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

                        $_SESSION = ['type'=>$info['type'], 'user'=>$info['user'], 'email'=>$info['email'], 'avatar'=>$info['avatar']];
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
            $callback = 'index.php?page=controller_homepage&op=list';
            die('<script>window.location.href="'.$callback .'";</script>');
            break;
    }
<?php
    $path = $_SERVER['DOCUMENT_ROOT'] . '/MARC PROJECT/';
    include($path . "module/cart/model/DAOCart.php");
    session_start();
    
    
    switch($_GET['op']){

    case 'list':
        include("module/cart/view/cart.html");
        break;   




    case 'localdb':
        try{
            $daocart = new DAOCart();
            $rdo = $daocart->check_prod($_GET['id']);
        }catch (Exception $e){
            echo json_encode("error");
            exit;
        }

        if(!$rdo){
            $add = $daocart->add_prod($_GET['id']);
            echo json_encode("not exists");
            exit;
        }else{
            $final = get_object_vars($rdo);
            echo json_encode($final);
            exit;
        }
        break;




    case 'logincart':
        if($_SESSION['type']){
            echo "true";
            exit;
        }else{
            echo "false";
            exit;
        }
        break; 



    case 'addproduct':
        try{
            $daocart = new DAOCart();
            $rdo = $daocart->check_prod($_GET['id']);
        }catch (Exception $e){
            $add = $daocart->add_prod($_GET['id']);
            echo json_encode("not exists");
            exit;
        }

        if(!$rdo){
            $add = $daocart->add_prod($_GET['id']);
            echo json_encode("not exists");
            exit;
        }else{
            $final = get_object_vars($rdo);
            echo json_encode($final);
            exit;
        }
        break;

    

    case 'showcart':
        try{
            $daocart = new DAOCart();
            $rdo = $daocart->show_prod();
        }catch (Exception $e){
            echo json_encode("error");
            exit;
        }

        if(!$rdo){
            echo json_encode("error");
            exit;
        }else{
            $final = array();
            foreach ($rdo as $row) {
                array_push($final, $row);
            }
            echo json_encode($final);
            exit;
        }
        break;



    case 'showlocalcart':
            try{
                $daocart = new DAOCart();
                $rdo = $daocart->show_localprod($_GET['id']);
            }catch (Exception $e){
                echo json_encode("error");
                exit;
            }
    
            if(!$rdo){
                echo json_encode("error");
                exit;
            }else{
                $final = get_object_vars($rdo);
                echo json_encode($final);
                exit;
            }
            break;




    case 'delete':
        try{
            $daocart = new DAOCart();
            $rdo = $daocart->delete($_GET['id']);
        }catch (Exception $e){
            echo json_encode("error");
            exit;
        }
        berak;





    case 'changequ':
        try{
            $daocart = new DAOCart();
            $rdo = $daocart->changequ($_GET['num'], $_GET['id']);
        }catch (Exception $e){
            echo json_encode("error");
            exit;
        }
        break;


    case 'checkout':
        try{
            $daocart = new DAOCart();
            $rdo = $daocart->checkout();
        }catch (Exception $e){
            echo json_encode("error");
            exit;
        }

        die('<script>window.location.href="index.php?page=controller_homepage&op=list";</script>');

        break;

    }
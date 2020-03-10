<?php
    $path = $_SERVER['DOCUMENT_ROOT'] . '/MARC PROJECT/';
    include($path . "module/inicio/model/DAOCarousel.php");
    session_start();
    
    
    switch($_GET['op']){
        case 'list';
            include("module/inicio/view/inicio.html");
        break;


        case 'carousel';
            try{
                $daocar = new DAOCarousel();
                $rdo = $daocar->select_carousel();
            }catch (Exception $e){
                echo json_encode("error");
                exit;
            }

            if(!$rdo){
                echo json_encode("error");
                exit;
            }else{
                $images = array();
                foreach ($rdo as $row) {
                    array_push($images, $row);
                }
                echo json_encode($images);
                exit;
            }
        break;


        case 'category';
            try{
                $daocar = new DAOCarousel();
                $rdo = $daocar->select_category($_GET['offset']);
            }catch (Exception $e){
                echo json_encode("error");
                exit;
            }

            if(!$rdo){
                echo json_encode("error");
                exit;
            }else{
                $images = array();
                foreach ($rdo as $row) {
                    array_push($images, $row);
                }
                echo json_encode($images);
                exit;
            }
        break;


        case 'count_cat';
            try{
                $daocar = new DAOCarousel();
                $rdo = $daocar->count_cat();
            }catch (Exception $e){
                echo json_encode("error");
                exit;
            }

            if(!$rdo){
                echo json_encode("error");
                exit;
            }else{
                echo json_encode($rdo);
                exit;
            }
        break;



        case 'cat_views';
            try{
                $daocar = new DAOCarousel();
                $rdo = $daocar->update_views_cat($_GET['cat']);
            }catch (Exception $e){
                echo json_encode("error");
                exit;
            }

            if(!$rdo){
                echo json_encode("error");
                exit;
            }
            
        break;


        case 'views';
            try{
                $daocar = new DAOCarousel();
                $rdo = $daocar->select_views($_GET['offset']);
            }catch (Exception $e){
                echo json_encode("error");
                exit;
            }

            if(!$rdo){
                echo json_encode("error");
                exit;
            }else{
                $images = array();
                foreach ($rdo as $row) {
                    array_push($images, $row);
                }
                echo json_encode($images);
                exit;
            }
        break;


        case 'count_prods';
            try{
                $daocar = new DAOCarousel();
                $rdo = $daocar->count_prods();
            }catch (Exception $e){
                echo json_encode("error");
                exit;
            }

            if(!$rdo){
                echo json_encode("error");
                exit;
            }else{
                echo json_encode($rdo);
                exit;
            }
        break;


        case 'read_modal':
            try{
                $daomodal = new DAOCarousel();
                $vi = $daomodal->update_views($_GET['modal']);
                $rdo = $daomodal->select_product($_GET['modal']);
            }catch (Exception $e){
                echo json_encode("error");
                exit;
            }


            if(!$rdo){
                echo json_encode("error");
                exit;
            }else{
                $product=get_object_vars($rdo);
                echo json_encode($product);
                exit;
            }
        break;

    }
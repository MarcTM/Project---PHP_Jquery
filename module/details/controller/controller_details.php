<?php
    $path = $_SERVER['DOCUMENT_ROOT'] . '/MARC PROJECT/';
    include($path . "module/details/model/DAODetails.php");
    session_start();
    
///////////////////////
////LIST
//////////////////////
    switch($_GET['op']){

        case 'list';
            include("module/details/view/details.html");
        break;


///////////////////////
////READ PRODUCT AND UPDATE VIEWS
//////////////////////
        case 'show_details':
            try{
                $daomodal = new DAODetails();
                $vi = $daomodal->update_views($_GET['id']);
                $rdo = $daomodal->select_product($_GET['id']);
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
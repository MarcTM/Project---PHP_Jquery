<?php
    $path = $_SERVER['DOCUMENT_ROOT'] . '/MARC PROJECT/';
    include($path . "module/shop/model/DAOShop.php");
    session_start();
    
    
    switch($_GET['op']){
        
///////////////////////
////LIST
//////////////////////
        case 'list';
            include("module/shop/view/shop.html");
        break;


///////////////////////
////NORMAL SHOP
//////////////////////
        case 'normalshop';
            try{
                $daoshop = new DAOShop();
                $rdo = $daoshop -> select_all_product($_GET['offset']);
            }catch (Exception $e){
                echo json_encode("error");
            }
            
            if(!$rdo){
                echo json_encode("error");
            }else{
                $datainfo = array();
                foreach ($rdo as $row) {
                    array_push($datainfo, $row);
                }
                echo json_encode($datainfo);
            }
            break;

        case 'countnormal';
            try{
                $daoshop = new DAOShop();
                $rdo = $daoshop -> countnormal();
            }catch (Exception $e){
                echo json_encode("error");
            }
            
            if(!$rdo){
                echo json_encode("error");
            }else{
                $datainfo = get_object_vars($rdo);
                echo json_encode($datainfo);
            }
        break;


///////////////////////
////SHOP CAROUSEL
//////////////////////
        case 'fromcarousel';
        try{
            $daoshop = new DAOShop();
            $rdo = $daoshop -> select_car($_GET['name'], $_GET['offset']);
        }catch (Exception $e){
            echo json_encode("error");
        }
        
        if(!$rdo){
            echo json_encode("error");
        }else{
            $datainfo = array();
            foreach ($rdo as $row) {
                array_push($datainfo, $row);
            }
            echo json_encode($datainfo);
        }
    break;

    case 'countcarousel';
            try{
                $daoshop = new DAOShop();
                $rdo = $daoshop -> countcarousel($_GET['name']);
            }catch (Exception $e){
                echo json_encode("error");
            }
            
            if(!$rdo){
                echo json_encode("error");
            }else{
                $datainfo = get_object_vars($rdo);
                echo json_encode($datainfo);
            }
        break;


///////////////////////
////SHOP CATEGORY
//////////////////////
        case 'fromcat';
            try{
                $daoshop = new DAOShop();
                $rdo = $daoshop -> select_cat($_GET['name'], $_GET['offset']);
            }catch (Exception $e){
                echo json_encode("error");
            }
            
            if(!$rdo){
                echo json_encode("error");
            }else{
                $datainfo = array();
                foreach ($rdo as $row) {
                    array_push($datainfo, $row);
                }
                echo json_encode($datainfo);
            }
        break;

        case 'countcat';
        try{
            $daoshop = new DAOShop();
            $rdo = $daoshop -> countcat($_GET['name']);
        }catch (Exception $e){
            echo json_encode("error");
        }
        
        if(!$rdo){
            echo json_encode("error");
        }else{
            $datainfo = get_object_vars($rdo);
            echo json_encode($datainfo);
        }
        break;


///////////////////////
////SHOP SEARCHBAR
//////////////////////
        case 'searchbar';
            try{
                $daoshop = new DAOShop();
                $rdo = $daoshop -> select_search($_GET['province'], $_GET['shop'], $_GET['prod'], $_GET['offset']);
            }catch (Exception $e){
                echo json_encode("error");
            }
            
            if(!$rdo){
                echo json_encode("error");
            }else{
                $datainfo = array();
                foreach ($rdo as $row) {
                    array_push($datainfo, $row);
                }
                echo json_encode($datainfo);
            }
        break;

        case 'countsearchbar';
        try{
            $daoshop = new DAOShop();
            $rdo = $daoshop -> countsearchbar($_GET['province'], $_GET['shop'], $_GET['prod']);
        }catch (Exception $e){
            echo json_encode("error");
        }
        
        if(!$rdo){
            echo json_encode("error");
        }else{
            $datainfo = get_object_vars($rdo);
            echo json_encode($datainfo);
        }
        break;


///////////////////////
////READ PRODUCT AND UPDATE VIEWS
//////////////////////
        case 'read_modal':
            try{
                $daomodal = new DAOShop();
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


///////////////////////
////FILTERS NORMAL SHOP
//////////////////////
        case 'filter':
            try{
                $daofilter = new DAOShop();
                $rdo = $daofilter->filter($_GET['checks'], $_GET['count']);
            }catch (Exception $e){
                echo json_encode("error");
                exit;

            }if(!$rdo){
                echo json_encode("error");
                exit;
            }else{
                $filter = array();
                foreach ($rdo as $row){
                    array_push($filter, $row);
                }
                echo json_encode($filter);
                exit;
            }
        break;


///////////////////////
////MAPS (SHOPS)
////////////////////// 
        case 'maps':
            try{
                $daoshops = new DAOShop();
                $rdo = $daoshops->get_maps();
            }catch (Exception $e){
                echo json_encode("error");
                exit;
                
            }if(!$rdo){
                echo json_encode("error");
                exit;
            }else{
                $filter = array();
                foreach ($rdo as $row){
                    array_push($filter, $row);
                }
                echo json_encode($filter);
                exit;
            }
        break;
        
    }
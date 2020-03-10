<?php
    $path = $_SERVER['DOCUMENT_ROOT'] . '/MARC PROJECT/';
    include($path . "view/inc/search/model/DAOSearch.php");
    session_start();
    
    
    switch($_GET['op']){
        case 'list';
            include("module/shop/view/shop.html");
        break;

        
        case 'prov':
            try{
                $DAOsearch = new DAOSearch();
                $rdo = $DAOsearch->readProvince();
            }catch (Exception $e){
                echo json_encode("error");
                exit;
            }
            if(!$rdo){
                echo json_encode("error");
                exit;
            }else{
                $favor = array();
                foreach ($rdo as $row) {
                    array_push($favor, $row);
                }
                echo json_encode($favor);
                exit;
            }
        break;


        case 'firstdrop':
            try{
                $daosearch = new DAOSearch();
                $rdo = $daosearch->readShops($_GET['prov']);
    
            }catch (Exception $e){
                echo json_encode("error");
                exit;
            }
            if(!$rdo){
                echo json_encode("error");
                exit;
            }else{
                $favor = array();
                foreach ($rdo as $row) {
                    array_push($favor, $row);
                }
                echo json_encode($favor);
                exit;
            }
        break;


        case 'autocomplete':
            try{
                $DAOsearch = new DAOSearch();
                $rdo = $DAOsearch->autocomplete();
            }catch (Exception $e){
                echo json_encode("error");
                exit;
            }
            if(!$rdo){
                echo json_encode("error");
                exit;
            }else{
                foreach ($rdo as $row) {
                        echo 
                        '<div class="autoelement">
                            <a  class="element" id="'.$row['product'].'">'.utf8_encode($row['product']).'</a>
                        </div>';
                }
                exit;
            }
        break;

    }
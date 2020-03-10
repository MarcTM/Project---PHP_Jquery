<?php
    $path = $_SERVER['DOCUMENT_ROOT'] . '/MARC PROJECT/';
    include($path . "module/clients/model/DAOClients.php");
    session_start();
    
    
    switch($_GET['op']){
    case 'list':
            include("module/clients/view/list_clients.html");
        break;

    case 'datatable';
            
            try{
                $daoproducts = new DAOProducts();
            	$rdo = $daoproducts->select_all_product();
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

    default;
        include("view/inc/error404.php");
    break;
            
    }
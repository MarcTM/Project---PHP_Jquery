<?php
    $path = $_SERVER['DOCUMENT_ROOT'] . '/MARC PROJECT/';
    include($path . "module/favorites/model/DAOFavorites.php");
    session_start();
    
    
    switch($_GET['op']){
        case 'checkuser';
            if($_SESSION['user']){
                echo "yes";
                exit();
            }else{
                echo "no";
                exit();
            }
            break;



        case 'addfav';
            try{
                $daoadd = new DAOFavorites();
                $rdo = $daoadd->add_fav($_GET['id']);
            }catch (Exception $e){
                echo json_encode("error");
                exit;
            }
            break;

            

        case 'delfav';
            try{
                $daodel = new DAOFavorites();
                $rdo = $daodel->del_fav($_GET['id']);
            }catch (Exception $e){
                echo json_encode("error");
                exit;
            }
            break;



        case 'checkfav';
            try{
                $daofav = new DAOFavorites();
                $rdo = $daofav->check_fav();
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
    }
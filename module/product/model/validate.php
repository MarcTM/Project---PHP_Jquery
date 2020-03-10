<?php

    function validate_codprod($texto){
        $daoproduct = new DAOProduct();
        $rdo = $daoproduct->select_product_codprod($texto);
        if($rdo){
            return false;
        }else{
            return true;
        }
    }

    
    function validate(){
        $check=validate_codprod($_POST['codprod']);

        if(!$check){
            $e_codprod = " * This code is already in the database";
            $check=false;
        }else{
            $e_codprod = "";
            $check=true;
        }
        $arr=['check'=>$check, 'e_codprod'=>$e_codprod];
        return $arr;
    }
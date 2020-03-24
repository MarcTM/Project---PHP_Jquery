<?php

    function validate_email($email){
        $daologin = new DAOLogin();
        $rdo = $daologin->select_email_l($email);
        if($rdo){
            return true;
        }else{
            return false;
        }
    }



    
    function validate_login(){
        $check=validate_email($_POST['email']);

        if(!$check){
            $e_pass = "";
            $e_email = " * This email doesn't exist";
            $check=false;
        }else{
            $e_email = "";
            $check=true;

            $daologin = new DAOLogin();
            $rdo = $daologin->select_user($_POST['email']);
            $value = get_object_vars($rdo);

            if (password_verify($_POST['pass'],$value['pass'])) {
                $e_pass = "";
                $check=true;
            }else{
                $e_pass = " * Password not matching";
                $check=false;
            }
        }
        $arr=['check'=>$check, 'e_email'=>$e_email, 'e_pass'=>$e_pass];
        return $arr;
    }
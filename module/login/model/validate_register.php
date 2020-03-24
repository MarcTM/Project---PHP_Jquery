<?php
    function validate_user($user){
        $daologin = new DAOLogin();
        $rdo = $daologin->select_user_r($user);
        if($rdo){
            return false;
        }else{
            return true;
        }
    }



    function validate_email($email){
        $daologin = new DAOLogin();
        $rdo = $daologin->select_email_r($email);
        if($rdo){
            return false;
        }else{
            return true;
        }
    }


    
    function validate_register(){
        $check=validate_user($_POST['user']);

        if(!$check){
            $e_user = " * This user already exists";
            $e_email = "";
            $check=false;
        }else{
            $e_user = "";
            $check=validate_email($_POST['email']);

            if(!$check){
                $e_email = " * This email is already registered";
                $check=false;
            }else{
                $e_email = "";
                $check=true;
            }
        }

        $arr=['check'=>$check, 'e_user'=>$e_user, 'e_email'=>$e_email];
        return $arr;
    }
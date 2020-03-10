<?php
    $path = $_SERVER['DOCUMENT_ROOT'] . '/MARC PROJECT/';
    include($path . "module/contact/model/DAOContact.php");;
    @session_start();

    switch($_GET['op']){
        case 'list';
            include("module/contact/view/contactus.html");
        break;
    }
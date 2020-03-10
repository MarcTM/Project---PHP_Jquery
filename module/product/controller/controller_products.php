<?php
    $path = $_SERVER['DOCUMENT_ROOT'] . '/MARC PROJECT/';
    include($path . "module/product/model/DAOProduct.php");
    // include ("module/product/model/DAOProduct.php");
    session_start();
    
    
    switch($_GET['op']){
        case 'list';
            try{
                $daoproduct = new DAOProduct();
                $rdo = $daoproduct->select_all_product();
               
            }catch (Exception $e){
                $callback = 'index.php?page=503';
			    die('<script>window.location.href="'.$callback .'";</script>');
            }
            
            if(!$rdo){
    			$callback = 'index.php?page=503';
			    die('<script>window.location.href="'.$callback .'";</script>');
    		}else{
                include("module/product/view/list_product.php");
    		}
            break;
            
        case 'create';
            include("module/product/model/validate.php");
            
            $check = true;
            
            if ($_POST){   
                $check=validate();

                if ($check['check']){
                    $_SESSION['product']=$_POST;

                    try{
                        $daoproduct = new DAOProduct();
    		            $rdo = $daoproduct->insert_product($_POST);
                    }catch (Exception $e){
                        $callback = 'index.php?page=503';
        			    die('<script>window.location.href="'.$callback .'";</script>');
                    }
                    
		            if($rdo){
            			echo '<script language="javascript">alert("Product created successfully in database")</script>';
            			$callback = 'index.php?page=controller_products&op=list';
        			    die('<script>window.location.href="'.$callback .'";</script>');
            		}else{
            			$callback = 'index.php?page=503';
    			        die('<script>window.location.href="'.$callback .'";</script>');
                    }
                    
                }
            }
            include("module/product/view/create_product.php");
            break;
            
        case 'update';
            include("module/product/model/validate.php");
            
            $check = true;
            
            if ($_POST){
                $check=validate();

                if ($check['check']){
                    $_SESSION['product']=$_POST;
                    try{
                        $daoproduct = new DAOProduct();
    		            $rdo = $daoproduct->update_product($_POST);
                    }catch (Exception $e){
                        $callback = 'index.php?page=503';
        			    die('<script>window.location.href="'.$callback .'";</script>');
                    }
                    
		            if($rdo){
            			echo '<script language="javascript">alert("Updated correctly in database")</script>';
            			$callback = 'index.php?page=controller_products&op=list';
        			    die('<script>window.location.href="'.$callback .'";</script>');
            		}else{
            			$callback = 'index.php?page=503';
    			        die('<script>window.location.href="'.$callback .'";</script>');
            		}
                }
            }
            
            try{
                $daoproduct = new DAOProduct();
                $rdo = $daoproduct->select_product($_GET['id']);
                $product=get_object_vars($rdo);
            }catch (Exception $e){
                $callback = 'index.php?page=503';
			    die('<script>window.location.href="'.$callback .'";</script>');
            }
            
            if(!$rdo){
    			$callback = 'index.php?page=503';
    			die('<script>window.location.href="'.$callback .'";</script>');
    		}else{
        	    include("module/product/view/update_product.php");
    		}
            break;
            
        case 'read';
            try{
                $daoproduct = new DAOProduct();
            	$rdo = $daoproduct->select_product($_GET['id']);
            	$product=get_object_vars($rdo);
            }catch (Exception $e){
                $callback = 'index.php?page=503';
			    die('<script>window.location.href="'.$callback .'";</script>');
            }
            if(!$rdo){
    			$callback = 'index.php?page=503';
    			die('<script>window.location.href="'.$callback .'";</script>');
    		}else{
                include("module/product/view/read_product.php");
    		}
            break;
            
        case 'delete';
            if (isset($_POST['delete'])){
                try{
                    $daoproduct = new DAOProduct();
                	$rdo = $daoproduct->delete_product($_GET['id']);
                }catch (Exception $e){
                    $callback = 'index.php?page=503';
    			    die('<script>window.location.href="'.$callback .'";</script>');
                }
            	
            	if($rdo){
        			echo '<script language="javascript">alert("Borrado en la base de datos correctamente")</script>';
        			$callback = 'index.php?page=controller_products&op=list';
    			    die('<script>window.location.href="'.$callback .'";</script>');
        		}else{
        			$callback = 'index.php?page=503';
			        die('<script>window.location.href="'.$callback .'";</script>');
        		}
            }

            include("module/product/view/delete_product.php");

                        
            try{
                $daoproduct = new DAOProduct();
            	$rdo = $daoproduct->select_product($_GET['id']);
            	$product=get_object_vars($rdo);
            }catch (Exception $e){
                $callback = 'index.php?page=503';
			    die('<script>window.location.href="'.$callback .'";</script>');
            }
            if(!$rdo){
    			$callback = 'index.php?page=503';
    			die('<script>window.location.href="'.$callback .'";</script>');
    		}else{
                include("module/product/view/read_product.php");
            }

            break;

        case 'delete_multiple';
            if($_POST){
                echo $_POST['delm'];
                die;
            }
            try{
                $daoproduct = new DAOProduct();
                $rdo = $daoproduct->select_all_product();
            }catch (Exception $e){
                $callback = 'index.php?page=503';
                die('<script>window.location.href="'.$callback .'";</script>');
            }
            
            if(!$rdo){
                $callback = 'index.php?page=503';
                die('<script>window.location.href="'.$callback .'";</script>');
            }else{
                include("module/product/view/delete_multiple.php");
            }
            break;

        case 'delete_all';

                if ($_POST){
                    try{
                        $daoproduct = new DAOProduct();
                        $rdo = $daoproduct->delete_all();
                    }catch (Exception $e){
                        $callback = 'index.php?page=503';
                        die('<script>window.location.href="'.$callback .'";</script>');
                    }
                    
                    if($rdo){
                        echo '<script language="javascript">alert("All products were deleted successfully")</script>';
                        $callback = 'index.php?page=controller_products&op=list';
                        die('<script>window.location.href="'.$callback .'";</script>');
                    }else{
                        $callback = 'index.php?page=503';
                        die('<script>window.location.href="'.$callback .'";</script>');
                    }
                }

                include("module/product/view/delete_all.html");
            break;

        case 'read_modal':
    
                try{
                    $daoproduct = new DAOProduct();
                    $rdo = $daoproduct->select_product($_GET['modal']);
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
                    //echo json_encode("error");
                    exit;
                }
                break;

        default;
            include("view/inc/error404.html");
            break;
            
    }
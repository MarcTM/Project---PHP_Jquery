	<!-- TOP PAGE -->
<?php
    if (isset($_GET['page'])){
		switch($_GET['page']){
			case "controller_products";
				include("view/inc/top/top_page_products.html");
				break;
			case "controller_shop";
				include("view/inc/top/top_page_shop.html");
				break;
			case "controller_cart";
				include("view/inc/top/top_page_cart.html");
				break;
			case "controller_details";
				include("view/inc/top/top_page_details.html");
				break;
			case "controller_clients";
				include("view/inc/top/top_page_clients.html");
				break;
			case "controller_homepage";
				include("view/inc/top/top_page_homepage.html");
				break;
			case "controller_contact";
				include("view/inc/top/top_page_contact.html");
				break;
			case "404";
				include("view/inc/error".$_GET['page'].".html");
				break;
			case "503";
				include("view/inc/error".$_GET['page'].".html");
				break;
			default;
				include("view/inc/top/top_page_homepage.html");
				break;
		}
	}else{
		include("view/inc/top/top_page_homepage.html");
	}

	session_start();

?>         
		<!-- MENU and PAGES-->
		<?php
		    if (isset($_SESSION['type'])){
				switch($_SESSION['type']){
					case "admin":
						include("view/inc/menu/menu_admin.html");
						include("view/inc/pages/pages_admin.php"); 
						break;
					case "client":
						include("view/inc/menu/menu_client.html");
						include("view/inc/pages/pages_client.php"); 
						break;
					default:
						include("view/inc/menu/menu_default.html");
						include("view/inc/pages/pages_default.php"); 
						break;
				}
			}else{
				include("view/inc/menu/menu_default.html");
				include("view/inc/pages/pages_default.php"); 
			}
		?> 

		<!-- FOOTER -->
	    <?php
	        include("view/inc/footer.html");
		?>
		
		<!-- BOTTOM PAGE -->
        <?php
            include("view/inc/bottom_page.html");
        ?>
    
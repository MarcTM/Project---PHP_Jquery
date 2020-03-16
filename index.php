<?php
    if ((isset($_GET['page'])) && ($_GET['page']==="controller_products")){

		include("view/inc/top/top_page_products.html");

	}else if ((isset($_GET['page'])) && ($_GET['page']==="controller_shop") ){

		include("view/inc/top/top_page_shop.html");

	}else if ((isset($_GET['page'])) && ($_GET['page']==="controller_details") ){

		include("view/inc/top/top_page_details.html");

	}else if ((isset($_GET['page'])) && ($_GET['page']==="controller_clients") ){

		include("view/inc/top/top_page_clients.html");

	}else if ((isset($_GET['page'])) && ($_GET['page']==="controller_homepage") ){

		include("view/inc/top/top_page_homepage.html");

	}else if ((isset($_GET['page'])) && ($_GET['page']==="controller_contact") ){

		include("view/inc/top/top_page_contact.html");

	}else{

		include("view/inc/top/top_page_homepage.html");

	}
	session_start();
?>           
		<?php
		    include("view/inc/menu.html");
		?>
    	<?php 
		    include("view/inc/pages.php"); 
		?>        
	    <?php
	        include("view/inc/footer.html");
        ?>
        <?php
            include("view/inc/bottom_page.html");
        ?>
    
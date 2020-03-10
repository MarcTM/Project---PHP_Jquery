<div id="contenido">
    <div class="container">
    	<div class="row">
    			<h3>LIST OF PRODUCTS</h3>
        </div>
        <hr />

    	<div class="row">
    		<p><button class="btn btn-large"><a href="index.php?page=controller_products&op=create">CREATE</a></button></p>
    		
    		<table id="datatable">
                <thead>
                    <tr id="headers">
                        <td width=50><b>ID</b></th>
                        <td width=100><b>Code</b></th>
                        <td width=125><b>Product</b></th>
                        <td width=125><b>Brand</b></th>
                        <th width=350><b>Action</b></th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                        if ($rdo->num_rows === 0){
                            echo '<tr>';
                            echo '<td bgcolor="Grey" align="center"  colspan="5" height="50px">NO HAY NINGUN PRODUCTO</td>';
                            echo '</tr>';
                        }else{
                            foreach ($rdo as $row) {
                                echo '<tr id="content">';
                                echo '<td width=125>'. $row['idproduct'] . '</td>';
                                echo '<td width=125>'. $row['codprod'] . '</td>';
                                echo '<td width=125>'. $row['product'] . '</td>';
                                echo '<td width=125>'. $row['brand'] . '</td>';
                                echo '<td width=350>';

                                echo '<button class="btn btn-large">';
                                print ("<a class='product' id='".$row['idproduct']."'>Read</a>");
                                echo '</button>';
                                echo '&nbsp;';
                                echo '<button class="btn btn-large"><a class="" href="index.php?page=controller_products&op=update&id='.$row['idproduct'].'">Update</button></button>';
                                echo '&nbsp;';
                                echo '<button class="btn btn-large"><a class="" href="index.php?page=controller_products&op=delete&id='.$row['idproduct'].'">Delete</a></button>';
                                echo '</td>';
                                echo '</tr>';
                            }
                        }
                    ?>
                </tbody>
            </table>
            <br>
            <button class="btn btn-large"><a class="" href="index.php?page=controller_products&op=delete_all">DELETE ALL</a></button>
        </div>
        <hr />
    </div>
</div>


<div id="modalcontent">
</div>
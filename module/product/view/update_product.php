<div id="contenido">
    <form method="post" name="update_product" id="update_product">
        <h1>Modify product: <?php echo $_GET['id'];?> </h1>
        <table border='0'>
        <tr>
                <td><font size="3">ID:</font></td> <td><input type = "text" name = "idproduct" id = "idproduct" value="<?php echo $_GET['id'];?>" readonly/></td>
        </tr>

        <tr>
                <td><font size="3">Code of product:</font></td> <td><input type = "text" name = "codprod" id = "codprod" value="<?php echo $product['codprod']?>"/></td>
                <td><font color="red">
                    <span id="e_codprod" class="error">
                        <?php
                            echo "$check[e_codprod]";
                        ?>
                    </span>
                </font></td>          
        </tr>

        <tr>
                <td><font size="3">Type of supplement: </font></td> <td><select name = "product" id = "product">
                <?php
                        if($product['product']==="Mass_gainer"){
                ?>
                <option value="Mass_gainer" selected>Mass gainer</option> 
                <option value="Protein">Protein</option>
                <option value="Creatine">Creatine</option>
                <option value="Vitamin">Vitamin</option> 
                <option value="BCAA">BCAA</option> 
                <?php
                        }elseif($product['product']==="Protein"){
                ?>
                <option value="Mass_gainer">Mass gainer</option> 
                <option value="Protein" selected>Protein</option>
                <option value="Creatine">Creatine</option>
                <option value="Vitamin">Vitamin</option> 
                <option value="BCAA">BCAA</option>
                <?php
                        }elseif($product['product']==="Creatine"){
                ?>
                <option value="Mass_gainer">Mass gainer</option> 
                <option value="Protein">Protein</option>
                <option value="Creatine" selected>Creatine</option>
                <option value="Vitamin">Vitamin</option> 
                <option value="BCAA">BCAA</option>
                <?php
                        }elseif($product['product']==="Vitamin"){
                ?>
                <option value="Mass_gainer">Mass gainer</option> 
                <option value="Protein">Protein</option>
                <option value="Creatine">Creatine</option>
                <option value="Vitamin" selected>Vitamin</option> 
                <option value="BCAA">BCAA</option>
                <?php
                        }elseif($product['product']==="BCAA"){
                ?>
                <option value="Mass_gainer">Mass gainer</option> 
                <option value="Protein">Protein</option>
                <option value="Creatine">Creatine</option>
                <option value="Vitamin">Vitamin</option> 
                <option value="BCAA" selected>BCAA</option>
                <!-- <?php
                        }else{
                ?>
                <option value="Mass_gainer">Mass gainer</option> 
                <option value="Protein">Protein</option>
                <option value="Creatine">Creatine</option>
                <option value="Vitamin">Vitamin</option> 
                <option value="BCAA">BCAA</option> -->
                <?php
                        }
                ?>
                </select></td>

                <td><font color="red">
                    <span id="e_product" class="error">
                        <?php
                            echo "$e_product";
                        ?>
                    </span>
                </font></td>
            </tr>

            <tr>
                <td><font size="3">Ingredients:</font></td> 
                <td>
                <?php
                    $busca_array=in_array("Amilopectina", $_POST['ingredients']);
                    if($busca_array){
                ?>
                <input type="checkbox" name="ingredients[]" id="ingredients[]" value="Amilopectina" checked/>Amilopectina<br>
                <?php
                        }else{
                ?>
                <input type="checkbox" name="ingredients[]" id="ingredients[]" value="Amilopectina"/>Amilopectina<br>
                <?php
                        }
                ?>
                <?php
                        $busca_array=in_array("Acido_Aspartico", $_POST['ingredients']);
                        if($busca_array){
                ?>
                <input type="checkbox" name="ingredients[]" id="ingredients[]" value="Acido_Aspartico" checked/>Acido Aspartico<br>
                <?php
                        }else{
                ?>
                <input type="checkbox" name="ingredients[]" id="ingredients[]" value="Acido_Aspartico"/>Acido Aspartico<br>
                <?php
                        }
                ?>
                <?php
                        $busca_array=in_array("Acido_Aspartico", $_POST['ingredients']);
                        if($busca_array){
                ?>
                <input type="checkbox" name="ingredients[]" id="ingredients[]" value="Ashwagandha" checked/>Ashwagandha</td>
                <?php
                        }else{
                ?>
                <input type="checkbox" name="ingredients[]" id="ingredients[]" value="Ashwagandha"/>Ashwagandha</td>
                <?php
                        }
                ?>                
                <td><font color="red">
                    <span id="e_ingredients" class="error">
                        <?php
                            echo "$e_ingredients";
                        ?>
                    </span>
                </font></td>            
            </tr>

            <tr>
                <td><font size="3">Flavour:</font></td> <td><select name = "flavour" id="flavour">
                <?php
                        if($product['flavour']==="Banana"){
                ?>
                <option value="Banana" selected>Banana</option> 
                <option value="Chocolate">Chocolate</option> 
                <option value="Strawberry">Strawberry</option>
                <option value="Capuccino">Capuccino</option>
                <option value="Vanilla">Vanilla</option>
                <?php
                        }elseif($product['flavour']==="Chocolate"){
                ?>
                <option value="Banana">Banana</option> 
                <option value="Chocolate" selected>Chocolate</option> 
                <option value="Strawberry">Strawberry</option>
                <option value="Capuccino">Capuccino</option>
                <option value="Vanilla">Vanilla</option>
                <?php
                        }elseif($product['flavour']==="Strawberry"){
                ?>
                <option value="Banana">Banana</option> 
                <option value="Chocolate">Chocolate</option> 
                <option value="Strawberry" selected>Strawberry</option>
                <option value="Capuccino">Capuccino</option>
                <option value="Vanilla">Vanilla</option>
                <?php
                        }elseif($product['flavour']==="Capuccino"){
                ?>
                <option value="Banana">Banana</option> 
                <option value="Chocolate">Chocolate</option> 
                <option value="Strawberry">Strawberry</option>
                <option value="Capuccino" selected>Capuccino</option>
                <option value="Vanilla">Vanilla</option>
                <?php
                        }elseif($product['flavour']==="Vanilla"){
                ?>
                <option value="Banana" selected>Banana</option> 
                <option value="Chocolate">Chocolate</option> 
                <option value="Strawberry">Strawberry</option>
                <option value="Capuccino">Capuccino</option>
                <option value="Vanilla" selected>Vanilla</option>
                <?php
                        }
                ?>
                </select></td>
                <td><font color="red">
                    <span id="e_flavour" class="error">
                        <?php
                            echo "$e_flavour";
                        ?>
                    </span>
                </font></td>            
            </tr>

            <tr>
            <td><font size="3">Brand:</font></td>
                <td>
                <?php
                        if ($product['brand']==="HSN"){
                ?>
                <input type="radio" name="brand" id="brand" placeholder="brand" value="HSN" checked>HSN<br>
                <input type="radio" name="brand" id="brand" placeholder="brand" value="HSNraw">HSNraw<br>
                <input type="radio" name="brand" id="brand" placeholder="brand" value="BiotechUSA">BioTechUSA</td>
                <?php    
                        }else if ($product['brand']==="HSNraw"){
                ?>
                <input type="radio" name="brand" id="brand" placeholder="brand" value="HSN">HSN<br>
                <input type="radio" name="brand" id="brand" placeholder="brand" value="HSNraw" checked>HSNraw<br>
                <input type="radio" name="brand" id="brand" placeholder="brand" value="BiotechUSA">BioTechUSA</td>
                <?php    
                        }else if ($product['brand']==="BiotechUSA"){
                ?>
                <input type="radio" name="brand" id="brand" placeholder="brand" value="HSN">HSN<br>
                <input type="radio" name="brand" id="brand" placeholder="brand" value="HSNraw">HSNraw<br>
                <input type="radio" name="brand" id="brand" placeholder="brand" value="BiotechUSA" checked>BioTechUSA</td>
                <?php
                        }
                ?>
                <td><font color="red">
                    <span id="e_brand" class="error">
                        <?php
                            echo "$e_brand";
                        ?>
                    </span>
                </font></td>            
            </tr>

            <tr>
                <td><font size="3">KG:</font></td> <td><input type = "text" name = "kg" id = "kg" value="<?php echo $product['kg']?>"/></td>
                <td><font color="red">
                    <span id="e_kg" class="error">
                        <?php
                            echo "$e_kg";
                        ?>
                    </span>
                </font></td>          
            </tr>

            <tr>
                <td><font size="3">Date of caducity</font></td> <td><input id="datecaducity" type="text" name="datecaducity" value="<?php echo $product['datecaducity']?>"></td>
                <td><font color="red">
                    <span id="e_datecaducity" class="error">
                        <?php
                            echo "$e_datecaducity";
                        ?>
                    </span>
                </font></td>            
            </tr>

            <tr>
                <td><font size="3">Description:</font></td> <td><textarea name = "descr" id = "descr" rows="6" cols="50"><?php echo $product['descr']?></textarea></td>
                <td><font color="red">
                    <span id="e_descr" class="error">
                        <?php
                            echo "$e_descr";
                        ?>
                    </span>
                </font></td>          
            </tr>

            <tr>
                <td><font size="3">Price (€):</font></td> <td><input type = "text" name = "price" id = "price" value="<?php echo $product['price']?>"/></td>
                <td><font color="red">
                    <span id="e_price" class="error">
                        <?php
                            echo "$e_price";
                        ?>
                    </span>
                </font></td>          
            </tr>

            <tr>
                <td><font size="3">IMG source:</font></td> <td><input type = "text" name = "img" id = "img" value="<?php echo $product['img']?>"/></td>
                <td><font color="red">
                    <span id="e_img" class="error">
                        <?php
                            echo "$e_img";
                        ?>
                    </span>
                </font></td>          
            </tr>

            <tr>
                <td><input type="button" name="update" id="update" value="Update" onclick="validate_update()"/></td>
                <td><input type="reset" value="Reset"></td>
                <td align="right"><a href="index.php?page=controller_products&op=list">Back to page</a></td>
            </tr>

        </table>
    </form>
</div>
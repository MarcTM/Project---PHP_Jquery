<div id="contenido">
    <form method="post" name="alta_product" id="alta_product">
        <h1>NEW PRODUCT</h1>
        <table border='0'>
            <tr>
                <td><font size="3">Code of product:</font></td> <td><input type = "text" name = "codprod" id = "codprod" value="<?php echo $_POST['codprod'] ?>"/></td>
                <td><font color="red">
                    <span id="e_codprod" class="error">
                        <?php 
                            echo "$check[e_codprod]";
                        ?>
                    </span>
                </font></td>
            </tr>
            <hr/>
            <tr>
                <td><font size="3">Type of supplement: </font></td> <td><select name = "product" id = "product" value="<?php echo $_POST['product'] ?>">
                <option value="Mass_gainer">Mass gainer</option> 
                <option value="Protein">Protein</option>
                <option value="Creatine">Creatine</option>
                <option value="Vitamin">Vitamin</option> 
                <option value="BCAA">BCAA</option> 
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
                <td><input type="checkbox" name="ingredients[]" id="ingredients[]" value="Amilopectina">Amilopectina<br>
                <input type="checkbox" name="ingredients[]" id="ingredients[]" value="Acido_Aspartico">Acido Aspartico<br>
                <input type="checkbox" name="ingredients[]" id="ingredients[]" value="Ashwagandha">Ashwagandha</td>
                <td><font color="red">
                    <span id="e_ingredients" class="error">
                        <?php
                            echo "$e_ingredients";
                        ?>
                    </span>
                </font></td>            
            </tr>

            <tr>
                <td><font size="3">Flavour:</font></td> <td><select name = "flavour" id="flavour" value="<?php echo $_POST['flavour'] ?>">
                <option value="Banana">Banana</option> 
                <option value="Chocolate">Chocolate</option> 
                <option value="Strawberry">Strawberry</option>
                <option value="Capuccino">Capuccino</option>
                <option value="Vanilla">Vanilla</option>
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
                <td><input type="radio" name="brand" id="brand" placeholder="brand" value="HSN">HSN<br>
                <input type="radio" name="brand" id="brand" placeholder="brand" value="HSNraw">HSNraw<br>
                <input type="radio" name="brand" id="brand" placeholder="brand" value="BiotechUSA">BioTechUSA</td>
                <td><font color="red">
                    <span id="e_brand" class="error">
                        <?php
                            echo "$e_brand";
                        ?>
                    </span>
                </font></td>            
            </tr>

            <tr>
                <td><font size="3">KG:</font></td> <td><input type = "text" name = "kg" id = "kg" value="<?php echo $_POST['kg'] ?>"/></td>
                <td><font color="red">
                    <span id="e_kg" class="error">
                        <?php
                            echo "$e_kg";
                        ?>
                    </span>
                </font></td>          
            </tr>

            <tr>
                <td><font size="3">Date of caducity</font></td> <td><input id="datecaducity" type="text" name="datecaducity" readonly="readonly" value="<?php echo $_POST['datecaducity'] ?>"></td>
                <td><font color="red">
                    <span id="e_datecaducity" class="error">
                        <?php
                            echo "$e_datecaducity";
                        ?>
                    </span>
                </font></td>            
            </tr>

            <tr>
                <td><font size="3">Description:</font></td> <td><textarea name = "descr" id = "descr" rows="6" cols="50"></textarea></td>
                <td><font color="red">
                    <span id="e_descr" class="error">
                        <?php
                            echo "$e_descr";
                        ?>
                    </span>
                </font></td>          
            </tr>

            <tr>
                <td><font size="3">Price (€):</font></td> <td><input type = "text" name = "price" id = "price" value="<?php echo $_POST['price'] ?>"/></td>
                <td><font color="red">
                    <span id="e_price" class="error">
                        <?php
                            echo "$e_price";
                        ?>
                    </span>
                </font></td>          
            </tr>

            <tr>
                <td><font size="3">IMG source:</font></td> <td><input type = "text" name = "img" id = "img" value="view/assets/img/shop/default.png"/></td>
                <td><font color="red">
                    <span id="e_img" class="error">
                        <?php
                            echo "$e_img";
                        ?>
                    </span>
                </font></td>          
            </tr>

            <tr>
                <td><input type="button" name="create" id="create" value="Create" onclick="validate_create()"/></td>
                <td><input type="reset" value="Reset"></td>
                <td align="right"><a href="index.php?page=controller_products&op=list">Back to page</a></td>
            </tr>

        </table>
    </form>
    <hr/>

</div>
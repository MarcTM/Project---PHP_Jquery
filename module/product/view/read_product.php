<div id="contenido2">
    <p>
    <table id="tableread" border='1'>
        <tr>
            <td>Product ID: </td>
            <td>
                <?php
                    echo $product[idproduct];
                ?>
            </td>
        </tr>
    
        <tr>
            <td>Code: </td>
            <td>
                <?php
                    echo $product[codprod];
                ?>
            </td>
        </tr>

        <tr>
            <td>Product: </td>
            <td>
                <?php
                    echo $product[product];
                ?>
            </td>
        </tr>

        <tr>
            <td>Ingredients: </td>
            <td>
                <?php
                    echo $product['ingredients'];
                ?>
            </td>
        </tr>
        
        <tr>
            <td>Flavour: </td>
            <td>
                <?php
                    echo $product['flavour'];
                ?>
            </td>
        </tr>
        
        <tr>
            <td>Brand: </td>
            <td>
                <?php
                    echo $product['brand'];
                ?>
            </td>
        </tr>
        
        <tr>
            <td>KG: </td>
            <td>
                <?php
                    echo $product['kg'];
                ?>
            </td>
        </tr>
        
        <tr>
            <td>Date of caducity: </td>
            <td>
                <?php
                    echo $product['datecaducity'];
                ?>
            </td>
        </tr>

        <tr>
            <td>Description: </td>
            <td>
                <?php
                    echo $product['descr'];
                ?>
            </td>
        </tr>

        <tr>
            <td>Price: </td>
            <td>
                <?php
                    echo $product['price'];
                ?>€
            </td>
        </tr>

        <tr>
            <td>IMG source: </td>
            <td>
                <?php
                    echo $product['img'];
                ?>
            </td>
        </tr>

        <tr>
            <td>Views: </td>
            <td>
                <?php
                    echo $product['views'];
                ?>
            </td>
        </tr>
        
    </table>
    </p>
    <p><a href="index.php?page=controller_products&op=list">Back to page</a></p>
</div>
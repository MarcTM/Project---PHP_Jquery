<div id="contenido2">
    <form autocomplete="on" method="post" name="delete_product" id="delete_product" action="index.php?page=controller_products&op=delete&id=<?php echo $_GET['id']; ?>">
        <table border='0'>
            <tr>
                <td align="center"  colspan="2"><h3>¿Do you really want to delete the product <?php echo $_GET['id']; ?>?</h3></td>
                
            </tr>
            <tr>
                <td align="center"><button type="submit" class=""name="delete" id="delete">Accept</button></td>
                <td align="center"><button class="button"><a class="" href="index.php?page=controller_products&op=list">Cancel</a></button></td>
            </tr>
        </table>
    </form>
</div>
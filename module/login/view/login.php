<div class="loginpage">

    <h1>LOGIN</h1>
    <br>

    <form method="post" name="login_user" id="login_user">
        <table id="tablelogin">
            <tr>
                <td><font size="3">Email: </font></td> <td><input type="text" id="email" name="email" value="<?php echo $_POST['email'] ?>"/></td>
                <td><font color="red">
                    <span id="e_email" class="error">
                        <?php 
                            echo "$check[e_email]";
                        ?>
                    </span>
                </font></td>
            </tr>
            <hr/><br><br>
            <tr>
                <td><font size="3">Password: </font></td> <td><input type="text" id="pass" name="pass"></td>
                <td><font color="red">
                    <span id="e_pass" class="error">
                        <?php 
                            echo "$check[e_pass]";
                        ?>
                    </span>
                </font></td>
            </tr>

            <tr>
                <td><input type="button" name="log_in" id="log_in" value="LOG IN" onclick="validate_login()"/></td>
            </tr>

        </table>
    </form>

</div>
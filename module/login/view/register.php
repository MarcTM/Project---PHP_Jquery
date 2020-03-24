<div class="registerpage">

    <h1>REGISTER</h1>
    <br>

    <form method="post" name="registeruser" id="registeruser">
        <table id="tableregister">
            <tr>
                <td><font size="3">User: </font></td> <td><input type="text" id="user" name="user" value="<?php echo $_POST['user'] ?>"/></td>
                <td><font color="red">
                    <span id="e_user" class="error">
                        <?php 
                            echo "$valide[e_user]";
                        ?>
                    </span>
                </font></td>
            </tr>
            <tr>
                <td><font size="3">Email: </font></td> <td><input type="text" id="email" name="email" value="<?php echo $_POST['email'] ?>"/></td>
                <td><font color="red">
                    <span id="e_email" class="error">
                        <?php 
                            echo "$valide[e_email]";
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
                            echo "$valide[e_pass]";
                        ?>
                    </span>
                </font></td>
            </tr>

            <tr>
                <td><input type="button" name="register" id="register" value="REGISTER" onclick="validate_register()"/></td>
            </tr>

        </table>
    </form>

</div>
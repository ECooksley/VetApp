function checkAdmin() {
    var admin = true;
    if (admin) { //check if admin privelages
        document.getElementById("userManagementButton").style.display = "block";
    } else {
        document.getElementById("userManagementButton").style.display = "none";
    }
}
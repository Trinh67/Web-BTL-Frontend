$(document).ready(function () {
    if(checkUser()) userExists();
    $('#logout-button').click(logout);
})
// Kiểm tra user
function checkUser(){
    var token = window.localStorage.getItem("token");
    if(token != null) return true;
    else return false;
}
// Cập nhập dữ liệu khi tồn tại user
function userExists(){
    console.log("Tồn tại");
    $('#userExists').show();
    $('#loginButton').hide();
}
// Đăng xuất
function logout(){
    window.localStorage.removeItem('token');
    window.location = '../trang-chu.html';
}
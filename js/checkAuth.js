$(document).ready(function () {
    if(checkUser()) userExists();
    $('#logout-button').click(logout);
    $('#log-out').click(logout);
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
    $('#RegisterButton').hide();
    getInfo();
    checkRole(window.localStorage.getItem("role"));
}
// Đăng xuất
function logout(){
    window.localStorage.removeItem('token');
    window.location = 'trang-chu.html';
}

// Lấy infor User
var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer " + window.localStorage.getItem("token"));

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};
function getInfo() {
    fetch("http://fcbtruong-001-site1.itempurl.com/api/UserInfor/GetUserInfor", requestOptions)
   .then(resp => {
    if (resp.status == 200) {
        resp.json()
        .then(ret => {
               $('#userName').html(ret.name);
               window.localStorage.setItem('userName', ret.name);
               window.localStorage.setItem('role', ret.idRole);
               window.localStorage.setItem('phone', ret.phone);
               window.localStorage.setItem('createdAt', ret.createdAt);
               window.localStorage.setItem('newNotificationNumber', ret.newNotificationNumber);
            }
        )
    }
    else {
      //  var n =  window.localStorage.getItem('userName');
      //  $('#userName').html(n);
    }
    })
  .catch(error => console.log('error', error));
}

// Cập nhập theo role
function checkRole(id){
  switch (id) {
      case "0":
        $('#customerAccount').show();
        $('#userAccount').hide();
        $('#postNew').hide();
        $('#manage').hide();
        break;
      case "1":
        $('#customerAccount').hide();
        $('#userAccount').show();
        $('#postNew').show();
        $('#manage').hide();
        break;
      case "2":
        $('#customerAccount').hide();
        $('#userAccount').show();
        $('#postNew').show();
        $('#manage').show();
        break;
      default:
          return false;
  }
}
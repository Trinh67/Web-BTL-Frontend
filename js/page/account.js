$(document).ready(function () {
    if(window.localStorage.getItem('role') < 1) window.location = 'trang-chu.html';
    document.getElementById('user-name').innerHTML = window.localStorage.getItem('userName');
    document.getElementById('phoneNumber').innerHTML = window.localStorage.getItem('phone');
    loadOwnerRoomData();
    $('#post-manager').click(btnPostOnclick);
    $('#list-favorite-post').click(btnListFavoriteOnclick);
    $('#edit-infor').click(btnEditOnclick);
    $('#post-new').click(btnPostNewOnclick);
    $('#recharge').click(btnRechargeOnclick);
    $('#message').click(btnMessageOnclick);
    $('#log-out').click(btnLogoutOnclick);
    $('#notification').click(btnNotificationOnclick);
})
// Quản lí bài đăng
function btnPostOnclick() {
    loadOwnerRoomData();
    $('.main-content').show();
    $('.edit-user').hide();
    $('.list-favorite-post').hide();
    $('.recharge-panel').hide();
    $('.chatWithAdmin').hide();
    $('.notification-panel').hide();
    $('#current-panel').html('Quản lí bài đăng');
}
// Bài đăng yêu thích thích
function btnListFavoriteOnclick() {
    loadFavoriteRoomData();
    $('.list-favorite-post').show();
    $('.main-content').hide();
    $('.edit-user').hide();
    $('.recharge-panel').hide();
    $('.chatWithAdmin').hide();
    $('.notification-panel').hide();
    $('#current-panel').html('Phòng yêu thích');
}
// Cập nhập tài khoản
function btnEditOnclick() {
    $('.edit-user').show();
    $('.main-content').hide();
    $('.list-favorite-post').hide();
    $('.recharge-panel').hide();
    $('.chatWithAdmin').hide();
    $('.notification-panel').hide();
    $('#current-panel').html('Cập nhập tài khoản');
}
// Đăng tin
function btnPostNewOnclick() {
    window.location = 'dang-tin-moi.html';
}
// Nạp tiền
function btnRechargeOnclick() {
    $('.recharge-panel').show();
    $('.edit-user').hide();
    $('.list-favorite-post').hide();
    $('.main-content').hide();
    $('.notification-panel').hide();
    $('.chatWithAdmin').hide();
    $('#current-panel').html('Nạp tiền');
}
// Nhắn tin
function btnMessageOnclick() {
    $('.chatWithAdmin').show();
    $('.recharge-panel').hide();
    $('.list-favorite-post').hide();
    $('.edit-user').hide();
    $('.main-content').hide();
    $('.notification-panel').hide();
    $('#current-panel').html('Tin nhắn');
}
// Thông báo
function btnNotificationOnclick() {
    $('.notification-panel').show();
    $('.chatWithAdmin').hide();
    $('.list-favorite-post').hide();
    $('.recharge-panel').hide();
    $('.edit-user').hide();
    $('.main-content').hide();
    $('#current-panel').html('Thông báo');
}

// ĐĂng xuất
function btnLogoutOnclick() {
    alert('Bạn chắc chắn muốn đăng xuất khỏi tài khoản?');
}
// TODO

var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer " + window.localStorage.getItem("token") );

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

var category = ['Phòng trọ cho thuê', 'Chung cư mini', 'Nhà nguyên căn', 'Chung cư nguyên căn'];
var action = document.createElement('td');
action.innerHTML = '<span class="badge badge-pill badge-danger center" style="padding: 10px; font-size: 0.8rem">Bỏ thích</span>';
// Tải dữ liệu phòng trọ của chủ trọ
async function loadOwnerRoomData() {
	await fetch("http://fcbtruong-001-site1.itempurl.com/api/Post/GetPostOfUser", requestOptions)
    .then(resp => {
      if (resp.status == 200) {
          resp.json()
              .then(ret => {
                  if (ret != null) {
                    $('#list-owner-post').empty();
                    var post = ret;
                    for (let i = 0; i < post.length; i++) {
                        let r = showPost(post, i);
                        document.querySelector("tbody#list-owner-post").appendChild(r);
                    };
                    //document.querySelector(img.user_avatar).src = '../content/images/avatar/' + ret.owner['avatar'];
                  } else {
                      // Có lỗi xử lý nghiệp vụ
                      alert('Error! Lỗi xử lí nghiệp vụ');
                  }
              });
      } else {
          // Có lỗi HTTP
          alert('Error! Lỗi HTTP');
      }
  })
    .catch(error => console.log('error', error));
}
// Tạo bài viết
var packetType = ['Gói tuần', 'Gói tháng', 'Gói quý', 'Gói năm'];
var post_status = ['<span class="badge badge-pill badge-primary" style="padding: 10px; font-size: 0.8rem">Chờ phê duyệt</span>', '<span class="badge badge-pill badge-success" style="padding: 10px; font-size: 0.8rem">Đang hoạt động</span>', '<span class="badge badge-pill badge-warning" style="padding: 10px; font-size: 0.8rem">Từ chối phê duyệt</span>', '<span class="badge badge-pill badge-danger center" style="padding: 10px; font-size: 0.8rem">Hết hạn</span>']
let showPost = function (x, index) {
	// Tạo <tr> và các <td> mới 
	let r = document.createElement("tr");
	r.innerHTML = '<td>#' + x[index].post['idPost'] + '</td>' +
                    '<td>' +
                    '<a href="chi-tiet-phong-tro/'+ x[index].motelInfor['slug'] + '.html"' +
                    'target="_blank"><img src="http://fcbtruong-001-site1.itempurl.com/api/Image/GetImage?subDir=posts/' + x[index].post["idPost"] + '/' + x[index].images[0] + '" width="100px"' +
                        'height="80px"></a>' +
                    '</td>' +
                    '<td><span class="badge badge-pill badge-warning">' + x[index].category['cateroryName'] + '</span>' +
                    '<a class="" target="_blank"' +
                    'href="chi-tiet-phong-tro/'+ x[index].motelInfor['slug'] + '.html"' +
                    'style="color: #055699;">' + x[index].motelInfor['title'] + '</a>' +
                    '<div>' +
                    '<a href="#" class="btn btn-sm btn-add-day text-success" onclick="AddDays(' + x[index].post['idPost'] + ')"><i data-feather="plus"></i>+ Thêm ngày</a> ' +
                    '<a href="sua-bai-dang/' + x[index].post['idPost'] +'.html" class="btn btn-sm btn-edit-post"><i class="fas fa-edit icon"></i> Sửa</a>' +
                    '<div class="onoffswitch">' +
                        '<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch" checked>' +
                        '<label class="onoffswitch-label" for="myonoffswitch">' +
                            '<span class="onoffswitch-inner"></span>' +
                            '<span class="onoffswitch-switch"></span>' +
                        '</label>' +
                    '</div>' +
                    '</div>' +
                    '</td>' +
                    '<td>' + x[index].motelInfor['price'].toLocaleString('it-IT') + ' đ/ tháng</td>' +
                    '<td>' + formDate(x[index].post['createdAt']) + '</td>' +
                    '<td>' + formDate(x[index].post['expireDate']) + '</td>' +
                    '<td>' + packetType[x[index].post['packetType']] + '</td>' +
                    '<td>' + post_status[x[index].post['status']] + '</td>';
	return r;
};

// Tải dữ liệu bài đăng yêu thích
async function loadFavoriteRoomData() {
	await fetch("http://fcbtruong-001-site1.itempurl.com/api/FavoritePost/GetFavoritePosts", requestOptions)
    .then(resp => {
      if (resp.status == 200) {
          resp.json()
              .then(ret => {
                  if (ret != null) {
                    $('#favorite-post').empty();
                    var post = ret;
                    for (let i = 0; i < post.length; i++) {
                        var action = document.createElement('td');
                        action.innerHTML = '<span class="badge badge-pill badge-danger center" onclick="RemoveFavorite(' + post[i]['idPost'] + ')" style="padding: 10px; font-size: 0.8rem">Bỏ thích</span>';
                        let uti = document.createElement("td");
                        utility = JSON.parse(post[i].idUtility);
                        for (let j = 0; j < utility.length; j++) {
                            let r = showUtility(utility, j);
                            uti.appendChild(r);
                        };
                        let r = showFavoritePost(post, i);
                        r.appendChild(uti);
                        r.appendChild(action);
                        document.querySelector("tbody#favorite-post").appendChild(r);
                    };
                    //document.querySelector(img.user_avatar).src = '../content/images/avatar/' + ret.owner['avatar'];
                  } else {
                      // Có lỗi xử lý nghiệp vụ
                      alert('Error! Lỗi xử lí nghiệp vụ');
                  }
              });
      } else {
          // Có lỗi HTTP
          alert('Error! Lỗi HTTP');
      }
  })
    .catch(error => console.log('error', error));
}
let showFavoritePost = function (x, index, uti) {
	// Tạo <tr> và các <td> mới 
	let r = document.createElement("tr");
	r.innerHTML = '<td>#' + x[index]['idPost'] + '</td>' +
                    '<td>' +
                    '<a href="chi-tiet-phong-tro/'+ x[index]['slug'] + '.html"' +
                    'target="_blank"><img src="http://fcbtruong-001-site1.itempurl.com/api/Image/GetImage?subDir=posts/' + x[index].idPost + '/' + x[index].imagePath["imagePath"] + '" width="100px"' +
                        'height="80px"></a>' +
                    '</td>' +
                    '<td><span class="badge badge-pill badge-warning">' + category[x[index]['idCategory'] - 1] + '</span>' +
                    '<a class="" target="_blank"' +
                    'href="chi-tiet-phong-tro/'+ x[index].slug + '.html"' +
                    'style="color: #055699;">' + x[index].title + '</a>' +
                    '</td>' +
                    '<td>' + x[index].price.toLocaleString('it-IT') + ' đ/ tháng</td>';
	return r;
};

// Format Date
function formDate(date) {
    var date = new Date(date);
    day = date.getDate();
    month = date.getMonth() + 1;
    year = date.getFullYear();
    return day + '/' + month + '/' + year;
}

// Tạo <Utility>
let showUtility = function (x, index) {
	let uti = ["", "Khép kín ", "Nóng lạnh ", "Ban công ", "Điều hòa ", "Giờ giấc tự do ", "Vệ sinh riêng ", "Wifi miễn phí ", "Không chung chủ "];
	// Tạo phần tử
	let r = document.createElement("span");
	r.innerHTML = '<i class="fas fa-check"></i> ' + uti[x[index]];
	return r;
};

// Tìm kiếm trong bảng
function PostFunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("PostInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("post-owner-table");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[7];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
}

// Xóa bài đăng yêu thích
function RemoveFavorite(id) {
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
      };
      
    fetch("http://fcbtruong-001-site1.itempurl.com/api/FavoritePost/UnFavorPost?idPost=" + id, requestOptions)
    .then(response => response.text())
    .then(result => {
        alert('Xóa bài viết khỏi danh sách thành công!')
        location.reload();
    })
    .catch(error => console.log('error', error));
}

// Gia hạn bài đăng
function AddDays(id) {
    var packetType, packetValue;
    var type = prompt("Chọn gói muốn gia hạn:", "Gói tuần");
    var value = prompt("Số lượng tuần/tháng/quý/năm tương ứng:", "1");

    if (type == null || type == "" || value == null || value == "") {
      alert('Bạn phải điền đầy đủ dữ liệu');
    } else {
        packetType = 1;
        packetValue = value;
    }
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
      };
      
      fetch("http://fcbtruong-001-site1.itempurl.com/api/Post/ExtendDatePost?idPost=" + id + "&packetType=" + packetType + "&packetValue=" + packetValue, requestOptions)
        .then(response => response.text())
        .then(result => alert('Gia hạn thành công!'))
        .catch(error => console.log('error', error));
  }
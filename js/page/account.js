$(document).ready(function () {
    loadOwnerRoomData();
    $('#post-manager').click(btnPostOnclick);
    $('#edit-infor').click(btnEditOnclick);
    $('#post-new').click(btnPostNewOnclick);
    $('#recharge').click(btnRechargeOnclick);
    $('#message').click(btnMessageOnclick);
    $('#log-out').click(btnLogoutOnclick);
    $('#notification').click(btnNotificationOnclick);
    $('#dt-fixed-footer').dataTable({
        "paging": false,
        "fnInitComplete": function () {
          var myCustomScrollbar = document.querySelector('#dt-fixed-footer_wrapper .dataTables_scrollBody');
          var ps = new PerfectScrollbar(myCustomScrollbar);
        },
        "scrollY": 450,
    });
})
// Quản lí bài đăng
function btnPostOnclick() {
    $('.main-content').show();
    $('.edit-user').hide();
    $('.recharge-panel').hide();
    $('.chatWithAdmin').hide();
    $('.notification-panel').hide();
    $('#current-panel').html('Quản lí bài đăng');
}
// Cập nhập tài khoản
function btnEditOnclick() {
    $('.edit-user').show();
    $('.main-content').hide();
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
    $('.main-content').hide();
    $('.notification-panel').hide();
    $('.chatWithAdmin').hide();
    $('#current-panel').html('Nạp tiền');
}
// Nhắn tin
function btnMessageOnclick() {
    $('.chatWithAdmin').show();
    $('.recharge-panel').hide();
    $('.edit-user').hide();
    $('.main-content').hide();
    $('.notification-panel').hide();
    $('#current-panel').html('Tin nhắn');
}
// Thông báo
function btnNotificationOnclick() {
    $('.notification-panel').show();
    $('.chatWithAdmin').hide();
    $('.recharge-panel').hide();
    $('.edit-user').hide();
    $('.main-content').hide();
    $('#current-panel').html('Thông báo');
}

// ĐĂng xuất
function btnLogoutOnclick() {
    alert('Bạn chắc chắn muốn đăng xuất khỏi tài khoản?');
}

// Tạo bài viết
let showUtility = function (x, index) {
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
                    '<a href="#" class="btn btn-sm btn-add-day text-success"><i data-feather="plus"></i>+ Thêm ngày</a>' +
                    '<a href="#" class="btn btn-sm btn-edit-post"><i class="fas fa-edit icon"></i> Sửa</a>' +
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
                    '<td>' + formDate(ret[index].post['createdAt']) + '</td>' +
                    '<td>' + formDate(ret[index].post['expireDate']) + '</td>' +
                    '<td>Gói ngày</td>' +
                    '<td class="badge badge-primary">Chờ phê duyệt</td>';
	return r;
};

var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer " + window.localStorage.getItem("token") );

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

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
                        console.log(i);
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
                    '<a href="#" class="btn btn-sm btn-add-day text-success"><i data-feather="plus"></i>+ Thêm ngày</a> ' +
                    '<a href="#" class="btn btn-sm btn-edit-post"><i class="fas fa-edit icon"></i> Sửa</a>' +
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
                    '<td>Gói ngày</td>' +
                    '<td class="badge badge-primary">Chờ phê duyệt</td>';
	return r;
};

// Format Date
function formDate(date) {
    var date = new Date(date);
    day = date.getDate();
    month = date.getMonth() + 1;
    year = date.getFullYear();
    console.log(date);
    return day + '/' + month + '/' + year;
}


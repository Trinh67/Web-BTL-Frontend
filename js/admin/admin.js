$(document).ready(function () {
    $('#statistic').click(btnStatisticOnClick);
    $('#post-manager').click(btnPostOnclick);
    $('#edit-infor').click(btnEditOnclick);
    $('#post-new').click(btnPostNewOnclick);
    $('#report').click(btnReportOnclick);
    $('#message').click(btnMessageOnclick);
    $('#log-out').click(btnLogoutOnclick);
    $('#home-Page').click(btnHomePageOnclick);
    $('#notification').click(btnNotificationOnclick);
})
// Thống kê
function btnStatisticOnClick() {
    $('.statistic-content').show();
    $('.main-content').hide();
    $('.edit-user').hide();
    $('.report-content').hide();
    $('.chatWithAdmin').hide();
    $('.notification-panel').hide();
    $('#current-panel').html('Quản lí bài đăng');
}
// Quản lí bài đăng
function btnPostOnclick() {
    loadOwnerRoomData();
    $('#dt-fixed-footer').dataTable({
        "paging": false,
        "fnInitComplete": function () {
          var myCustomScrollbar = document.querySelector('#dt-fixed-footer_wrapper .dataTables_scrollBody');
          var ps = new PerfectScrollbar(myCustomScrollbar);
        },
        "scrollY": 450,
    });
    $('.main-content').show();
    $('.statistic-content').hide();
    $('.edit-user').hide();
    $('.report-content').hide();
    $('.chatWithAdmin').hide();
    $('.notification-panel').hide();
    $('#current-panel').html('Quản lí bài đăng');
}
// Cập nhập tài khoản
function btnEditOnclick() {
    $('.edit-user').show();
    $('.statistic-content').hide();
    $('.main-content').hide();
    $('.report-content').hide();
    $('.chatWithAdmin').hide();
    $('.notification-panel').hide();
    $('#current-panel').html('Cập nhập tài khoản');
}
// Đăng tin
function btnPostNewOnclick() {
    window.location = '../dang-tin-moi.html';
}
// Nạp tiền
function btnReportOnclick() {
    $('.report-content').show();
    $('.statistic-content').hide();
    $('.edit-user').hide();
    $('.main-content').hide();
    $('.notification-panel').hide();
    $('.chatWithAdmin').hide();
    $('#current-panel').html('Báo cáo bài đăng');
}
// Nhắn tin
function btnMessageOnclick() {
    $('.chatWithAdmin').show();
    $('.statistic-content').hide();
    $('.report-content').hide();
    $('.edit-user').hide();
    $('.main-content').hide();
    $('.notification-panel').hide();
    $('#current-panel').html('Tin nhắn');
}
// Thông báo
function btnNotificationOnclick() {
    $('.notification-panel').show();
    $('.statistic-content').hide();
    $('.chatWithAdmin').hide();
    $('.report-content').hide();
    $('.edit-user').hide();
    $('.main-content').hide();
    $('#current-panel').html('Thông báo');
}
// Đăng tin
function btnHomePageOnclick() {
    window.location = '../trang-chu.html';
}

// ĐĂng xuất
function btnLogoutOnclick() {
    alert('Bạn chắc chắn muốn đăng xuất khỏi tài khoản?');
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

var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOlsidHJ1b25nOTExMmsiLCJvd25lciJdLCJuYW1laWQiOiIzNCIsImVtYWlsIjoidGhoQGdtYWlsLmNvbSIsImp0aSI6IjBlNTg2YWY5LTdmYTItNDg3NC1iMzllLTNlOGNhNmMwZDYwZCIsImV4cCI6MTYwODk3MDg2NCwiaXNzIjoiaHV5dHJ1b25nLmNvbSIsImF1ZCI6Imh1eXRydW9uZy5jb20ifQ.RCTTVsLQuEFU76NFXSRd1ShsJDyPQIJw6ThxeSnhdow");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

async function loadOwnerRoomData() {
    await fetch("http://fcbtruong-001-site1.itempurl.com/api/Post/GetPostOfUser", requestOptions)
    .then(resp => {
    if (resp.status == 200) {
        resp.json()
            .then(ret => {
                if (ret != null) {
                    $('#list-owner-post').empty();
                    var post = ret;console.log(post);
                    
                    for (let i = 0; i < post.length; i++) {
                        let r = showPost(post, i);
                        document.querySelector("tbody#list-owner-post").appendChild(r);
                    };
                    // document.getElementsByClassName("user_avatar").src = '../../content/images/avatar/' + post['owner']['avatar'];
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

// Format Date
function formDate(date) {
    var date = new Date(date);
    day = date.getDate();
    month = date.getMonth() + 1;
    year = date.getFullYear();
    return day + '/' + month + '/' + year;
}
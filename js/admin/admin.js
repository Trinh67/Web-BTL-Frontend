$(document).ready(function () {
    //if(window.localStorage.getItem('role') < 2) window.location = '../trang-chu.html';
    $('#statistic').click(btnStatisticOnClick);
    $('#owner-manager').click(btnOwnerOnclick);
    $('#customer-manager').click(btnCustomerOnclick);
    $('#post-manager').click(btnPostOnclick);
    $('#edit-infor').click(btnEditOnclick);
    $('#post-new').click(btnPostNewOnclick);
    $('#report').click(btnReportOnclick);
    $('#comments').click(btnCommentsOnclick);
    $('#message').click(btnMessageOnclick);
    $('#log-out').click(btnLogoutOnclick);
    $('#home-Page').click(btnHomePageOnclick);
    $('#notification').click(btnNotificationOnclick);
})
// Thống kê
function btnStatisticOnClick() {
    $('.statistic-content').show();
    $('.customerManage').hide();
    $('.ownerManage').hide();
    $('.main-content').hide();
    $('.edit-user').hide();
    $('.comments-content').hide();
    $('.report-content').hide();
    $('.chatWithAdmin').hide();
    $('.notification-panel').hide();
    $('#current-panel').html('Dữ liệu thống kê');
}
// Quản lí chủ trọ
function btnOwnerOnclick() {
    loadOwnerData();
    $('.ownerManage').show();
    $('.customerManage').hide();
    $('.main-content').hide();
    $('.comments-content').hide();
    $('.statistic-content').hide();
    $('.edit-user').hide();
    $('.report-content').hide();
    $('.chatWithAdmin').hide();
    $('.notification-panel').hide();
    $('#current-panel').html('Quản lí bài đăng');
}
// Quản lí chủ trọ
function btnCustomerOnclick() {
    loadCustomerData();
    $('.customerManage').show();
    $('.ownerManage').hide();
    $('.main-content').hide();
    $('.comments-content').hide();
    $('.statistic-content').hide();
    $('.edit-user').hide();
    $('.report-content').hide();
    $('.chatWithAdmin').hide();
    $('.notification-panel').hide();
    $('#current-panel').html('Quản lí bài đăng');
}
// Quản lí bài đăng
function btnPostOnclick() {
    loadOwnerRoomData();
    $('.main-content').show();
    $('.customerManage').hide();
    $('.ownerManage').hide();
    $('.comments-content').hide();
    $('.statistic-content').hide();
    $('.edit-user').hide();
    $('.report-content').hide();
    $('.chatWithAdmin').hide();
    $('.notification-panel').hide();
    $('#current-panel').html('Quản lí bài đăng');
}
// Quản lí bình luận
function btnCommentsOnclick(){
    loadCommentData();
    $('.comments-content').show();
    $('.ownerManage').hide();
    $('.customerManage').hide();
    $('.main-content').hide();
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
    $('.ownerManage').hide();
    $('.customerManage').hide();
    $('.statistic-content').hide();
    $('.comments-content').hide();
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
// Báo cáo
function btnReportOnclick() {
    loadReportData();
    $('.report-content').show();
    $('.ownerManage').hide();
    $('.customerManage').hide();
    $('.statistic-content').hide();
    $('.edit-user').hide();
    $('.comments-content').hide();
    $('.main-content').hide();
    $('.notification-panel').hide();
    $('.chatWithAdmin').hide();
    $('#current-panel').html('Báo cáo bài đăng');
}
// Nhắn tin
function btnMessageOnclick() {
    $('.chatWithAdmin').show();
    $('.ownerManage').hide();
    $('.customerManage').hide();
    $('.statistic-content').hide();
    $('.report-content').hide();
    $('.comments-content').hide();
    $('.edit-user').hide();
    $('.main-content').hide();
    $('.notification-panel').hide();
    $('#current-panel').html('Tin nhắn');
}
// Thông báo
function btnNotificationOnclick() {
    $('.notification-panel').show();
    $('.ownerManage').hide();
    $('.customerManage').hide();
    $('.statistic-content').hide();
    $('.comments-content').hide();
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

var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer " + window.localStorage.getItem("token"));

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

// Tải dữ liệu phòng trọ của chủ trọ
async function loadOwnerRoomData() {
	await fetch("http://fcbtruong-001-site1.itempurl.com/api/Post/AdminGetAllPosts", requestOptions)
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
var post_status = ['<span class="badge badge-pill badge-primary" style="padding: 10px; font-size: 0.8rem">Chờ phê duyệt</span>', '<span class="badge badge-pill badge-success" style="padding: 10px; font-size: 0.8rem">Đang hoạt động</span>', '<span class="badge badge-pill badge-warning" style="padding: 10px; font-size: 0.8rem">Từ chối phê duyệt</span>', '<span class="badge badge-pill badge-danger center" style="padding: 10px; font-size: 0.8rem">Hết hạn</span>']
let showPost = function (x, index) {
	// Tạo <tr> và các <td> mới 
	let r = document.createElement("tr");
	r.innerHTML = '<td>#' + x[index]['idPost'] + '</td>' +
                    '<td><span class="badge badge-pill badge-warning"> ' + category[x[index]['idCategory']] + '</span>' +
                    '<a class="" target="_blank"' +
                    'href="../chi-tiet-phong-tro/'+ x[index]['slug'] + '.html"' +
                    'style="color: #055699;">' + x[index]['title'] + '</a>' +
                    '</td>' +
                    '<td>' + x[index]['price'].toLocaleString('it-IT') + ' đ/ tháng</td>' +
                    '<td>' + formDate(x[index]['createdAt']) + '</td>' +
                    '<td>' + formDate(x[index]['expireDate']) + '</td>' +
                    '<td>#' + x[index]['idUser'] + '</td>' +
                    '<td>' + post_status[x[index]['status']] + '</td>' +
                    '<td>' +
                        '<div class="dropdown dropleft float-right">' +
                            '<button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">' +
                                'Action' +
                            '</button>' +
                            '<div class="dropdown-menu">' +
                                '<a class="dropdown-item text-success" href="#"><i class="fas fa-check-square"></i> Kiểm duyệt</a>' +
                                '<a class="dropdown-item text-warning" href="#"><i class="fas fa-times-circle"></i> Từ chối kiểm duyệt</a>' +
                                '<a class="dropdown-item text-danger" href="#"><i class="fas fa-times"></i> Xóa</a>' +
                            '</div>' +
                            '</div>' +
                    '</td>';
	return r;
};
// Tải danh sách chủ Trọ
async function loadOwnerData(){

}

// Tải danh sách chủ Trọ
async function loadCustomerData(){

}

// Tải dữ liệu báo cáo của người dùng
async function loadReportData(){
    await fetch("http://fcbtruong-001-site1.itempurl.com/api/Report/GetReports", requestOptions)
    .then(resp => {
        if (resp.status == 200) {
            resp.json()
                .then(ret => {
                    if (ret != null) {
                      $('#list-report').empty();
                      var post = ret;
                      for (let i = 0; i < post.length; i++) {
                          let r = showReport(post, i);
                          document.querySelector("tbody#list-report").appendChild(r);
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
// Tạo báo cáo
var report_type = ['<span class="badge badge-pill badge-danger">Sai nội dung</span>', '<span class="badge badge-pill badge-success">Đã cho thuê</span>'];
let showReport = function (x, index) {
	// Tạo <tr> và các <td> mới 
	let r = document.createElement("tr");
	r.innerHTML = '<td> #' + x[index]['idPost'] + '</td>' +
                    '<td><span class="badge badge-pill badge-warning"> ' + category[x[index]['idCategory']] + '</span>' +
                    '<a class="" target="_blank"' +
                    'href="../chi-tiet-phong-tro/'+ x[index]['slug'] + '.html"' +
                    'style="color: #055699;">' + x[index]['title'] + '</a>' +
                    '</td>' +
                    '<td>' + report_type[x[index]['reportType']] + '</td>' +
                    '<td>' + x[index]['content'] + '</td>' +
                    '<td> #' + x[index]['idUser'] + '</td>' +
                    '<td>' + formDate(x[index]['createdAt']) + '</td>';
	return r;
};

// Tải dữ liệu Reviews
async function loadCommentData(){
    await fetch("http://fcbtruong-001-site1.itempurl.com/api/ReviewPost/GetReviewPending", requestOptions)
    .then(resp => {
        if (resp.status == 200) {
            resp.json()
                .then(ret => {
                    if (ret != null) {
                      $('#list-review').empty();
                      var post = ret;
                      for (let i = 0; i < post.length; i++) {
                          let r = showReview(post, i);
                          document.querySelector("tbody#list-review").appendChild(r);
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
//Tạo review
var category = ['Phòng trọ cho thuê', 'Chung cư mini', 'Nhà nguyên căn', 'Chung cư nguyên căn']
var review_type = ['<span class="fa fa-star checked"></span>', '<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span>', '<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span>', '<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span>', '<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span>'];
let showReview = function (x, index) {
	// Tạo <tr> và các <td> mới 
	let r = document.createElement("tr");
	r.innerHTML = '<td> #' + x[index].rv['idPost'] + '</td>' +
                    '<td><span class="badge badge-pill badge-warning"> ' + category[x[index].idCategory - 1] + '</span>' +
                    '<a class="" target="_blank"' +
                    'href="../chi-tiet-phong-tro/'+ x[index].slug + '.html"' +
                    'style="color: #055699;">' + x[index].title + '</a>' +
                    '</td>' +
                    '<td>' + x[index].rv['content'] + '</td>' +
                    '<td>' + review_type[x[index].rv['rating'] - 1] + '</td>' +
                    '<td> #' + x[index].rv['idUser'] + '</td>' +
                    '<td>' + formDate(x[index].rv['createdAt']) + '</td>' +
                    '<td>' +
                        '<div class="dropdown dropleft float-right">' +
                            '<button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">' +
                                'Action' +
                            '</button>' +
                            '<div class="dropdown-menu">' +
                                '<a class="dropdown-item text-success" href="#"><i class="fas fa-check-square"></i> Kiểm duyệt</a>' +
                                '<a class="dropdown-item text-warning" href="#"><i class="fas fa-times-circle"></i> Từ chối kiểm duyệt</a>' +
                                '<a class="dropdown-item text-danger" href="#"><i class="fas fa-times"></i> Xóa</a>' +
                            '</div>' +
                        '</div>' +
                    '</td>';
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

// Tìm kiếm trong bảng
function PostFunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("post-table");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[6];
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
  function ReportFunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("ReportInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("report-table");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[2];
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
  function ReviewFunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("ReviewsInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("comment-table");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[2];
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
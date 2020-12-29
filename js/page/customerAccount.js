$(document).ready(function () {
    //if(window.localStorage.getItem('role') < 1) window.location = 'trang-chu.html';
    document.getElementById('user-name').innerHTML = window.localStorage.getItem('userName');
    document.getElementById('phoneNumber').innerHTML = window.localStorage.getItem('phone');
    loadFavoriteRoomData();
    $('#list-favorite-post').click(btnListFavoriteOnclick);
    $('#edit-infor').click(btnEditOnclick);
    $('#log-out').click(btnLogoutOnclick);
})

// Bài đăng yêu thích thích
function btnListFavoriteOnclick() {
    loadFavoriteRoomData();
    $('.list-favorite-post').show();
    $('.main-content').hide();
    $('.edit-user').hide();
    $('.recharge-panel').hide();
    $('.chatWithAdmin').hide();
    $('.notification-panel').hide();
    $('#current-panel').html('Bài đăng yêu thích');
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
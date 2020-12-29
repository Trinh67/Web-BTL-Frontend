$(document).ready(function () {
	loadNewsRoomDetails();
	$('#save-post').click(checkLoginToSave);
	$('#review-send-button').click(checkLoginToReview);
	$('#report-send-button').click(checkLoginToReport);
})

var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer " + window.localStorage.getItem("token"));
myHeaders.append("Content-Type", "application/json");

var idPost;
// Lấy tham số trên url
function GetURLParameter(url) {
	var slug = url.split('/').pop();
	return slug.substr(0, slug.length - 5);
}

// Tạo <Utility>
let showUtility = function (x, index) {
	let uti = ["", "Khép kín", "Nóng lạnh", "Ban công", "Điều hòa", "Giờ giấc tự do", "Vệ sinh riêng", "Wifi miễn phí", "Không chung chủ"];
	// Tạo phần tử
	if(x[index] == 8) document.getElementById('isGeneral').innerHTML = uti[x[index]]; 
	let r = document.createElement("span");
	r.innerHTML = '<i class="fas fa-check"></i> ' + uti[x[index]];
	return r;
};
// Tạo slides ảnh phòng trọ
let showImages = function (x, index) {
	// Tạo component mới
	let r = document.createElement("div");
	r.classList.add("carousel-item");
	if(index == 0) r.classList.add("active");
	r.innerHTML ='<img src="http://fcbtruong-001-site1.itempurl.com/api/Image/GetImage?subDir=posts/' + x.post["idPost"] + '/' + x.images[index] + '" alt="Image 1" style="width:80%; height: 450px">';
	return r;
};
// Tạo <Comment>
let showComment = function (x, index) {
	// Tạo component mới
	let r = document.createElement("div");
	let i = index;
	r.innerHTML = '<div class="media"><div class="media-left"><img class="media-object" src="../content/images/avatar/' + x[i]['commenter']['avatar'] + '" alt=""></div><div class="media-body"><div class="media-heading"><h4>' + x[i]['commenter']['name'] + '</h4><span class="time">' + formDate(x[i]['comment']['createdAt']) + '</span><a href="#" class="reply">Reply     </a><span class="fa fa-star checked"></span>' +
	'<span class="fa fa-star checked"></span>' +
	'<span class="fa fa-star checked"></span>' + 
	'<span class="fa fa-star checked"></span>' +
	'<span class="fa fa-star"></span><div><p>' + x[i]['comment']['content'] + '</p></div></div>';
	return r;
};
//
// XỬ LÝ CÁC SỰ KIỆN
//
//
// Tải trang: Lấy thông tin phòng trọ
async function loadNewsRoomDetails() {
	await fetch("http://fcbtruong-001-site1.itempurl.com/api/Post/GetPostInforBySlug?slug=" + GetURLParameter(document.URL))
	.then(resp => {
		if (resp.status == 200) {
			resp.json()
				.then(ret => {
					if (ret.motelInfor != null) {
						idPost = ret.post['idPost'];
						var utility = JSON.parse(ret.motelInfor['idUtility']);
						for (let i = 0; i < utility.length; i++) {
							let r = showUtility(utility, i);
							document.querySelector("div.utility").appendChild(r);
						};
						document.querySelector("a.category-name").href = '../danh-muc/' + ret.category['slug'] + '.html';
						document.querySelector("a.category-name").innerHTML = ret.category['cateroryName'];
						document.querySelector("li.title-page").innerHTML = ret.motelInfor['title'];
						document.querySelector("p.entry-title").innerHTML = ret.motelInfor['title'];
						document.querySelector("span#favorite").innerHTML = ret.likes + ' lượt thích';
						document.querySelector("span.price-time").innerHTML = 'Lượt xem: ' + ret.motelInfor['views'] + ' - Ngày đăng: ' + formDate(ret.post['createdAt']);
						document.querySelector("strong.address").innerHTML = 'Địa chỉ: ' + ret.motelInfor['address'];
						document.querySelector("span#price-2").innerHTML = ret.motelInfor['price'].toLocaleString('it-IT') + ' VND';
						document.querySelector("span#area").innerHTML = ret.motelInfor['area'] + ' m <sup> 2</sup>';
						// Images
						for (let i = 0; i < ret.images.length; i++) {
							let r = showImages(ret, i);
							document.querySelector("div.image-slides").appendChild(r);
						};
						// Comments
						document.querySelector("p.description").innerHTML = ret.motelInfor['description'];
						document.querySelector("h5.count-comment").innerHTML = 'Bài viết có ' + ret.comments.length + ' bình luận';
						for (let i = 0; i < ret.comments.length; i++) {
							let r = showComment(ret.comments, i);
							document.querySelector("div.post-comments").appendChild(r);
						};
						//Owner
						document.querySelector("div#avatar").innerHTML = '<img src="../content/images/avatar/' + ret.owner['avatar'] + '" class="user_avatar" alt="Avatar" width="100" height="100">';
						document.querySelector("strong.owner-name").innerHTML = ret.owner['name'];
						document.querySelector("span.owner-phone").innerHTML = 'SĐT: ' + ret.owner['phone'];
						//Map
						var position = JSON.parse(ret.motelInfor['position']);
						initMap(parseFloat(position['x']), parseFloat(position['y']));
					} else {
						// Có lỗi xử lý nghiệp vụ
						document.getElementById("demo").innerHTML = "Error!";
					}
				});
		} else {
			// Có lỗi HTTP
			document.getElementById("demo").innerHTML = "Error!";
		}
	});
}

// Map
function initMap(x, y) {
	var map;
	map = new google.maps.Map(document.getElementById('map-detail'), {
		center: { lat: x, lng: y },
		zoom: 15,
		draggable: true
	});
	if (map != "") {
		var latlng = new google.maps.LatLng(x, y);
		var phongtro = new google.maps.Marker({
			position: latlng,
			map: map,
			title: 'Phòng',
			icon: "../content/images/map/gps.png",
			content: 'Phòng trọ'
		});
		google.maps.event.addListener(map, 'mousemove', function (e) {
			document.getElementById("flat").innerHTML = e.latLng.lat().toFixed(6);
			document.getElementById("lng").innerHTML = e.latLng.lng().toFixed(6);

		});
	} else {
		document.getElementById("map-detail").innerHTML = '<img src="../content/images/map/default-map.png">';
	}
}

// Format Date
function formDate(date) {
    var date = new Date(date);
    day = date.getDate();
    month = date.getMonth() + 1;
    year = date.getFullYear();
    return day + '/' + month + '/' + year;
}

// Gửi review
// Kiểm tra dữ liệu review
var rate, requestOptions, report_type;
function checkValue(){
    if($("#review-content").val() == "") {alert('Bạn chưa nhập bình luận!'); return false;}
    // Kiểm tra dữ liệu đã được điền đủ chưa
    for(let i = 0; i < $('input[name=rate]').length; i++) {
        if($('input[name=rate][value=' + (i+1) + ']').prop("checked")) {rate = i+1;return true;}
    }
    alert('Bạn chưa đánh giá!'); 
    return false;
}

function postReview(){
	// Lấy dữ liệu
	var raw = JSON.stringify({"idPost": idPost,"content":$("#review-content").val(),"rate":rate});
	requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: raw,
		redirect: 'follow'
	  };
	PostToServer();
}
async function PostToServer(){
	await fetch("http://fcbtruong-001-site1.itempurl.com/api/ReviewPost/PostReview", requestOptions)
	.then(resp => {
	  if (resp.status == 200) alert('Bình luận đã được gửi thành công!')}
	  )
	.catch(error => console.log('error', error));
}
function checkLoginToReview(){
    if(!checkUser()) alert('Bạn phải đăng nhập mới có thể bình luận bài đăng!')
    else {
        if(checkValue()){
			postReview();
        }
    }
}

// Gửi báo cáo
function checkLoginToReport(){
    if(!checkUser()) alert('Bạn phải đăng nhập mới có thể báo cáo bài đăng!')
    else {
        if(checkValueReport()){
			postReport();
        }
    }
}
function checkValueReport(){
    if($(".report-content").val() == "") {alert('Bạn chưa nhập chi tiết báo cáo!'); return false;}
    // Kiểm tra dữ liệu đã được điền đủ chưa
    for(let i = 0; i < $('input[type=radio]').length; i++) {
        if($('input[type=radio][name=report-type][value=' + (i+1) + ']').prop("checked")) {report_type = i+1;return true;}
    }
    alert('Bạn chưa đánh giá!'); 
    return false;
}
function postReport(){
	// Lấy dữ liệu
	var raw = JSON.stringify({"idPost": idPost,"content":$(".report-content").val(),"reportType":report_type});
	requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: raw,
		redirect: 'follow'
	  };
	PostReportToServer();
}
async function PostReportToServer(){
	await fetch("http://fcbtruong-001-site1.itempurl.com/api/Report/SendReport", requestOptions)
	.then(resp => {
	  if (resp.status == 200) alert('Báo cáo đã được gửi thành công!')}
	  )
	.catch(error => console.log('error', error));
}

// Lưu tin yêu thích
function checkLoginToSave(){
    if(!checkUser()) alert('Bạn phải đăng nhập mới có thể lưu bài đăng!')
    else {
			SavePost();
        }
}
function SavePost(){
	// Lấy dữ liệu
	var raw = JSON.stringify({"idPost": idPost,"content":$("#review-content").val(),"rate":rate});
	requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: raw,
		redirect: 'follow'
	  };
	SaveToServer();
}
async function SaveToServer(){
	await fetch("http://fcbtruong-001-site1.itempurl.com/api/FavoritePost/FavorPost?idPost=" + idPost, requestOptions)
	.then(resp => {
	  	if (resp.status == 200) {
		  	alert('Bài viết đã lưu thành công!');
			window.location.reload();
		}
		else alert('Bài viết đã được lưu trước đó!');
		}
	  )
	.catch(error => console.log('error', error));
}

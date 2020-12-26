$(document).ready(function () {
    loadNewsRoomDetails();
})
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
	r.innerHTML = '<div class="media"><div class="media-left"><img class="media-object" src="../content/images/avatar/' + x[i]['commenter']['avatar'] + '" alt=""></div><div class="media-body"><div class="media-heading"><h4>' + x[i]['commenter']['name'] + '</h4><span class="time">' + x[i]['comment']['createdAt'] + '</span><a href="#" class="reply">Reply</a><div><p>' + x[i]['comment']['content'] + '</p></div></div>';
	return r;
};
//
// XỬ LÝ CÁC SỰ KIỆN
//
//
// Tải trang: Lấy danh sách sinh viên
async function loadNewsRoomDetails() {
	await fetch("http://fcbtruong-001-site1.itempurl.com/api/Post/GetPostInforBySlug?slug=" + GetURLParameter(document.URL))
	.then(resp => {
		if (resp.status == 200) {
			resp.json()
				.then(ret => {
					if (ret.motelInfor != null) {
						var utility = JSON.parse(ret.motelInfor['idUtility']);
						for (let i = 0; i < utility.length; i++) {
							let r = showUtility(utility, i);
							document.querySelector("div.utility").appendChild(r);
						};
						document.querySelector("a.category-name").href = '../danh-muc/' + ret.category['slug'] + '.html';
						document.querySelector("a.category-name").innerHTML = ret.category['cateroryName'];
						document.querySelector("li.title-page").innerHTML = ret.motelInfor['title'];
						document.querySelector("p.entry-title").innerHTML = ret.motelInfor['title'];
						document.querySelector("span#favorite").innerHTML = ret.motelInfor['likes'] + ' lượt thích';
						document.querySelector("span.price-time").innerHTML = 'Lượt xem: ' + ret.motelInfor['views'] + ' - Ngày đăng: ' + formDate(ret.post['createdAt']);
						document.querySelector("strong.address").innerHTML = 'Địa chỉ: ' + ret.motelInfor['address'];
						document.querySelector("span#price-2").innerHTML = ret.motelInfor['price'].toLocaleString('it-IT') + ' VND';
						document.querySelector("span#area").innerHTML = ret.motelInfor['area'] + ' m <sup> 2</sup>';
						// Images
						for (let i = 0; i < ret.images.length; i++) {
							let r = showImages(ret, i);
							console.log(r);
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
						console.log(position[1]);
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


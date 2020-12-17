// Lấy tham số trên url
function GetURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}

// Tạo <Utility>
let showUtility = function (x, index) {
	// Tạo <tr> và các <td> mới
	let r = document.createElement("span");
	r.innerHTML = '<i class="fas fa-check"></i> ' + x[index];
	return r;
};
//
// Tạo <Comment>
let showComment = function (x, index) {
	// Tạo <tr> và các <td> mới
	let r = document.createElement("div");
	let i = index;
	r.innerHTML = '<div class="media"><div class="media-left"><img class="media-object" src="../../content/images/avatar/' + x[i]['commenter']['avatar'] + '" alt=""></div><div class="media-body"><div class="media-heading"><h4>' + x[i]['commenter']['name'] + '</h4><span class="time">' + x[i]['comment']['createdAt'] + '</span><a href="#" class="reply">Reply</a><div><p>' + x[i]['comment']['content'] + '</p></div></div>';
	return r;
};
//
// XỬ LÝ CÁC SỰ KIỆN
//
//
// Tải trang: Lấy danh sách sinh viên
fetch("http://fcbtruong-001-site1.itempurl.com/api/Post/GetPostInforBySlug?slug=" + GetURLParameter('slug'))
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
						document.querySelector("li.title-page").innerHTML = ret.motelInfor['title'];
						document.querySelector("p.entry-title").innerHTML = ret.motelInfor['title'];
						document.querySelector("span#favorite").innerHTML = ret.motelInfor['likes'] + ' lượt thích';
						document.querySelector("span.price-time").innerHTML = 'Lượt xem: ' + ret.motelInfor['views'] + ' - Ngày đăng: ' + formDate(ret.motelInfor['createdAt']);
						document.querySelector("strong.address").innerHTML = 'Địa chỉ: ' + ret.motelInfor['address'];
						document.querySelector("span#price-2").innerHTML = ret.motelInfor['price'].toLocaleString('it-IT') + ' VND';
						document.querySelector("span#area").innerHTML = ret.motelInfor['area'] + ' m <sup> 2</sup>';
						// Utility update later
						document.querySelector("p.description").innerHTML = ret.motelInfor['description'];
						document.querySelector("h5.count-comment").innerHTML = 'Bài viết có ' + ret.comments.length + ' bình luận';
						for (let i = 0; i < ret.comments.length; i++) {
							let r = showComment(ret.comments, i);
							document.querySelector("div.post-comments").appendChild(r);
						};
						//Owner
						document.querySelector("div#avatar").innerHTML = '<img src="../../content/images/avatar/' + ret.owner['avatar'] + '" class="user_avatar" alt="Avatar" width="100" height="100">';
						document.querySelector("strong.owner-name").innerHTML = ret.owner['name'];
						document.querySelector("span.owner-phone").innerHTML = 'SĐT: ' + ret.owner['phone'];
						//Map
						var position = JSON.parse(ret.motelInfor['position']);
						console.log(position[1]);
						initMap(parseFloat(position[0]), parseFloat(position[1]));
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
			icon: "../../content/images/map/gps.png",
			content: 'Phòng trọ'
		});
		google.maps.event.addListener(map, 'mousemove', function (e) {
			document.getElementById("flat").innerHTML = e.latLng.lat().toFixed(6);
			document.getElementById("lng").innerHTML = e.latLng.lng().toFixed(6);

		});
	} else {
		document.getElementById("map-detail").innerHTML = '<img src="../../content/images/map/default-map.png">';
	}
}

// Format Date
function formDate(date) {
    var date = new Date(date);
    day = date.getDate();
    month = date.getMonth() + 1;
    year = date.getFullYear();
    console.log(date);
    return day + '/' + month + '/' + year;
}


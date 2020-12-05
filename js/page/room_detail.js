// Tạo <Utility>
let showUtility = function (x) {
	// Tạo <tr> và các <td> mới
	let r = document.createElement("span");
	for (let i = 0; i < x.length; ++i) {
		r.innerHTML = '<i class="fas fa-check"></i>' + x[i];
    }
	console.log(r);
	return r;
};
//
// Tạo <Comment>
let showComment = function (x) {
	// Tạo <tr> và các <td> mới
	let r = document.createElement("div");
	for (let i = 0; i < x.length; ++i) {
		r.innerHTML = '<div class="media"><div class="media-left" ><img class="media-object" src="../../content/images/avatar/' + x[i]['commenter']['avatar'] +'" alt=""></div><div class="media-body"><div class="media-heading"><h4>' + x[i]['commenter']['name'] + '</h4><span class="time">' + x[i]['comment']['createdAt'] + '</span><a href="#" class="reply">Reply</a><div><p>' + x[i]['comment']['content'] + '</p></div></div >';
	}
	console.log(r);
	return r;
};
//
// XỬ LÝ CÁC SỰ KIỆN
//
//
// Tải trang: Lấy danh sách sinh viên
fetch("http://fcbtruong-001-site1.itempurl.com/api/Post/GetPostInfor?idPost=2")
	.then(resp => {
		if (resp.status == 200) {
			resp.json()
				.then(ret => {
					if (ret.motelInfor != null) {
						let r = showUtility(ret.motelInfor['idUtility']);
						document.querySelector("li.title-page").innerHTML = ret.motelInfor['title'];
						document.querySelector("p.entry-title").innerHTML = ret.motelInfor['title'];
						document.querySelector("span#price-1").innerHTML = ret.motelInfor['price'] + ' VND';
						document.querySelector("span.price-time").innerHTML = 'Lượt xem: ' + ret.motelInfor['views'] + ' - Ngày đăng: ' + ret.motelInfor['createdAt'];
						document.querySelector("strong.address").innerHTML = 'Địa chỉ: ' + ret.motelInfor['address'];
						document.querySelector("span#price-2").innerHTML = ret.motelInfor['price'] + ' VND';
						document.querySelector("span#area").innerHTML = ret.motelInfor['area'] + ' m <sup> 2</sup>';
						// Utility update later
						document.querySelector("p.description").innerHTML = ret.motelInfor['description'];
						document.querySelector("h4.count-comment").innerHTML = ret.comments.length + ' Comments';
						if (ret.comments.length > 0) {
							let r = showComment(ret.comments);
							document.querySelector("div.post-comments").appendChild(r);
						};
						//Owner
						document.querySelector("div#avatar").innerHTML = '<img src="../../content/images/avatar/'+ ret.owner['avatar'] +'" class="user_avatar" alt="Avatar" width="100" height="100">';
						document.querySelector("strong.owner-name").innerHTML =  ret.owner['name'];
						document.querySelector("span.owner-phone").innerHTML = 'SĐT: ' + ret.owner['phone'];
						//initMap(ret.motelInfor['position'][0], ret.motelInfor['position'][1]);
						initMap(21.038477813641833, 105.78266468178539);
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
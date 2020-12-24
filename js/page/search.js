$(document).ready(function () {
    loadRoomData();
})

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

// Cập nhập DOM
async function loadRoomData() {
    // thực hiện load dữ liệu
    // 1.Lấy dữ liệu
    await fetch("http://fcbtruong-001-site1.itempurl.com/api/Post/GetPosts?idCategory=" + GetURLParameter('idCategory') + "&number=" + GetURLParameter('number') + "&idDistrict=" + GetURLParameter('idDistrict') + "&idUtility=" + GetURLParameter('idUtility') + "&minPrice=" + GetURLParameter('minPrice') + "&maxPrice=" + GetURLParameter('maxPrice') + "&minArea=" + GetURLParameter('minArea') + "&maxArea=" + GetURLParameter('maxArea'))
    .then(resp => {
		if (resp.status == 200) {
			resp.json()
				.then(response => {
                    $('.search-list-room').empty();
                    for (var i = 0; i < response.length; i++) {
                        console.log("Hi");
                        fetch("http://fcbtruong-001-site1.itempurl.com/api/Post/GetPostInfor?idPost=" + response[i])
                        .then(res => {
                            if (res.status == 200) {
                                res.json()
                                    .then(ret => {
                                        var trHTML = '<div class="room-item-vertical">'+
                                        '<div class="row">'+
                                            '<div class="col-md-4">'+
                                                '<div class="wrap-img-vertical" style="background: url(http://fcbtruong-001-site1.itempurl.com/api/Image/GetImage?subDir=posts/' + ret.post["idPost"] + '/' + ret.images[0] + ') center;background-size: cover;">'+
                                                    '<div class="category">'+
                                                        '<a href="chi-tiet-phong-tro/' + ret.motelInfor['slug'] + '.html">' + ret.category['cateroryName'] + '</a>'+
                                                    '</div>'+
                                                '</div>'+
                                            '</div>'+
                                            '<div class="col-md-8">'+
                                                '<div class="room-detail">'+
                                                    '<h4><a href="chi-tiet-phong-tro/' + ret.motelInfor['slug'] + '.html">' + ret.motelInfor['title'] + '</a></h4>'+
                                                    '<div class="room-meta">'+
                                                        '<span><i class="fas fa-user-circle"></i> Người đăng: <a href="/">' + ret.owner['name'] + '</a></span><br/>'+
                                                        '<span class="pull-left"><i class="far fa-clock"></i>'+
                                                            ' Created at: ' + formDate(ret.post['createdAt']) +
                                                        '</span>'+
                                                    '</div>'+
                                                    '<br/>'+
                                                    '<div class="room-info">'+
                                                        '<span><i class="far fa-stop-circle"></i> Diện tích: <b>'+  ret.motelInfor['area'] +' m<sup>2</sup></b></span>'+
                                                        '<span class="pull-right"><i class="fas fa-eye"></i> Lượt xem: <b>' + ret.motelInfor['views'] + '</b></span>'+
                                                        '<div><i class="fas fa-map-marker"></i> ' + ret.motelInfor['address'] + '</div>'+
                                                        '<div style="color: #e74c3c"><i class="far fa-money-bill-alt"></i> Giá thuê: <b>' + ret.motelInfor['price'].toLocaleString('it-IT') + '</b></div>'+
                                                    '</div>'+
                                                '</div>'+
                                            '</div>'+
                                        '</div>'+
                                    '</div>';
                                    $('.search-list-room').append(trHTML);
                                })
                            }
                    })
                    }
                })
            }
    });
    // 2.Đọc dữ liệu

    // 3.Xử lí dữ liệu

    // 4.Đẩy dữ liệu vào HTML
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
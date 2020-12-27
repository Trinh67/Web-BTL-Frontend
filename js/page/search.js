$(document).ready(function () {
    loadRoomData(1);
    $('#index-1').click(function(){loadRoomData(1); $('#index-1').addClass('active'); $('#index-2, #index-3').removeClass('active'); return false;});
    $('#index-2').click(function(){loadRoomData(2); $('#index-2').addClass('active'); $('#index-1, #index-3').removeClass('active'); return false;});
    $('#index-3').click(function(){loadRoomData(3); $('#index-3').addClass('active'); $('#index-1, #index-2').removeClass('active'); return false;});
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

// Cập nhập giá trị cho min, max diện tích, giá
var minPrice, maxPrice, minArea, maxArea;
function getRangeValue(){
    let price = [0, 1000000, 1700000, 2500000, 3500000, 1000000000];
    let area = [0, 15, 25, 35, 1000];
    minArea = maxArea = minPrice = maxPrice = 0;
    switch (GetURLParameter('idArea')) {
        case "0":
            break;
        case "1":
            maxArea = area[1];
            break;
        case "2":
            minArea = area[1];
            maxArea = area[2];
            break;
        case "3":
            minArea = area[2];
            maxArea = area[3];
            break;
        case "4":
            minArea = area[3];
            maxArea = area[4];
            break;
        default:
            minArea = maxArea = area[0];
    }
    switch (GetURLParameter('idPrice')) {
        case "0":
            break;
        case "1":
            maxPrice = price[1];
            break;
        case "2":
            minPrice = price[1];
            maxPrice = price[2];
            break;
        case "3":
            minPrice = price[2];
            maxPrice = price[3];
            break;
        case "4":
            minPrice = price[3];
            maxPrice = price[4];
            break;
        case "5":
            minPrice = price[4];
            maxPrice = price[5];
            break;
        default:
            minPrice = maxPrice = price[0];
    }
}



// Cập nhập DOM
async function loadRoomData(index) {
    // thực hiện load dữ liệu
    // 1.Lấy dữ liệu
    getRangeValue();
    await fetch("http://fcbtruong-001-site1.itempurl.com/api/Post/GetPosts?idCategory=" + GetURLParameter('idCategory') + 
                "&number=" + GetURLParameter('number') + "&idDistrict=" + GetURLParameter('idDistrict') + 
                "&idUtility=" + GetURLParameter('idUtility') + "&minPrice=" + minPrice + "&maxPrice=" + maxPrice + "&minArea=" + minArea + "&maxArea=" + maxArea)
    .then(resp => {
		if (resp.status == 200) {
			resp.json()
				.then(response => {
                    $('.search-list-room').empty();
                    if(response.length > 0){
                        if(6*index > response.length) {
                            var notification = '<div class="alert bg-warning">' +
                            '<button type="button" class="close" data-dismiss="alert"><span>×</span><span class="sr-only">Close</span></button>' +
                            '<span class="textMessage">Không còn bài đăng!</span></div>' ;
                            $('.search-list-room').append(notification);
                        }
                        for (var i = 6*(index-1)+1; i <= 6*index; i++) {
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
                    }
                    else {
                            var txtNotification = '<div class="alert bg-warning" id="txtNotification">' +
                                                '<button type="button" class="close" data-dismiss="alert"><span>×</span><span class="sr-only">Close</span></button>' +
                                                '<span>Rất tiếc không có phòng nào phù hợp!</span>' +
                                                '</div>';
                            $('.search-list-room').append(txtNotification);};
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
    return day + '/' + month + '/' + year;
}
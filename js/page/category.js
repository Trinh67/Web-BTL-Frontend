$(document).ready(function () {
    loadRoomData(1);
    $('#index-1').click(function(){loadRoomData(1); $('#index-1').addClass('active'); $('#index-2, #index-3').removeClass('active'); return false;});
    $('#index-2').click(function(){loadRoomData(2); $('#index-2').addClass('active'); $('#index-1, #index-3').removeClass('active'); return false;});
    $('#index-3').click(function(){loadRoomData(3); $('#index-3').addClass('active'); $('#index-1, #index-2').removeClass('active'); return false;});
})

// Lấy tham số trên url
function GetURLParameter(url) {
	var slug = url.split('/').pop();
	return slug.substr(0, slug.length - 5);
}

// Cập nhập DOM
async function loadRoomData(index) {
    // thực hiện load dữ liệu
    // 1.Lấy dữ liệu
    await fetch("http://fcbtruong-001-site1.itempurl.com/api/Post/GetPostWithCategory?slug=" + GetURLParameter(document.URL) + "&number=40")
    .then(resp => {
		if (resp.status == 200) {
			resp.json()
				.then(response => {
                    $('.category-list-room').empty();
                    if(4*index > response.length) {
                        var notification = '<div class="alert bg-warning">' +
                        '<button type="button" class="close" data-dismiss="alert"><span>×</span><span class="sr-only">Close</span></button>' +
                        '<span class="textMessage">Không còn bài đăng!</span></div>' ;
                        $('.category-list-room').append(notification);
                    }
                    for (var i = 4*(index-1); i <= 4*index - 1; i++) {
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
                                                        '<a href=../chi-tiet-phong-tro/' + ret.motelInfor['slug'] + '.html>' + ret.category['cateroryName'] + '</a>'+
                                                    '</div>'+
                                                '</div>'+
                                            '</div>'+
                                            '<div class="col-md-8">'+
                                                '<div class="room-detail">'+
                                                    '<h4><a href=../chi-tiet-phong-tro/' + ret.motelInfor['slug'] + '.html>' + ret.motelInfor['title'] + '</a></h4>'+
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
                                    $('.title-holder').html(ret.category['cateroryName']);
                                    $('#current-page').html(ret.category['cateroryName']);
                                    $('.category-list-room').append(trHTML);
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
    return day + '/' + month + '/' + year;
}
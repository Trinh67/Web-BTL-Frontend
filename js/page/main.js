$(document).ready(function () {
    loadNewsRoomData();
    loadHotsRoomData(1);
    $('#index-1').click(function(){loadHotsRoomData(1); $('#index-1').addClass('active'); $('#index-2, #index-3').removeClass('active'); return false;});
    $('#index-2').click(function(){loadHotsRoomData(2); $('#index-2').addClass('active'); $('#index-1, #index-3').removeClass('active'); return false;});
    $('#index-3').click(function(){loadHotsRoomData(3); $('#index-3').addClass('active'); $('#index-1, #index-2').removeClass('active'); return false;});
})
// Tải dữ liệu phòng trọ mới nhất
function loadNewsRoomData() {
    // thực hiện load dữ liệu
    // 1.Lấy dữ liệu
    $.ajax({
        url: 'http://fcbtruong-001-site1.itempurl.com/api/Post/GetPosts?number=6',
        method: 'GET',
        data: null,
        dataType: 'json',
        contentType: 'application/json'
    }).done(function (response) {
        $('.room-news').empty();
        for (var i = 0; i < response.length; i++) {
            $.ajax({
                url: 'http://fcbtruong-001-site1.itempurl.com/api/Post/GetPostInfor?idPost=' + response[i],
                method: 'GET',
                data: null,
                dataType: 'json',
                contentType: 'application/json'
            }).done(function (ret) {
                var trHTML = '<div class="col-md-6 col-lg-4">'+
                                '<div class="room-item">'+
                                    '<div class="wrap-img" style="background: url(http://fcbtruong-001-site1.itempurl.com/api/Image/GetImage?subDir=posts/' + ret.post["idPost"] + '/' + ret.images[0] + ') center;background-size: cover;">'+
                                        '<div class="category detail-room">'+
                                            '<a href="chi-tiet-phong-tro/' + ret.motelInfor['slug'] + '.html">' + ret.category['cateroryName'] + '</a>'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="room-detail">'+
                                        '<h4><a href="chi-tiet-phong-tro/' + ret.motelInfor['slug'] + '.html" class="detail-room">' + ret.motelInfor['title'] + '</a></h4>'+
                                        '<div class="room-meta">'+
                                            '<span><i class="fas fa-user-circle"></i> Người đăng: <a href="/">' + ret.owner['name'] + '</a></span><br/>'+
                                            '<span class="pull-left"><i class="far fa-clock"></i>'+
                                                ' Created at:' + formDate(ret.post['createdAt']) +
                                            '</span>'+
                                        '</div>'+
                                        '<br/>'+
                                        '<div class="room-info">'+
                                            '<span><i class="far fa-stop-circle"></i> Diện tích: <b>'+  ret.motelInfor['area'] +' m<sup>2</sup></b></span>'+
                                            '<span class="pull-right"><i class="fas fa-eye"></i> Lượt xem: <b>' + ret.motelInfor['views'] + '</b></span>'+
                                            '<div><i class="fas fa-map-marker"></i> Địa chỉ: ' + ret.motelInfor['address'] + '</div>'+
                                            '<div style="color: #e74c3c"><i class="far fa-money-bill-alt"></i> Giá thuê: '+
                                                '<b>' + ret.motelInfor['price'].toLocaleString('it-IT') + ' VND</b></div>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                            '</div>';
                $('.room-news').append(trHTML);
            })
        }
    }).fail(function (response) {

    })
    // 2.Đọc dữ liệu

    // 3.Xử lí dữ liệu

    // 4.Đẩy dữ liệu vào HTML
}

// Tải dữ liệu phòng có nhiều lượt xem nhất
function loadHotsRoomData(index) {
    // thực hiện load dữ liệu
    // 1.Lấy dữ liệu
    $.ajax({
        url: 'http://fcbtruong-001-site1.itempurl.com/api/Post/GetPosts?startPoint=' + 4*(index-1) + '&number=4',
        method: 'GET',
        data: null,
        dataType: 'json',
        contentType: 'application/json'
    }).done(function (response) {
        $('.room-hots').empty();
        for (var i = 0; i < response.length; i++) {
            $.ajax({
                url: 'http://fcbtruong-001-site1.itempurl.com/api/Post/GetPostInfor?idPost=' + response[i],
                method: 'GET',
                data: null,
                dataType: 'json',
                contentType: 'application/json'
            }).done(function (ret) {
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
                $('.room-hots').append(trHTML);
            })
        }
    }).fail(function (response) {

    })
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
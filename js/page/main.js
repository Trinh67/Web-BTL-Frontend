﻿$(document).ready(function () {
    loadNewsRoomData();
    loadHotsRoomData();
})

// Tải dữ liệu phòng trọ mới nhất
function loadNewsRoomData() {
    // thực hiện load dữ liệu
    // 1.Lấy dữ liệu
    $.ajax({
        url: 'http://fcbtruong-001-site1.itempurl.com/api/Post/GetPosts?number=2',
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
                                    '<div class="wrap-img" style="background: url(../../content/images/room/phongtro1.jpg) center;background-size: cover;">'+
                                        '<div class="category detail-room">'+
                                            '<a href="room_detail.html">Phòng trọ cho thuê</a>'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="room-detail">'+
                                        '<h4><a href="room_detail.html" class="detail-room">' + ret.motelInfor['title'] + '</a></h4>'+
                                        '<div class="room-meta">'+
                                            '<span><i class="fas fa-user-circle"></i> Người đăng: <a href="/">' + ret.owner['name'] + '</a></span><br/>'+
                                            '<span class="pull-left"><i class="far fa-clock"></i>'+
                                                ' Created at:' + formDate(ret.motelInfor['createdAt']) +
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
function loadHotsRoomData() {
    // thực hiện load dữ liệu
    // 1.Lấy dữ liệu
    $.ajax({
        url: 'http://fcbtruong-001-site1.itempurl.com/api/Post/GetPosts?number=4',
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
                                        '<div class="wrap-img-vertical" style="background: url(../../content/images/room/phongtro1.jpg) center;background-size: cover;">'+
                                            '<div class="category">'+
                                                '<a href="#">Chung cư mini</a>'+
                                            '</div>'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="col-md-8">'+
                                        '<div class="room-detail">'+
                                            '<h4><a href="room_detail.html?slug=' + ret.motelInfor['slug'] + '">' + ret.motelInfor['title'] + '</a></h4>'+
                                            '<div class="room-meta">'+
                                                '<span><i class="fas fa-user-circle"></i> Người đăng: <a href="/">' + ret.owner['name'] + '</a></span><br/>'+
                                                '<span class="pull-left"><i class="far fa-clock"></i>'+
                                                    ' Created at: ' + formDate(ret.motelInfor['createdAt']) +
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
    console.log(date);
    return day + '/' + month + '/' + year;
}
$(document).ready(function () {
    //loadData();
    $('#post-manager').click(btnPostOnclick);
    $('#edit-infor').click(btnEditOnclick);
    $('#post-new').click(btnPostNewOnclick);
    $('#recharge').click(btnRechargeOnclick);
    $('#message').click(btnMessageOnclick);
    $('#log-out').click(btnLogoutOnclick);
    $('#notification').click(btnNotificationOnclick);
    $('#dt-fixed-footer').dataTable({
        "paging": false,
        "fnInitComplete": function () {
          var myCustomScrollbar = document.querySelector('#dt-fixed-footer_wrapper .dataTables_scrollBody');
          var ps = new PerfectScrollbar(myCustomScrollbar);
        },
        "scrollY": 450,
    });
})
// Quản lí bài đăng
function btnPostOnclick() {
    $('.main-content').show();
    $('.edit-user').hide();
    $('.recharge-panel').hide();
    $('.chatWithAdmin').hide();
    $('.notification-panel').hide();
    $('#current-panel').html('Quản lí bài đăng');
}
// Cập nhập tài khoản
function btnEditOnclick() {
    $('.edit-user').show();
    $('.main-content').hide();
    $('.recharge-panel').hide();
    $('.chatWithAdmin').hide();
    $('.notification-panel').hide();
    $('#current-panel').html('Cập nhập tài khoản');
}
// Đăng tin
function btnPostNewOnclick() {
    window.location = 'dang-tin-moi.html';
}
// Nạp tiền
function btnRechargeOnclick() {
    $('.recharge-panel').show();
    $('.edit-user').hide();
    $('.main-content').hide();
    $('.notification-panel').hide();
    $('.chatWithAdmin').hide();
    $('#current-panel').html('Nạp tiền');
}
// Nhắn tin
function btnMessageOnclick() {
    $('.chatWithAdmin').show();
    $('.recharge-panel').hide();
    $('.edit-user').hide();
    $('.main-content').hide();
    $('.notification-panel').hide();
    $('#current-panel').html('Tin nhắn');
}
// Thông báo
function btnNotificationOnclick() {
    $('.notification-panel').show();
    $('.chatWithAdmin').hide();
    $('.recharge-panel').hide();
    $('.edit-user').hide();
    $('.main-content').hide();
    $('#current-panel').html('Thông báo');
}

// ĐĂng xuất
function btnLogoutOnclick() {
    alert('Bạn chắc chắn muốn đăng xuất khỏi tài khoản?');
}

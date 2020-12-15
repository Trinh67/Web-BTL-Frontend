$(document).ready(function () {
    //loadData();
    $('#post-manager').click(btnPostOnclick);
    $('#edit-infor').click(btnEditOnclick);
    $('#post-new').click(btnPostNewOnclick);
    $('#recharge').click(btnRechargeOnclick);
    $('#log-out').click(btnLogoutOnclick);
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
    $('.recharge-page').hide();
    $('#current-panel').html('Quản lí bài đăng');
}
// Cập nhập tài khoản
function btnEditOnclick() {
    $('.edit-user').show();
    $('.main-content').hide();
    $('.recharge-page').hide();
    $('#current-panel').html('Cập nhập tài khoản');
}
// Đăng tin
function btnPostNewOnclick() {
    window.location = 'post_new.html';
}
// Nạp tiền
function btnRechargeOnclick() {
    $('.recharge-page').show();
    $('.edit-user').hide();
    $('.main-content').hide();
    $('#current-panel').html('Nạp tiền');
}
// ĐĂng xuất
function btnLogoutOnclick() {
    alert('Bạn chắc chắn muốn đăng xuất khỏi tài khoản?');
}

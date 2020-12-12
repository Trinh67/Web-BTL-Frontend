$(document).ready(function () {
    //loadData();
    $('#post-manager').click(btnPostOnclick);
    $('#edit-infor').click(btnEditOnclick);
    $('#post-new').click(btnPostNewOnclick);
    $('#recharge').click(btnRechargeOnclick);
    $('#log-out').click(btnLogoutOnclick);
})
function btnPostOnclick() {
    $('.main-content').show();
    $('.edit-user').hide();
    $('.recharge-page').hide();
    $('#current-panel').html('Quản lí bài đăng');
}
function btnEditOnclick() {
    $('.edit-user').show();
    $('.main-content').hide();
    $('.recharge-page').hide();
    $('#current-panel').html('Cập nhập tài khoản');
}
function btnPostNewOnclick() {
    window.location = 'dangtin.html';
}
function btnRechargeOnclick() {
    $('.recharge-page').show();
    $('.edit-user').hide();
    $('.main-content').hide();
    $('#current-panel').html('Nạp tiền');
}
function btnLogoutOnclick() {
    alert('Bạn chắc chắn muốn đăng xuất khỏi rài khoản?');
}

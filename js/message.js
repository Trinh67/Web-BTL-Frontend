$(document).ready(function () {
    //loadData();
    $('#livechat').click(toggleFacebookLiveChat);
})

// Nhắn tin với Admin
function toggleFacebookLiveChat(){
    $('.message-box').toggle()();
}
function removeFacebookLiveChat() {
    $('.message-box').hide();
}
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v2.9&appId=#";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
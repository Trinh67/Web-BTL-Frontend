$(document).ready(function () {
	loadDataRoom();
})

var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer " + window.localStorage.getItem("token"));
myHeaders.append("Content-Type", "application/json");

var idPost;
// Lấy tham số trên url
function GetURLParameter(url) {
	var idPost = url.split('/').pop();
	return idPost.substr(0, idPost.length - 5);
}


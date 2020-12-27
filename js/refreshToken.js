function RefreshToken(oldToken) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + oldToken);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("http://fcbtruong-001-site1.itempurl.com/api/Login/RefreshToken", requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log('Refresh Token Successful!');
            window.localStorage.setItem("token", result.token);
            var token = window.localStorage.getItem("token");
            setTimeout(function() {RefreshToken(token)}, 4 * 60  * 1000);
        })
        .catch(error => console.log('error', error));
}
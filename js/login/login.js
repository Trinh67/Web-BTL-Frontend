
var submitBt = document.getElementById("btnSubmit");
var usernameBtn = document.getElementById("username");
var passBtn = document.getElementById("password");

submitBt.onclick = function () {
    console.log('Click submit');
    Login('http://fcbtruong-001-site1.itempurl.com/api/Login')
        .then(data => {
            window.localStorage.setItem("token", data.token);
            var token = window.localStorage.getItem("token");
            loginSuccessful();
            setTimeout(function() {RefreshToken(token)}, 4 * 60  * 1000);
        });
}

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

async function Login(url = '') {
    var loginForm = JSON.stringify({
        'username': usernameBtn.value,
        'password': passBtn.value,
    });

    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: loginForm // body data type must match "Content-Type" header
    });

    if (response.status == 200) {
        console.log("Login successful");
    }
    else {
        console.log("Failed");
    };
    return response.json(); // parses JSON response into native JavaScript objects
}


function loginSuccessful() {
     window.location = "trang-chu.html"
}
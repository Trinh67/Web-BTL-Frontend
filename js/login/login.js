
var submitBt = document.getElementById("btnSubmit");
var usernameBtn = document.getElementById("username");
var passBtn = document.getElementById("password");

submitBt.onclick = function () {
    Login('http://fcbtruong-001-site1.itempurl.com/api/Login')
    .then(data => {
        console.log(data); // JSON data parsed by `data.json()` call
    });
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
    return response.json(); // parses JSON response into native JavaScript objects
}


function loginSuccessful() {
    // window.location = "index.html"
}
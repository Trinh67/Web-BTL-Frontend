
var submitBt = document.getElementById("btnSubmit");
var usernameBtn = document.getElementById("username");
var passBtn = document.getElementById("password");

submitBt.onclick = function () {
    Login();
}

function Login() {
    var loginForm = JSON.stringify({
        'username': usernameBtn.value,
        'password': passBtn.value,
    });

    fetch('http://fcbtruong-001-site1.itempurl.com/api/Login',{
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: loginForm,
        }).then(
            response => {
                if(response.status != 200) {
                    console.log("Failed");
                    return;
                }
                else if(response.status == 200){
                    loginSuccessful();
                }
                response.json()
            }).then(
                data => {
                    console.log(data);
                });
}

function loginSuccessful(){
    window.location = "index.html"
}
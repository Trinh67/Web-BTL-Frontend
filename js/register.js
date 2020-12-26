var checkEmail = false;
var checkPassword = false;

// Check email
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  
  function validate() {
      
    const result = document.getElementById("check-email");
    var email = document.getElementById("email").value;
    if (validateEmail(email)) {
      checkEmail = true;
      if(checkEmail === true && checkPassword === true) document.getElementById("btnSubmit").disabled = false;
      result.innerHTML = '<i class="fas fa-check" style="color: green;"></i>';
    } else {
      result.innerHTML = '<i class="fas fa-times" style="color: red;"></i>';
    }
    return false;
  }
  
document.getElementById("email").onblur = function(){ validate() };

// Show or hide password
const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#password');
togglePassword.addEventListener('click', function (e) {
    // toggle the type attribute
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    // toggle the eye slash icon
    this.classList.toggle('fa-eye-slash');
});

const togglePassword2 = document.querySelector('#togglePassword2');
const password2 = document.querySelector('#confirm_password');
togglePassword2.addEventListener('click', function (e) {
    // toggle the type attribute
    const type = password2.getAttribute('type') === 'password' ? 'text' : 'password';
    password2.setAttribute('type', type);
    // toggle the eye slash icon
    this.classList.toggle('fa-eye-slash');
});

// Check confirm-password
function comparePassword() {  
    const pass = document.getElementById("password").value;
    const confirm = document.getElementById("confirm_password").value;
    
    const result = document.getElementById("check-pass");
    if (pass == confirm && pass != "" && pass.length > 5) {
      checkPassword = true;
      if(checkEmail === true && checkPassword === true) document.getElementById("btnSubmit").disabled = false;
      result.innerHTML = '<i class="fas fa-check" style="color: green;"></i>';
    } else {
      result.innerHTML = '<i class="fas fa-times" style="color: red;"></i>';
    }
    return false;
  }
  
document.getElementById("password").onblur = function(){ comparePassword(); };
document.getElementById("confirm_password").onblur = function(){ comparePassword(); };

if(checkEmail === false || checkPassword === false) document.getElementById("btnSubmit").disabled = true;

// Chuyển trang đăng kí
$('#register-owner').click(btnRegisterOwnerOnclick);
$('#register-user').click(btnRegisterUserOnclick);

function btnRegisterOwnerOnclick(){
  $('.register-owner-form').show();
  $('#register-user').show();
  $('.register-user-form').hide();
  $('#register-owner').hide();
  $(".register-owner-form input").prop('required',true);
}

function btnRegisterUserOnclick(){
  $('.register-user-form').show();
  $('#register-owner').show();
  $('.register-owner-form').hide();
  $('#register-user').hide();
  $(".register-owner-form input").prop('required',false);
}

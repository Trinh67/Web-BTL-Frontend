var email = $("input#sc_email").val();  

if (email !== "") {  // If something was entered
    if (!isValidEmailAddress(email)) {
        $("label#email_error").show(); //error message
        $("input#sc_email").focus();   //focus on email field
        return false;  
    }
} 

function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^[A-Za-z0-9]+([_\.\-]?[A-Za-z0-9])*@[A-Za-z0-9]+([\.\-]?[A-Zaz0-9]+)*(\.[A-Za-z]+)+$/);
    return pattern.test(emailAddress);
};
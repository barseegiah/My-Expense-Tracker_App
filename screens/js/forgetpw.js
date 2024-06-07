const forgetpwForm = document.getElementById("reset-form");
const newPw = document.getElementById("new_password");
const confPw = document.getElementById("conf_password");
let errorMessage = document.getElementById("message");

function showMessage(message, type) {
    errorMessage.innerText = message;
    errorMessage.className = type;
}


forgetpwForm.addEventListener('submit', (e) =>{
    e.preventDefault();

    let changePassword = {
        newPassword: newPw.value, 
        confirmPassword: confPw.value
    };

// Clear previous messages
errorMessage.innerText = '';
errorMessage.className = '';



// Validate password length
if (changePassword.newPassword.length < 6) {
    showMessage("Password must be at least 6 characters long", "error");
    return;
}

// Validate if passwords match
if (changePassword.newPassword !== changePassword.confirmPassword) {
    showMessage("Passwords do not match", "error");
    return;
}


  
    
    // Reset Users Create a variable and assign the localstorage key
    const key1 = 'user_data';
    let userData = localStorage.getItem(key1);
    userData = userData ? JSON.parse(userData) : {};

    if(changePassword.newPassword === changePassword.confirmPassword){
        userData.password = changePassword.confirmPassword;

    localStorage.setItem(key1, JSON.stringify(userData));
    
       alert('Password updated successfully');
       window.location.href = 'Login.html';
        
    }else{
        alert('Passwor Does not match');
    }

    // console.log(user_data);
})


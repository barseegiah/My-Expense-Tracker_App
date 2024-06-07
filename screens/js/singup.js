document.getElementById('reg_form').addEventListener('submit', e => {
    e.preventDefault();


let fullname1 = document.getElementById('fullname').value;
let email1 = document.getElementById('email').value;
let password1 = document.getElementById('password').value;

let user_data = {
    fullname: fullname1,
    email: email1,
    password: password1
}
console.log(user_data)
localStorage.setItem('user_data', JSON.stringify(user_data));

window.location.href='Login.html';

})
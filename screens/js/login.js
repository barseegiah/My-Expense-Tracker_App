document.getElementById('login').addEventListener('submit', e => {
    e.preventDefault();

    


let login_email = document.getElementById('email').value;
let login_password = document.getElementById('password').value;

let user_data = JSON.parse(localStorage.getItem('user_data'));
let reg_email = user_data.email;
let reg_password = user_data.password;

if (login_email === reg_email && login_password === reg_password){
    location.href = 'entry_form.html'
    // alert('Login Successful')
}else{
    alert('Login Failed')

}
})


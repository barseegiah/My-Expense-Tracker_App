const emailForm = document.getElementById('emailrec');
const conf_email = document.getElementById('email');

emailForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get value from the const
    const userEmail = { 
        validEmail: conf_email.value     
    };

    let retretData = JSON.parse(localStorage.getItem('user_data'));

    if(userEmail && userEmail.validEmail === retretData.email){
        window.location.href='Forget_password.html';
    }else{
        alert('Email Not find');
    }

    
})

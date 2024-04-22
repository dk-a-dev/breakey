function redirectAuth() {
    window.location.href = "auth.html";
}

function registerUser() {
    document.getElementById('registerForm').addEventListener('submit', function (e) {
        e.preventDefault();

        var username = document.getElementById('username').value;
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        fetch('http://localhost:3000/api/v1/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    });
}

function loginUser() {

    document.getElementById('loginForm').addEventListener('submit', function (e) {
        e.preventDefault();

        var email = document.getElementById('loginEmail').value;
        var password = document.getElementById('loginPassword').value;

        fetch('http://localhost:3000/api/v1/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    });
}
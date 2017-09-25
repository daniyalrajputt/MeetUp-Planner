var database = firebase.database().ref();
// var auth = firebase.auth();

var fname = document.getElementById('fname');
var lname = document.getElementById('lname');
var email = document.getElementById('email');
var pass = document.getElementById('pass');
var phone = document.getElementById('phone');
var gender = document.getElementById('gender');
var age = document.getElementById('age');

document.getElementById('signupForm').addEventListener('submit',
    function submit(event) {
        event.preventDefault()
    var user = {
        firstName:fname.value,
        lastName: lname.value,
        email: email.value,
        password: pass.value,
        phone: phone.value,
        gender: gender.value,
        age: age.value
    }

    console.log(user);

    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(function(res) {
            database.child('user/' + res.uid).set(user).then(function() {
                    window.location.replace("/login/login.html")
                })
                // console.log(res.uid);
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
                alert('The password is too weak.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
        });
    })

    // for login 
    function login(){
        window.location.replace("login/login.html")
    }
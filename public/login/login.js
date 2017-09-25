var database = firebase.database().ref();
var email = document.getElementById('userEmail');
var pass = document.getElementById('userPass');


document.getElementById('loginform').addEventListener('submit',
    function submit(event) {
        event.preventDefault()
        var user = {
            email: email.value,
            password: pass.value
        }
        firebase.auth().signInWithEmailAndPassword(user.email, user.password).then(
            function (success) {
                // console.log(success.uid)
                database.child('user/' + success.uid).once('value', function (snapshot) {
                    var convert = JSON.stringify(snapshot.val())
                    localStorage.setItem("loggedInUser", convert)
                    console.log(convert)
                    location = "../home/home.html"
                    // console.log(snapshot.val())
                })
            }
        )
            // https://firebase.google.com/docs/reference/js/firebase.auth.Auth
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode === 'auth/wrong-password') {
                    alert('Wrong password.');
                } else {
                    alert(errorMessage);
                }
                console.log(error);
            });
    })

    // for signUp
    function signUp(){
            window.location.replace("../index.html")

    }
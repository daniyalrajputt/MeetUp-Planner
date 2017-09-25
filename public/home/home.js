var user = JSON.parse(localStorage.getItem("loggedInUser"))
var database = firebase.database().ref("/")
var fname = document.getElementById("fname").innerHTML = user.firstName;
var lname = document.getElementById("lname").innerHTML = user.lastName;
var email = document.getElementById("email").innerHTML = user.email;
var age = document.getElementById("age").innerHTML = user.age;
var contact = document.getElementById("contact").innerHTML = user.phone;

// var user = JSON.parse(localStorage.getItem("loggedInUser"))
console.log(user)
    // var database = firebase.database().ref("/");

var eventName = document.getElementById("eventName");
var organizerName = document.getElementById("name");
var date = document.getElementById("date");
var description = document.getElementById("description");
var place = document.getElementById("place");
var container = document.getElementById("container")
    // console.log(eventName, date, description, database)

function submitFunc() {
    var eventData = {
            Eventname: eventName.value,
            name: organizerName.value,
            date: date.value,
            description: description.value,
            place: place.value,
            email: user.email
        }
        // console.log(eventData)
    if (eventName.value !== "" && place.value !== "") {
        database.child('event Data').push(eventData).then(function() {
            alert("SuccessFully Added");
            eventName.value = ""
            date.value = ""
            description.value = ""
            place.value = ""
            organizerName.value = ""

        });
    } else {
        alert("Please Enter Required Informations")
    }
}

function signOut() {
    localStorage.clear();
    window.location.replace("../index.html")
}
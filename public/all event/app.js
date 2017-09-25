var user = JSON.parse(localStorage.getItem("loggedInUser"))
console.log(user)
var database = firebase.database().ref("/");

var container = document.getElementById("container");

database.child("event Data").on("child_added", function(snap) {
    var obj = snap.val()
        // console.log(obj.name)
    obj.key = snap.key
    console.log(obj)
    var Eventname = obj.Eventname
    var panel = document.createElement("DIV")
    panel.setAttribute("class", "panel panel-success")
    panel.setAttribute("id", obj.key)

    var panelhead = document.createElement("DIV")
    panelhead.setAttribute("class", "panel-heading")


    var panelbody = document.createElement("DIV")
    panelbody.setAttribute("class", "panel-body text-center")
    panelbody.setAttribute("style", "background-color:white;")

    var panelfooter = document.createElement("DIV")
    panelfooter.setAttribute("class", "panel-footer text-center")

    // Panel Head
    var h4 = document.createElement("h4");
    h4.setAttribute("class", "card-title text-center card-header text-info");
    atext = document.createTextNode("Event Name: " + Eventname.toUpperCase())
    h4.appendChild(atext)
    panelhead.appendChild(h4)

    // Panel Body
    var p1 = document.createElement("P");
    p1.setAttribute("class", "card-text text-center")
    p1text = document.createTextNode("Event Organizer: " + obj.name.toUpperCase());

    p1.appendChild(p1text)
    var p2 = document.createElement("P");
    p2.setAttribute("class", "card-text")
    p2text = document.createTextNode("Event Date: " + obj.date)
    p2.appendChild(p2text)
    var p3 = document.createElement("P");
    p3.setAttribute("class", "card-text")
    p3text = document.createTextNode("Event Description: " + obj.description)
    p3.appendChild(p3text)

    // panel footer
    var interestedbtn = document.createElement("button")
    interestedbtn.setAttribute("Class", "btn btn-info")
    var interestedbtntext = document.createTextNode("Interested")
    interestedbtn.appendChild(interestedbtntext)
    interestedbtn.onclick = function() {

        interestedfunc(obj.key, obj.Eventname, obj.date, obj.description, obj.place, obj.email, obj.name)
        interestedbtn.style.display = "none"
        var p = document.createElement("p")
        p.innerHTML = "Addded To Interested"
        panelfooter.appendChild(p)

    }


    panel.appendChild(panelhead)
    panelbody.appendChild(p1)
    panelbody.appendChild(p2)
    panelbody.appendChild(p3)
    panelfooter.appendChild(interestedbtn)
    panel.appendChild(panelbody)
    panel.appendChild(panelfooter)
    container.appendChild(panel)


})

// /// interested event
function interestedfunc(id, eventName, date, description, place, email, name) {
    var interestedData = {
        id: id,
        status: "interested",
        Eventname: eventName,
        name: name,
        date: date,
        description: description,
        place: place,
        email: user.email
    }

    // document.getElementById(id).style.
    database.child("interested").push(interestedData).then(
        alert("successfully Added to Interested Events")

    )
}

// signOut
function signOut() {
    localStorage.clear();
    window.location.replace("../index.html")
}
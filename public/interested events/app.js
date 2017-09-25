var user = JSON.parse(localStorage.getItem("loggedInUser"))
console.log(user)
var database = firebase.database().ref("/");
var container = document.getElementById("container")



database.child("interested").on("child_added", function (snap) {
    var obj = snap.val()
    // console.log(obj.name)
    obj.key = snap.key
    console.log(obj)
    if (obj.email === user.email) {
        var Eventname = obj.Eventname
        var panel = document.createElement("DIV")
        panel.setAttribute("class", "panel panel-success")
        panel.setAttribute("id", obj.key)

        var panelhead = document.createElement("DIV")
        panelhead.setAttribute("class", "panel-heading")

        var panelbody = document.createElement("DIV");
        panelbody.setAttribute("class", "panel-body text-center")
        panelbody.setAttribute("style", "background-color:white;")

        var panelfooter = document.createElement("DIV")
        panelfooter.setAttribute("class", "panel-footer text-center")

        // Panel Head
        var h4 = document.createElement("h4");
        h4.setAttribute("class", "card-title text-center card-header text-info");
        h4text = document.createTextNode("Event Name: " + Eventname.toUpperCase())
        h4.appendChild(h4text)
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
        var removebtn = document.createElement("button");
        removebtn.setAttribute("class", "btn btn-info");
        removebtntext = document.createTextNode("Not interested")
        removebtn.appendChild(removebtntext)
        removebtn.onclick = function () {
            remove(obj.key)
        }
        //appending to dom
        panelbody.appendChild(p1);
        panelbody.appendChild(p2);
        panelbody.appendChild(p3);
        panelfooter.appendChild(removebtn)
        panel.appendChild(panelhead);
        panel.appendChild(panelbody);
        panel.appendChild(panelfooter);
        container.appendChild(panel)


    }
})

function remove(key) {
    database.child("interested/" + key).remove();
}
database.child("interested").on("child_removed", function (data) {
    var deleted = document.getElementById(data.key);
    deleted.remove();
    alert("Successfully Remove")
})


// signOut
function signOut() {
    localStorage.clear();
    window.location.replace("../index.html")
}
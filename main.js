var request = window.superagent;
var base = "http://localhost:3000/api/v1"

function showHome() {
  document.getElementById("menu").classList.add("show")
  document.getElementById("create").classList.remove("show")
  document.getElementById("connect").classList.remove("show")
}

function openCreateMenu() {
  document.getElementById("menu").classList.remove("show")
  document.getElementById("create").classList.add("show");
  document.getElementById("connect").classList.remove("show")
}

function openConnectMenu() {
  document.getElementById("menu").classList.remove("show")
  document.getElementById("create").classList.remove("show");
  document.getElementById("connect").classList.add("show")
}

function createSubmit(){
  var name = document.getElementById("name-cre").value
  var pass = document.getElementById("pass-cre").value
  if(name == null || pass == null) {alert("plz input");return}

  fetch(base + "/server", {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: {"Content-Type":"application/json"},
    body: {"server_name": name,"password":pass}
  }).then(function(response) {
    return response.json();
  }).then(function(json) {
    alert(json)
  });
}

checkForm = (f) => { while(f.value.match(/[^A-Z^a-z\d\-]/)) f.value=f.value.replace(/[^A-Z^a-z\d\-]/,"") }

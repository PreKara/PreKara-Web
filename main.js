// ログイン等失敗したときエラーメッセージが消えない
// Server登録完了で一度完了画面を踏む
// フォームEnterで次へ

const base = "/api/v1";

window.onload = () => {
  const request = window.superagent;

  const menu = document.getElementById("menu")
  const create = document.getElementById("create")
  const connect = document.getElementById("connect")
  const loading = document.getElementById("loading")
  const error = document.getElementById("error")
  const main = document.getElementById("main")

  fetch(base + "/session", {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
    headers: {"Content-Type":"application/json"}
  }).then(function(response) {
    return response.json();
  }).then(function(json) {
    if(json.status === 200) {
      openMain()
    }
  })
}

function banner(){
  fetch(base + "/session", {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
    headers: {"Content-Type":"application/json"}
  }).then(function(response) {
    return response.json();
  }).then(function(json) {
    if(json.status === 200) {
      openMain()
    }else{
      openHome()
    }
  })
}

function openHome() {
  error.classList.remove("show");
  menu.classList.add("show")
  create.classList.remove("show")
  connect.classList.remove("show")
  loading.classList.remove("show")
  main.classList.remove("show")
}

function openCreateMenu() {
  //document.getElementById("error").style.display="none"
  menu.classList.remove("show")
  create.classList.add("show");
  connect.classList.remove("show")
  loading.classList.remove("show")
  main.classList.remove("show")
}

function openConnectMenu() {
  document.getElementById("error").style.display="none"
  menu.classList.remove("show")
  create.classList.remove("show");
  connect.classList.add("show")
  loading.classList.remove("show")
  main.classList.remove("show")
}

function openLoading() {
  document.getElementById("error").style.display="none"
  menu.classList.remove("show")
  create.classList.remove("show");
  connect.classList.remove("show")
  loading.classList.add("show")
  main.classList.remove("show")
}

function openMain() {
  document.getElementById("error").style.display="none"
  menu.classList.remove("show")
  create.classList.remove("show");
  connect.classList.remove("show")
  loading.classList.remove("show")
  main.classList.add("show")
}

function serverCreate(){
  const name = document.getElementById("name-cre").value
  const pass = document.getElementById("pass-cre").value
  if(name == "" || pass == "") {
    error.classList.add("show");
    error.innerText = "Error: This Server Name and Password is required"
    return
  }
  document.getElementById("error").style.display="none"
  openLoading()
  fetch(base + "/server", {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify( {"server_name": name,"password":pass})
  }).then(function(response) {
    return response.json();
  }).then(function(json) {
    if(json.status == 200) {
      openMain()
    }else if(json.status == 409){
      openCreateMenu()
      error.style.display="block"
      error.innerText = "Error: This Server Name is already taken"
    }
  });
}

function sessionLogin(){
  const name = document.getElementById("name-con").value
  const pass = document.getElementById("pass-con").value
  if(name == "" || pass == "") {
    error.innerText = "Error: This Server Name and Password is required"
    error.classList.add("show");
    return
  }
  document.getElementById("error").style.display="none"
  openLoading()
  fetch(base + "/session", {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify( {"server_name": name,"password":pass})
  }).then(function(response) {
    return response.json();
  }).then(function(json) {
    if(json.status == 200) {
      openMain()
    }else if(json.status == 403 || json.status == 404){
      openConnectMenu()
      error.innerText = "Error: Server Name is incorrect"
      error.classList.add("show");
    }else if(json.status == 409){
      openConnectMenu()
      error.innerText = "Error: This Server Name is already taken"
      error.classList.add("show");
    }
  });
}

function sessionRevoke(){
  openLoading()
  fetch(base + "/session", {
    method: 'DELETE',
    mode: 'cors',
    credentials: 'include',
    headers: {"Content-Type":"application/json"}
  }).then(function(response) {
    openHome()
  });
}

function checkForm(f) {
  while(f.value.match(/[^A-Z^a-z\d\-]/))
    f.value=f.value.replace(/[^A-Z^a-z\d\-]/,"")
}

function GetCookies(){
    var result = new Array();
    var allcookies = document.cookie;
    if( allcookies != '' ){
        var cookies = allcookies.split( '; ' );
        for( var i = 0; i < cookies.length; i++ ){
            var cookie = cookies[ i ].split( '=' );
            result[ cookie[ 0 ] ] = decodeURIComponent( cookie[ 1 ] );
        }
    }
  return result;
}

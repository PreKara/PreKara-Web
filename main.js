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
  const upBox = document.getElementById('uploadBox');

  upBox.addEventListener('dragover', function(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
    upBox.classList.add('uphover');;
  });

  upBox.addEventListener('dragleave', function(event) {
    upBox.classList.remove('uphover');;
  });

  upBox.addEventListener('drop', function(event) {
    event.preventDefault();
    upBox.classList.remove('uphover');;

    var files = event.dataTransfer.files;
    console.log(files);

    // 拡張子チェック
    // エラー処理

    for (var i=0, l=files.length; i<l; i++) {
      var reader = new FileReader();
      reader.onload = function(event) {
        var formData  = new FormData();
        formData.append("image",files[0])

        fetch(base + "/image", {
          method: 'POST',
          mode: 'cors',
          credentials: 'include',
          body: formData
        }).then(function(response) {
          console.log(response)
          return response.json();
        }).then(function(json) {
          console.log(json)
          if(json.status == 200) {
          }else if(json.status == 409){
          }
        });
      };
      reader.readAsDataURL(files[i])
    }

  });

  const file = document.getElementById("file")
  file.addEventListener('change',function(e) {

    var formData  = new FormData();
    formData.append("image",file.files[0])

    fetch(base + "/image", {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      body: formData
    }).then(function(response) {
      console.log(response)
      return response.json();
    }).then(function(json) {
      if(json.status == 200) {
      }else if(json.status == 409){
      }
    });
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
  menu.classList.add("show")
  create.classList.remove("show")
  connect.classList.remove("show")
  loading.classList.remove("show")
  main.classList.remove("show")
  image.classList.remove("show")
  theme.classList.remove("show")
}

function openCreateMenu() {
  menu.classList.remove("show")
  create.classList.add("show");
  connect.classList.remove("show")
  loading.classList.remove("show")
  main.classList.remove("show")
  image.classList.remove("show")
  theme.classList.remove("show")
}

function openConnectMenu() {
  menu.classList.remove("show")
  create.classList.remove("show");
  connect.classList.add("show")
  loading.classList.remove("show")
  main.classList.remove("show")
  image.classList.remove("show")
  theme.classList.remove("show")
}

function openLoading() {
  menu.classList.remove("show")
  create.classList.remove("show");
  connect.classList.remove("show")
  loading.classList.add("show")
  main.classList.remove("show")
  image.classList.remove("show")
  theme.classList.remove("show")
}

function openMain() {
  menu.classList.remove("show")
  create.classList.remove("show");
  connect.classList.remove("show")
  loading.classList.remove("show")
  main.classList.add("show")
  image.classList.remove("show")
  theme.classList.remove("show")
}
function openImageMenu() {
  menu.classList.remove("show")
  create.classList.remove("show");
  connect.classList.remove("show")
  loading.classList.remove("show")
  main.classList.remove("show")
  image.classList.add("show")
  theme.classList.remove("show")
}
function openThemeMenu() {
  menu.classList.remove("show")
  create.classList.remove("show");
  connect.classList.remove("show")
  loading.classList.remove("show")
  main.classList.remove("show")
  image.classList.remove("show")
  theme.classList.add("show")
}

function serverCreate(){
  const error = document.getElementById("error-cre")
  const name = document.getElementById("name-cre").value
  const pass = document.getElementById("pass-cre").value
  if(name == "" || pass == "") {
    error.classList.add("show");
    error.innerText = "Error: This Server Name and Password is required"
    return
  }
  error.style.display="none"
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
  const error = document.getElementById("error-con")
  const name = document.getElementById("name-con").value
  const pass = document.getElementById("pass-con").value
  if(name == "" || pass == "") {
    error.innerText = "Error: This Server Name and Password is required"
    error.classList.add("show");
    return
  }
  error.style.display="none"
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

function upload(){
  const f = document.getElementById("file")
  f.click()
}

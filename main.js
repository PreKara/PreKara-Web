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
  const presenter = document.getElementById("presenter")

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

    for (var i=0; i < files.length; i++) {
      var formData  = new FormData();
      console.log(event)
      formData.append("image",files[i])
      openLoading()

      fetch(base + "/image", {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        body: formData
      }).then(function(response) {
        return response.json();
      }).then(function(json) {
        openImageMenu()
        if(json.status == 200) {
          getImages()
        }else if(json.status == 409){
        }
      });
    }

  });

  const file = document.getElementById("file")
  file.addEventListener('change',function(e) {

    var formData  = new FormData();
    formData.append("image",file.files[0])

    openLoading()
    fetch(base + "/image", {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      body: formData
    }).then(function(response) {
      return response.json();
    }).then(function(json) {
      openImageMenu()
      if(json.status == 200) {
        getImages()
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
  presenter.classList.remove("show")
}

function openCreateMenu() {
  menu.classList.remove("show")
  create.classList.add("show");
  connect.classList.remove("show")
  loading.classList.remove("show")
  main.classList.remove("show")
  image.classList.remove("show")
  theme.classList.remove("show")
  presenter.classList.remove("show")
}

function openConnectMenu() {
  menu.classList.remove("show")
  create.classList.remove("show");
  connect.classList.add("show")
  loading.classList.remove("show")
  main.classList.remove("show")
  image.classList.remove("show")
  theme.classList.remove("show")
  presenter.classList.remove("show")
}

function openLoading() {
  menu.classList.remove("show")
  create.classList.remove("show");
  connect.classList.remove("show")
  loading.classList.add("show")
  main.classList.remove("show")
  image.classList.remove("show")
  theme.classList.remove("show")
  presenter.classList.remove("show")
}

function openMain() {
  menu.classList.remove("show")
  create.classList.remove("show");
  connect.classList.remove("show")
  loading.classList.remove("show")
  main.classList.add("show")
  image.classList.remove("show")
  theme.classList.remove("show")
  presenter.classList.remove("show")
}
function openImageMenu() {
  menu.classList.remove("show")
  create.classList.remove("show");
  connect.classList.remove("show")
  loading.classList.remove("show")
  main.classList.remove("show")
  image.classList.add("show")
  theme.classList.remove("show")
  presenter.classList.remove("show")
  getImages()
}
function openThemeMenu() {
  menu.classList.remove("show")
  create.classList.remove("show");
  connect.classList.remove("show")
  loading.classList.remove("show")
  main.classList.remove("show")
  image.classList.remove("show")
  theme.classList.add("show")
  presenter.classList.remove("show")
  getThemes()
}

function openPresenterMenu() {
  menu.classList.remove("show")
  create.classList.remove("show");
  connect.classList.remove("show")
  loading.classList.remove("show")
  main.classList.remove("show")
  image.classList.remove("show")
  theme.classList.remove("show")
  presenter.classList.add("show")
  getPresenters()
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
    openLoading()
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
    return
  }
  error.innerText=""
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
    }else if(json.status == 409){
      openConnectMenu()
      error.innerText = "Error: This Server Name is already taken"
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


function getImages(){
  fetch(base + "/image/list", {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
    headers: {"Content-Type":"application/json"}
  }).then(function(response) {
    return response.json();
  }).then(function(json) {
    if(json.status === 200) {
      while (document.getElementById("image-container").firstChild) document.getElementById("image-container").removeChild(document.getElementById("image-container").firstChild);
      json.images.forEach ((image) => {
        let item = document.createElement('div')
        item.classList.add("item")

        let img = document.createElement('img')
        img.src = base + "/image/" + image

        let a = document.createElement('a')
        a.innerText = "Remove"
        a.onclick = () => {
          fetch(base + "/image/" + image, {
            method: 'DELETE',
            mode: 'cors',
            credentials: 'include',
            headers: {"Content-Type":"application/json"}
          }).then(function(response) {
            return response.json();
          }).then(function(json) {
            getImages()
          })
        }

        item.appendChild(img)
        item.appendChild(a)

        document.getElementById("image-container").appendChild(item)
      })
    }else{
      openHome()
    }
  })
}

function getThemes(){
  const error = document.getElementById("error-theme")
  fetch(base + "/theme/list", {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
    headers: {"Content-Type":"application/json"}
  }).then(function(response) {
    return response.json();
  }).then(function(json) {
    if(json.status === 200) {
      while (document.getElementById("theme-list").firstChild) document.getElementById("theme-list").removeChild(document.getElementById("theme-list").firstChild);
      json.theme.forEach ((theme) => {

        let item = document.createElement('div')
        let text = document.createElement('p')
        let rm = document.createElement('img')
        rm.src = "/clear.svg"
        item.classList.add("theme-item")
        text.innerText = theme

        rm.onclick = () => {
          error.innerText = ""
          console.log(theme)
          fetch(base + "/theme", {
            method: 'DELETE',
            mode: 'cors',
            credentials: 'include',
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({"theme": theme})
          }).then(function(response) {
            return response.json();
          }).then(function(json) {
            getThemes()
          })
        }

        item.appendChild(text)
        item.appendChild(rm)
        item.appendChild(document.createElement('hr'))

        document.getElementById("theme-list").appendChild(item)
      })
    }else{
      openHome()
    }
  })
}
function postPresenter(){
  const error = document.getElementById("error-presenter")
  const presenter = document.getElementById("presenter-input").value
  if(presenter == "") {
    error.innerText = "Error: Presenter is required"
    return
  }
  error.innerText=""
  openLoading()
  fetch(base + "/presenter", {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify( {"presenter":presenter } )
  }).then(function(response) {
    return response.json();
  }).then(function(json) {
    openPresenterMenu()
    if(json.status == 200) {
      getPresenters()
    }else if(json.status == 409){
      error.innerText = "Error: Presenter is already registerd"
    }
  });
}
function getPresenters(){
  const error = document.getElementById("error-presenter")
  fetch(base + "/presenter/list", {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
    headers: {"Content-Type":"application/json"}
  }).then(function(response) {
    return response.json();
  }).then(function(json) {
    if(json.status === 200) {
      while (document.getElementById("presenter-list").firstChild) document.getElementById("presenter-list").removeChild(document.getElementById("presenter-list").firstChild);
      json.presenter.forEach ((presenter) => {

        let item = document.createElement('div')
        let text = document.createElement('p')
        let rm = document.createElement('img')
        rm.src = "/clear.svg"
        item.classList.add("theme-item")
        text.innerText = presenter

        rm.onclick = () => {
          error.innerText = ""
          console.log(presenter)
          fetch(base + "/presenter", {
            method: 'DELETE',
            mode: 'cors',
            credentials: 'include',
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({"presenter": presenter})
          }).then(function(response) {
            return response.json();
          }).then(function(json) {
            getPresenters()
          })
        }

        item.appendChild(text)
        item.appendChild(rm)
        item.appendChild(document.createElement('hr'))

        document.getElementById("presenter-list").appendChild(item)
      })
    }else{
      openHome()
    }
  })
}
function postTheme(){
  const error = document.getElementById("error-theme")
  const th = document.getElementById("theme-input").value
  if(th == "") {
    error.innerText = "Error: Theme is required"
    return
  }
  error.innerText=""
  openLoading()
  fetch(base + "/theme", {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify( {"theme":th } )
  }).then(function(response) {
    return response.json();
  }).then(function(json) {
    openThemeMenu()
    if(json.status == 200) {
      getThemes()
    }else if(json.status == 409){
      error.innerText = "Error: Theme is already registerd"
    }
  });
}

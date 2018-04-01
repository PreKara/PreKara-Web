function showHome() {
  document.getElementById("menu").classList.add("show")
  document.getElementById("create").classList.remove("show")
}

function openCreateMenu() {
  document.getElementById("menu").classList.remove("show")
  document.getElementById("create").classList.add("show");
}

function openConnectMenu() {
  document.getElementById("menu").style.display="none";
}

checkForm = (f) => { while(f.value.match(/[^A-Z^a-z\d\-]/)) f.value=f.value.replace(/[^A-Z^a-z\d\-]/,"") }

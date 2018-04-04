window.onload = () => {
  const slide = document.getElementById("slide")
  const prekara = document.getElementById("prekara")
  const presenter = document.getElementById("presenter")
  const theme = document.getElementById("theme")

  var socket = io();
  socket.on('error', (msg) => {
    console.log(msg);
    window.location.href = "/"
  });
  socket.on('next', (msg) => {
    console.log(msg);
    slide.src = "/api/v1/image/" + msg
  });
  socket.on('new', (msg) => {
    console.log(msg);
    theme.innerText = msg.theme || ""
    presenter.innerText = msg.presenter || ""
    slide.src = ""

  })
  socket.on('stop', (msg) => {
    console.log(msg)
  })
}

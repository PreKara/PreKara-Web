window.onload = () => {
  const slide = document.getElementById("slide")
  const prekara = document.getElementById("prekara")
  const presenter = document.getElementById("presenter")

  var socket = io();
  socket.on('error', (msg) => {
    console.log(msg);
  });
  socket.on('next', (msg) => {
    console.log(msg);
    slide.src = "/api/v1/image/" + msg
  });
}

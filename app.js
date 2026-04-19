
let page = "home";
let edit = false;

const isAdmin = new URLSearchParams(location.search).get("admin") === "1";

if(isAdmin){
  document.addEventListener("DOMContentLoaded",()=>{
    document.getElementById("editBtn").classList.remove("hidden");
  });
}

let title = localStorage.getItem("title") || "Мой сайт";
let text = localStorage.getItem("text") || "Привет!";
let images = JSON.parse(localStorage.getItem("images") || "[]");

function setPage(p){
  page = p;
  render();
}

function toggleEdit(){
  edit = !edit;
  document.getElementById("editPanel").classList.toggle("hidden");
  if(edit){
    document.getElementById("titleInput").value = title;
    document.getElementById("textInput").value = text;
  }
}

function addImage(){
  const img = document.getElementById("imgInput").value;
  if(img){
    images.push(img);
    document.getElementById("imgInput").value="";
    render();
  }
}

function save(){
  title = document.getElementById("titleInput").value;
  text = document.getElementById("textInput").value;
  localStorage.setItem("title", title);
  localStorage.setItem("text", text);
  localStorage.setItem("images", JSON.stringify(images));
  toggleEdit();
  render();
}

function render(){
  const c = document.getElementById("content");

  if(page==="home"){
    c.innerHTML = `<h1>${title}</h1><p>${text}</p>`;
  }

  if(page==="gallery"){
    c.innerHTML = "<h2>Галерея</h2>" + images.map(i=>`<img src="${i}">`).join("");
  }

  if(page==="about"){
    c.innerHTML = "<h2>О сайте</h2><p>Простой редактируемый сайт</p>";
  }
}

render();

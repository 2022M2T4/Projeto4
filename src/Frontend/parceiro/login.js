var list = [];
var login;
var i = 0;
var logged = false;
var api = 'http://127.0.0.1:1234';

var userslist
function signup() {
    window.location = 'src/Frontend/parceiro/html/cadastro.html'
}
function getUsers() {
    login = $("#login").val();
    pass = $("#pass").val();
    $.get("http://127.0.0.1:1234/users", function(users) {
    userslist = sessionStorage.setItem("userslist", users)
    console.log(users)
    let l = 0
    while (l < users.length) {
        console.log(users)
        console.log(l)
    if (users[l].login == login) {
        if (users[l].senha == pass) {
            logged = true;  
        }
    }   
    console.log(logged)
    l += 1;    
}
if (logged == false) {
    failLogin()
    $("#login").val('')
    $("#pass").val('')
}
else {
        toastLoginSucces();
        postAcess();
        logged = false
    }
    })
}
function postAcess() {
    {
        $.ajax({
            type: 'POST',
            url: api + '/new-access',
            data: {
                login_parceiro:login
            }
        })
    }
    changePage()
}
function changePage() {
    window.location = "../html/antecipe.html"
}
function toastLoginSucces() {
    toast({
      title: "Sucesso!",
      message: "Você efetuou login no sistema.",
      type: "success",
      duration: 5000
    });
  }

function failLogin() {
    toast({
      title: "Erro!",
      message: "Login ou senha inválidos.",
      type: "error",
      duration: 5000
    });
  }

 // Função do Toast
 function toast({ title = "", message = "", type = "info", duration = 3000 }) {
    const main = document.getElementById("toast");
    if (main) {
      const toast = document.createElement("div");
  
      // Toast sair por si só
      const autoRemoveId = setTimeout(function () {
        main.removeChild(toast);
      }, duration + 1000);
  
      const icons = {
        error: "fas fa-exclamation-circle"
      };
      const icon = icons[type];
      const delay = (duration / 1000).toFixed(2);
  
      toast.classList.add("toast", `toast--${type}`);
      toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;
  
      toast.innerHTML = `
                      <div class="toast__icon">
                          <i class="${icon}"></i>
                      </div>
                      <div class="toast__body">
                          <h3 class="toast__title">${title}</h3>
                          <p class="toast__msg">${message}</p>
                      </div>
                      <div class="toast__close">
                          <i class="fas fa-times"></i>
                      </div>
                  `;
      main.appendChild(toast);
      $("#valorEscolhido").val('')
    }
  }
  
var currentVal
var partn
function openMenu() {
    window.location = '../html/menu.html'
}

function antecipe_seus_ganhos(){
    window.location= '../html/opcaoAntecipacao.html'
}

function antecipacao_automatica(){
    window.location= '../html/Agendamento.html'
}

function extrato(){
    window.location= '../html/extrato.html'
}
function configuracoes(){
    window.location = ''
}
var logged_cnpj
function getAmount() {
    $.get("http://127.0.0.1:1234/get-access", function(access) {
    let accessed = (access[0].login_parceiro);
    console.log(accessed + " = login que acessou");
    // fazer looping para verificar qual users[n].login é igual ao accessed (login do acesso mais recente)
    $.get("http://127.0.0.1:1234/users", function(users) {
        let i = 0;
        let found = false;
        while (i < users.length && found == false) {
            if (users[i].login == accessed) {
                found = true;
                console.log(users[i].hotel_cnpj)
                logged_cnpj = (users[i].hotel_cnpj)
                console.log(logged_cnpj);
                $.get("http://127.0.0.1:1234/get-hotels", function(hotels) {
                let j = 0;    
                let match = false;
                while (j < hotels.length && match == false) {
                    console.log(logged_cnpj + " " + hotels[j].cnpj)
                    if (logged_cnpj == hotels[j].cnpj) {
                        match = true;
                        console.log(logged_cnpj + " " + hotels[j].cnpj + " é o que logou");
                        part = (hotels[j].montante);
                        $("#teste2").append(hotels[j].montante);
                        currentVal = hotels[j].montante;
                        console.log(currentVal)
                        sessionStorage.setItem("currentVal", currentVal);
                        sessionStorage.setItem("logged_cnpj", logged_cnpj);
                    }
                    j += 1;
                }
                })
            }
            i += 1;
        }
    })
    })
    }
function eyeMode() {
    console.log(document.getElementById('eyeimg').src)
    if(document.getElementById('eyeimg').src == 'http://127.0.0.1:1234/src/Frontend/parceiro/imgs/olho_aberto2.png') {
        document.getElementById('eyeimg').src = 'http://127.0.0.1:1234/src/Frontend/parceiro/imgs/olho_fechado.png'
        let i = 0;
        let stringPart = String(part).length
        console.log(stringPart)
        $('#teste2').html('R$ ');
        while (i<stringPart) {
            $('#teste2').append('*');
            i +=1
        }
    }
    else {
        document.getElementById('eyeimg').src = 'http://127.0.0.1:1234/src/Frontend/parceiro/imgs/olho_aberto2.png'
        $('#teste2').html(`R$ ${currentVal}`)
    }
}
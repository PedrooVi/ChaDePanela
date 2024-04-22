const request = new XMLHttpRequest();
request.open("GET",  "//pedroovi.github.io/ChaDePanela/lista/presentes.json", true);
let presentes = {};

request.onload = function () {
   if (request.status >= 200 && request.status < 400) {
      let data = JSON.parse(request.responseText);
      data.forEach(function (presente) {
         presentes[presente.nome] = presente;
         if (!presente.hasOwnProperty("disponivel")) {
            presente.disponivel = true;
         }
      });
   } else {
      console.log("Erro ao carregar dados do JSON");
   }
};

request.send();

function redirecionarWpp(presente) {
   presente.disponivel = false;
   let telefone = "31998381385";
   let mssg = `Olá, gostaria de escolher a(o) ${presente.nome}, como presente para sua casa nova ${presente.link}`;
   let mssgCodificada = encodeURIComponent(mssg);
   let url = `https://api.whatsapp.com/send?phone=${telefone}&text=${mssgCodificada}`;
   window.location.href = url;
}

const escolherPresente = document.querySelectorAll(".produto button");
escolherPresente.forEach(function (botao) {
   botao.addEventListener("click", function () {
      let presenteNome = this.parentNode.querySelector("h2").textContent;
      let presente = presentes[presenteNome];


         document.getElementById("confirmar").classList.remove("oculto");
         document.getElementById("nomePresente").textContent = presenteNome;

         document.getElementById("btn-confirmar").addEventListener("click", function () {
            redirecionarWpp(presente);
            document.getElementById("confirmar").classList.add("oculto");
            });

         document.getElementById("cancelar").addEventListener("click", function () {
               document.getElementById("confirmar").classList.add("oculto");
            });
   });
});


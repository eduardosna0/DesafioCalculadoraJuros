const simularBtn = document.querySelector(".btn-simular");

simularBtn.addEventListener("click", function () {
  let valores = document.querySelectorAll(".custom-label input");

  let prazoAno, valorTotal, jurosAno;

  valores.forEach((item) => {
    if (item.id == "prazo-simulador") {
      prazoAno = item.valueAsNumber;
    } else if (item.id == "valor-simulador") {
      valorTotal = item.valueAsNumber;
    } else {
      jurosAno = item.valueAsNumber;
    }
  });

  

  let prazoMeses = prazoAno * 12;
  let cardPrazo = document.querySelector(".card.prazo .card-content");
  cardPrazo.innerHTML = prazoMeses;

  let jurosAoMes = (1 + jurosAno) ** (1 / 12) - 1;
  let cardJurosAoMes = document.querySelector(
    ".card.juros-ao-mes .card-content"
  );
  cardJurosAoMes.innerHTML = jurosAoMes;

  let amortizacao = valorTotal / prazoMeses;
  let jurosAcumulados = 0;
  let devedor = 0;
  

  for (let index = 0; index < prazoMeses; index++) {
    devedor = calculaJurosDevedor(valorTotal, index, amortizacao);
    jurosAcumulados += devedor * jurosAoMes;
  }

  let cardJurosAcumulados = document.querySelector(
    ".card.juros-acumulados .card-content"
  );
  cardJurosAcumulados.innerHTML = jurosAcumulados;

  let i = 0;
  let jurosAtual;  
  let tabelaConteudo = document.querySelectorAll("#table-conteudo tr");
  tabelaConteudo.forEach(item =>{
    item.children[1].innerHTML = `R$ ${amortizacao.toFixed(2)}`;
    jurosAtual = calculaJurosDevedor(valorTotal, i, amortizacao) * jurosAoMes
    item.children[2].innerHTML = `R$ ${jurosAtual.toFixed(2)}`;    
    i ++;
    item.children[0].innerHTML = i; //prestação atual    
    item.children[3].innerHTML = `R$ ${(jurosAtual + amortizacao).toFixed(2)}`;    
  })
  
  document.querySelector(".sem-conteudo").classList.add("disabled");
  document.querySelector(".table-resultado").classList.remove("disabled");
  

});

/**/

/*Calcula valores*/

function calculaJurosDevedor(valorTotal, periodo, amortizacao) {
  let jurosDevedor = valorTotal - (periodo * amortizacao);
  return jurosDevedor;
}





/*              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>*/

/*Monta cards*/

function montaCard(params) {
  let card = document.createElement("div");
  card.classList.add("card", params.customClass);
  card.appendChild(setCardTitle(params));
  card.appendChild(setCardContent(params));
  return card;
}

function setCardTitle(params) {
  /*cria os elementos */
  let cardTitle = document.createElement("div");
  let cardImgDiv = document.createElement("div");
  let cardImg = document.createElement("img");
  let cardText = document.createElement("h3");
  /*Adiciona classes e atributos*/
  cardTitle.classList.add("card-title");
  cardImgDiv.classList.add("card-title-img");
  cardText.classList.add("card-title-text");
  cardText.innerHTML = params.titleText; //titulo
  cardImg.src = params.imgPath;
  cardImg.alt = params.imgAlt;
  /*Insere img na div*/
  cardImgDiv.appendChild(cardImg);
  // termina de montar o titulo
  cardTitle.appendChild(cardImgDiv);
  cardTitle.appendChild(cardText);
  return cardTitle;
}

function setCardContent(params) {
  let cardContent = document.createElement("div");
  cardContent.classList.add("card-content");
  cardContent.innerHTML = params.contentText;
  return cardContent;
}

const buttonSalvar = document.querySelector("#buttonSalvar");

buttonSalvar.addEventListener(
  "click",
  function () {
    CheckValidation();
  },
  false
);

let dicas = JSON.parse(localStorage.getItem("dicas2")) || [];

function salvar() {
  let titulo = document.getElementById("titulo").value;
  let linguagem = document.getElementById("linguagem").value;
  let categoria = document.getElementById("categoria").value;
  let descricao = document.getElementById("descricao").value;
  let url = document.getElementById("url").value;
  let id = dicas.length + 1;
  let dica = {
    titulo: titulo,
    linguagem: linguagem,
    categoria: categoria,
    descricao: descricao,
    url: url,
    id: id,
  };

  dicas.push(dica);
  localStorage.setItem("dicas2", JSON.stringify(dicas));
  listar(dicas);
  limpar();
  estatisticas();
}

function CheckValidation() {
  let isValidForm = document.forms["REGform"].checkValidity();
  if (isValidForm) {
    salvar();
  } else {
    return false;
  }
}

function listar(array) {
  let lista = document.querySelector("#lista");
  lista.innerHTML = "";
  array.forEach((dica) => {
    let li = document.createElement("li");
    let button = document.createElement("button");
    button.addEventListener(
      "click",
      function () {
        deletarDica(dica.id);
      },
      false
    );
    button.innerHTML = "Deletar";
    li.appendChild(button);
    li.setAttribute("id", dica.id);
    li.appendChild(document.createTextNode(JSON.stringify(dica)));
    lista.appendChild(li);
  });
}

function deletarDica(idDica) {
  alert("entrou deoete" +idDica);
  dicas.splice(idDica - 1, 1);
  listar(dicas);
}
function limpar() {
  document.getElementById("titulo").value = "";
  document.getElementById("linguagem").value = "";
  document.getElementById("categoria").value = "selecione";
  document.getElementById("descricao").value = "";
  document.getElementById("url").value = "";
}
function estatisticas() {
  let estatistica = document.querySelector("#estatistica");
  estatistica.innerHTML = "";

  let liTotal = document.createElement("li");
  liTotal.appendChild(document.createTextNode(dicas.length));
  estatistica.appendChild(liTotal);

  let categoriaFrontEnd = dicas.filter(
    (dica) => dica.categoria === "frontEnd"
  ).length;
  let liFrontEnd = document.createElement("li");
  liFrontEnd.appendChild(document.createTextNode(categoriaFrontEnd));
  estatistica.appendChild(liFrontEnd);

  let categoriaBackEnd = dicas.filter(
    (dica) => dica.categoria === "backEnd"
  ).length;
  let liBackEnd = document.createElement("li");
  liBackEnd.appendChild(document.createTextNode(categoriaBackEnd));
  estatistica.appendChild(liBackEnd);

  let categoriaFullStack = dicas.filter(
    (dica) => dica.categoria === "fullStack"
  ).length;
  let liFullStack = document.createElement("li");
  liFullStack.appendChild(document.createTextNode(categoriaFullStack));
  estatistica.appendChild(liFullStack);

  let categoriaComportamentalSoft = dicas.filter(
    (dica) => dica.categoria === "comportamentalSoft"
  ).length;
  let liComportamentalSoft = document.createElement("li");
  liComportamentalSoft.appendChild(
    document.createTextNode(categoriaComportamentalSoft)
  );
  estatistica.appendChild(liComportamentalSoft);
}

let pesquisa = document.querySelector("#pesquisa");

const limparButton = document.querySelector("#limparButton");

const buttonPesquisar = document.querySelector("#buttonPesquisar");

buttonPesquisar.addEventListener(
  "click",
  function () {
    pesquisar();
  },
  false
);

function pesquisar() {
  let arrayFiltrado = dicas.filter((dica) => dica.titulo === pesquisa.value);
  listar(arrayFiltrado);
}
limparButton.addEventListener(
  "click",
  function () {
    limparPesquisa();
  },
  false
);

function limparPesquisa() {
  pesquisa.value = "";
}

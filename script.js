const buttonSalvar = document.querySelector("#buttonSalvar");

buttonSalvar.addEventListener(
  "click",
  function () {
    CheckValidation();
  },
  false
);

function salvar() {
  let titulo = document.getElementById("titulo").value;
  let linguagem = document.getElementById("linguagem").value;
  let categoria = document.getElementById("categoria").value;
  let descricao = document.getElementById("descricao").value;
  let url = document.getElementById("url").value;
  let dica = {
    titulo: titulo,
    linguagem: linguagem,
    categoria: categoria,
    descricao: descricao,
    url: url,
  };

  localStorage.setItem(dica.titulo, JSON.stringify(dica));

  listar();
  limpar();
  estatisticas();
}

function CheckValidation() {
  var isValidForm = document.forms["REGform"].checkValidity();

  if (isValidForm) {
    salvar();
  } else {
    return false;
  }
}

function listar() {
  let lista = document.querySelector("#lista");
  lista.innerHTML = "";
  Object.keys(localStorage).forEach(function (key) {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(localStorage.getItem(key)));
    lista.appendChild(li);
  });
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
  let li = document.createElement("li");

  li.appendChild(document.createTextNode(localStorage.length));
  estatistica.appendChild(li);
}

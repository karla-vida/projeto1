const buttonSalvar = document.querySelector("#buttonSalvar");
const corpo = document.querySelector("#corpo");
buttonSalvar.addEventListener(
  "click",
  function (event) {
    CheckValidation();
  },
  false
);

window.onload = function () {
  listar(dicas);
};
let dicas = JSON.parse(localStorage.getItem("dicas3")) || [];

function salvar() {
  let titulo = document.getElementById("titulo").value;
  let linguagem = document.getElementById("linguagem").value;
  let categoria = document.getElementById("categoria").value;
  let descricao = document.getElementById("descricao").value;
  let url = document.getElementById("url").value;
  let idDicaEditada = parseInt(document.getElementById("identificador").value);
  let id = dicas.length + 1;
  if (idDicaEditada > 0) {
    id = idDicaEditada;
  }

  let dica = {
    titulo: titulo,
    linguagem: linguagem,
    categoria: categoria,
    descricao: descricao,
    url: url,
    id: id,
  };
  if (idDicaEditada > 0) {
    dicas.forEach((dicaEditada, index) => {
      if (dicaEditada.id === idDicaEditada) {
        dicas[index] = dica;
      }
    });
  } else {
    dicas.push(dica);
  }

  localStorage.setItem("dicas3", JSON.stringify(dicas));
  alert("Dica cadastrada com sucesso!");
  listar(dicas);
  document.forms["REGform"].reset();
  document.getElementById("identificador").value = 0;
  //  limpar(
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
    let buttonDeletar = document.createElement("button");
    buttonDeletar.addEventListener(
      "click",
      function () {
        let resultado = confirm(
          "Você tem certeza que deseja excluir essa dica?"
        );
        if (resultado == true) {
          deletarDica(dica.id);
          alert("Dica excluída com sucesso!");
        } else {
          return false;
        }
      },
      false
    );
    buttonDeletar.innerHTML = "Deletar";
    li.appendChild(buttonDeletar);

    if (dica.url !== "") {
      let buttonVideo = document.createElement("button");
      buttonVideo.addEventListener(
        "click",
        function () {
          abrirVideo(dica.url);
        },
        false
      );
      buttonVideo.innerHTML = "Video";
      li.appendChild(buttonVideo);
    }

    let buttonEditar = document.createElement("button");
    buttonEditar.addEventListener(
      "click",
      function () {
        editarDica(dica.id);
        alert(
          "As informações da dica selecionada para edição foram enviadas para a barra lateral. " +
            "Realize as devidas edições e clique em Salvar para finalizar."
        );
      },
      false
    );
    buttonEditar.innerHTML = "Editar";
    li.appendChild(buttonEditar);

    li.setAttribute("id", dica.id);
    li.appendChild(document.createTextNode(JSON.stringify(dica)));
    lista.appendChild(li);
  });
}

function deletarDica(idDica) {
  dicas.splice(idDica - 1, 1);
  localStorage.setItem("dicas2", JSON.stringify(dicas));
  listar(dicas);
}

function editarDica(idDica) {
  let arrayEditado = dicas.filter((elemento) => elemento.id === idDica);
  let dicaEncontrada = arrayEditado[0];
  document.getElementById("titulo").value = dicaEncontrada.titulo;
  document.getElementById("linguagem").value = dicaEncontrada.linguagem;
  document.getElementById("categoria").value = dicaEncontrada.categoria;
  document.getElementById("descricao").value = dicaEncontrada.descricao;
  document.getElementById("url").value = dicaEncontrada.url;
  document.getElementById("identificador").value = dicaEncontrada.id;
}

function limpar() {
  document.getElementById("titulo").value = "";
  document.getElementById("linguagem").value = "";
  document.getElementById("categoria").value = "";
  document.getElementById("descricao").value = "";
  document.getElementById("url").value = "";
  document.getElementById("identificador").value = 0;
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

function abrirVideo(url) {
  window.open(url);
}

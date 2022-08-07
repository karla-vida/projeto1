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
  estatisticas();
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
    // li.appendChild(document.createTextNode(JSON.stringify(dica)));
    li.className = "liLista";

    let h1 = document.createElement("h1");
    h1.innerText = dica.titulo;
    h1.className = "h1Lista";
    li.appendChild(h1);

    let pLinguagem = document.createElement("p");
    pLinguagem.innerText = "Linguagem/Skill:" + dica.linguagem + "id" + dica.id;
    pLinguagem.className = "pLinguagem";
    li.appendChild(pLinguagem);

    let pCategoria = document.createElement("p");
    pCategoria.innerText = "Categoria:" + dica.categoria;
    pCategoria.className = "pCategoria";
    li.appendChild(pCategoria);

    let pDescricao = document.createElement("p");
    pDescricao.innerText = dica.descricao;
    pDescricao.className = "pDescricao";
    li.appendChild(pDescricao);

    let divButton = document.createElement("div");
    divButton.className = "divButton";

    let buttonDeletar = document.createElement("button");
    buttonDeletar.setAttribute("id", "buttonDeletar");
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
    divButton.appendChild(buttonDeletar);

    let buttonEditar = document.createElement("button");
    buttonEditar.setAttribute("id", "buttonEditar");
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
    divButton.appendChild(buttonEditar);

    if (dica.url !== "") {
      let buttonVideo = document.createElement("button");
      buttonVideo.setAttribute("id", "buttonVideo");
      buttonVideo.addEventListener(
        "click",
        function () {
          abrirVideo(dica.url);
        },
        false
      );
      divButton.appendChild(buttonVideo);
    }

    li.appendChild(divButton);
    li.setAttribute("id", dica.id);
    lista.appendChild(li);
  });
}

function deletarDica(idDica) {
  dicas.splice(idDica - 1, 1);
  localStorage.setItem("dicas3", JSON.stringify(dicas));
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
  liTotal.className = "itemEstatistica";
  let pTotal = document.createElement("p");
  pTotal.innerText = "Total";
  pTotal.className = "pEstatistica";
  liTotal.appendChild(pTotal);
  let pResultado = document.createElement("p");
  pResultado.innerText = dicas.length;
  pResultado.className = "pResultadoEstatistica";
  liTotal.appendChild(pResultado);
  estatistica.appendChild(liTotal);

  let categoriaFrontEnd = dicas.filter(
    (dica) => dica.categoria === "frontEnd"
  ).length;
  let liFrontEnd = document.createElement("li");
  liFrontEnd.className = "itemEstatistica";
  let pFrontEnd = document.createElement("p");
  pFrontEnd.innerText = "FrontEnd";
  pFrontEnd.className = "pEstatistica";
  liFrontEnd.appendChild(pFrontEnd);
  let pResultadoFront = document.createElement("p");
  pResultadoFront.innerText = categoriaFrontEnd;
  pResultadoFront.className = "pResultadoEstatistica";
  liFrontEnd.appendChild(pResultadoFront);
  estatistica.appendChild(liFrontEnd);

  let categoriaBackEnd = dicas.filter(
    (dica) => dica.categoria === "backEnd"
  ).length;
  let liBackEnd = document.createElement("li");
  liBackEnd.className = "itemEstatistica";
  let pBackEnd = document.createElement("p");
  pBackEnd.innerText = "BackEnd";
  pBackEnd.className = "pEstatistica";
  liBackEnd.appendChild(pBackEnd);
  let pResultadoBack = document.createElement("p");
  pResultadoBack.innerText = categoriaBackEnd;
  pResultadoBack.className = "pResultadoEstatistica";
  liBackEnd.appendChild(pResultadoBack);
  estatistica.appendChild(liBackEnd);

  let categoriaFullStack = dicas.filter(
    (dica) => dica.categoria === "fullStack"
  ).length;
  let liFullStack = document.createElement("li");
  liFullStack.className = "itemEstatistica";
  let pFullStack = document.createElement("p");
  pFullStack.innerText = "FullStack";
  pFullStack.className = "pEstatistica";
  liFullStack.appendChild(pFullStack);
  let pResultadoFull = document.createElement("p");
  pResultadoFull.innerText = categoriaFullStack;
  pResultadoFull.className = "pResultadoEstatistica";
  liFullStack.appendChild(pResultadoFull);
  estatistica.appendChild(liFullStack);

  let categoriaComportamentalSoft = dicas.filter(
    (dica) => dica.categoria === "comportamentalSoft"
  ).length;
  let liComportamentalSoft = document.createElement("li");
  liComportamentalSoft.className = "itemEstatistica";
  let pSoftSkill = document.createElement("p");
  pSoftSkill.innerText = "SoftSkill";
  pSoftSkill.className = "pEstatistica";
  liComportamentalSoft.appendChild(pSoftSkill);
  let pResultadoSoftSkill = document.createElement("p");
  pResultadoSoftSkill.innerText = categoriaComportamentalSoft;
  pResultadoSoftSkill.className = "pResultadoEstatistica";
  liComportamentalSoft.appendChild(pResultadoSoftSkill);
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
  let arrayFiltrado = dicas.filter((dica) =>
    dica.titulo.includes(pesquisa.value)
  );

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

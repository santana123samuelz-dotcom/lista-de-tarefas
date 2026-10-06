// =============================
// ELEMENTOS DO HTML
// =============================

const formTarefa =
    document.getElementById("formTarefa");

const inputTarefa =
    document.getElementById("inputTarefa");

const listaTarefas =
    document.getElementById("listaTarefas");

const mensagemErro =
    document.getElementById("mensagemErro");

const emptyState =
    document.getElementById("emptyState");

const quantidadeTarefas =
    document.getElementById("quantidadeTarefas");


// =============================
// ADICIONAR NOVA TAREFA
// =============================

formTarefa.addEventListener(
    "submit",
    function (event) {

        // Evita o recarregamento da página.
        event.preventDefault();

        const textoTarefa =
            inputTarefa.value.trim();

        // Validação de tarefa vazia.
        if (textoTarefa === "") {

            mostrarErro(
                "Digite uma tarefa antes de adicionar."
            );

            inputTarefa.focus();

            return;
        }

        esconderErro();

        criarTarefa(textoTarefa);

        inputTarefa.value = "";

        inputTarefa.focus();

        atualizarInterface();
    }
);


// =============================
// CRIAR TAREFA
// =============================

function criarTarefa(texto) {

    // Cria o item da lista.
    const tarefa =
        document.createElement("li");

    tarefa.classList.add(
        "task-item"
    );


    // -------------------------
    // Botão concluir
    // -------------------------

    const botaoConcluir =
        document.createElement("button");

    botaoConcluir.classList.add(
        "check-button"
    );

    botaoConcluir.innerHTML =
        "✓";

    botaoConcluir.setAttribute(
        "aria-label",
        "Marcar tarefa como concluída"
    );


    // -------------------------
    // Texto da tarefa
    // -------------------------

    const textoElemento =
        document.createElement("span");

    textoElemento.classList.add(
        "task-text"
    );

    textoElemento.textContent =
        texto;


    // -------------------------
    // Botão excluir
    // -------------------------

    const botaoExcluir =
        document.createElement("button");

    botaoExcluir.classList.add(
        "delete-button"
    );

    botaoExcluir.innerHTML =
        "✕";

    botaoExcluir.setAttribute(
        "aria-label",
        "Excluir tarefa"
    );


    // =========================
    // EVENTO DE CONCLUSÃO
    // =========================

    botaoConcluir.addEventListener(
        "click",
        function () {

            alternarConclusao(
                tarefa
            );
        }
    );


    // Também permite clicar
    // diretamente no texto.
    textoElemento.addEventListener(
        "click",
        function () {

            alternarConclusao(
                tarefa
            );
        }
    );


    // =========================
    // EVENTO DE EXCLUSÃO
    // =========================

    botaoExcluir.addEventListener(
        "click",
        function () {

            removerTarefa(
                tarefa
            );
        }
    );


    // =========================
    // MONTAGEM DO ELEMENTO
    // =========================

    tarefa.appendChild(
        botaoConcluir
    );

    tarefa.appendChild(
        textoElemento
    );

    tarefa.appendChild(
        botaoExcluir
    );

    listaTarefas.appendChild(
        tarefa
    );
}


// =============================
// CONCLUIR / DESMARCAR TAREFA
// =============================

function alternarConclusao(tarefa) {

    tarefa.classList.toggle(
        "completed"
    );

    atualizarInterface();
}


// =============================
// REMOVER TAREFA
// =============================

function removerTarefa(tarefa) {

    tarefa.classList.add(
        "removing"
    );

    // Aguarda a animação terminar.
    setTimeout(
        function () {

            tarefa.remove();

            atualizarInterface();

        },
        280
    );
}


// =============================
// MENSAGEM DE ERRO
// =============================

function mostrarErro(mensagem) {

    mensagemErro.textContent =
        mensagem;

    mensagemErro.classList.add(
        "active"
    );
}


function esconderErro() {

    mensagemErro.textContent =
        "";

    mensagemErro.classList.remove(
        "active"
    );
}


// =============================
// ATUALIZAR INTERFACE
// =============================

function atualizarInterface() {

    const tarefas =
        document.querySelectorAll(
            ".task-item"
        );

    const total =
        tarefas.length;


    // Atualiza quantidade.
    if (total === 1) {

        quantidadeTarefas.textContent =
            "1 tarefa";

    } else {

        quantidadeTarefas.textContent =
            `${total} tarefas`;
    }


    // Mostra ou esconde
    // a mensagem de lista vazia.
    if (total === 0) {

        emptyState.style.display =
            "block";

    } else {

        emptyState.style.display =
            "none";
    }
}


// =============================
// ESTADO INICIAL
// =============================

atualizarInterface();
const container = document.getElementById('container');

const divChekInserir = document.getElementById('divCheckInserir');
const iconCheckInserir = document.getElementById('iconCheckInserir');

const divCheckEscolha = document.getElementById('divCheckEscolha');
const iconCheckEscolha = document.getElementById('iconCheckEscolha');

const divCheckSorteio = document.getElementById('divCheckSorteio');
const iconCheckSorteio = document.getElementById('iconCheckSorteio');

window.onload = document.getElementById('txtDados').value = '';

document.getElementById('titulo').addEventListener('click', function () {
    window.location.href = 'index.html';
});

function lerCSV(arquivo) {
    return new Promise((resolve, reject) => {
        var reader = new FileReader();

        reader.onload = function (event) {
            var conteudo = event.target.result;
            var linhas = conteudo.split('\n');

            var dados = [];
            linhas.forEach(function (linha) {
                var colunas = linha.split(',');
                dados.push(colunas);
            });

            resolve(dados);
        };

        reader.readAsText(arquivo);
    });
}

document.getElementById('iptArquivo').addEventListener('change', async function (event) {
    var arquivo = event.target.files[0];

    try {
        var dadosCSV = await lerCSV(arquivo);
        preencherTextArea(dadosCSV);
    } catch (erro) {
        console.error('Erro ao ler o arquivo CSV:', erro);
    }
});

function mudarTela() {

    var textArea = document.getElementById('txtDados').value;
    var linhas = textArea.split('\n');

    linhas.forEach(function (linha) {
        var colunas = linha.split('\t');
        if (linha != '') {
            itens.push(colunas);
        }
    });

    if (itens.length == 0) {
        alert('Insira os itens antes de prosseguir.');
        return;
    }

    document.getElementById('insert_itens').style.display = 'none';
    document.getElementById('qtd_sortear').style.display = 'flex';

    divCheckEscolha.classList.remove('checkInativo');
    iconCheckEscolha.classList.remove('iconInativo');
    divCheckEscolha.classList.add('checkAtivo');
    iconCheckEscolha.classList.add('iconAtivo');
}

var itens = [];
function preencherTextArea(dados) {
    var textArea = document.getElementById('txtDados');
    textArea.value += '\n'

    dados.forEach(function (linha) {
        // itens.push(linha);
        textArea.value += linha.join('\t') + '\n';
    });
}

ganhadores = [];
function sortear() {
    let quantidade = document.getElementById('qtdItensSorteados').value;

    if (quantidade > itens.length) {
        alert('A quantidade de itens a serem sorteados não pode ser maior que a quantidade de itens inseridos.');
        return;
    }
    document.getElementById('qtd_sortear').style.display = 'none';
    document.getElementById('resultado').style.display = 'flex';

    divCheckSorteio.classList.remove('checkInativo');
    iconCheckSorteio.classList.remove('iconInativo');
    divCheckSorteio.classList.add('checkAtivo');
    iconCheckSorteio.classList.add('iconAtivo');


    for (let i = 0; i < quantidade; i++) {
        let index = Math.floor(Math.random() * itens.length);
        let ganhador = itens[index];
        ganhadores.push(ganhador);
        itens.splice(index, 1);
    }

    document.getElementById('listaDeGanhadores').innerHTML = '';

    ganhadores.forEach(function (ganhador) {
        document.getElementById('listaDeGanhadores').innerHTML += '<p>' + ganhador.join('\t') + '</p>';
    });
}
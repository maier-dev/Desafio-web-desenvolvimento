// Sincronização entre os campos
const inputPesoIMC = document.getElementById('peso');
const inputPesoAgua = document.getElementById('peso-agua');

// Quando digitar no peso do IMC, atualiza o da Água
inputPesoIMC.addEventListener('input', () => {
    inputPesoAgua.value = inputPesoIMC.value;
});

// Quando digitar no peso da Água, atualiza o do IMC
inputPesoAgua.addEventListener('input', () => {
    inputPesoIMC.value = inputPesoAgua.value;
});

function calcularIMC() {
    // Busca os valores digitados nos inputs e converte para números decimais
    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value);
    const resultBox = document.getElementById('res-imc'); // Onde o resultado vai aparecer

    if (!peso || !altura || altura <= 0) { // Validação: Impede o cálculo se os campos estiverem vazios ou altura for zero
        alert("Por favor, insira valores válidos para peso e altura.");
        return;
    }

    const imc = (peso / (altura * altura)).toFixed(1); // Aplicação da fórmula, deixando uma casa decimal
    
    let classificacao = "";
    let classeCor = "";

    // Lógica para definir o status com base no valor do IMC
    if (imc < 18.5) { 
        classificacao = "Abaixo do peso"; 
        classeCor = "imc-baixo"; 
    } else if (imc < 25) { 
        classificacao = "Peso ideal (Saudável)"; 
        classeCor = "imc-ideal"; 
    } else if (imc < 30) { 
        classificacao = "Sobrepeso"; 
        classeCor = "imc-sobre"; 
    } else { 
        classificacao = "Obesidade"; 
        classeCor = "imc-obeso"; 
    }

    // Cria o visual do resultado com o valor do IMC e o status
    resultBox.innerHTML = `
        <div class="result-content">
            <span class="result-label">Seu IMC é:</span>
            <div class="result-value ${classeCor}">${imc}</div>
            <p class="result-status">Status: ${classificacao}</p>
            <p class="result-info">
                Lembre-se: o IMC é apenas um indicador. Uma avaliação de saúde integral com nossos especialistas é fundamental para entender suas necessidades reais.
            </p>
        </div>
    `;
    resultBox.classList.remove('hidden'); // Remove a classe hidden para mostra a caixa de resultado 
}

function calcularAgua() {
    const peso = parseFloat(document.getElementById('peso-agua').value); // Pega o peso do usuário
    const resultBox = document.getElementById('res-agua');

    // Validação
    if (!peso || peso <= 0) {
        alert("Por favor, insira seu peso.");
        return;
    }

    // Cálculo: 35ml por kg
    const totalMl = peso * 35;
    const litros = (totalMl / 1000).toFixed(1); // Converte ml para litros
    const copos = Math.round(totalMl / 250); // Calcula quantos copos de 250ml seriam necessários

    // Injeta o conteúdo visual do resultado da hidratação
    resultBox.innerHTML = `
        <div class="result-content">
            <span class="result-label">Sua meta diária estimada é:</span>
            <div class="result-value color-agua">${litros} Litros</div>
            <p class="result-status">Aproximadamente <strong>${copos} copos</strong> de 250ml.</p>
            <div class="water-tip">
                💡 <strong>Dica:</strong> Não espere sentir sede para beber água. Mantenha uma garrafa sempre visível!
            </div>
        </div>
    `;
    resultBox.classList.remove('hidden'); // Torna o container visível
}

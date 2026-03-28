document.getElementById('triagem-form').addEventListener('submit', function(event) { // Captura o evento de submit do formulário
    event.preventDefault(); // Impede a página de recarregar

    // Pegar valores que usuário selecionou
    const nome = document.getElementById('user-name').value;
    const motivo = document.getElementById('main-reason').value;
    const urgencia = document.querySelector('input[name="urgency"]:checked').value;

    // Seleciona os elementos da página onde o resultado será exibido
    const resultArea = document.getElementById('result-area');
    const resultTitle = document.getElementById('result-title');
    const resultText = document.getElementById('result-text');

    // Lógica de recomendação
    let recomendacao = "";
    let local = "";

    // Define a especialidade com base na seleção do usuário
    if (motivo === "sintomas") {
        local = "Clínico Geral";
        recomendacao = `Olá, ${nome}. Com base nos sintomas e na urgência ${urgencia}, recomendamos uma consulta com um ${local} para uma avaliação física detalhada.`;
    } else if (motivo === "emocional") {
        local = "Psicologia ou Psiquiatria";
        recomendacao = `Sentimos muito que esteja passando por isso, ${nome}. O cuidado com a mente é fundamental. Sugerimos agendar um acolhimento com nossa equipe de ${local}.`;
    } else if (motivo === "rotina") {
        local = "Medicina Preventiva";
        recomendacao = `Parabéns pela proatividade, ${nome}! Manter os exames em dia é a melhor forma de cuidado. O setor de ${local} está pronto para te receber.`;
    } else {
        local = "Medicina do Estilo de Vida ou Nutrição";
        recomendacao = `Excelente escolha, ${nome}. Pequenos hábitos mudam vidas e a prevenção é o melhor caminho. Recomendamos conversar com nossos especialistas em ${local} para um plano personalizado.`;
    }

    // Salva a especialidade recomendada na memória do navegador
    localStorage.setItem('especialidadeRecomendada', local);

    // Exibir resultado
    resultTitle.innerText = "Nossa recomendação para você:";
    resultText.innerText = recomendacao;
    resultArea.classList.remove('hidden'); // Faz a div de resultado aparecer
});
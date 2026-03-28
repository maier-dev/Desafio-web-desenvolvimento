// Busca se tem reservas já feitas que guardadas no LocalStorage
function obterReservas() {
    const salvas = localStorage.getItem('minhasReservas');
    return salvas ? JSON.parse(salvas) : {}; // Se existir, converte de texto para objeto, senão cria um vazio
}

// Salva uma nova reserva no LocalStorage para ela não sumir ao atualizar a página
function salvarReserva(chave, nome, especialidade) {
    let reservas = obterReservas();
    reservas[chave] = { // Adiciona a nova reserva usando a data como chave única
        paciente: nome,
        area: especialidade
    }; 
    localStorage.setItem('minhasReservas', JSON.stringify(reservas)); // Converte objeto para texto e salva
}

// Lógica ao carregar a página

document.addEventListener('DOMContentLoaded', function() {
    const recomendacao = localStorage.getItem('especialidadeRecomendada'); // Verifica se o usuário veio da triagem e tem uma especialidade recomendada
    const campoEspecialidade = document.getElementById('especialidade');
    const hintTriagem = document.getElementById('hint-triagem');
    
    if (recomendacao && campoEspecialidade) {
        campoEspecialidade.value = recomendacao; // Preenche o campo automaticamente e mostra o aviso
        hintTriagem.style.display = 'block';
        localStorage.removeItem('especialidadeRecomendada'); // Limpa a recomendação para não repetir se recarregar a página
    }

    // Se o usuário mudar a especialidade manualmente, remove o aviso da triagem
    campoEspecialidade.addEventListener('change', function() {
        // Se o valor selecionado for diferente daquele que ativou o hint, escondemos o hint
        hintTriagem.style.display = 'none';
    });

    iniciarSemana(); // Inicia a exibição da agenda
});

let segundaAtual;

// Define a data de início da semana (Sempre segunda-feira)
function iniciarSemana() {
    let hoje = new Date();
    let diaSemana = hoje.getDay(); // Inicia com 0 = domingo, 1 = segunda
    let diferenca = (diaSemana === 0 ? -6 : 1 - diaSemana); // Cálculo para encontrar a segunda-feira desta semana

    segundaAtual = new Date(hoje);
    segundaAtual.setHours(0,0,0,0); // Zera o horário para comparar apenas as datas
    segundaAtual.setDate(hoje.getDate() + diferenca);

    atualizarTabela();
}

// Desenha a tabela de horários
function atualizarTabela() {
    const ids = ["seg", "ter", "qua", "qui", "sex"];
    const nomes = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"];
    const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    
    let hoje = new Date();
    hoje.setHours(0,0,0,0); 

    // Carrega as reservas do LocalStorage para marcar na tabela
    const reservasSalvas = obterReservas();

    // Loop que passa por cada um dos 5 dias (segunda a sexta)
    for (let i = 0; i < 5; i++) {
        let dataColuna = new Date(segundaAtual);
        dataColuna.setDate(segundaAtual.getDate() + i);

        let dia = dataColuna.getDate();
        let mes = meses[dataColuna.getMonth()];
        let chaveData = dataColuna.toISOString().split('T')[0]; // Cria um identificador único para a data

        const thElemento = document.getElementById(ids[i]);
        if(thElemento) {
            thElemento.innerHTML = `<strong>${nomes[i]}</strong><br>${dia} ${mes}`; // Atualiza dia e mês da coluna
            
            const celulasDaColuna = document.querySelectorAll(`#agenda-saude tbody tr td:nth-child(${i + 1})`);
            
            celulasDaColuna.forEach(celula => {
                celula.className = ""; // Limpa classes antigas para evitar bugs ao mudar de semana
                
                // Data passada
                if (dataColuna < hoje) {
                    celula.innerText = "Encerrado";
                    celula.classList.add('celula-encerrada');
                } 
                // Já existe reserva feita
                else if (reservasSalvas[chaveData] || celula.innerText === "Ocupado") {
                    if (reservasSalvas[chaveData]) {
                        const res = reservasSalvas[chaveData];
                        celula.innerHTML = `<strong>${res.paciente}</strong><br><small class="area-tag">${res.area}</small>`; // Mostra o nome do paciente e a especialidade na célula
                        celula.classList.add('reserva-sucesso'); // Classe para reserva do próprio usuário
                    } else {
                        celula.innerText = "Ocupado";
                    }
                    celula.classList.add('celula-ocupada');
                } 
                //  Horário disponível
                else {
                    celula.innerText = "Livre";
                    celula.classList.add('celula-livre');
                }
            });
        }
    }
}

// Função para ao clicar em uma célula "Livre"
function agendar(celula) {
    const nomeInput = document.getElementById('nome-agenda');
    const especialidadeInput = document.getElementById('especialidade');

    if (!nomeInput.value.trim() || !especialidadeInput.value) { // Verifica se os campos de texto/select estão preenchidos
        alert("Por favor, preencha seu nome e selecione uma especialidade primeiro.");
        nomeInput.focus();
        return;
    }

    if (!celula.classList.contains('celula-livre')) return; // Só permite clicar se a célula estiver marcada como Livre

    const confirmar = confirm(`Confirmar agendamento de ${especialidadeInput.value}?`);
    
    if (confirmar) {
        const indexColuna = celula.cellIndex;
        const dataAgendada = new Date(segundaAtual);
        dataAgendada.setDate(segundaAtual.getDate() + indexColuna);
        
        let chaveData = dataAgendada.toISOString().split('T')[0];
        const dataFormatada = dataAgendada.toLocaleDateString('pt-BR');

        salvarReserva(chaveData, nomeInput.value, especialidadeInput.value); // Salva os dados no navegador

        // Esconde o cabeçalho de instruções
        document.getElementById('header-instrucoes').classList.add('hidden');

        // Esconde o card do formulário
        document.getElementById('area-formulario').classList.add('hidden');
        
        // Esconde a tabela
        document.getElementById('area-tabela').classList.add('hidden');

        // Exibe mensagem de confirmação
        const detalhes = document.getElementById('detalhes-agendamento');
        detalhes.innerHTML = `Olá <strong>${nomeInput.value}</strong>, sua consulta de <strong>${especialidadeInput.value}</strong> foi pré-agendada para o dia <strong>${dataFormatada}</strong>.`;
        document.getElementById('msg-sucesso').classList.remove('hidden');
    }
}

// Botões de navegação: adiciona ou subtrai 7 dias da data de referência
function proximaSemana() { segundaAtual.setDate(segundaAtual.getDate() + 7); atualizarTabela(); }
function semanaAnterior() { segundaAtual.setDate(segundaAtual.getDate() - 7); atualizarTabela(); }

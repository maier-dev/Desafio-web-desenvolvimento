// Lógica de boas vindas de acordo com horário
const msgBoasVindas = document.getElementById('welcome-message');
if (msgBoasVindas) { // Verifica se o elemento existe na página antes de tentar mudar o texto
    const hora = new Date().getHours(); // Pega a hora atual do sistema

    if (hora < 12) {
        msgBoasVindas.innerText = "Bom dia! Bem-vindo ao seu espaço de cuidado.";
    } else if (hora < 18) {
        msgBoasVindas.innerText = "Boa tarde! Bem-vindo ao seu espaço de cuidado.";
    } else {
        msgBoasVindas.innerText = "Boa noite! Bem-vindo ao seu espaço de cuidado.";
    }
}


// Base de dados das dicas
const dicasDeSaude = [ // Cada objeto { } representa um card que será mostrado no carrossel
    {
        titulo: "Hidratação Constante",
        texto: "Beber água regularmente melhora o foco e a energia. Tente manter uma garrafa sempre por perto para criar o hábito."
    },
    {
        titulo: "Pausas Ativas",
        texto: "A cada 1 hora de trabalho, levante-se e alongue-se por 5 minutos. Isso ajuda a prevenir dores musculares e melhora a circulação."
    },
    {
        titulo: "Vínculo Social",
        texto: "Conversar com amigos ou familiares reduz o estresse. O cuidado com a saúde mental é parte fundamental do bem-estar integral."
    },
    {
        titulo: "Alimentação Consciente",
        texto: "Evite usar o celular enquanto come. Sinta o sabor dos alimentos e respeite os sinais de saciedade do seu corpo."
    },
    {
        titulo: "Sono de Qualidade",
        texto: "Tente manter um horário fixo para dormir. Um sono reparador fortalece o sistema imunológico e a saúde do coração."
    }
];

// Variável que armazena qual dica está aparecendo agora (começa na 0)
let indiceAtual = 0;

// Movimentação do carrossel
document.addEventListener('DOMContentLoaded', () => { // Aguarda o HTML carregar completamente antes de rodar o script
    
    // Captura os elementos onde as dicas serão colocadas e os botões de controle
    const containerDica = document.getElementById('tip-container');
    const botaoAnterior = document.getElementById('prev-btn');
    const botaoProximo = document.getElementById('next-btn');

    // Só executa se os três elementos existirem
    if (containerDica && botaoAnterior && botaoProximo) {
        
        // Função para atualizar o conteúdo do card na tela
        const atualizarCard = (index) => { // Escolhe a dica na lista usando a posição atual e mostra ela dentro do container na tela
            const dica = dicasDeSaude[index]; // Acessa a posição específica do array
            
            // Cria o conteúdo visual da dica usando o título e o texto escolhidos
            containerDica.innerHTML = `
                <div class="tip-card">
                    <h3>${dica.titulo}</h3>
                    <p>${dica.texto}</p>
                </div>
            `;
        };

        // Evento de clicar no botão próximo
        botaoProximo.addEventListener('click', () => {
            indiceAtual = (indiceAtual + 1) % dicasDeSaude.length; // Lógica circular: Soma 1 ao índice. Se chegar no fim, volta para o primeiro (0)
            atualizarCard(indiceAtual);
        });

        // Evento de clicar no botão anterior
        botaoAnterior.addEventListener('click', () => {
            indiceAtual = (indiceAtual - 1 + dicasDeSaude.length) % dicasDeSaude.length; // Lógica circular: Subtrai 1 do índice. Se estiver no primeiro, vai para o último, somando o length antes do módulo para evitar números negativos e permitir que ele vá do 0 para o último card
            atualizarCard(indiceAtual);
        });

        // Renderiza a primeira dica assim que a página carrega
        atualizarCard(indiceAtual);
        
        console.log("Portal Saúde & Vínculo: Carrossel inicializado com sucesso!");
    }
});

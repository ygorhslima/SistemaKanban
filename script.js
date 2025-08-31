// Selecionando os elementos corretamente
const quadroKanban = document.querySelector(".quadroKanban");
const txt_tituloColuna = document.getElementById("txt_tituloColuna");
const btn_adicionarColuna = document.getElementById("btn_adicionarColuna");
const escolher_cor = document.getElementById("escolher_cor");

// Evento do botão "Adicionar Coluna"
btn_adicionarColuna.addEventListener("click", () => {
    const titulo = txt_tituloColuna.value.trim();
    if (!titulo) {
        alert("Por favor, digite um título para a coluna.");
        return;
    }
    const cor = escolher_cor.value;
    
    // Cria uma nova instância da classe KanbanColumn
    const novaColuna = new KanbanColumn(titulo, cor);
    
    // Adiciona o elemento da coluna ao quadro Kanban
    quadroKanban.appendChild(novaColuna.element);

    // Limpa o campo de texto
    txt_tituloColuna.value = "";
});

class KanbanColumn {
    constructor(titulo, cor) {
        this.titulo = titulo;
        this.cor = cor;
        // Chama o método para criar o elemento da coluna
        this.element = this.createElement();
        // Seleciona o container de cards dentro da própria coluna
        this.gridCards = this.element.querySelector(".grid_cards");
    }

    createElement() {
        /** ÁREA DE ESTILOS INLINE (poderia estar no CSS)*/
        // ... (Seus estilos para a coluna)
        const ESTILO_kanban_column = `
            display: flex;
            flex-direction: column;
            gap: 18px;
            height: 100%;
            overflow-y: auto;
            background-color: ${this.cor};
            border-radius: 12px;
            box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.1);
            padding: 12px;
            overflow: hidden;
            position: relative;
            min-width: 252px;
        `;
        const ESTILO_kanban_title = `
            display: flex;
            justify-content: space-between;
        `;
        const ESTILO_add_card = `
            color: #fff;
            font-size: 20px;
            background-color: transparent;
            cursor: pointer;
            border: none;
        `;
        const ESTILO_titulo_column = `
            font-size: 18px;
            color: #fff;
            font-weight: 600;
        `;
        const ESTILO_grid_cards = `
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-auto-rows: 1fr;
            grid-auto-columns: 1fr;
            gap: 10px;
        `;

        const TAG_kanban_column = document.createElement("div");
        TAG_kanban_column.className = "kanban-column";
        TAG_kanban_column.style.cssText = ESTILO_kanban_column;

        const TAG_kanban_title = document.createElement("div");
        TAG_kanban_title.className = "kanban-title";
        TAG_kanban_title.style.cssText = ESTILO_kanban_title;

        const TAG_titulo = document.createElement("h2");
        TAG_titulo.textContent = this.titulo;
        TAG_titulo.style.cssText = ESTILO_titulo_column;
        
        const TAG_button_addCard = document.createElement("button");
        TAG_button_addCard.className = "add-card";
        TAG_button_addCard.style.cssText = ESTILO_add_card;

        // **Ajuste 1: Passa a referência da coluna (`this`) para o FormularioCard**
        TAG_button_addCard.addEventListener("click", () => {
            new FormularioCard(this);
        });
        
        const simbolo_addCard = document.createElement("i");
        simbolo_addCard.className = "fa-solid fa-plus";

        const grid_cards = document.createElement("div");
        grid_cards.className = "grid_cards";
        grid_cards.style.cssText = ESTILO_grid_cards;

        TAG_kanban_title.appendChild(TAG_titulo);
        TAG_kanban_title.appendChild(TAG_button_addCard);
        TAG_button_addCard.appendChild(simbolo_addCard);
        
        TAG_kanban_column.appendChild(TAG_kanban_title);
        TAG_kanban_column.appendChild(grid_cards);
        
        // Retorna o elemento principal da coluna
        return TAG_kanban_column;
    }

    // **Ajuste 2: Novo método para adicionar um card**
    adicionarCard(cardElement) {
        this.gridCards.appendChild(cardElement);
    }
}


class KanbanCard {
    constructor(dados) {
        this.tituloCard = dados.titulo;
        this.corCard = dados.cor;
        this.descricaoCard = dados.descricao;
        this.dataCard = dados.data;
        // **Ajuste 3: Chama o método que cria o elemento no construtor**
        this.element = this.createElement();
        this.gridCards = this.element.querySelector(".grid_cards")


        // Adiciona os listeners de drop aqui
        this.gridCards.addEventListener("dragover", e => {
            e.preventDefault();
            this.gridCards.classList.add("cards-hover");
        });

        this.gridCards.addEventListener("dragleave", e => {
            this.gridCards.classList.remove("cards-hover");
        });

        this.gridCards.addEventListener("drop", e => {
            e.preventDefault();
            this.gridCards.classList.remove("cards-hover");

            // Recupera o ID do card
            const cardId = e.dataTransfer.getData("text/plain");
            const draggedCard = document.querySelector(`.kanban-card[data-id="${cardId}"]`);

            // Adiciona o card à nova coluna
            this.gridCards.appendChild(draggedCard);

            // TODO: Lembre-se de atualizar os dados do card no seu "estado" ou localStorage
        });

    }

    // **Ajuste 4: Renomeado para `createElement` e retorna o elemento criado**
    createElement() {

        const kanban_card = document.createElement("div");
        kanban_card.className = "kanban-card";
        kanban_card.draggable = true;
        kanban_card.style.backgroundColor = this.corCard;

        const card_title = document.createElement("h1");
        card_title.className = "card-title";
        card_title.textContent = this.tituloCard;

        const card_description = document.createElement("p");
        card_description.className = "card-description";
        card_description.textContent = this.descricaoCard;

        const card_data = document.createElement("p");
        card_data.className = "card-data";
        card_data.textContent = this.dataCard;

        kanban_card.appendChild(card_title);
        kanban_card.appendChild(card_description);
        kanban_card.appendChild(card_data);


        const grid_cards = document.createElement("div");
        grid_cards.className = "grid_cards";
        grid_cards.style.cssText = ESTILO_grid_cards;

        return kanban_card;
    }
}


class FormularioCard {
    // **Ajuste 5: O construtor recebe a coluna como argumento**
    constructor(coluna) {
        this.coluna = coluna;
        // Cria o formulário e já o anexa ao corpo da página
        this.element = this.criarJanela();
        document.body.appendChild(this.element);
    }
    
    criarJanela() {
        // ... (Estilos e criação dos elementos do formulário)
        const estilo = document.createElement('style');
        estilo.innerHTML = `
            .criarCard {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 400px;
                padding: 30px;
                background-color: #ffffff;
                border-radius: 20px;
                box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
                display: flex;
                flex-direction: column;
                gap: 15px;
                font-family: Arial, sans-serif;
                z-index: 1000;
            }
            .criarCard label { font-weight: bold; margin-bottom: 5px; }
            .criarCard input[type="text"], .criarCard input[type="color"],
            .criarCard input[type="date"], .criarCard textarea {
                padding: 12px;
                border: 1px solid #ccc;
                border-radius: 10px;
                font-size: 14px;
                width: 100%;
                height: 60px;
                box-sizing: border-box;
            }
            .btn_criar_card {
                background-color: #615e5e; border: none; padding: 5px;
                border-radius: 10px; transition: 0.6s; color: white;
            }
            .btn_criar_card:hover { opacity: 0.8; }
            .criarCard textarea { resize: vertical; min-height: 80px; }
            .div_btn_sair{
                display:flex;
                flex-direction:row;
                justify-content:flex-end;
            }
            .btn_sair{
                width:10%;
                border-radius:50%;
                border:none;
                padding:5px;
            }
        `;
        document.head.appendChild(estilo);

        const botao_sair = document.createElement("button")
        botao_sair.className = "btn_sair"
        botao_sair.textContent = "X"
        botao_sair.addEventListener("click",()=>{
            this.fecharJanela()
        })
       
        const div_do_botao_sair = document.createElement("div")
        div_do_botao_sair.className = "div_btn_sair"
        div_do_botao_sair.appendChild(botao_sair)
        
        const janela = document.createElement("div");
        janela.className = "criarCard";
        
        const labelTxt_titulo = document.createElement("label");
        labelTxt_titulo.setAttribute("for", "txt_titulo");
        labelTxt_titulo.textContent = "Título";

        const input_titulo = document.createElement("input");
        input_titulo.type = "text";
        input_titulo.id = "txt_titulo";

        const label_cor = document.createElement("label");
        label_cor.setAttribute("for", "lbl_cor_card");
        label_cor.textContent = "Cor";  

        const input_cor = document.createElement("input");
        input_cor.type = "color";
        input_cor.id = "lbl_cor_card";

        const labelTxt_descricao = document.createElement("label");
        labelTxt_descricao.setAttribute("for", "txt_descricao");
        labelTxt_descricao.textContent = "Descrição";

        const input_descricao = document.createElement("textarea");
        input_descricao.id = "txt_descricao";

        const label_data = document.createElement("label");
        label_data.setAttribute("for", "lbl_data");
        label_data.textContent = "Data de criação";

        const input_data = document.createElement("input");
        input_data.type = "date";
        input_data.id = "lbl_data";

        const btn_criar_card = document.createElement("button");
        btn_criar_card.className = "btn_criar_card";
        btn_criar_card.textContent = "Criar card";
        
        // **Ajuste 6: Evento do botão de criação do card**
        btn_criar_card.addEventListener("click", () => {
            const dadosDoCard = {
                titulo: input_titulo.value,
                cor: input_cor.value,
                descricao: input_descricao.value,
                data: input_data.value
            };
            
            // Cria uma nova instância de KanbanCard e passa os dados
            const novoCard = new KanbanCard(dadosDoCard);
            
            // Usa a referência da coluna para adicionar o card
            this.coluna.adicionarCard(novoCard.element);

            // Fecha a janela do formulário
            this.fecharJanela();
        });

        // Adiciona os elementos ao container principal do 
        janela.appendChild(div_do_botao_sair)
        janela.appendChild(labelTxt_titulo);
        janela.appendChild(input_titulo);
        janela.appendChild(label_cor);
        janela.appendChild(input_cor);
        janela.appendChild(labelTxt_descricao);
        janela.appendChild(input_descricao);
        janela.appendChild(label_data);
        janela.appendChild(input_data);
        janela.appendChild(btn_criar_card);

        // Retorna o container para ser anexado
        return janela;
    }

    fecharJanela() {
        this.element.remove();
    }
}
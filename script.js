// Selecionando os elementos corretamente
const quadroKanban = document.querySelector(".quadroKanban");
const txt_tituloColuna = document.getElementById("txt_tituloColuna");
const btn_adicionarColuna = document.getElementById("btn_adicionarColuna");
const escolher_cor = document.getElementById("escolher_cor");

// A classe KanbanColumn foi refatorada para ser uma classe "normal"
class KanbanColumn {
    constructor(titulo, cor) {
        this.titulo = titulo;
        this.cor = cor;
        this.element = this.configuracaoKanbanColumn();
    }

    configuracaoKanbanColumn() {
        /**ÁREA DE ESTILOS INLINE (poderia estar no CSS)*/
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
        
        // Criando e configurando os elementos
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

        TAG_button_addCard.addEventListener("click",()=>{

        })
        
        const simbolo_addCard = document.createElement("i");
        simbolo_addCard.className = "fa-solid fa-plus";
            
        // Estruturando os elementos
        TAG_kanban_title.appendChild(TAG_titulo);
        TAG_kanban_title.appendChild(TAG_button_addCard);
        TAG_button_addCard.appendChild(simbolo_addCard);
        
        TAG_kanban_column.appendChild(TAG_kanban_title);
        
        // Retorna o elemento principal da coluna
        return TAG_kanban_column;
    }
}

// Evento do botão de adicionar coluna
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
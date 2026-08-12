document.addEventListener("DOMContentLoaded", () => {
    // 1. ALTERANAR TAMANHO DA FONTE (ZOOM)
    let tamanhoFonteAtual = 20; // Em pixels
    const btnAumentar = document.getElementById("btn-aumentar");
    const btnDiminuir = document.getElementById("btn-diminuir");

    btnAumentar.addEventListener("click", () => {
        if (tamanhoFonteAtual < 32) {
            tamanhoFonteAtual += 2;
            document.body.style.fontSize = `${tamanhoFonteAtual}px`;
        }
    });

    btnDiminuir.addEventListener("click", () => {
        if (tamanhoFonteAtual > 14) {
            tamanhoFonteAtual -= 2;
            document.body.style.fontSize = `${tamanhoFonteAtual}px`;
        }
    });

    // 2. ALTERNAR COR DE FUNDO (ALTO CONTRASTE)
    const btnContraste = document.getElementById("btn-contraste");
    btnContraste.addEventListener("click", () => {
        document.body.classList.toggle("alto-contraste");
    });

    // 3. LEITURA DE TEXTO EM VOZ ALTA (SINTETIZADOR WEB SPEECH)
    const btnLer = document.getElementById("btn-ler");
    const btnParar = document.getElementById("btn-parar-ler");
    const conteudo = document.getElementById("conteudo-principal");

    if ('speechSynthesis' in window) {
        btnLer.addEventListener("click", () => {
            // Cancela leituras anteriores
            window.speechSynthesis.cancel();

            // Extrai o texto limpo da área principal
            const textoParaLer = conteudo.innerText;
            const mensagem = new SpeechSynthesisUtterance(textoParaLer);
            
            mensagem.lang = "pt-BR"; // Define o idioma para Português do Brasil
            mensagem.rate = 1.0;     // Velocidade normal

            // Altera visibilidade dos botões durante a leitura
            btnLer.style.display = "none";
            btnParar.style.display = "inline-block";

            mensagem.onend = () => {
                btnLer.style.display = "inline-block";
                btnParar.style.display = "none";
            };

            window.speechSynthesis.speak(mensagem);
        });

        btnParar.addEventListener("click", () => {
            window.speechSynthesis.cancel();
            btnLer.style.display = "inline-block";
            btnParar.style.display = "none";
        });
    } else {
        btnLer.disabled = true;
        btnLer.innerText = "Sintetizador de voz indisponível";
    }
});
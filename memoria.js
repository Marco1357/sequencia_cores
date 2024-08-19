let sequence = []; // Armazena a sequência de cores gerada pelo jogo
let playerSequence = []; // Armazena a sequência de cores inserida pelo jogador
let level = 0; // Rastreia o nível atual do jogo
let isGameStarted = false; // Flag para verificar se o jogo foi iniciado
let isPlayerTurn = false; // Flag para rastrear se é a vez do jogador

// Mapeia cores para os elementos de botão correspondentes
const buttons = {
  red: document.getElementById("red"),
  green: document.getElementById("green"),
  blue: document.getElementById("blue"),
  yellow: document.getElementById("yellow"),
};

// Mapeia cores para os elementos de áudio correspondentes
const sounds = {
  red: document.getElementById("sound-red"),
  green: document.getElementById("sound-green"),
  blue: document.getElementById("sound-blue"),
  yellow: document.getElementById("sound-yellow"),
};

// Função para iniciar o jogo
function startGame() {
  if (!isGameStarted) {
    resetGame(); // Garante que o jogo esteja limpo antes de começar
    isGameStarted = true; // Marca que o jogo foi iniciado
    nextLevel(); // Avança para o próximo nível
  }
}

// Função para avançar para o próximo nível do jogo
function nextLevel() {
  level++;
  playerSequence = [];
  isPlayerTurn = false; // Desativa a entrada do jogador durante a sequência
  sequence.push(Object.keys(buttons)[Math.floor(Math.random() * 4)]);
  playSequence();
}

// Reproduz a sequência de cores gerada pelo jogo
function playSequence() {
  sequence.forEach((color, index) => {
    setTimeout(() => {
      animateButton(color);
      playSound(color);

      // Ativa a vez do jogador após a sequência ser exibida
      if (index === sequence.length - 1) {
        isPlayerTurn = true;
      }
    }, 600 * (index + 1));
  });
}

// Anima (realça) um botão de cor
function animateButton(color) {
  buttons[color].classList.add("active");
  setTimeout(() => {
    buttons[color].classList.remove("active");
  }, 300);
}

// Toca o som correspondente a uma cor
function playSound(color) {
  sounds[color].currentTime = 0;
  sounds[color].play();
}

// Lida com a entrada do jogador
function handlePlayerInput(color) {
  if (!isGameStarted || !isPlayerTurn) return;

  playerSequence.push(color);
  animateButton(color);
  playSound(color);

  if (!checkPlayerInput()) {
    alert("Você perdeu! Tente novamente.");
    resetGame(); // Reinicia o jogo imediatamente após a falha
    return;
  }

  if (playerSequence.length === sequence.length) {
    isPlayerTurn = false; // Desativa a entrada do jogador enquanto aguarda o próximo nível
    setTimeout(() => {
      nextLevel();
    }, 1000);
  }
}

// Verifica se a sequência do jogador está correta
function checkPlayerInput() {
  return playerSequence.every((color, index) => color === sequence[index]);
}

// Função para reiniciar o jogo completamente
function resetGame() {
  sequence = [];
  playerSequence = [];
  level = 0;
  isGameStarted = false;
  isPlayerTurn = false;
}

// Associa event listeners ao carregar a página
window.onload = () => {
  Object.keys(buttons).forEach((color) => {
    buttons[color].addEventListener("click", () => handlePlayerInput(color));
  });

  // Adiciona listener de clique para iniciar o jogo ao clicar em qualquer botão
  Object.values(buttons).forEach((button) => {
    button.addEventListener("click", startGame, { once: true });
  });
};

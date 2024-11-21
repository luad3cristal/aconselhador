const dado = document.querySelector("#dice");
const advice = document.querySelector("#advice");
const titulo = document.querySelector("#texto");

const maxPalavras = 15;

function checarString(texto) {
  return texto.split(" ").length;
}

function efeitoDeEscrita(element, text, speed = 50) {
  element.textContent = "";
  let index = 0;

  const interval = setInterval(() => {
    element.textContent += text[index];
    index++;

    if (index >= text.length) {
      clearInterval(interval);
    }
  }, speed);
}

function carregarConselho() {
  advice.classList.add("hidden");
  texto.textContent = "";

  adviceApi
    .getAdvice()
    .then((conselho) => {
      if (checarString(conselho.advice) > maxPalavras) {
        return carregarConselho();
      }
      efeitoDeEscrita(texto, `ADVICE #${conselho.id}`, 50);
      setTimeout(() => {
        advice.textContent = `"${conselho.advice}"`;

        advice.classList.remove("hidden");
      }, 800);
    })
    .catch((error) => {
      advice.textContent =
        "Não foi possível carregar o conselho. Tente novamente.";
      console.error("Erro ao carregar o conselho:", error);
    });
}

dado.addEventListener("click", carregarConselho);
carregarConselho();

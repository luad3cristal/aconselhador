const dado = document.querySelector("#dice");
const advice = document.querySelector("#advice");
const titulo = document.querySelector("#texto");

let intervalo;

const efeitoDeEscrita = (element, text, speed = 50) => {
  if (intervalo) {
    clearInterval(intervalo);
  }

  element.textContent = "";
  let index = 0;

  intervalo = setInterval(() => {
    element.textContent += text[index];
    index++;

    if (index >= text.length) {
      clearInterval(intervalo);
      intervalo = 0;
    }
  }, speed);
};

const carregarConselho = () => {
  advice.classList.add("hidden");
  titulo.textContent = " ";

  adviceApi
    .getAdvice()
    .then((conselho) => {
      efeitoDeEscrita(titulo, `ADVICE #${conselho.id}`);
      
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
};

dado.addEventListener("click", carregarConselho);
carregarConselho();

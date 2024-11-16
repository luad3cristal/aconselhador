const adviceApi = {};

function convertAdviceApi(adviceData) {
  return {
    id: adviceData.id,
    advice: adviceData.advice,
  };
}

adviceApi.getAdvice = () => {
  const url = "https://api.adviceslip.com/advice";

  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Erro na API ${response.status}`);
      }
      return response.json();
    })
    .then((jsonBody) => jsonBody.slip);
};

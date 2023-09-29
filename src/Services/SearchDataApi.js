function fetchData(base_URL, errorMassage) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MWQ5Y2Y2YTlkOWIzNThkNTE2MDY4NGE3NWRlMTg0NiIsInN1YiI6IjY1MTBiMmU2M2E0YTEyMDBjNWFhNjAxZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.c4yYt4p0SuZDxRBn3LGch8hpfAZK22HJzxSkBR3CMgk',
    },
  };

  return fetch(base_URL, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      console.log("ERROR")
      return Promise.reject(new Error(errorMassage));
    })
}

const api = {
  fetchData,
};

export default api;

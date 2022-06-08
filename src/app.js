const fetchData = url_api => {
    return new Promise((resolve, reject) => {
      const xhttp = new XMLHttpRequest();
      xhttp.open("GET", url_api, true);
      xhttp.onreadystatechange = () => {
        if (xhttp.readyState === 4) {
          xhttp.status === 200
            ? resolve(JSON.parse(xhttp.responseText))
            : reject(new Error("Error"));
        }
      };
      xhttp.send();
    });
  };
const API = 'https://rickandmortyapi.com/api/character/';
const asyncContainer = document.getElementById("app");
const input = document.getElementById("input")
const buscar = document.getElementById("buscar")
const close = document.querySelector(".close")

const buildCard = (character) => {
    return ` <div class="card">
      <strong class="status">${character.status}</strong>
      <img src="${character.image}" alt="${character.name}" class="character" />
      <h2>${character.name}</h2>
      <span>${character.species}</span>
    </div>`
  
    //return card;
}
const buildCard2 = (character) => {
  asyncContainer.innerHTML = ` 
  <div class = "app">
  <div class="card">
    <div class="close" onclick="remove()">
      <svg viewBox="0 0 40 40">
      <path d="M12.45 37.65 10.35 35.55 21.9 24 10.35 12.45 12.45 10.35 24 21.9 35.55 10.35 37.65 12.45 26.1 24 37.65 35.55 35.55 37.65 24 26.1Z"/>
      </svg>
    </div>
    <strong class="status"></strong>
    <img src="${character.image}" alt="${character.name}" class="character" />
    <h2>${character.name}</h2>
    <span>${character.species} <strong class="status">${character.status}</strong></span>
  </div>
  </div>
  `


  //return card;
}
// Función para mostrar todos los personajes
function fetchData2(){
  fetch(API)
  .then(response => {
    if(response.status === 400){
      throw Error(console.error(error))
    }
    return response.json()
  })
  .then(data => {
    const characters = data.results.map(character => {
      return buildCard(character);
    })
    asyncContainer.insertAdjacentHTML('beforeend', characters)
  })
  .catch(err => console.error('No found ' + err))
}
// Función para buscar los personajes
const fetchDataAsync = async (url_api, id) =>  {
  const data = await fetchData(`${url_api}?name=${id}`);
  data.results.map(character => {
    const card = buildCard2(character);
    asyncContainer.innerHTML(card)
  });
}

const remove = () => {
  asyncContainer.innerHTML = '';
  }


buscar.addEventListener('click', () => {
  fetchDataAsync(API, input.value)
})

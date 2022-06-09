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
const mainContainer = document.querySelector(".main-container")
const characters = document.getElementById("characters")
const statusCharacter = document.querySelector(".status")
const inicio = document.getElementById("Inicio")

const inicioContent = () => {
 mainContainer.innerHTML = `
  <div class="buscador">
  <input type="text" id="input" placeholder="Escribe el nombre de tu personaje favorito">
  <button id="buscar">
      <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope" ><g class="style-scope yt-icon"><path d="M20.87,20.17l-5.59-5.59C16.35,13.35,17,11.75,17,10c0-3.87-3.13-7-7-7s-7,3.13-7,7s3.13,7,7,7c1.75,0,3.35-0.65,4.58-1.71 l5.59,5.59L20.87,20.17z M10,16c-3.31,0-6-2.69-6-6s2.69-6,6-6s6,2.69,6,6S13.31,16,10,16z" class="style-scope yt-icon"></path></g></svg>
  </button>
  </div>
  <div class="header-title">
  <div>
      <h1>
          Rompe el ciclo, Morty. Elévate. Céntrate en la ciencia
  </h1>
  </div>
  <img src="./img/rick.jpg" alt="">
  </div>
  `
} 

const buildCard = (character) => {
    return `<div class="characters--Container">
      <img src="${character.image}" alt="${character.name}" class="characterImg" />
      <h2>${character.name}</h2>
      <span>${character.species}       <strong class="status">${character.status}</strong></span>
    </div>`
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
    asyncContainer.innerHTML += characters.join(' ')
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
addEventListener('keypress', (e) =>{
  if (e.key === "Enter"){
    fetchDataAsync(API, input.value)
  }
})
characters.addEventListener('click', () => {
  mainContainer.innerHTML = '';
  fetchData2();
  // anadir la clase ALLcharacters
  asyncContainer.classList.add("AllCharacters")
})

inicio.addEventListener('click', () => {
  asyncContainer.innerHTML = '';
  inicioContent()
  asyncContainer.classList.remove("AllCharacters")
})

const addGreen = () => {
  statusCharacter.classList.add("green")

} 


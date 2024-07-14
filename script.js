const urlApi = 'https://rickandmortyapi.com/api/character';
const personagens = [];

// Função para buscar dados da API
const fetchApiData = async () => {
  try {
    const response = await axios.get(urlApi);
    let nextUrl = response.data.info.next;
    personagens.push(...response.data.results);
    
    while (nextUrl) {
      const nextResponse = await axios.get(nextUrl);
      nextUrl = nextResponse.data.info.next;
      personagens.push(...nextResponse.data.results);
    }
  } catch (error) {
    console.error('Erro ao buscar dados da API:', error);
  }
}

// Função para popular o carrossel
const populateCarousel = () => {
  const carousel = document.getElementById("carousel-inner");

  for (let index = 0; index < personagens.length; index += 6) {
    const carouselItem = document.createElement('div');
    carouselItem.className = index === 0 ? 'carousel-item active pb-5 ms-5' : 'carousel-item pb-5 ms-5';

    const mainDiv1 = document.createElement('div');
    mainDiv1.className = 'row justify-content-center mt-5'; 

    for (let i = 0; i < 6; i++) {
      if (personagens[index + i]) {
        const card = createCard(
          personagens[index + i].image, 
          personagens[index + i].name, 
          translateSpecies(personagens[index + i].species), 
          translateStatus(personagens[index + i].status), 
          personagens[index + i].id
        );
        mainDiv1.appendChild(card);
      }
    }

    carouselItem.appendChild(mainDiv1);
    carousel.appendChild(carouselItem);
  }
}

// Função para criar cards
const createCard = (imgSrc, nomePersonagem, especie, status, id) => {
  const colDiv = document.createElement('div');
  colDiv.className = 'col-md-4';

  const cardDiv = document.createElement('div');
  cardDiv.className = 'card';
  cardDiv.style.width = '18rem';

  const img = document.createElement('img');
  img.src = imgSrc;
  img.className = 'card-img-top';
  img.alt = nomePersonagem;

  const cardBody = document.createElement('div');
  cardBody.className = 'card-body';

  const title = document.createElement('h5');
  title.className = 'card-title';
  title.textContent = nomePersonagem;

  const speciesElement = document.createElement('p');
  speciesElement.className = 'card-text';
  speciesElement.innerText = especie;

  const statusElement = document.createElement('p');
  statusElement.className = 'card-text';
  statusElement.textContent = status;

  const btn = document.createElement('a');
  btn.href = `./detalhes-gab.html?id=${id}`;
  btn.className = 'btn btn-light btn-sm stretched-link';
  btn.textContent = "Saber Mais";

  cardBody.appendChild(title);
  cardBody.appendChild(speciesElement);
  cardBody.appendChild(statusElement);
  cardBody.appendChild(btn);

  cardDiv.appendChild(img);
  cardDiv.appendChild(cardBody);

  colDiv.appendChild(cardDiv);

  return colDiv;
}

// Função para traduzir espécies
const translateSpecies = (species) => {
  switch (species.toLowerCase()) {
    case 'human':
      return 'Humano';
    case 'alien':
      return 'Alienígena';
    default:
      return species;
  }
}

// Função para traduzir status
const translateStatus = (status) => {
  switch (status.toLowerCase()) {
    case 'alive':
      return 'Vivo';
    case 'dead':
      return 'Morto';
    case 'unknown':
      return 'Desconhecido';
    default:
      return status;
  }
}

// Função para buscar e atualizar os dados do footer
const getFooterData = async () => {
  try {
    const characterResponse = await axios.get('https://rickandmortyapi.com/api/character');
    const episodeResponse = await axios.get('https://rickandmortyapi.com/api/episode');
    const locationResponse = await axios.get('https://rickandmortyapi.com/api/location');

    return {
      characterResponse: characterResponse.data.info.count,
      episodeResponse: episodeResponse.data.info.count,
      locationResponse: locationResponse.data.info.count,
    };
  } catch (error) {
    console.error('Erro ao buscar dados do footer:', error);
  }
}

// Função para mostrar o footer
const showFooter = async () => {
  const response = await getFooterData();

  document.getElementById('totalCharacters').textContent = response.characterResponse;
  document.getElementById('totalEpisodes').textContent = response.episodeResponse;
  document.getElementById('totalLocations').textContent = response.locationResponse;
}

// Função principal que inicializa a página
const init = async () => {
  await fetchApiData();
  populateCarousel();
  await showFooter();
}

document.addEventListener('DOMContentLoaded', init);

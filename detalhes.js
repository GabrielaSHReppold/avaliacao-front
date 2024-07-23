/* 
console.log("DETALHES")
document.addEventListener('DOMContentLoaded', async function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const idPersonagem = urlParams.get('id');

    if (idPersonagem) {
        const dadosPersonagem = await axios.get(`https://rickandmortyapi.com/api/character/${idPersonagem}`);
        console.log(dadosPersonagem);

        document.getElementById("nome").innerHTML = dadosPersonagem.data.name;
        document.getElementById("genero").innerHTML = dadosPersonagem.data.gender;
        document.getElementById("status").innerHTML = dadosPersonagem.data.status;
        document.getElementById("especie").innerHTML = dadosPersonagem.data.species;
        document.getElementById("tipo").innerHTML = dadosPersonagem.data.type || 'N/A'
        document.getElementById("origem").innerHTML = dadosPersonagem.data.origin.name;
        document.getElementById('localizacao').textContent = data.location.name;
        document.getElementById('imagem').src = data.image;
        document.getElementById('url').href = data.url;
        
        const episodiosList = document.getElementById('episodios');
                    episodiosList.innerHTML = ''; // Limpa a lista antes de adicionar novos itens
                    data.episode.forEach(episode => {
                        const li = document.createElement('li');
                        li.textContent = episode;
                        episodiosList.appendChild(li);
                    });
    } else {
        console.log("ERRO AO BUSCAR PERSONAGEM");
    }
}); */
console.log("DETALHES");
document.addEventListener('DOMContentLoaded', async function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const idPersonagem = urlParams.get('id');

    if (idPersonagem) {
        try {
            const dadosPersonagem = await axios.get(`https://rickandmortyapi.com/api/character/${idPersonagem}`);
            console.log(dadosPersonagem);

            const data = dadosPersonagem.data;

            document.getElementById("nome").innerHTML = data.name;
            document.getElementById("genero").innerHTML = data.gender;
            document.getElementById("status").innerHTML = data.status;
            document.getElementById("especie").innerHTML = data.species;
            document.getElementById("tipo").innerHTML = data.type || 'N/A';
            document.getElementById("origem").innerHTML = data.origin.name;
            document.getElementById("localizacao").innerHTML = data.location.name;
            document.getElementById("imagem").src = data.image;

            const episodiosList = document.getElementById('episodios');
            episodiosList.innerHTML = ''; // Limpa a lista antes de adicionar novos itens

            const episodes = data.episode;
            const firstFiveEpisodes = episodes.slice(0, 5);
            const lastFiveEpisodes = episodes.slice(-5);

            [...firstFiveEpisodes, ...lastFiveEpisodes].forEach(episode => {
                const li = document.createElement('li');
                li.textContent = episode;
                episodiosList.appendChild(li);
            });
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    } else {
        console.log("ERRO AO BUSCAR PERSONAGEM");
    }
});




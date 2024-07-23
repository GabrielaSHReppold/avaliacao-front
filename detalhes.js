
/* const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idPersonagem = urlParams.get('id'); 
*/
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
        
    } else {
        console.log("ERRO AO BUSCAR PERSONAGEM");
    }
});




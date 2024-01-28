const searchInput = document.getElementById('search-input'); //ta caçando o input pelo ID dele no html
const resultArtist = document.getElementById('result-artist');
const resultPresentation = document.getElementById('result-presentations');

  
function requestApi(searchTerm) {
                //parte inicial(busca td)    //buscando o que o usuario está digitando
                
        fetch(`http://localhost:3000/artists?name_like=${searchTerm}`)
            .then((response) => response.json())
            .then((result) => displayResults(result));  // .then trabalha com promises | programação assincrona
}

function displayResults(result) {
    
    resultPresentation.classList.add("hidden");
    const artistName = document.getElementById('artist-name');
    const artistImage = document.getElementById('artist-img');

    result.forEach(element => {
        artistName.innerText = element.name;
        artistImage.src = element.urlImg;        
    });

    resultArtist.classList.remove('hidden');

}

        //evento input e recebe uma outra funcao como parametro 
document.addEventListener('input', function() { // essa funcao que terá o código com o comportamento que a gente quer
    const searchTerm = searchInput.value.toLowerCase(); // essa const é o que a gnt vai digitar (recebe o valor do input e deixa td minusculo)    
        if (searchTerm === '') { // === comparação de valores iguais e do mesmo tipo
            resultArtist.classList.add('hidden');
            resultPresentation.classList.remove('hidden'); 
            
            return;
        }

        requestApi(searchTerm);
});

const searchInput = document.getElementById('search-input'); //ta caçando o input pelo ID dele no html
const resultArtist = document.getElementById('result-artist');
const resultPresentation = document.getElementById('result-presentations');

var userInput = prompt ("Bem vind@ ao spotify! Como gostaria de ser chamado? :)");

function mudaGreeting() {
    
    var horaAtual = new Date().getHours();
    var h1 = document.getElementById("greeting");
    var h2 = document.getElementById("sugestion");

    if (horaAtual >= 5 && horaAtual < 12) {
        h2.textContent = "Que tal uma música para começar bem o dia?";
    } else if (horaAtual >= 12 && horaAtual < 18) {
        h2.textContent = "Hora de uma musiquinha para animar, né?";
    } else {
        h2.textContent = "Quer encerrar o dia da melhor forma possível? Ouça uma música!";
    }

    if (userInput !== null) {

        if (horaAtual >= 5 && horaAtual < 12) {
            h1.textContent = "Bom Dia," + userInput + "! 🌞 ";
        } else if (horaAtual >= 12 && horaAtual < 18) {
            h1.textContent = "Boa Tarde, " + userInput + "! 🌆";
        } else {
            h1.textContent = "Boa Noite, " + userInput + "!🌙✨";
        }

    } else {
        if (horaAtual >= 5 && horaAtual < 12) {
            h1.textContent = "Bom Dia! 🌞 ";
        } else if (horaAtual >= 12 && horaAtual < 18) {
            h1.textContent = "Boa Tarde! 🌆";    
        } else {
            h1.textContent = "Boa Noite!🌙✨";
        }
    }

     // Definir cor da fonte
    h1.addEventListener("mouseover", function(){

        if (horaAtual >= 5 && horaAtual < 12) {
            h1.style.color = "#f7f24a"; // Manhã 
        } else if (horaAtual >= 12 && horaAtual < 18){
            h1.style.color = "#fa6e02"; // tarde
        } else {
            h1.style.color = "#b3b3b3"; // Noite
        }
    }); 

    h1.addEventListener("mouseout", function(){
        h1.style.color = "#fff";
    }) 
   
}

mudaGreeting();
// Chamar a função a cada minuto para atualizar o cumprimento se necessário
setInterval(mudaGreeting, 60000);  // Atualizar a cada 60 segundos



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
    const artistGenre = document.getElementById('artist-genre');

    result.forEach(element => {
        artistName.innerText = element.name;
        artistImage.src = element.urlImg; 
        artistGenre.innerText = element.genre;       
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

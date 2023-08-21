const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const inputSearch = document.querySelector('.input__search');
const form = document.querySelector('.form');

const prev = document.querySelector('.btn-prev');
const next = document.querySelector('.btn-next');

const modal = document.querySelector('#exampleModal');
const close = document.querySelector('.btn-close');

const modalLabel = document.querySelector('#exampleModalLabel')

const altura = document.querySelector('.heightPokemon')
const peso = document.querySelector('.pesoPokemon')
const especie = document.querySelector('.especie')

const procuraPokemon = async (pokemon) => {

    const ApiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (ApiResponse.status == 200) {
        const data = await ApiResponse.json();

        return data;
    }
}

let searchPokemon = 1;

const renderizaPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Buscando...';
    pokemonNumber.innerHTML = '';

    const data = await procuraPokemon(pokemon);
    if (data) {
        pokemonImage.style.display = 'block';
        modalLabel.innerHTML = "Pokemon: " + data.name;
        altura.innerHTML = data.height + "dm";
        especie.innerHTML = data.species['name'];
        peso.innerHTML = data.weight + "hg";
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

        inputSearch.value = '';
        searchPokemon = data.id;
    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = "Not found :(";
        pokemonNumber.innerHTML = '';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    renderizaPokemon(inputSearch.value.toLowerCase());

})

prev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1
        renderizaPokemon(searchPokemon);
    }
})

next.addEventListener('click', () => {
    searchPokemon += 1;
    renderizaPokemon(searchPokemon);
})

document.addEventListener("DOMContentLoaded", function(){
    pokemonImage.addEventListener('click', () => {
        $(modal).modal('show');
    })

    close.addEventListener('click', () => {
        $(modal).modal('hide')
    })
})

renderizaPokemon(searchPokemon);

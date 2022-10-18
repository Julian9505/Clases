
export function Buscar(pokemon, Lista){// con async me entragaba un prototype 

    // const pokemonn = AgregarPokemones(pokemon);
    // console.log(pokemonn);

    const d = document;
    const $template = d.querySelector("[template-pokemon]");
    const pokeCard = d.querySelector('[data-poke-card]');
    const pokeName = d.querySelector('[data-poke-name]');
    const pokeImg = d.querySelector('[data-poke-img]');
    const pokeImgContainer = d.querySelector('[data-poke-img-container]');
    const pokeId = d.querySelector('[data-poke-id]');
    const pokeTypes = d.querySelector('[data-poke-types]');
    const pokeStats = d.querySelector('[data-poke-stats]');

    const typeColors = {
        electric: '#FFEA70',
        normal: '#B09398',
        fire: '#FF675C',
        water: '#0596C7',
        ice: '#AFEAFD',
        rock: '#999799',
        flying: '#7AE7C7',
        grass: '#4A9681',
        psychic: '#FFC6D9',
        ghost: '#561D25',
        bug: '#A2FAA3',
        poison: '#795663',
        ground: '#D2B074',
        dragon: '#DA627D',
        steel: '#1D8A99',
        fighting: '#2F2F2F',
        default: '#2A1A1F',
    };


    const setCardColor = types => {
        const colorOne = typeColors[types[0].type.name];
        const colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default;
        pokeImg.style.background =  `radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`;
        pokeImg.style.backgroundSize = ' 5px 5px';
    }

    const renderPokemonTypes = types => {
        pokeTypes.innerHTML = '';
        types.forEach(type => {
            const typeTextElement = d.createElement("div");
            typeTextElement.style.color = typeColors[type.type.name];
            typeTextElement.textContent = type.type.name;
            pokeTypes.appendChild(typeTextElement);
        });

        const botonStats = d.createElement("button"); 
        botonStats.classList.add("boton-stats");
        // botonStats.textContent = "Stats";
        pokeTypes.appendChild(botonStats); 

        
        d.addEventListener("click", (e) => { 
            if(e.target === botonStats){
                pokeStats.classList.toggle("none");
            }
        });       
    }
    
    const renderPokemonStats = stats => {
        pokeStats.innerHTML = '';
        stats.forEach(stat => {
            const statElement = d.createElement("div");
            const statElementName = d.createElement("div");
            const statElementAmount = d.createElement("div");
            statElementName.textContent = stat.stat.name;
            statElementAmount.textContent = stat.base_stat;
            statElement.appendChild(statElementName);
            statElement.appendChild(statElementAmount);
            pokeStats.appendChild(statElement);
            pokeStats.classList.add("none");
        });
    }

    const renderNotFound = () => {
        pokeName.textContent = 'No encontrado';
        pokeImg.setAttribute('src', 'poke-shadow.png');
        pokeImg.style.background =  '#fff';
        pokeTypes.innerHTML = '';
        pokeStats.innerHTML = '';
        pokeId.textContent = '';
        // pokeCard.classList.add("none");
    }

    const sprite =  pokemon.sprites.front_default;
    const { stats, types } = pokemon;
    pokeId.textContent = `Nº ${pokemon.id}:`;
    
    pokeName.textContent = pokemon.name;
    pokeImg.setAttribute('src', sprite);
    setCardColor(types);
    renderPokemonTypes(types);
    renderPokemonStats(stats);
    pokeCard.classList.remove("none");       
    // console.log(Lista);

    return Lista;
}

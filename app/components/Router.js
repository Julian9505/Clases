import { ajax } from "../helpers/ajax.js";
import { Pokemones } from "../components/Pokemons.js";
import { Menu } from "../components/Menu.js";
// import { renderPokemonData, renderPokemonStats, renderPokemonTypes, setCardColor } from "../components/Buscar.js";


let LinkPokemons = "https://pokeapi.co/api/v2/pokemon/"; /*Hay que agregar esto /${value.toLowerCase() en la dirección*/


const d = document,
$main = d.getElementById("main"),
$links = d.querySelector(".links");
// $principal = d.getElementById("principal");



export async function Router(){//Una forma de hacer esta petición de forma asyncrona enlazada y tratar de limpiar este o explicar porque el inner no funciona como me lo esperaba, esto de volver las funciones asincronas sirve para por ejemplo hacer que el display none de loader se ejecute hasta despues de que se ejecute la petición 
    const d=document,
    w=window;
    let {hash} = location;

56

    if(!hash || hash === "#/"){
        $main.classList.add("grid-fluid");
        await ajax({
            url: LinkPokemons,
            cbSuccess: (pokemons) =>{Pokemones(pokemons)}
        });
    }else if(!hash || hash === "#/buscar"){
        $links.innerHTML = ""; 
        $main.innerHTML = `
        <form class="form" action="">
            <input type="text" name="pokemon" autocomplete="off">
        </form>
        <div data-poke-card class="poke-card none">
            <div data-poke-name>Pokedex</div>
            <div data-poke-img-container class="img-container">
                <img data-poke-img class="poke-img" src="../assets/poke-shadow.png"/>
            </div>
            <div data-container>
               <div data-poke-id class="poke-types"></div>
                <div data-poke-types class="poke-types"></div>
                <div data-poke-stats class="poke-stats"></div>
            </div>
        </div>
        <div class="error none"></div>`;
        // searchPokemon();
        // const d = document;
        const $form = d.querySelector("form");
        const pokeCard = d.querySelector('[data-poke-card]');
        const pokeName = d.querySelector('[data-poke-name]');
        const pokeImg = d.querySelector('[data-poke-img]');
        const pokeImgContainer = d.querySelector('[data-poke-img-container]');
        const pokeId = d.querySelector('[data-poke-id]');
        const pokeContainer = d.querySelector('[data-container]');
        const pokeTypes = d.querySelector('[data-poke-types]');
        const pokeStats = d.querySelector('[data-poke-stats]');
        // const botonStats = d.querySelector('.boton-stats');

        $main.classList.remove("grid-fluid");

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

        const renderPokemonData = data => {
            const sprite =  data.sprites.front_default;
            const { stats, types } = data;
            pokeId.textContent = `Nº ${data.id}: `;
            // pokeContainer.appendChild(pokeId);
            
            pokeName.textContent = data.name;
            pokeImg.setAttribute('src', sprite);
            // Id.appendChild(pokeId);
            setCardColor(types);
            renderPokemonTypes(types);
            renderPokemonStats(stats);
            pokeCard.classList.remove("none");
        }        
        
        const setCardColor = types => {
            const colorOne = typeColors[types[0].type.name];
            const colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default;
            pokeImg.style.background =  `radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`;
            pokeImg.style.backgroundSize = ' 5px 5px';
        }
        console.log("borrar");
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
            // pokeName.textContent = 'No encontrado';
            // pokeImg.setAttribute('src', 'poke-shadow.png');
            // pokeImg.style.background =  '#fff';
            // pokeTypes.innerHTML = '';
            // pokeStats.innerHTML = '';
            // pokeId.textContent = '';
            pokeCard.classList.add("none");
        }

        const searchPokemon = async function(event) {
            event.preventDefault();
            const { value } = event.target.pokemon;
            // fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
            //     .then(data => data.json())
            //     .then(response => renderPokemonData(response))
            //     .catch(err => renderNotFound())
            await ajax({
                url: `https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`,
                cbSuccess: (pokemon)=>{ renderPokemonData(pokemon)},
                error: (err) => { renderNotFound(err)}
            });
        }

        d.addEventListener("submit", (event) => { 
            searchPokemon(event);
            
            if(event.target === $form){
                // pokeCard.classList.remove("none");
            }
        });

    }
}



d.addEventListener("DOMContentLoaded", e => Router(LinkPokemons));
d.addEventListener("click", e=>{
    if(e.target.matches(".links a")){
        LinkPokemons=e.target.getAttribute("href");
        e.preventDefault();
        Router(e.target.getAttribute("href"));
    }
});

Menu();


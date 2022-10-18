import { ajax } from "../helpers/ajax.js";
import { Pokemones } from "../components/Pokemons.js";
import {Buscar} from "./Buscar.js";
import { AgregarPokemones } from "./AgregarPokemones.js";
// import { AgregarPokemones } from "./AgregarPokemones.js"


let LinkPokemons = "https://pokeapi.co/api/v2/pokemon/"; /*Hay que agregar esto /${value.toLowerCase() en la dirección*/


const d = document;


export async function Router(){
    const d = document;
    const lista=[];
    let {hash} = location;

    if(!hash || hash === "#/"){
        hash = "#/";
        await ajax({
            url: LinkPokemons,
            cbSuccess: (pokemons) =>{Pokemones(pokemons)},
            unSuccess: (err) => { }
        });
    }else if(!hash || hash === "#/buscar"){

        d.addEventListener("submit", async (event) => { 

            event.preventDefault();
            const { value } = event.target.pokemon;
    
            await ajax({
                url: `https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`,
                cbSuccess: (pokemon)=>{ 
                    lista.push(AgregarPokemones(pokemon));
                    Buscar(pokemon);
                    console.log(lista);
                },
                unSuccess: (err) => { }
            });

        });
    }
}

// d.addEventListener("DOMContentLoaded", e => Router(LinkPokemons));
d.addEventListener("click", e=>{
    if(e.target.matches(".links a")){
        LinkPokemons=e.target.getAttribute("href");
        e.preventDefault();
        Router(e.target.getAttribute("href"));
    }
});

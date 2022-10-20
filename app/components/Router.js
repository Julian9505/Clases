import { ajax } from "../helpers/ajax.js";// realiza la petición y devuelve el resultado
import { Pokemones } from "../components/Pokemons.js";// realiza la petición de todos los pokemones en general  y los suma uno a uno a un objeto vacio.
import {Buscar} from "./Buscar.js";// realiza la renderización de los pokemones buscados y mediante la metodología de template-fragment los renderiza
import { AgregarPokemones } from "./AgregarPokemones.js";//toma las varialbles de la petición de cada pokemon y la entrega en un un objeto
import { Filtrar } from "./Filtrar.js";


// Cosas sin resolver o que funcionan mal: 

//- el botonStats y el boton de los tipos de los pokemones no funcionan porque creo yo, la funcion Buscar y Filtrar.js que es la que renderiza el boton se ejecuta solo una vez y el addeventlistener que esta en Buscar.js y Filtrar.js no toma el valor porque no se esta ejecutando la función, debería mostrar las estadisticas al dar click en botonStats y quitarlas cuando de click otra vez.

//- falta la funcionalidad de la filtración de pokemones por tipos ej: fuego, metal, agua, aire, etc.

//- Los pokemones de un solo tipo no pintan la tarjeta con el color indicado en Buscar.js


let LinkPokemons = "https://pokeapi.co/api/v2/pokemon/"; 

const d = document;


export async function Router(Lista){
    const d = document;
    let {hash} = location,
    boton = "",
    $boton = d.querySelectorAll(".boton-stats");
    
    if(!hash || hash === "#/"){// hash que se intercambia en selección del header
        hash = "#/";
        await ajax({
            url: LinkPokemons,
            cbSuccess: (pokemons) =>{Pokemones(pokemons)}
        });
    }else if(hash === "#/buscar"){
        
        boton = Buscar(Lista);
        
        d.addEventListener("submit", async (event) => { 
            event.preventDefault();
            const { value } = event.target.pokemon;
            await ajax({
                url: `https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`,
                cbSuccess: (pokemon)=>{ 
                    Lista.push(AgregarPokemones(pokemon));
                    console.log(boton);
                }
            });
            Buscar(Lista);
        });
    }else if(hash === "#/filtrar"){

        await ajax({
            url: `https://pokeapi.co/api/v2/type`,
            cbSuccess: (filtros)=>{ 
                console.log(filtros);
                Filtrar(filtros);
            },
            unSuccess: (err) => { }
        });
    }
}

// d.addEventListener("click", e=>{
//     if(e.target.matches("#pokemon-pikachu")){

//     }
// });
d.addEventListener("click", e=>{
    if(e.target.matches(".links a")){
        LinkPokemons=e.target.getAttribute("href");
        e.preventDefault();
        Router(e.target.getAttribute("href"));
    }
});

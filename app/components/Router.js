import { ajax } from "../helpers/ajax.js";// realiza la petición y devuelve el resultado
import { Pokemones } from "../components/Pokemons.js";// realiza la petición de todos los pokemones en general  y los suma uno a uno a un objeto vacio.
import {Buscar} from "./Buscar.js";// realiza la renderización de los pokemones buscados y mediante la metodología de template-fragment los renderiza
import { AgregarPokemones } from "./AgregarPokemones.js";//toma las varialbles de la petición de cada pokemon y la entrega en un un objeto


// Cosas sin resolver o que funcionan mal: 

//- el botonStats no funciona porque creo yo, la funcion Buscar.js que es la que renderiza el boton se ejecuta solo una vez y el addeventlistener que esta en Buscar.js no toma el valor porque no se esta ejecutando la función, debería mostrar las estadisticas al dar click en botonStats y quitarlas cuando de click otra vez.

//- falta la funcionalidad de la filtración de pokemones por tipos ej: fuego, metal, agua, aire, etc.


let LinkPokemons = "https://pokeapi.co/api/v2/pokemon/"; 

const d = document;


export async function Router(Lista){
    const d = document;
    let {hash} = location;

    if(!hash || hash === "#/"){// hash que se intercambia en selección del header
        hash = "#/";
        await ajax({
            url: LinkPokemons,
            cbSuccess: (pokemons) =>{Pokemones(pokemons)},
            unSuccess: (err) => { }
        });
                    console.log(Lista);
    }else if(!hash || hash === "#/buscar"){

        Buscar(Lista);

        d.addEventListener("submit", async (event) => { 

            event.preventDefault();
            const { value } = event.target.pokemon;
    
            await ajax({
                url: `https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`,
                cbSuccess: (pokemon)=>{ 
                    Lista.push(AgregarPokemones(pokemon));
                    console.log(Lista);
                },
                unSuccess: (err) => { }
            });
            Buscar(Lista);
        });
        
    }
}

d.addEventListener("click", e=>{
    if(e.target.matches(".links a")){
        LinkPokemons=e.target.getAttribute("href");
        e.preventDefault();
        Router(e.target.getAttribute("href"));
    }
});

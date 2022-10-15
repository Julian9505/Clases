import { ajax } from "../helpers/ajax.js";

const d = document,
$main = d.getElementById("main"),
$links = d.querySelector(".links");


export async function Pokemones(pokemons){
    $main.innerHTML = `<img class="loader" src="../assets/loader.svg" alt="Cargando...">`;
    let $template ="",
    $prevLink,
    $nextLink;


    for(let i = 0; i<pokemons.results.length;i++){
        
        async function Obtener_pokemons(){

            await ajax({
                url:pokemons.results[i].url,
                cbSuccess: (pokemon)=>{

                    $template+=`
                    <figure class="pokemon">
                    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                    <figcaption>${pokemon.name}</figcaption>
                    </figure>
                    `;
                    // console.log(pokemon);
                    
                    $main.innerHTML = $template;
                    // console.log($template);
                }
            });
        }
        // console.log(pokemons.results[i]);

        Obtener_pokemons();
    }

    // $main.innerHTML = $template;
    $prevLink = pokemons.previous ? `<a href="${pokemons.previous}"> <<< </a>`:"";
    $nextLink = pokemons.next ? `<a href="${pokemons.next}"> >>> </a>`:"";
    $links.innerHTML= $prevLink + " " + $nextLink;
    return $main, $links;
}
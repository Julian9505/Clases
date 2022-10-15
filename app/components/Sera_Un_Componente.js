const d = document,
$main = d.querySelector("main"),
$links = d.querySelector(".links");
// $pokemon = d.querySelector(".pokemon *");

let pokeAPI = "https://pokeapi.co/api/v2/pokemon/";


async function loadPokemon(url){
  try{
    $main.innerHTML = `<img class="loader" src="../assets/loader.svg" alt="Cargando...">`;
    let res = await fetch(url),
    json=await res.json(),
    $template ="",
    $prevLink,
    $nextLink;

    // console.log(json);

    if(!res.ok) throw {status: res.status, statusText: res.statusText}

    for(let i = 0; i<json.results.length;i++){
      //console.log(json.results[i]);
      try{
        let res = await fetch(json.results[i].url),
        pokemon = await res.json();

        //console.log(res,pokemon);

        if(!res.ok) throw {status: res.status, statusText: res.statusText}

        $template+=`
        <figure class="pokemon">
          <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
          <figcaption>${pokemon.name}</figcaption>
        </figure>
        `;
      }catch(err){
        let message = err.statusText || "Ocurrio un error";
        $template+=`
        <figure>
          <figcaption>Error ${err.status}: ${message} </figcaption>
        </figure>`;
      }
    }

    $main.innerHTML = $template;
    $prevLink = json.previous ? `<a href="${json.previous}"> <<< </a>`:"";
    $nextLink = json.next ? `<a href="${json.next}"> >>> </a>`:"";
    $links.innerHTML= $prevLink + " " + $nextLink;
  }catch(err){
    //console.log(err);
    let message = err.statusText || "Ocurrio un error";
    $main.innerHTML = ` Error ${err.status}: ${message}`;
  }
}

d.addEventListener("DOMContentLoaded", e => loadPokemon(pokeAPI));
d.addEventListener("click",e=>{
  if(e.target.matches(".links a")){
    e.preventDefault();
    loadPokemon(e.target.getAttribute("href"));
  }
});
/*   **********   MENU BOTON  (Esto hay que convertirlo en un conponente tambièn) **********   */
((d) => {
    const $btnMenu = d.querySelector(".menu-btn"),
      $menu = d.querySelector(".menu");
  
    $btnMenu.addEventListener("click", (e) => {
      $btnMenu.firstElementChild.classList.toggle("none");
      $btnMenu.lastElementChild.classList.toggle("none");
      $menu.classList.toggle("is-active");
    });
  
    d.addEventListener("click", (e) => {
      if (!e.target.matches(".menu a")) return false;
  
      $btnMenu.firstElementChild.classList.remove("none");
      $btnMenu.lastElementChild.classList.add("none");
      $menu.classList.remove("is-active");
    });
  })(document);
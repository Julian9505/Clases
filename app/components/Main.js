const d = document;

export function Main(){
    const $main = d.createElement("section");

    $main.classList.add("main");
    $main.id = "principal";
    if(location.hash === "#/" || location.hash === "") {
        location.hash.replace("#/");
        $main.innerHTML = `
            <nav class="links"></nav>
            <main id="main" class="grid-fluid"></main>
        `;
    }else if(location.hash === "#/buscar"){
        $main.innerHTML = `
        <form class="form" action="">
            <input class="input" type="text" name="pokemon" autocomplete="off" autofocus placeholder="Pokemon">
        </form>
        <main id="main" class="prueba grid-fluid"></main>
        <template template-pokemons>
            <div data-poke-card class="poke-card none">
                <div data-poke-name></div>
                <div data-poke-img-container class="img-container">
                    <img data-poke-img class="poke-img" src="../assets/poke-shadow.png"/>
                </div>
                <div data-container>
                    <div data-poke-id class="poke-types"></div>
                    <div data-poke-types class="poke-types"></div>
                </div>
                <div data-poke-stats class="poke-stats"></div>
            </div>
            <div class="error none"></div>
        </template>
        `;
    }


    
    return $main;
}
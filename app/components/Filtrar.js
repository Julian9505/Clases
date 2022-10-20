
export function Filtrar(Filtros){
    const d = document;

    const typeColors = {//lista de colores segun el tipo de pokemon, aveces tienen dos tipos
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
        black: '#2A1A1F',
    };

    const $filtros = d.querySelector(".filtros"),
    resultados = Filtros.results;

    resultados.forEach( async e => {
        const $filtro = d.createElement("button");
        $filtro.classList.add("filtro-boton");
        $filtro.style.backgroundColor = typeColors[e.name];
        $filtro.innerHTML = e.name;
        $filtros.appendChild($filtro);
    });

    return $filtros;
}
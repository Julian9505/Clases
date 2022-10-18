
export function AgregarPokemones(pokemon){
    const lista = {};

    lista.nombre = pokemon.name;
    lista.img = pokemon.sprites.front_default;
    lista.color1 = pokemon.types[0].type.name;
    lista.color2 = pokemon.types[1] ? pokemon.types[1].type.name : "black";
    lista. id = pokemon.id;
    lista.estadisticas = pokemon.stats;

    return lista;
}
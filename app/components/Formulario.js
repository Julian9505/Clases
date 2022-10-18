const d = document;

export function Formulario(){
    const $formulario = d.createElement("form");

    $formulario.classList.add("form");
    $formulario.setAttribute("action", "");
    $formulario.innerHTML = `
        <input type="text" name="pokemon" autocomplete="off" autofocus placeholder="Pokemon">
    `;
    
    return $formulario;
}
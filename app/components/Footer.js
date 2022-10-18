const d = document;

export function Footer(){
    const $footer = d.createElement("section");

    $footer.classList.add("footer");
    $footer.setAttribute("id", "pie-de-pagina");
    $footer.innerHTML = `
        <h5>FOOTER</h5>
    `;
    
    return $footer;
}
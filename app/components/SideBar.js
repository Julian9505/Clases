const d = document;

export function SideBar(){
    const $sidebar = d.createElement("section");

    $sidebar.classList.add("side-bar");
    $sidebar.setAttribute("id", "barra-lateral");
    $sidebar.innerHTML = `
        <h2>SIDE BAR</h2>
    `;
    
    return $sidebar;
}
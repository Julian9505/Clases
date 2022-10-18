import { Header } from "./components/Header.js";
import { SideBar } from "./components/SideBar.js";
import { Footer } from "./components/Footer.js";
import { Main } from "./components/Main.js";
import { Router } from "./components/Router.js";

export function App(){

    const d = document,
    $root = d.getElementById("root");
    
    $root.innerHTML = null;
    $root.appendChild(Header());
    $root.appendChild(Main());
    $root.appendChild(SideBar());
    $root.appendChild(Footer());
    Router();
}
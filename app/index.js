import { App } from "./App.js";

const d= document,
Lista = [];

d.addEventListener("DOMContentLoaded", App(Lista));
window.addEventListener("hashchange", () => { App(Lista)});
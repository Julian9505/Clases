export async function ajax(props){
    let { url, cbSuccess, error } = props;

    await fetch(url)
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .then(json => cbSuccess(json))
    .catch(err => { unSuccess(err) });
}
        // let message = err.statusText || "Ocurrio un error";
        
        // document.getElementById("main").innerHTML = `
        //     <div class="error">
        //         <p> Error ${err.status}: ${message}</p>
        //     </div>
        // `;


        // document.querySelector(".loader").style.display="none";
        // console.log(err);
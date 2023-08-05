const $mas = document.getElementById("mas");
const $menos = document.getElementById("menos");
var numeroPokemon = 1;

async function conectar(url) {
    try {
        let respuesta = await fetch(url);
        let datos = await respuesta.json();
        console.log("respuesta :>> ", respuesta);
        return datos;
    } catch (error) {
        console.log("error :>> ", error);
    }
}

async function buscarPokemon() {
    let url = `https://pokeapi.co/api/v2/pokemon/${numeroPokemon}`;
    return conectar(url);
}

async function imprimircuerpoPokemons() {
    // let url = `https://pokeapi.co/api/v2/pokemon/${numeroPokemon}`;
    // let datos = await conectar(url);
    // console.log("datos :>> ", datos);
    let datos = await buscarPokemon();
    console.log("datos :>> ", datos);
    document.getElementById("lista").innerHTML =`
    <div class="card" id="card">
    <h3>${datos.name.toUpperCase()}</h3>
    <img src="${datos.sprites.front_default}" class="card-img-top" alt="...">
    <h5>Altura: ${datos.height}</h5>
    <h5>Peso: ${datos.weight}</h5>
    <h5>Tipo: ${datos.types[0].type.name}</h5>
    <h5>ID: ${datos.id}</h5>
    </div>
    `;
}

imprimircuerpoPokemons(numeroPokemon);

$mas.addEventListener("click", () => {
    if (numeroPokemon < 1282){
        numeroPokemon++;
    }else{
        alert("No hay más pokemones para mostrar.");
    }
    imprimircuerpoPokemons(numeroPokemon);
});

$menos.addEventListener("click", () => {
    if (numeroPokemon > 1){
        numeroPokemon--;
    }else if (numeroPokemon == 1){
        alert("No hay pokemones anteriores para mostrar, te encuentras en el primero.");
    }
    imprimircuerpoPokemons(numeroPokemon);
});

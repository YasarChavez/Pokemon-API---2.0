const $mas = document.getElementById("mas");
const $menos = document.getElementById("menos");
const $masdiez = document.getElementById("masdiez");
const $menosdiez = document.getElementById("menosdiez");
const $busqueda = document.getElementById("busqueda");
const input = document.querySelector("input");

var numeroPokemon = 1;

// Función principal de conexión
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

// Buscar pokemon por numero
async function buscarPokemon() {
    let url = `https://pokeapi.co/api/v2/pokemon/${numeroPokemon}`;
    return conectar(url);
}

// Imprimir pokemon usando buscarPokemon()
async function imprimircuerpoPokemons() {
    // let url = `https://pokeapi.co/api/v2/pokemon/${numeroPokemon}`;
    // let datos = await conectar(url);
    // console.log("datos :>> ", datos);
    let datos = await buscarPokemon();
    console.log("datos :>> ", datos);
    //nombre primera letra mayusculas
    let nombre = datos.name[0].toUpperCase() + datos.name.slice(1);
    //
    document.getElementById("lista").innerHTML = `
    <div class="card" id="card">
    <h3>${nombre}</h3>
    <img src="${datos.sprites.front_default}" class="card-img-top" alt="...">
    <h5>Altura: ${datos.height}</h5>
    <h5>Peso: ${datos.weight}</h5>
    <h5>Tipo: ${datos.types[0].type.name}</h5>
    <h5>ID: ${datos.id}</h5>
    </div>
    `;
}

// Buscar pokemon por el nombre del cuadro de busqueda
async function pokemonbuscado() {
    let nombrePokemon = document.getElementById("searchterm").value.toLowerCase();
    let url = `https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`;
    let respuesta = await fetch(url);
    let datos = await respuesta.json();
    //nombre primera letra mayusculas
    let nombre = datos.name[0].toUpperCase() + datos.name.slice(1);
    //
    document.getElementById("lista").innerHTML = `
    <div class="card" id="card">
    <h3>${nombre}</h3>
    <img src="${datos.sprites.front_default}" class="card-img-top" alt="...">
    <h5>Altura: ${datos.height}</h5>
    <h5>Peso: ${datos.weight}</h5>
    <h5>Tipo: ${datos.types[0].type.name}</h5>
    <h5>ID: ${datos.id}</h5>
    </div>
    `;
    numeroPokemon = datos.id;
}

// Llamamos a imprimircuerpoPokemons() cuando se inicia la web
imprimircuerpoPokemons(numeroPokemon);

// Sumar 1 al numero numeroPokemon
$mas.addEventListener("click", () => {
    if (numeroPokemon < 1010) {
        numeroPokemon++;
    } else {
        alert("No hay más pokemones para mostrar.");
    }
    imprimircuerpoPokemons(numeroPokemon);
});

// Restar 1 al numeroPokemon
$menos.addEventListener("click", () => {
    if (numeroPokemon > 1) {
        numeroPokemon--;
    } else if (numeroPokemon == 1) {
        alert(
            "No hay pokemones anteriores para mostrar, te encuentras en el primero."
        );
    }
    imprimircuerpoPokemons(numeroPokemon);
});

// Sumar 10 al numeroPokemon
$masdiez.addEventListener("click", () => {
    if (numeroPokemon < 1010) {
        numeroPokemon += 10;
    } else {
        alert("No hay más pokemones para mostrar.");
    }
    imprimircuerpoPokemons(numeroPokemon);
});

// Restar 10 al numeroPokemon
$menosdiez.addEventListener("click", () => {
    if (numeroPokemon > 11) {
        numeroPokemon -= 10;
    } else{
        alert(
            `No puedes restar más pokemones para mostrar, te encuentras en el ${numeroPokemon}.`
        );
    }
    imprimircuerpoPokemons(numeroPokemon);
});

// Evento de busqueda
$busqueda.addEventListener("click", () => {
    pokemonbuscado();
    document.getElementById("searchterm").value = "";
});

// Evento de busqueda al presionar "Enter"
input.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        pokemonbuscado();
        document.getElementById("searchterm").value = "";
    }
});
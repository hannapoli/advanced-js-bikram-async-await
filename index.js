//Ejercicios Pokémon
// Utilizando la api de Pokemon https://pokeapi.co/ y usando sólo async/await:
//1. Declara una función getRandomPokemon que retorne un pokemon aleatorio.

const getRandomPokemon = async () => {
    let id = Math.floor(Math.random() * 500);
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw `Error 404! Page not found`;
        }
    } catch (error) {
        throw error;
    }
}
// getRandomPokemon();

//2. Declara una funcion getImageAndName que retorne el nombre 
// y la URL de la imagen de un pokemon => (return {img, name})
const getImageAndName = async (pokemon) => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        if (!response.ok) throw `Error 404! Page not found`;
        const data = await response.json();
        const name = data.name;
        const img = data.sprites.front_default;
        return { name, img };
    } catch (error) {
        throw error;
    }
}

//3. Declara una funcion printImageAndName que retorne el string necesario 
// para pintar la imagen y el nombre del pokemon en el DOM de la siguiente forma:
//<section>
//    <img src="url de imagen" alt="nombre del pokemon">
//    <h1>Nombre del pokemon</h1>
//</section>

const printImageAndName = async (pokemon) => {
    let id = Math.floor(Math.random() * 500);
    if (pokemon === undefined) pokemon = id;
    const { name, img } = await getImageAndName(pokemon);
    return `
    <section>
        <img src="${img}" alt="${name}">
        <h1>${name}</h1>
    </section>`
}

// console.log(printImageAndName('ditto'));

//Ejercicios Batalla entre Pokemon y perritos
// Recordatorio, la API de perritos era 'https://dog.ceo/dog-api/'
//4. Declara una función getRandomDogImage que retorne la url de la imagen de un perro aleatorio

const getRandomDogImage = async () => {
    try {
        const response = await fetch('https://dog.ceo/api/breeds/image/random');
        if (!response.ok) throw `Error 404! Page not found`;
        const data = await response.json();
        return data.message;
    } catch (error) {
        throw error;
    }
}

//5. Declara una función getRandomPokemonImage que retorne 
// la url de la imagen de un pokemon aleatorio.

const getRandomPokemonImage = async () => {
    try {
        const data = await getRandomPokemon();
        return data.sprites.front_default;
    } catch (error) {
        throw error;
    }
}

// getRandomPokemonImage();

//6. Declara una función printPugVsPikachu 
// que pinte la batalla entre "Pug" y "Pikachu" (no se testea)

const pug = document.querySelector('#pug');
const pikachu = document.querySelector('#pikachu');
const contenedor = document.querySelector('#contenedor');
const resultado = document.querySelector('#resultado');

const getAllImagesByBreed = async (breed) => {
    try {
        const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
        if (response.ok) {
            const data = await response.json();
            return data.message[0];
        } else {
            throw `Error 404! Page not found`;
        }
    } catch (error) {
        throw (error);
    }
}

const decidirGanador = () => {
    const ganador = Math.floor(Math.random() * 2);
    return ganador === 0 ? 'Pug' : 'Pikachu';
}


const printPugVsPikachu = async () => {
    const imgPerro = await getAllImagesByBreed('pug');
    const { img } = await getImageAndName('pikachu');
    console.log(imgPerro)
    console.log(img)

    const pPug = document.createElement('H2');
    const imgPug = document.createElement('IMG');
    const pPikachu = document.createElement('H2');
    const imgPikachu = document.createElement('IMG');

    pPug.textContent = 'Pug';
    imgPug.src = imgPerro;
    pPikachu.textContent = 'Pikachu';
    imgPikachu.src = img;
    [imgPug, imgPikachu].forEach(img => {
        img.style.width = '250px';
        img.style.height = '250px';
    });
    contenedor.style.display = 'flex';
    pug.append(pPug, imgPug);
    pikachu.append(pPikachu, imgPikachu);
    contenedor.append(pug, pikachu);

    const ganador = decidirGanador();
    resultado.textContent = `En esta batalla ha ganado: ${ganador}!!!`;

}

// printPugVsPikachu();

//Ejercicios con Rick and Morty
//Usando la api de Rick and Morty https://rickandmortyapi.com/ y sólo async/await:

//7. Declara una función getRandomCharacter que retorne un personaje aleatorio.

//8. Declara una función getRandomCharacterInfo que retorne de un personaje 
// su imagen, nombre, episodios en los que aparece y el nombre del primer episodio 
// en el que aparece + fecha de estreno, tendrás que hacer otro fetch para llegar a los ultimos datos. 
// Formato de retorno => (return {img, name, episodes, firstEpisode, dateEpisode})

//9. Pinta los anteriores datos en el DOM (no se testea)
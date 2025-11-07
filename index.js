//@ts-nocheck
//======================Ejercicios Pokémon======================
// Utilizando la api de Pokemon https://pokeapi.co/ y usando sólo async/await:

//1. Declara una función getRandomPokemon que retorne un pokemon aleatorio.

/**
 * Obtiene un Pokemón aleatorio desde la API de PokeAPI.
 * @async
 * @function getRandomPokemon
 * @returns {Promise<Object>} Promesa que se resuelve con los datos completos del pokemón.
 * @throws {Error|string} Lanza un error si la solicitud falla o el Pokemón no existe.
 */
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

//2. Declara una funcion getImageAndName que retorne el nombre y la URL de la imagen de un pokemon => (return {img, name}).

/**
 * Obtiene el nombre y la URL de la imagen de un pokemón específico.
 * @async
 * @function getImageAndName
 * @param {string|number} pokemon - Nombre o ID de pokemón.
 * @returns {Promise<{name: string, img: string}>} Promesa que se resuelve con el nombre y la imágen del pokemón.
 * @throws {Error|string} Lanza un error si la solicitud falla o el Pokemón no existe.
 */
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
/**
 * Genera un string HTML con la imágen y el nombre de un pokemón.
 * Si no se pasa un nombre o un ID, selecciona un pokemón aleatorio.
 * @async
 * @function printImageAndName
 * @param {string|number} [pokemon] - Nombre o ID del pokemón (opcional). 
 * @returns {Promise<string>} Promesa que se resuelve con el HTML renderizado en el DOM.
 */
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

//======================Ejercicios Batalla entre Pokemon y perritos======================
// La API de perritos es 'https://dog.ceo/dog-api/'

//4. Declara una función getRandomDogImage que retorne la url de la imagen de un perro aleatorio.

/**
 * Obtiene la URL de una imágen aleatoria de un perro desde la API Dog CEO.
 * @async
 * @function getRandomDogImage
 * @returns {Promise<string>} Promesa que se resuelve con la URL de la imágen de un perro aleatorio.
 * @throws {Error|string} Lanza un error si la solicitud falla.
 */
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

//5. Declara una función getRandomPokemonImage que retorne la url de la imagen de un pokemon aleatorio.
/**
 * Obtiene la URL de la imágen de un pokemón aleatorio.
 * @async
 * @function getRandomPokemonImage
 * @returns {Promise<string>} Promesa qu se resuelva con la URL de la imágen del pokemón.
 * @throws {Error|string} Lanza un error si la solicitud falla.
 */
const getRandomPokemonImage = async () => {
    try {
        const data = await getRandomPokemon();
        return data.sprites.front_default;
    } catch (error) {
        throw error;
    }
}

// getRandomPokemonImage();

//6. Declara una función printPugVsPikachu que pinte la batalla entre "Pug" y "Pikachu" (no se testea)

//Elementos del DOM:
const pug = document.querySelector('#pug');
const pikachu = document.querySelector('#pikachu');
const contenedor = document.querySelector('#contenedor');
const resultado = document.querySelector('#resultado');

/**
 * Obtiene la primera imágen disponible de una raza de perro.
 * @async
 * @function getAllImagesByBreed
 * @param {string} breed - Nombre de la raza del perro.
 * @returns {Promise<string>} Promesa que se resuelve con la URL de la primera imágen de la lista de imagenes.
 * @throws {Error|string} Lanza un error si la raza no existe o la solicitud falla.
 */
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

/**
 * Decidir aleatoriamente quién gana entre Pug y Pikachu.
 * @returns {string} Devuelve "Pug" o "Pikachu" al azar.
 */
const decidirGanador = () => {
    const ganador = Math.floor(Math.random() * 2);
    return ganador === 0 ? 'Pug' : 'Pikachu';
}

/**
 * Pinta en el DOM la batalla entre un pug y Pikachu, mostrando sus nombres, las imágenes y el ganador.
 * @async
 * @function printPugVsPikachu
 * @returns {Promise<string>} Promesa que no se resuelve con el nombre del ganador.
 * @throws {Error|string} Lanza un error si la solicitud falla.
 */
const printPugVsPikachu = async () => {
    try {
        const imgPerro = await getAllImagesByBreed('pug');
        const { img } = await getImageAndName('pikachu');

        const pPug = document.createElement('H2');
        const imgPug = document.createElement('IMG');
        const pPikachu = document.createElement('H2');
        const imgPikachu = document.createElement('IMG');

        pPug.textContent = 'Pug';
        pPikachu.textContent = 'Pikachu';
        imgPikachu.src = img;
        imgPug.src = imgPerro;
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

        return ganador;
    } catch (error) {
        throw error;
    }
}

printPugVsPikachu();

//======================Ejercicios con Rick and Morty======================
//Usando la api de Rick and Morty https://rickandmortyapi.com/ y sólo async/await:

//7. Declara una función getRandomCharacter que retorne un personaje aleatorio.
/**
 * Obtiene un personaje aleatorio desde la API Rick and Morty.
 * @async
 * @function getRandomCharacter
 * @returns {Promise<Object>} Promesa que se resuelve con los datos completos del personaje.
 * @throws {Error|string} Lanza un error si la solicitud falla.
 */
const getRandomCharacter = async () => {
    try {
        let id = Math.floor(Math.random() * 827);
        const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
        if (!response.ok) {
            throw `Error 404! Page not found`;
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error
    }
}

//8. Declara una función getRandomCharacterInfo que retorne de un personaje 
// su imagen, nombre, episodios en los que aparece y el nombre del primer episodio 
// en el que aparece + fecha de estreno, tendrás que hacer otro fetch para llegar a los ultimos datos. 
// Formato de retorno => (return {img, name, episodes, firstEpisode, dateEpisode}).

/**
 * Obtiene información detallada de un personaje aleatorio de Rick and Morty.
 * @async
 * @function getRandomCharacterInfo
 * @returns {Promise<{img: string, name: string, episodes: string[], firstEpisode: string, dateEpisode: string}>}
 * Promesa que se resuelve con la información detallada sobre el personaje.
 * @throws {Error|string} Lanza un error si la solicitud falla.
 */
const getRandomCharacterInfo = async () => {

    const response = await getRandomCharacter();
    // console.log(response);
    // console.log(response.episode);
    console.log(response)
    try {
        const responseEpisodes = await fetch(`${response.episode}`);
        if (!responseEpisodes.ok) throw `Error 404! Page not found`;
        const data = await responseEpisodes.json();
        // (console.log(data.name));
        // (console.log(data.air_date));
        const charInfo = { img: response.image, name: response.name, episodes: response.episode, firstEpisode: data.name, dateEpisode: data.air_date };
        // console.log({img, name, episodes, firstEpisode, dateEpisode} = charInfo);
        return charInfo;
    } catch (error) {
        throw error;
    }
}

//9. Pinta los anteriores datos en el DOM (no se testea)

//Elementos del DOM:
const contenedorPersonaje = document.querySelector('#contenedorPersonaje');

/**
 * Renderiza en el DOM la información de un personaje aleatorio de Rick and Morty.
 * @async
 * @function renderizarPersonaje
 * @returns {Promise<void>} Usa los datos de la promesa para renderizarlos en el DOM.
 */
const renderizarPersonaje = async () => {
    const { img, name, episodes, firstEpisode, dateEpisode } = await getRandomCharacterInfo();

    const nombrePersonaje = document.createElement('H2');
    const imgPersonaje = document.createElement('IMG');
    const episodesPersonaje = document.createElement('P');
    const firstEpisodePersonaje = document.createElement('P');
    const dateEpisodePersonaje = document.createElement('P');

    nombrePersonaje.textContent = name;
    imgPersonaje.src = img;
    imgPersonaje.style.width = '250px';
    imgPersonaje.style.height = '250px';
    episodesPersonaje.textContent = `Episodes: ${episodes}`;
    firstEpisodePersonaje.textContent = `First episode: "${firstEpisode}"`;
    dateEpisodePersonaje.textContent = `Date of broadcast: ${dateEpisode}`;

    contenedorPersonaje.style.display = 'flex';
    contenedorPersonaje.style.flexDirection = 'column';

    contenedorPersonaje.append(nombrePersonaje, imgPersonaje, episodesPersonaje, firstEpisodePersonaje, dateEpisode);
}

renderizarPersonaje();
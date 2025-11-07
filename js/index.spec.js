//@ts-nocheck
let randomize = (maxNum = 177, min = 0) => {
    return (Math.floor(Math.random() * maxNum) + min);
}

let generateArray = (elementos = randomize(), min = 0, max = randomize()) => {
    let array = [];
    for (let i = 0; i < elementos; i++) {
        array.push(randomize(max) - min);
    }
    return (array);
}

let printArray = (array) => {
    return ("[" + array.map(element => element).join(", ") + "]");
}

let randomizeArrayOrder = (array) => {
    let rndArray = generateArray(array.length);
    for (let i = 0; i < array.length; i++) {
        if (rndArray[i] < rndArray[i + 1]) {
            let temp = rndArray[i];
            rndArray[i] = rndArray[i + 1];
            rndArray[i + 1] = temp;
            temp = array[i];
            array[i] = array[i + 1];
            array[i + 1] = temp;
        }
    }
    return (array);
}



describe('Ejercicios Async/Await', function () {
    describe('Ejercicio 1.- Declara una función **getRandomPokemon** que retorne un pokemon aleatorio.', function () {
        it('La función devuelve los datos de un pokemon aleatorio', async function () {
            const response = await getRandomPokemon()
            expect(String(getRandomPokemon)).toContain('Math.random');
            expect(response.abilities.length).toBeGreaterThan(0)
        })
    })
    describe('Ejercicio 2.- Declara una funcion **getImageAndName** que retorne el nombre y la URL de la imagen de un pokemon => (return {img, name})', function () {
        it('La función retorna el nombre y la URL de la imagen de un pokemon', async function () {
            const response = await getImageAndName("pikachu")
            expect(response.img).toContain('png')
            expect(response.name).toEqual('pikachu');
        })
    })
    describe('Ejercicio 3.- Declara una funcion **printImageAndName** que retorne el string necesario para pintar la imagen y el nombre del pokemon en el DOM', function () {
        it('La función pinta en el DOM el nombre y la imagen de un pokemon', async function () {
            const response = await printImageAndName()
            expect(response).toContain('<section>')
            expect(response).toContain('<img')
            expect(response).toContain('<h1>')
        })
    })
    describe('Ejercicio 4.- Declara una función **getRandomDogImage** que retorne la url de la imagen de un perro aleatorio', function () {
        it('La función retorna la URL de la imagen de un perro aleatorio', async function () {
            const response = await getRandomDogImage()
            expect(response).toContain('.jpg')

        })
    })
    describe('Ejercicio 5.- Declara una función **getRandomPokemonImage** que retorne la url de la imagen de un pokemon aleatorio.', function () {
        it('La función retorna la URL de la imagen de un pokemon aleatorio', async function () {
            const response = await getRandomPokemonImage()
            expect(response).toContain('sprites')

        })
    })

    describe('Ejercicio 7.- Declara una función **getRandomCharacter** que retorne un personaje aleatorio.', function () {
        it('La funcion retorna un personaje aleatorio', async function () {
            expect(String(getRandomCharacter)).toContain('Math.random');
            const response = await getRandomCharacter()
            expect(typeof response.id).toEqual('number')
        })
    })

    describe('Ejercicio 8.- Declara una función **getRandomCharacterInfo** que retorne de un personaje su imagen, nombre, episodios en los que aparece y el nombre del primer episodio en el que aparece + fecha de estreno', function () {
        it('La función retorna los datos de un personaje', async function () {
            const response = await getRandomCharacterInfo()
            expect(response.img).toContain('avatar')
            expect(response.name.length).toBeGreaterThan(0)
            expect(Array.isArray(response.episodes)).toBe(true)
            expect(response.firstEpisode.length).toBeGreaterThan(0)
            expect(response.dateEpisode.length).toBeGreaterThan(0)
        })
    })

})


export const getAllData = async() => {
    const film = await fetch('http://localhost:5000/film')
    return await film.json()
}

export const getFilmData = async(id) => {
    const film = await fetch('http://localhost:5000/film/'+id)
    return await film.json()
}

export const createFilmData = async(filmData) => {
    const film = await fetch('http://localhost:5000/film', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(filmData)
    })
    return await film.json()
}

export const updateFilmData = async(id, filmData) => {
    const film = await fetch('http://localhost:5000/film/'+id, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(filmData)
    })
    return await film.json()
}
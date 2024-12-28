import { deleteFilmbyId, editFilm, findAllFilm, findFilmbyId, insertFilm } from './filmRepository.js'

export const getAllFilm = async() => {
    const film = await findAllFilm()
    return film
}

export const getFilm = async(id) => {
    const film = await findFilmbyId(id)
    return film
}

export const createFilm = async(filmData) => {
    const film = await insertFilm(filmData)
    return film
}

export const updateFilm = async(id, filmData) => {
    const film = await editFilm(id, filmData)
    return film
}

export const deleteFilm = async(id) => {
    deleteFilmbyId((id))
}
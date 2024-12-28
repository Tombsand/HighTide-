import {prisma} from '../Db.js'

export const findAllFilm = async() => {
    const film = await prisma.film.findMany()
    return film
}

export const findFilmbyId = async(id) => {
    const film = await prisma.film.findUnique({
        where:{
            id: id
        }
    })
    return film
}

export const insertFilm = async(filmData) => {
    const film = await prisma.film.create({
        data:{
            name: filmData.name,
            link: filmData.link,
            episode: filmData.episode
        }
    })
    return film
}

export const editFilm = async(id, filmData) => {
    const film = await prisma.film.update({
        where:{
            id: id
        },
        data: filmData
    })
    return film
}

export const deleteFilmbyId = async(id) => {
    await prisma.film.delete({
        where:{
            id: id
        }
    })
}
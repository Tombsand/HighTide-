import express from 'express'
import { createFilm, deleteFilm, getAllFilm, getFilm, updateFilm } from './filmService.js'
export const router = express.Router()

router.get("/", async (req,res)=>{
    const film = await getAllFilm()
    res.send(film)
})

router.get("/:id", async (req,res)=>{
    const filmId = parseInt(req.params.id)
    const film = await getFilm(filmId)
    res.send(film)
})


router.post("/", async (req,res)=>{
    const filmData = req.body
    const film = await createFilm(filmData)
    res.send(film)
})

router.post("/:id", async (req,res)=>{
    const filmId = parseInt(req.params.id)
    const filmData = req.body
    const film = await updateFilm(filmId, filmData)
    res.send(film)
})

router.delete("/:id", async (req,res)=>{
    const filmId = parseInt(req.params.id)
    deleteFilm(filmId)
    res.send("Film deleted on id " + filmId)
})

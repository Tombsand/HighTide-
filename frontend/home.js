import images from './data.json'
import { createFilmData, getAllData, getFilmData, updateFilmData } from './fetch'
const filmData = await getAllData()

export async function render(i){
    const render = await getFilmData(filmData[i].id)
    filmData[i] = render
    document.getElementById('lastEpisode' + i).innerHTML = "Last episode : "+render.episode
}

document.querySelector('.addNewFilm').addEventListener('click', function(){
    document.querySelector('#dialog').show()
})

document.querySelector('#cancelDialog').addEventListener('click', function(){
    document.querySelector('#dialog').close()
})

document.querySelector('#submitNewFilm').addEventListener('click', async function(){
    const film = await createFilmData({
        name: document.querySelector('#InputFilmName').value,
        episode: parseInt(document.querySelector('#InputFilmEpisode').value),
        link: document.querySelector('#InputFilmLink').value
    })
    filmData[filmData.length+1] = film
    document.querySelector('#dialog').close()
})

for (let i = 0; i < filmData.length; i++) {
    const content = document.querySelector(".content");
    const elementTemplate = `
        <div class="film">
            <img class="gambar" src="${images[i].image}">
            <div class="episode">
                <div>
                    <p class="filmTitle">${filmData[i].name}</p>
                    <p id="lastEpisode${i}">Last episode : ${filmData[i].episode}</p>
                </div>
                <div>
                    <div class="editEpisode">
                        <button class="setEpisodeBtn${i}" id="editEpisodeBtn">Set Lastest</button>
                        <button class="addEpisodeBtn${i}" id="editEpisodeBtn">+</button>
                        <button class="subtractEpisodeBtn${i}" id="editEpisodeBtn">-</button>             
                    </div>
                    <div class="popup${i}">
                    </div>
                    <button class="filmBtn${i}" id="filmBtn">Watch new Episode</button>

                </div>
            </div>
        </div>
    `
    const element = document.createElement("div")
    element.innerHTML = elementTemplate

    element.querySelector('.addEpisodeBtn' + i).addEventListener('click', async function(){
        const film = await updateFilmData(filmData[i].id, {
            episode: filmData[i].episode + 1
        })
        render(i)
    })  
    element.querySelector('.subtractEpisodeBtn' + i).addEventListener('click', async function(){
        const film = await updateFilmData(filmData[i].id, {
            episode: filmData[i].episode - 1
        })
        if(filmData[i].episode <= 0) {
            const film = await updateFilmData(filmData[i].id, {
                episode: 1
            })
        }
        render(i)
    })
    element.querySelector('.filmBtn' + i).addEventListener('click', async function(){
        const film = await updateFilmData(filmData[i].id, {
            episode: filmData[i].episode + 1
        })
        window.open(location.href = filmData[i].link+(parseInt(filmData[i].episode)+1)+'-subtitle-indonesia/')
        window.stop()
        render(i)
    })

    content.appendChild(element)

    element.querySelector('.setEpisodeBtn' + i).addEventListener('click', function(){
        const popup = document.querySelector('.popup' + i)
        const popupTemplate =`
            <div class="editEpisode" id="popup">
                Episode<input id="inputEpisode${i}">
                <button class="popupSetBtn${i}">set</button>
            </div>
        `

        const popupElement = document.createElement("div")
        popupElement.innerHTML = popupTemplate
        
        if(popup.childElementCount <= 0) popup.appendChild(popupElement)

        popupElement.querySelector('.popupSetBtn' + i).addEventListener('click', async function(){
            let episode = parseInt(document.getElementById('inputEpisode' + i).value)
            if(!isNaN(episode) && episode >= 0){
                const film = await updateFilmData(filmData[i].id, {
                    episode: episode
                })
            }
            render(i)
            popup.removeChild(popupElement)
        })
    })
}
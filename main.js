const api = axios.create({
    baseURL: 'https://api.thecatapi.com/v1',
    headers: {'X-API-KEY': 'e2b46e4f-3041-4213-a0bf-7f55f9cf0589'}
})

const apiurlrandom = 'https://api.thecatapi.com/v1/images/search?limit=2&api_key=e2b46e4f-3041-4213-a0bf-7f55f9cf0589'
const apiurlfavorites = 'https://api.thecatapi.com/v1/favourites?api_key=e2b46e4f-3041-4213-a0bf-7f55f9cf0589'
const apiurlfavoritesdelete = (id) => `https://api.thecatapi.com/v1/favourites/${id}`
const apiurlupload = `https://api.thecatapi.com/v1/images/upload`

const spanError = document.getElementById('error')


async function loadRandomMichis() {
    const res = await fetch(apiurlrandom)
    const data = await res.json()
    if(res.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + res.status
    } else {
    console.log('Random', data)
    const img1 = document.getElementById('img1')
    const img2 = document.getElementById('img2')
    const btn1 = document.getElementById('btn1')
    const btn2 = document.getElementById('btn2')

    img1.src = data[0].url
    img2.src = data[1].url

    btn1.onclick = () => saveFavoritesMichis(data[0].id)
    btn2.onclick = () => saveFavoritesMichis(data[1].id)
    }
}

async function loadFavoritesMichis() {
    const res = await fetch(apiurlfavorites)
    const data = await res.json()
    
    console.log('Favoritos', data)

    if(res.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + res.status + " " + data.message
    } else {
        const section = document.getElementById('favoritesMichis')
        section.innerHTML = "";

        const h2 = document.createElement('h2');
        const h2Text = document.createTextNode('Michis favoritos');
        h2.appendChild(h2Text);
        section.appendChild(h2);

        data.forEach(michi => {
            const section = document.getElementById('favoritesMichis')
            const article = document.createElement('article')
            const img = document.createElement('img')
            const btn = document.createElement('button')
            const btnText = document.createTextNode('Sacar al michi de favoritos')

            
            img.src = michi.image.url
            img.width = 150

            btn.appendChild(btnText)
            btn.onclick = () => deleteFavoritesMichis(michi.id);

            article.appendChild(img)
            article.appendChild(btn)

            section.appendChild(article)

            //michi.image.url
        })
    }
}

async function saveFavoritesMichis(id) {
    const {data, status} = await api.post('/favourites', {
        image_id: id,
    })

    //const res = await api.post('/favourites', {
    //    image_id: id,
    //})


    //const res = await fetch(apiurlfavorites, {
    //    method: 'POST',
    //    headers: {
    //        'Content-Type': 'application/json',
    //    },
    //    body: JSON.stringify({
    //        image_id: id,
    //    }),
    //})
    //const data = await res.json();
    //console.log('Save', res)

    if (status !== 200) {
        spanError.innerHTML = "Hubo un error: " + res.status + data.message;
    } else {
        console.log('Michi guardado en favoritos')
        loadFavoritesMichis()
    }
}

async function deleteFavoritesMichis(id) {
    const res = await fetch(apiurlfavoritesdelete(id), {
        method: 'DELETE',
        headers: {
            'X-API-KEY': 'e2b46e4f-3041-4213-a0bf-7f55f9cf0589',
        }
    })

    const data = await res.json();

    if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + res.status + data.message;
    } else {
        console.log('Michi eliminado de favoritos')
        loadFavoritesMichis()
    }
}

async function uploadMichiPhoto() {
    const form = document.getElementById("uploadingForm")
    const formData = new FormData(form)

    console.log(formData.get('file'))

    const res = await fetch(apiurlupload, {
        method: 'POST',
        headers: {
            //'Content-Type': 'multipart/form-data',
            'X-API-KEY': 'e2b46e4f-3041-4213-a0bf-7f55f9cf0589', 
        },
        body: formData,
    })
}

loadRandomMichis()
loadFavoritesMichis()
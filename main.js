const URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=3&api_key=live_RavGaXjxvTcfHJSp5U6FBbPOkS6fr8iLzBgw4F6putPOjn5OKXAiXKES2aD9k6gJ';
const URL_FAVORITES = 'https://api.thecatapi.com/v1/favourites?api_key=live_RavGaXjxvTcfHJSp5U6FBbPOkS6fr8iLzBgw4F6putPOjn5OKXAiXKES2aD9k6gJ';
const URL_FAVORITES_DELETE = (id) =>  `https://api.thecatapi.com/v1/favourites/${id}?api_key=live_RavGaXjxvTcfHJSp5U6FBbPOkS6fr8iLzBgw4F6putPOjn5OKXAiXKES2aD9k6gJ`;
const URL_UPLOAD = 'https://api.thecatapi.com/v1/images/upload?api_key=live_RavGaXjxvTcfHJSp5U6FBbPOkS6fr8iLzBgw4F6putPOjn5OKXAiXKES2aD9k6gJ';
const spanError = document.getElementById("error");

async function loadRandomMichis() {
    const res = await fetch(URL_RANDOM);
    const data = await res.json();
    console.log('Random')
    console.log(data)

    if (res.status !== 200) {
        spanError.innerText = "Hubo un error" + res.status;
    } else {
        const img = document.getElementById("imageCat");
        const img2 = document.getElementById("imageCat2");
        const img3 = document.getElementById("imageCat3");
        const btn = document.getElementById("btn");
        const btn2 = document.getElementById("btn2");
        const btn3 = document.getElementById("btn3");

        img.src = data[0].url;
        img2.src = data[1].url;
        img3.src = data[2].url;

        btn.onclick = () => saveFavorites(data[0].id);
        btn2.onclick = () => saveFavorites(data[1].id);
        btn3.onclick = () => saveFavorites(data[2].id);
    }

}

async function loadFavoritesMichis() {
    const res = await fetch(URL_FAVORITES);
    const data = await res.json();
    console.log('Favoritos')
    console.log(data)
    
    if (res.status !== 200) {
        spanError.innerText = "Hubo un error" + res.status;
    } else {
        const div = document.querySelector(".container-gatitos-favoritos");
        div.innerHTML = "";

        data.forEach(michi => {
            const div2 = document.createElement("div");
            div2.classList.add("col");
            const img = document.createElement("img");
            img.classList.add("image");
            const imageButton = document.createElement("img");
            imageButton.src = "./icon/delete.png"
            imageButton.classList.add("button-delete");

            div2.appendChild(img);
            img.src = michi.image.url;
            imageButton.onclick = () => deleteFavorites(michi.id);
            div2.appendChild(imageButton);
            div.appendChild(div2);
            
            
        });
    }

}

async function saveFavorites(id) {
    const res = await fetch(URL_FAVORITES, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            image_id: id
        }),
    });
    const data = await res.json();

    console.log('Save')
    console.log(data)

    if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + res.status + data.message;
    } else {
        console.log("Michi guardado en favoritos")
        loadFavoritesMichis()
    }
}

async function deleteFavorites(id) {
    const res = await fetch(URL_FAVORITES_DELETE(id), {
        method: 'DELETE',
    
    });
    const data = await res.json();

    if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + res.status + data.message;
    } else {
        console.log("Michi eliminado de favoritos")
        loadFavoritesMichis()
    }
};

async function uploadPhoto() {
    const form = document.getElementById("uploadingForm");
    const formData = new FormData(form);

    console.log(formData.get('file'))

    const res = await fetch(URL_UPLOAD, {
        method: 'POST',
        body: formData,
    });
    const data = await res.json();

    if (res.status !== 201) {
        spanError.innerHTML = "Hubo un error: " + res.status + data.message;
        console.log({data})
    } else {
        console.log("Foto de gato subida :)")
        console.log({data})
        console.log(data.url)
        saveFavorites(data.id);
    }

}

loadRandomMichis()
loadFavoritesMichis()





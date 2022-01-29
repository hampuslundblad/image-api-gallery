//getImages().then(data => console.log("https://live.staticflickr.com/" + data.photos.photo[0].server + "/" + data.photos.photo[0].id + "_"+data.photos.photo[0].secret+".jpg"))

function formatImageResponse(imageObject){
    return "https://live.staticflickr.com/" + imageObject.server + "/" + imageObject.id + "_"+imageObject.secret+".jpg"
}

async function getImages() {
    const images = await fetch('http://localhost:3000/images',{method:"GET", mode:"cors"})
        .then(data=>data.json())
        .then(json=>{
            const imageResponse = json.data.photos.photo
            return imageResponse
        })
        return images
    }

async function testFunction(){
        /*await getData().then(image_url=> {
            console.log(image_url)
        const gallery = document.getElementById("gallery")
        const img = document.createElement('img')
        console.log(image_url)
        img.src=image_url
        gallery.append(img) 
        */
    const images = await getImages()
    const image_url = formatImageResponse(images[0])
    const gallery = document.getElementById("gallery")
    const img = document.createElement('img')
    console.log(image_url)
    img.src=image_url
    gallery.append(img) 
}

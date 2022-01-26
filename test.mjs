import fetch from 'node-fetch'

const api_key = "&api_key=36a1eee5f4ecb7d3e37c01e92091e146"
const text = "&text=nature"
const format = "&format=json"
const media ="&media=photos"
const per_page ="&per_page=2"
const jsoncallback = "&nojsoncallback=1"
async function getImages() {
    const response = await fetch("https://api.flickr.com/services/rest/?method=flickr.photos.search" + api_key + text + media + format + per_page + jsoncallback, {method:"GET"})
    let data = response.json()
    return data;
}
getImages().then(data => console.log("https://live.staticflickr.com/" + data.photos.photo[0].server + "/" + data.photos.photo[0].id + "_"+data.photos.photo[0].secret+".jpg"))

import fetch from "node-fetch";

const api_key = "&api_key=36a1eee5f4ecb7d3e37c01e92091e146"; // Our api key
const text = "&text=nature"; // Search text
const format = "&format=json"; // Return format, can also get it in xml.
const media = "&media=photos"; // What kind of media we want, videos exists as well.
//let per_page ="&per_page=2" // Results per page
const jsoncallback = "&nojsoncallback=1"; // We don't want a callback as return.
const sort = "&sort=relevance";

export async function getImages(numberOfImages = 10) {
    console.log(numberOfImages)
  let per_page = "&per_page=" + numberOfImages; // Result per page
  const response = await fetch(
    "https://api.flickr.com/services/rest/?method=flickr.photos.search" +
      api_key +
      text +
      media +
      format +
      per_page +
      jsoncallback +
      sort,
    { method: "GET" }
  ).then((data) => data.json());
  console.log(response)
  return response;
}

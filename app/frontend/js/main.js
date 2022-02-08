/* Globals */
const gallery = document.getElementById("gallery");
const loader = document.getElementById("loading");

/* Formats the image url according to https://www.flickr.com/services/api/misc.urls.html */
function formatImageUrl(imageObject) {
  return (
    "https://live.staticflickr.com/" +
    imageObject.server +
    "/" +
    imageObject.id +
    "_" +
    imageObject.secret +
    ".jpg"
  );
}

/* Displays the loading symbol when called */
function displayLoading() {
  loader.classList.add("display");
}
/* Hide the loading symbol when called */
function hideLoading() {
  loader.classList.remove("display");
}

//Same as the usual js fetch but times out after 8 seconds unless another value is given.
async function fetchWithTimeout(resource, options = {}) {
  const { timeout = 8000 } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  const response = await fetch(resource, {
    ...options,
    signal: controller.signal,
  });
  clearTimeout(id);
  return response;
}

async function getImages(numberOfImages) {
  displayLoading(); // Displays the loading symbol.
  try {
    //Fetches images from our REST api, times out if the request takes longer than 6 seconds
    let response = await fetchWithTimeout(
      "http://localhost:3000/images?numberOfImages=" + numberOfImages,
      {
        method: "GET",
        mode: "cors",
        timeout: 6000,
      }
    )
      .then((data) => data.json())
      .then((json) => {
        if (json.status == 500) {
          appendErrorTextToGallery(json.data.error.code);
          return 0;
        } else if (json.status == 200) {
          hideLoading(); // Hide the loading symbol since request was successfull
          return json.data.photos.photo;
        } else {
          console.error("Something unknown went wrong");
          return 0;
        }
      });
    return response;
  } catch (error) {
    console.log(error);
    //Timeout if the request takes long than 6 seconds
    appendErrorTextToGallery("Timeout error. " + error);
    return 0;
  }
}

async function loadImages(numberOfImages = 10) {
  let images = await getImages(numberOfImages);
  if (images == 0) {
    console.log("Error: images is 0");
  } //If we get 0 as return something went wrong.

  //Display the images
  for (let i = 0; i < images.length; i++) {
    const image_url = formatImageUrl(images[i]);
    appendImageToGallery(image_url);
  }
}

function appendImageToGallery(image_url) {
  const img = document.createElement("img");
  img.src = image_url;
  img.className = "gallery-image";
  img.alt="Nature image from Flickr"
  gallery.append(img);
}

function appendErrorTextToGallery(errorMessage) {
  const errorDiv = document.createElement("div");
  const errorText = document.createTextNode(
    "Something went wrong when trying to access the api\n" +
      "Error message: " +
      errorMessage
  );
  errorDiv.style.color = "red";
  errorDiv.style.fontSize = "2rem";
  errorDiv.style.textAlign = "center";
  errorDiv.appendChild(errorText);
  gallery.append(errorDiv);
}
/* Global functions below*/

/* Infinite scroll, check if the user has scrolled to the bottom of the page, if so call loadImages. */
window.addEventListener("scroll", () => {
  if (
    window.scrollY + window.innerHeight >=
    document.documentElement.scrollHeight
  ) {
    setTimeout(() => {
      loadImages(20);
    }, 5000); /* If the user scroll very fast it will result in a timeout error */
  }
});

/* Load images when user loads the page */
window.onload = loadImages(50);

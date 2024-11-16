const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function downloadImage(image) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img); 
    img.onerror = () => reject(`Failed to load image's URL: ${image.url}`); 
    img.src = image.url; 
  });
}

function downloadAndDisplayImages() {
  output.innerHTML = '';

  const downloadPromises = images.map((image) => downloadImage(image));

  Promise.all(downloadPromises)
    .then((loadedImages) => {
      loadedImages.forEach((img) => {
        output.appendChild(img);
      });
    })
    .catch((error) => {
      const errorMessage = document.createElement("p");
      errorMessage.textContent = error;
      output.appendChild(errorMessage);
    });
}

btn.addEventListener("click", downloadAndDisplayImages);

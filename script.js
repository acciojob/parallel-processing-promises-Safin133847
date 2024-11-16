//your JS code here. If required.
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
    img.onload = () => resolve(img); // Image loaded successfully
    img.onerror = () => reject(`Failed to load image's URL: ${image.url}`); // Image failed to load
    img.src = image.url; // Start loading the image
  });
}

// Function to handle image downloading process
function downloadAndDisplayImages() {
  const outputDiv = document.getElementById('output');
  outputDiv.innerHTML = ''; // Clear the output div before showing new images

  // Map the image URLs into an array of Promises
  const downloadPromises = imageUrls.map((image) => downloadImage(image));

  // Use Promise.all to wait for all images to be downloaded
  Promise.all(downloadPromises)
    .then((images) => {
      // For each downloaded image, append it to the output div
      images.forEach((img) => {
        outputDiv.appendChild(img); // Append the image element to the output div
      });
    })
    .catch((error) => {
      // If any image fails to load, show an error message
      const errorMessage = document.createElement('p');
      errorMessage.textContent = error;
      outputDiv.appendChild(errorMessage);
    });
}

// Add event listener to the button to start the download process
document.getElementById('download-images-button').addEventListener('click', downloadAndDisplayImages);

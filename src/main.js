// Activate strict mode
("use strict");

// imported style
import "./style.css";

// Selecting Elements
const menuIcon = document.querySelector(".menu-icon");
const closeMenuIcon = document.querySelector(".close-menu-icon");
const links = document.querySelector(".links");
const cartCounter = document.querySelector(".cart");
const previousIcons = document.querySelectorAll(".previous-icon");
const nextIcons = document.querySelectorAll(".next-icon");
const mainImage = document.querySelector(".main-image");
const thumbnailImages = document.querySelectorAll(".small-images");
const basketFilledInfo = document.querySelector(".basket-filled-info");
const basketEmptyInfo = document.querySelector(".basket-empty-info");
const plusIcon = document.querySelector(".plus-icon");
const inputField = document.querySelector(".input");
const minusIcon = document.querySelector(".minus-icon");
const overlay = document.querySelector(".overlay");
const lightbox = document.querySelector(".lightbox");
const closeLightBox = document.querySelector(".close-lightbox-icon");
const lightBoxImages = document.querySelectorAll(".lightbox-images");
const lightBoxMainImage = document.querySelector(".lightbox-main-image");
const cartButton = document.querySelector(".cart-button");
let finalPrice = document.querySelector(".final-price");
let itemQuantity = document.querySelector(".item-quantity");
let basePrice = document.querySelector(".base-price");
const deleteIcon = document.querySelector(".delete-icon");

// state variables
let currentIndex = 0;
let inputValue = 0;

// loading the main image when page loads
mainImage.src = thumbnailImages[currentIndex].src;
lightBoxMainImage.src = lightBoxImages[currentIndex].src;

// Function: To open links on small screen
const openLinks = () => {
  links.classList.add("block");
  overlay.classList.add("block");
};

// Function: To close links on small screen
const closeLinks = () => {
  links.classList.remove("block");
  overlay.classList.remove("block");
};

// Function: To close lightbox container on the large screen
const closeLightContainer = () => {
  lightbox.classList.remove("active");
  overlay.classList.remove("block");
};

// Function: To update cart quantity
const updateCartQuantity = (change) => {
  inputValue = parseInt(inputField.value);

  if (isNaN(inputValue) || inputValue < 0) {
    inputValue = 0;
  }

  inputValue += change;

  if (inputValue < 0) {
    inputValue = 0;
  }
  inputField.value = inputValue;
};

// Function: To update cart items, inputField value and item price and item quantity
const updateCartIcon = () => {
  let newInput = parseInt(inputField.value);

  if (isNaN(newInput) || newInput < 0) {
    newInput = 0;
  }

  cartCounter.dataset.cartCounter = newInput;
  itemQuantity.textContent = newInput;

  const price =
    parseInt(itemQuantity.textContent) * parseInt(basePrice.textContent);

  finalPrice.textContent = `$${price.toFixed(2)}`;

  // show cart value if cart >= 1 else hide
  newInput >= 1
    ? cartCounter.classList.add("active")
    : cartCounter.classList.remove("active");

  if (basketFilledInfo.classList.contains("block") && newInput < 1) {
    basketFilledInfo.classList.remove("block");
    basketEmptyInfo.classList.add("block");
  } else {
    showBasketFilled();
  }
};

// Function: To show basket filled
const showBasketFilled = () => {
  basketEmptyInfo.classList.remove("block");
  basketFilledInfo.classList.toggle("block");
};

// Function: To show basket  empty
const showBasketEmpty = () => {
  basketEmptyInfo.classList.toggle("block");
  basketFilledInfo.classList.remove("block");
};

// Open links on small screen
menuIcon.addEventListener("click", openLinks);

// close links on small screen when the close button is clicked
closeMenuIcon.addEventListener("click", closeLinks);

//close links when clicked on the overlay between small screen and also large screen
overlay.addEventListener("click", () => {
  if (isMobile()) {
    closeLinks();
  } else {
    closeLinks();
    lightbox.classList.remove("active");
  }
});

// close links when Escape key is pressed
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && links.classList.contains("block")) {
    closeLinks();
  }
});

// Function: To change interactivity based on the screen size
const isMobile = () => {
  return window.innerWidth <= 920;
};

// Looping through the previousIcons
previousIcons.forEach((previousIcon) => [
  previousIcon.addEventListener("click", () => {
    // remove image outline from all thumbnailImages
    thumbnailImages.forEach((t) => {
      t.classList.remove("image-outline");
    });

    // remove image outline from all lightBoxImages
    lightBoxImages.forEach((l) => {
      l.classList.remove("image-outline");
    });

    //substract 1 from currentIndex and add thumbnails.length modulo by thumbnail.length to make it loop back to the previous index
    currentIndex =
      (currentIndex - 1 + thumbnailImages.length) % thumbnailImages.length;

    //switch mainImage with the thumbnailImages based on the currentIndex
    mainImage.src = thumbnailImages[currentIndex].src;

    // add image outline to the selected image on the thumbnailImages
    thumbnailImages[currentIndex].classList.add("image-outline");

    //switch lightBoxMainImage with the lightBoxImages based on the currentIndex
    lightBoxMainImage.src = thumbnailImages[currentIndex].src;

    // add image outline to the selected image on the lightBoxImages
    lightBoxImages[currentIndex].classList.add("image-outline");
  }),
]);

// on the click of the next icon
nextIcons.forEach((nextIcon) => [
  nextIcon.addEventListener("click", () => {
    // remove image outline from all thumbnailImages
    thumbnailImages.forEach((t) => {
      t.classList.remove("image-outline");
    });

    // remove image outline from all lightBoxlImages
    lightBoxImages.forEach((l) => {
      l.classList.remove("image-outline");
    });

    // add 1 to the currrent index  modulo by thumbnial.length;
    currentIndex = (currentIndex + 1) % thumbnailImages.length;

    // switch mainImage with the current thumbnialImages
    mainImage.src = thumbnailImages[currentIndex].src;
    // add image outline to the selected image from the thumbnailImages
    thumbnailImages[currentIndex].classList.add("image-outline");

    // switch lightBoxMain based on the currrent lightbox image
    lightBoxMainImage.src = lightBoxImages[currentIndex].src;

    // add image outline on the lightbox image selected
    lightBoxImages[currentIndex].classList.add("image-outline");
  }),
]);

// when clicked on the mainImage
mainImage.addEventListener("click", () => {
  // On the large screen
  if (!isMobile()) {
    // show lightbox container
    lightbox.classList.add("active");

    // show overlay
    overlay.classList.add("block");

    // looping through all lightBoxImages on the large screen
    lightBoxImages.forEach((lightboxImage, index) => {
      // On the click of the lightboImage
      lightboxImage.addEventListener("click", () => {
        // remove image outline from all thumbnailImages
        thumbnailImages.forEach((t) => {
          t.classList.remove("image-outline");
        });

        // remove image outline from all lightboxImages
        lightBoxImages.forEach((l) => {
          l.classList.remove("image-outline");
        });

        // reassign currentIndex to the index
        currentIndex = index;

        // switch the lightboxMainImage with the lightBoxImages based on the currentIndex
        lightBoxMainImage.src = lightBoxImages[index].src;

        // switch the mainImage with the thumbnailImages based on the currentIndex
        mainImage.src = thumbnailImages[index].src;

        thumbnailImages[index].classList.add("image-outline");

        // add image outline on the lightbox image selected
        lightboxImage.classList.add("image-outline");
      });
    });
  }
});

// Looping through thumbnailsImages
thumbnailImages.forEach((thumb, index) => {
  // on the click on thumb
  thumb.addEventListener("click", () => {
    //remove image outline from all the thumbnailImages
    thumbnailImages.forEach((t) => {
      t.classList.remove("image-outline");
    });

    // reassign currentIndex to index
    // currentIndex = index;

    // switch mainImage with the thumbnailImages based on the index
    mainImage.src = thumbnailImages[index].src;

    // add image outline to the selected image.
    thumb.classList.add("image-outline");
  });
});

// when clicked on the minusIcon
minusIcon.addEventListener("click", () => {
  updateCartQuantity(-1);
});

// when clicked on the plusIcon
plusIcon.addEventListener("click", () => {
  updateCartQuantity(1);
});

// close lightbox container
closeLightBox.addEventListener("click", closeLightContainer);

// add eventListener to the cartButton
cartButton.addEventListener("click", updateCartIcon);

// show basketFilledInfo if inputField.value >=1 else show emptyBasketInfo
cartCounter.addEventListener("click", () => {
  let newInput = parseInt(inputField.value);

  if (newInput < 1) {
    showBasketEmpty();
  } else {
    showBasketFilled();
  }
});

// Ad eventListener to the delete icon to delete items
deleteIcon.addEventListener("click", () => {
  showBasketEmpty();
  cartCounter.classList.remove("active");
  inputField.value = 0;
});

// To show content based on different screen sizes
window.addEventListener("resize", () => {
  if (isMobile()) {
    lightbox.classList.remove("active");
    overlay.classList.remove("block");
    links.classList.remove("block");
  } else {
    lightbox.classList.remove("active");
    overlay.classList.remove("block");
  }
});

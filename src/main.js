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
let currrentImageIndex = 0;
let inputValue = 0;
const productImages = [
  "/images/image-product-1.jpg",
  "/images/image-product-2.jpg",
  "/images/image-product-3.jpg",
  "/images/image-product-4.jpg",
];

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

// Function: To update current image
const updateCurrentImage = function (index, isLight = false) {
  currrentImageIndex = index;

  const imagePath = productImages[index];
  mainImage.src = imagePath;
  lightBoxMainImage.src = imagePath;

  const thumbs = isLight ? lightBoxImages : thumbnailImages;

  // Product gallery images
  thumbs.forEach((thumb, i) => {
    if (index === i) {
      thumb.classList.add("image-outline");
    } else {
      thumb.classList.remove("image-outline");
    }
  });

  // Lightbox gallery Images
  if (!isLight) {
    lightBoxImages.forEach((thumb, i) => {
      if (index === i) {
        thumb.classList.add("image-outline");
      } else {
        thumb.classList.remove("image-outline");
      }
    });
  }
};

// Function: To navigate image based on the direction
const navigateImage = (direction) => {
  let newIndex = currrentImageIndex + direction;

  if (newIndex < 0) {
    newIndex = productImages.length - 1;
  } else if (newIndex >= productImages.length) {
    newIndex = 0;
  }

  updateCurrentImage(newIndex);
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
  const newInput = parseInt(inputField.value);

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
  if (window.innerWidth <= 920) {
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

//Adding eventListener next icons
nextIcons.forEach((nextIcon) => {
  nextIcon.addEventListener("click", () => {
    navigateImage(1);
  });
});

//Adding eventListener previous icons
previousIcons.forEach((previousIcon) => {
  previousIcon.addEventListener("click", () => {
    navigateImage(-1);
  });
});

// when mainImage is clicked on large screen
mainImage.addEventListener("click", () => {
  if (window.innerWidth >= 920) {
    lightbox.classList.add("active");
    overlay.classList.add("block");
  } else {
    lightbox.classList.remove("active");
    overlay.classList.remove("block");
  }
});

// when the images are clicked on the large screen
thumbnailImages.forEach((thumb, index) => {
  thumb.addEventListener("click", () => {
    updateCurrentImage(index);
  });
});

// when the images are clicked on when lightbox is set to true
lightBoxImages.forEach((thumb, index) => {
  thumb.addEventListener("click", () => {
    updateCurrentImage(index, true);
  });
});

// close lightbox container
closeLightBox.addEventListener("click", closeLightContainer);

// Adding EventListener to the plusIcon
plusIcon.addEventListener("click", () => {
  updateCartQuantity(1);
});

// Adding EventListener to the minusIcon
minusIcon.addEventListener("click", () => {
  updateCartQuantity(-1);
});

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
  if (window.innerWidth < 920) {
    lightbox.classList.remove("active");
    overlay.classList.remove("block");
    links.classList.remove("block");
  } else {
    lightbox.classList.remove("active");
    overlay.classList.remove("block");
  }
});

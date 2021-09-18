var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';

var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var TINY_EFFECT_CLASS = 'is-tiny';
var ESC_KEY = 27;


function setDetails(imageUrl, titleText) {
    'use strict';

    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    detailImage.setAttribute('src', imageUrl);

    var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.textContent = titleText;
}

function imageFromThumb(thumb) {
    'use strict';
    return thumb.getAttribute('data-image-url');
}

function titleFromThumb(thumb) {
    'use strict';
    return thumb.getAttribute('data-image-title');
}

function setDetailsFromThumb(thumb) {
    setDetails(imageFromThumb(thumb), titleFromThumb(thumb));
}

function addThumbClickHandler(thumb) {
    'use strict';
    thumb.addEventListener('click', function (event) {
        event.preventDefault();
        console.log('clicked');
        setDetailsFromThumb(thumb);
        showDetails();
    });
}

function getThumbnailsArray() {
    'use strict';
    var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    var thumbnailArray = [].slice.call(thumbnails);
    return thumbnailArray;
}

function hideDetails() {
    'use strict';
    document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function showDetails() {
    'use strict';

    var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
    document.body.classList.remove(HIDDEN_DETAIL_CLASS);
    frame.classList.add(TINY_EFFECT_CLASS);
    setTimeout(function () {
        frame.classList.remove(TINY_EFFECT_CLASS);
    }, 50);
}

function addKeyPressHandler() {
    'use strict';
    document.body.addEventListener('keyup', function (event) {
        event.preventDefault();
        console.log(event.keyCode);
        if (event.keyCode === ESC_KEY) {
            hideDetails();
        }
    });
}

function previousButtonHandler() {
    var thumbnails = getThumbnailsArray();              // array of objects
    var thumbnailImages = getThumbnailsArray();
    for (var i = 0; i < thumbnails.length; i++) {
        thumbnailImages[i] = thumbnailImages[i].href;   // array of image URLs
    }

    // array index of current detail image
    var index = thumbnailImages.indexOf(document.getElementById("detail").src);
    if (index == 0) {
        index = thumbnailImages.length - 1;
    } else {
        index -= 1;
    }

    // set the detail image to the previous otter
    setDetailsFromThumb(thumbnails[index]);
}

function nextButtonHandler() {
    var thumbnails = getThumbnailsArray();              // array of objects
    var thumbnailImages = getThumbnailsArray();
    for (var i = 0; i < thumbnails.length; i++) {
        thumbnailImages[i] = thumbnailImages[i].href;   // array of image URLs
    }

    // array index of current detail image
    var index = thumbnailImages.indexOf(document.getElementById("detail").src);
    if (index == thumbnailImages.length - 1) {
        index = 0;
    } else {
        index += 1;
    }
    
    // set the detail image to the next otter
    setDetailsFromThumb(thumbnails[index]);
}

function initializeEvents() {
    'use strict';

    var thumbnails = getThumbnailsArray();
    thumbnails.forEach(addThumbClickHandler);
    addKeyPressHandler();

    // Previous otter button
    document.getElementById("previous").addEventListener("click", function (event) {
        event.preventDefault();
        previousButtonHandler();
    });

    // Next otter button
    document.getElementById("next").addEventListener("click", function (event) {
        event.preventDefault();
        nextButtonHandler();
    });
}

initializeEvents();
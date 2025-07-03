const imageCount = 9;
let current = 1;
let showingFirst = true;
const image1 = document.getElementById('slide-image1');
const image2 = document.getElementById('slide-image2');

// Ensure initial state
image1.style.opacity = 1;
image2.style.opacity = 0;
image1.src = `assets/${current}.jpg`;
image2.src = `assets/${(current % imageCount) + 1}.jpg`;

let isTransitioning = false;

function showNext() {
    if (isTransitioning) return;
    isTransitioning = true;
    const next = (current % imageCount) + 1;
    if (showingFirst) {
        image2.src = `assets/${next}.jpg`;
        image2.style.transition = 'opacity 1s linear';
        image2.style.opacity = 1;
        setTimeout(() => {
            image1.style.opacity = 0;
            current = next;
            showingFirst = false;
            setTimeout(() => { isTransitioning = false; }, 1000);
        }, 1000);
    } else {
        image1.src = `assets/${next}.jpg`;
        image1.style.transition = 'opacity 1s linear';
        image1.style.opacity = 1;
        setTimeout(() => {
            image2.style.opacity = 0;
            current = next;
            showingFirst = true;
            setTimeout(() => { isTransitioning = false; }, 1000);
        }, 1000);
    }
}

image1.addEventListener('click', showNext);
image2.addEventListener('click', showNext);



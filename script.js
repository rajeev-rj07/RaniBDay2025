const imageCount = 9;
let current = 1;
let showingFirst = true;
const image1 = document.getElementById('slide-image1');
const image2 = document.getElementById('slide-image2');
const birthdayMessage = document.getElementById('birthday-message');
const messageSpans = document.querySelectorAll('#birthday-message span');
const backgroundMusic = document.getElementById('background-music');

// Initialize background music
function initializeMusic() {
    if (backgroundMusic) {
        // Set volume to 0.5 (50%)
        backgroundMusic.volume = 0.5;
        
        // Handle errors
        backgroundMusic.onerror = () => {
            console.error('Error loading background music');
        };
        
        // Start playing when the page loads
        backgroundMusic.play();
    }
}

// Call the initialization function
initializeMusic();

// Ensure initial state
image1.style.opacity = 1;
image2.style.opacity = 0;
image1.src = `assets/${current}.jpg`;
image2.src = `assets/${(current % imageCount) + 1}.jpg`;

let isTransitioning = false;

function showNext() {
    if (isTransitioning) return;
    
    // If we're on the last image, show the birthday message
    if (current === imageCount) {
        showBirthdayMessage();
        return;
    }
    
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
            isTransitioning = false;
        }, 1000);
    } else {
        image1.src = `assets/${next}.jpg`;
        image1.style.transition = 'opacity 1s linear';
        image1.style.opacity = 1;
        setTimeout(() => {
            image2.style.opacity = 0;
            current = next;
            showingFirst = true;
            isTransitioning = false;
        }, 1000);
    }
}

function createBalloon() {
    const balloon = document.createElement('div');
    balloon.className = 'balloon';
    
    // Random horizontal position
    const posX = Math.random() * window.innerWidth;
    // Random size between 40px and 80px
    const size = 40 + Math.random() * 40;
    // Random animation duration between 10s and 20s
    const duration = 10 + Math.random() * 10;
    // Random delay up to 5s
    const delay = Math.random() * 5000;
    
    balloon.style.left = `${posX}px`;
    balloon.style.width = `${size}px`;
    balloon.style.height = `${size * 1.3}px`;
    balloon.style.animationDuration = `${duration}s`;
    balloon.style.animationDelay = `${delay}ms`;
    
    // Random rotation
    const rotation = (Math.random() - 0.5) * 20;
    balloon.style.transform = `rotate(${rotation}deg)`;
    
    document.getElementById('balloons-container').appendChild(balloon);
    
    // Remove balloon after animation completes
    setTimeout(() => {
        balloon.remove();
    }, (duration * 1000) + delay);
}

function createCinnamonRoll() {
    const roll = document.createElement('img');
    roll.className = 'cinnamon-roll';
    roll.src = 'assets/cinnamon_roll_in_box.png';
    
    // Random horizontal position
    const posX = Math.random() * window.innerWidth;
    // Random delay up to 3s
    const delay = Math.random() * 3000;
    
    roll.style.left = `${posX}px`;
    roll.style.animationDelay = `${delay}ms`;
    
    document.getElementById('balloons-container').appendChild(roll);
    
    // Remove roll after animation completes
    setTimeout(() => {
        roll.remove();
    }, 8000 + delay);
}

function startBalloons() {
    // Create initial batch of balloons
    for (let i = 0; i < 20; i++) {
        setTimeout(createBalloon, i * 300);
    }
    
    // Create initial batch of cinnamon rolls (fewer than balloons)
    for (let i = 0; i < 5; i++) {
        setTimeout(createCinnamonRoll, i * 1000);
    }
    
    // Keep creating balloons periodically
    const balloonInterval = setInterval(() => {
        createBalloon();
    }, 1500);
    
    // Create cinnamon rolls less frequently
    const rollInterval = setInterval(() => {
        createCinnamonRoll();
    }, 5000);
    
    return [balloonInterval, rollInterval];
}

function showBirthdayMessage() {
    // Hide the slideshow
    document.querySelector('.slideshow-container').style.display = 'none';
    
    // Make sure the message container is visible
    const birthdayMessage = document.getElementById('birthday-message');
    birthdayMessage.style.display = 'flex';
    birthdayMessage.style.opacity = '1';
    birthdayMessage.style.visibility = 'visible';
    
    // Force reflow
    void birthdayMessage.offsetWidth;
    
    // Make the message container visible
    birthdayMessage.classList.add('visible');
    
    // Start the balloon animation
    const balloonInterval = startBalloons();
    
    // Get all elements to animate
    const heartContainer = document.querySelector('.heart-container');
    const heartEmoji = document.querySelector('.heart-container .heart-emoji');
    const messageLines = document.querySelectorAll('.message-line');
    
    // Function to animate elements in a line
    function animateLine(line, lineIndex, totalLines) {
        const elements = line.querySelectorAll('span, .inline-heart');
        const isLastLine = lineIndex === totalLines - 1;
        
        elements.forEach((element, elementIndex) => {
            const isLastElement = elementIndex === elements.length - 1;
            const isLastInAll = isLastLine && isLastElement;
            
            setTimeout(() => {
                // Apply the animation
                element.style.animation = `letterRise 0.6s ease-out forwards`;
                
                // Add a slight bounce effect
                setTimeout(() => {
                    element.style.transform = 'translateY(-10px)';
                    setTimeout(() => {
                        element.style.transform = 'translateY(0)';
                        element.style.transition = 'transform 0.2s ease-out';
                        
                        // If this is the very last element, show the heart container
                        if (isLastInAll) {
                            // Show the heart container with fade-in
                            heartContainer.classList.add('heart-visible');
                            
                            // Start the pulse animation after a short delay
                            setTimeout(() => {
                                heartEmoji.classList.add('heart-pulse');
                            }, 50);
                        }
                    }, 100);
                }, 500);
            }, (lineIndex * 200) + (elementIndex * 100));
        });
    }
    
    // Animate each line with a slight delay between lines
    messageLines.forEach((line, index) => {
        setTimeout(() => {
            animateLine(line, index, messageLines.length);
        }, index * 300);
    });
}

// Initial event listeners
image1.addEventListener('click', showNext);
image2.addEventListener('click', showNext);



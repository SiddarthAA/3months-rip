// Configuration - Photos from the photos folder
const slides = [
    {
        type: 'photo',
        src: 'photos/1.png',
        caption: ''
    },
    {
        type: 'photo',
        src: 'photos/2.png',
        caption: ''
    },
    {
        type: 'photo',
        src: 'photos/3.png',
        caption: ''
    },
    {
        type: 'photo',
        src: 'photos/4.png',
        caption: ''
    },
    {
        type: 'photo',
        src: 'photos/5.png',
        caption: ''
    },
    {
        type: 'photo',
        src: 'photos/6.png',
        caption: ''
    },
    {
        type: 'photo',
        src: 'photos/7.png',
        caption: ''
    },
    {
        type: 'photo',
        src: 'photos/8.png',
        caption: ''
    },
    {
        type: 'photo',
        src: 'photos/9.png',
        caption: ''
    }
];

// Timing configuration
const LANDING_DURATION = 10000; // Landing page shows for 10 seconds
const SLIDESHOW_START_TIME = 10; // Slideshow starts at 10 seconds
const SLIDESHOW_END_TIME = 121; // Slideshow ends at 2:01 (121 seconds)
const VIDEO_START_TIME = 122; // Start video at 2:02 (122 seconds)
const MUSIC_STOP_TIME = 142; // Stop music at 2:22 (142 seconds)
const SLIDESHOW_DURATION = (SLIDESHOW_END_TIME - SLIDESHOW_START_TIME) * 1000; // 111 seconds for slideshow
const TOTAL_SLIDES = slides.length;

// Calculate slide duration to fit within slideshow duration (10s to 2:01)
const calculatedSlideDuration = Math.floor(SLIDESHOW_DURATION / TOTAL_SLIDES);

// State
let currentSlideIndex = 0;
let slideInterval = null;
let musicStartTime = 0;

// DOM Elements
const landingPage = document.getElementById('landingPage');
const slideshowPage = document.getElementById('slideshowPage');
const videoPage = document.getElementById('videoPage');
const finalPhotoPage = document.getElementById('finalPhotoPage');
const slideContainer = document.getElementById('slideContainer');
const backgroundMusic = document.getElementById('backgroundMusic');
const finalVideo = document.getElementById('finalVideo');
const progressBar = document.getElementById('progressBar');
const currentSlideEl = document.getElementById('currentSlide');
const totalSlidesEl = document.getElementById('totalSlides');
const heartsContainer = document.getElementById('heartsContainer');

// Initialize
function init() {
    totalSlidesEl.textContent = TOTAL_SLIDES;
    generateSlides();
    createFloatingHearts();

    // Music event listeners
    backgroundMusic.addEventListener('ended', onMusicEnded);
    backgroundMusic.addEventListener('timeupdate', updateProgress);
    backgroundMusic.addEventListener('timeupdate', checkMusicStopTime);
    backgroundMusic.addEventListener('timeupdate', checkVideoStartTime);
    backgroundMusic.addEventListener('timeupdate', checkSlideshowStart);

    // Video event listener
    finalVideo.addEventListener('ended', onVideoEnded);

    // Reset audio to beginning and start playing
    backgroundMusic.currentTime = 0;
    backgroundMusic.play().catch(err => {
        console.log('Audio autoplay prevented:', err);
        // Note: Some browsers block autoplay. User may need to interact with page first.
    });
}

// Generate slide HTML
function generateSlides() {
    slideContainer.innerHTML = '';

    slides.forEach((slide, index) => {
        const slideDiv = document.createElement('div');
        slideDiv.className = 'slide';
        slideDiv.id = `slide-${index}`;

        if (slide.type === 'photo') {
            slideDiv.classList.add('photo-slide');
            slideDiv.innerHTML = `
        <div class="photo-frame">
          <img src="${slide.src}" alt="${slide.caption}" onerror="this.src='https://via.placeholder.com/600x400/ec4899/ffffff?text=Add+Your+Photo'">
          <p class="photo-caption">${slide.caption}</p>
        </div>
      `;
        } else if (slide.type === 'text') {
            slideDiv.classList.add('text-slide');
            slideDiv.innerHTML = `
        <div class="text-content">
          <h2>${slide.title}</h2>
          <p>${slide.content}</p>
        </div>
      `;
        }

        slideContainer.appendChild(slideDiv);
    });
}

// Start the experience
function startExperience() {
    // Fade out landing page
    landingPage.classList.add('fade-out');

    setTimeout(() => {
        landingPage.classList.add('hidden');
        slideshowPage.classList.add('active');

        // musicStartTime = Date.now(); // Music starts on page load, so this is not needed here

        // Show first slide
        showSlide(0);

        // Start automatic slideshow
        startSlideshow();
    }, 500);
}

// Show specific slide
function showSlide(index) {
    // Hide all slides
    const allSlides = document.querySelectorAll('.slide');

    allSlides.forEach(slide => {
        slide.classList.remove('active');
    });

    // Show current slide
    if (allSlides[index]) {
        allSlides[index].classList.add('active');
        currentSlideIndex = index;
        currentSlideEl.textContent = index + 1;
    }
}

// Start automatic slideshow
function startSlideshow() {
    // Clear any existing interval
    if (slideInterval) {
        clearInterval(slideInterval);
    }

    slideInterval = setInterval(() => {
        const nextIndex = currentSlideIndex + 1;

        if (nextIndex < TOTAL_SLIDES) {
            showSlide(nextIndex);
        } else {
            // Stop at last slide, don't loop
            clearInterval(slideInterval);
        }
    }, calculatedSlideDuration);
}

// Update progress bar based on music time
function updateProgress() {
    const currentTime = backgroundMusic.currentTime;
    const duration = backgroundMusic.duration;

    if (duration > 0) {
        const progress = (currentTime / duration) * 100;
        progressBar.style.width = `${progress}%`;
    }
}

// Check if slideshow should start at 10 seconds
function checkSlideshowStart() {
    const currentTime = backgroundMusic.currentTime;

    // Start slideshow at exactly 10 seconds
    if (currentTime >= SLIDESHOW_START_TIME && !slideshowPage.classList.contains('active')) {
        startExperience();
    }
}

// Check if music should stop at 2:22
function checkMusicStopTime() {
    if (backgroundMusic.currentTime >= MUSIC_STOP_TIME) {
        backgroundMusic.pause();
        backgroundMusic.currentTime = MUSIC_STOP_TIME; // Keep it at exactly 2:22
    }
}

// Check if video should start at 2:02
function checkVideoStartTime() {
    const currentTime = backgroundMusic.currentTime;

    // Start video at exactly 2:02 (122 seconds)
    if (currentTime >= VIDEO_START_TIME && !videoPage.classList.contains('active')) {
        // Stop the slideshow
        if (slideInterval) {
            clearInterval(slideInterval);
        }

        // Transition to video page while music continues
        slideshowPage.classList.remove('active');
        slideshowPage.classList.add('hidden');
        videoPage.classList.add('active');

        // Play the video
        finalVideo.play().catch(err => {
            console.log('Video autoplay prevented:', err);
        });
    }
}

// Handle music end
function onMusicEnded() {
    if (slideInterval) {
        clearInterval(slideInterval);
    }
    // Music has ended at 2:22, video should already be playing
}

// Handle video end
function onVideoEnded() {
    // Video has ended - show final photo until audio ends at 2:22
    videoPage.classList.remove('active');
    videoPage.classList.add('hidden');
    finalPhotoPage.classList.add('active');
}

// Create floating hearts animation
function createFloatingHearts() {
    const heartSymbols = ['❤️', '💕', '💖', '💗', '💝'];

    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 2 + 's';
        heart.style.animationDuration = (Math.random() * 4 + 6) + 's';

        heartsContainer.appendChild(heart);

        // Remove heart after animation
        setTimeout(() => {
            heart.remove();
        }, 10000);
    }, 800);
}

// Keyboard navigation (optional)
document.addEventListener('keydown', (e) => {
    if (!slideshowPage.classList.contains('active')) return;

    if (e.key === 'ArrowRight') {
        const nextIndex = (currentSlideIndex + 1) % TOTAL_SLIDES;
        showSlide(nextIndex);
    } else if (e.key === 'ArrowLeft') {
        const prevIndex = (currentSlideIndex - 1 + TOTAL_SLIDES) % TOTAL_SLIDES;
        showSlide(prevIndex);
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', init);

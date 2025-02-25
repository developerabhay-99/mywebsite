let highestZ = 1;

class Paper {
  constructor(paper) {
    this.paper = paper;
    this.isDragging = false;
    this.startX = 0;
    this.startY = 0;
    this.currentX = 0;
    this.currentY = 0;
    this.rotation = Math.random() * 30 - 15;

    this.init();
  }

  init() {
    // Mouse events (Desktop)
    this.paper.addEventListener("mousedown", (e) => this.startDrag(e));
    document.addEventListener("mousemove", (e) => this.drag(e));
    document.addEventListener("mouseup", () => this.stopDrag());

    // Touch events (Mobile)
    this.paper.addEventListener("touchstart", (e) => this.startDragTouch(e), { passive: false });
    this.paper.addEventListener("touchmove", (e) => this.dragTouch(e), { passive: false });
    this.paper.addEventListener("touchend", () => this.stopDrag());
    
    // Apply initial random rotation
    this.paper.style.transform = `translate(0px, 0px) rotate(${this.rotation}deg)`;
  }

  startDrag(e) {
    e.preventDefault(); // Prevent unwanted selection
    this.isDragging = true;
    this.startX = e.clientX - this.currentX;
    this.startY = e.clientY - this.currentY;
    this.paper.style.zIndex = highestZ++; // Bring to front
  }

  drag(e) {
    if (!this.isDragging) return;
    e.preventDefault(); // Stop scrolling while dragging

    this.currentX = e.clientX - this.startX;
    this.currentY = e.clientY - this.startY;

    this.paper.style.transform = `translate(${this.currentX}px, ${this.currentY}px) rotate(${this.rotation}deg)`;
  }

  startDragTouch(e) {
    e.preventDefault(); // Prevent scrolling
    let touch = e.touches[0]; // Get first touch point
    this.isDragging = true;
    this.startX = touch.clientX - this.currentX;
    this.startY = touch.clientY - this.currentY;
    this.paper.style.zIndex = highestZ++;
  }

  dragTouch(e) {
    if (!this.isDragging) return;
    e.preventDefault(); // Stop page scrolling

    let touch = e.touches[0]; // Get touch position
    this.currentX = touch.clientX - this.startX;
    this.currentY = touch.clientY - this.startY;

    this.paper.style.transform = `translate(${this.currentX}px, ${this.currentY}px) rotate(${this.rotation}deg)`;
  }

  stopDrag() {
    this.isDragging = false;
  }
}
const audio = document.getElementById("audio-player");
const playPauseBtn = document.getElementById("play-pause");
const seekBar = document.getElementById("seek-bar");
const volumeBar = document.getElementById("volume-bar");
const songTitle = document.querySelector(".song-title");

playPauseBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playPauseBtn.textContent = "⏸️";
  } else {
    audio.pause();
    playPauseBtn.textContent = "▶️";
  }
});

audio.addEventListener("timeupdate", () => {
  seekBar.value = (audio.currentTime / audio.duration) * 100;
});

seekBar.addEventListener("input", () => {
  audio.currentTime = (seekBar.value / 100) * audio.duration;
});

volumeBar.addEventListener("input", () => {
  audio.volume = volumeBar.value;
});

// Ensure "Now Playing" is always visible but not interfering
songTitle.textContent = "🎵 Now Playing: Your Song";

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
    // Mouse Events (Desktop)
    this.paper.addEventListener("mousedown", (e) => this.startDrag(e));
    document.addEventListener("mousemove", (e) => this.drag(e));
    document.addEventListener("mouseup", () => this.stopDrag());

    // Touch Events (Mobile)
    this.paper.addEventListener("touchstart", (e) => this.startDrag(e.touches[0]), { passive: false });
    document.addEventListener("touchmove", (e) => this.drag(e.touches[0]), { passive: false });
    document.addEventListener("touchend", () => this.stopDrag());

    // Ensure the paper has a default transformation
    this.paper.style.transform = `translate(0px, 0px) rotate(${this.rotation}deg)`;
  }

  startDrag(e) {
    e.preventDefault(); // Prevent unwanted scrolling
    this.isDragging = true;
    this.startX = e.clientX || e.pageX;
    this.startY = e.clientY || e.pageY;
    this.paper.style.zIndex = highestZ++;
  }

  drag(e) {
    if (!this.isDragging) return;
    e.preventDefault(); // Stop scrolling while dragging

    let moveX = (e.clientX || e.pageX) - this.startX;
    let moveY = (e.clientY || e.pageY) - this.startY;

    this.currentX += moveX;
    this.currentY += moveY;

    this.startX = e.clientX || e.pageX;
    this.startY = e.clientY || e.pageY;

    this.paper.style.transform = `translate(${this.currentX}px, ${this.currentY}px) rotate(${this.rotation}deg)`;
  }

  stopDrag() {
    this.isDragging = false;
  }
}

// Apply dragging to all paper elements
document.querySelectorAll(".paper").forEach((paper) => new Paper(paper));

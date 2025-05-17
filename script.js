document.addEventListener("DOMContentLoaded", () => {
  // Get all HTML files in the directory
  const slides = [
    "index.html",
    "slide2.html",
    "slide3.html",
    "slide4.html",
    "slide5.html",
    "slide6.html",
    "slide7.html",
    "slide8.html",
    "slide9.html",
    "slide10.html",
    "slide11.html",
    "slide12.html",
    "slide13.html",
    "slide13-2.html",
    "slide14.html",
    "slide15.html",
    "slide16.html",
    "slide17.html",
    "slide18.html",
    "slide19.html",
    "slide20.html"
  ]

  let currentSlideIndex = 0

  // Navigation buttons
  const prevBtn = document.getElementById("prev-btn")
  const nextBtn = document.getElementById("next-btn")
  const slideCounter = document.getElementById("slide-counter")
  const indicators = document.querySelectorAll(".indicator")

  // Update slide counter
  function updateSlideCounter() {
    slideCounter.textContent = `${currentSlideIndex + 1} / ${slides.length}`
  }

  // Update indicators
  function updateIndicators() {
    indicators.forEach((indicator, index) => {
      if (index === currentSlideIndex) {
        indicator.classList.add("active")
      } else {
        indicator.classList.remove("active")
      }
    })
  }

  // Navigate to previous slide
  function goToPrevSlide() {
    if (currentSlideIndex > 0) {
      currentSlideIndex--
      window.location.href = slides[currentSlideIndex]
    }
  }

  // Navigate to next slide
  function goToNextSlide() {
    if (currentSlideIndex < slides.length - 1) {
      currentSlideIndex++
      window.location.href = slides[currentSlideIndex]
    }
  }

  // Navigate to specific slide
  function goToSlide(index) {
    if (index >= 0 && index < slides.length) {
      currentSlideIndex = index
      window.location.href = slides[currentSlideIndex]
    }
  }

  // Set current slide index based on current URL
  function setCurrentSlideIndex() {
    const currentPath = window.location.pathname
    const currentFile = currentPath.substring(currentPath.lastIndexOf("/") + 1)

    const index = slides.indexOf(currentFile)
    if (index !== -1) {
      currentSlideIndex = index
    }

    updateSlideCounter()
    updateIndicators()
  }

  // Event listeners
  prevBtn.addEventListener("click", goToPrevSlide)
  nextBtn.addEventListener("click", goToNextSlide)

  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      goToSlide(index)
    })
  })

  // Keyboard navigation
  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      goToPrevSlide()
    } else if (event.key === "ArrowRight") {
      goToNextSlide()
    }
  })

  // Initialize
  setCurrentSlideIndex()

  // Add touch swipe functionality
  let touchStartX = 0
  let touchEndX = 0

  document.addEventListener(
    "touchstart",
    (event) => {
      touchStartX = event.changedTouches[0].screenX
    },
    false,
  )

  document.addEventListener(
    "touchend",
    (event) => {
      touchEndX = event.changedTouches[0].screenX
      handleSwipe()
    },
    false,
  )

  function handleSwipe() {
    const swipeThreshold = 50
    if (touchEndX < touchStartX - swipeThreshold) {
      // Swipe left
      goToNextSlide()
    } else if (touchEndX > touchStartX + swipeThreshold) {
      // Swipe right
      goToPrevSlide()
    }
  }

  // Add animation to list items
  const animatedLists = document.querySelectorAll(".animated-list")
  animatedLists.forEach((list) => {
    const listItems = list.querySelectorAll("li")
    listItems.forEach((item, index) => {
      item.style.animationDelay = `${0.1 * (index + 1)}s`
    })
  })
})

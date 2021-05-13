'use strict'
const hamburgerIcon = document.querySelector('.hamburger')
const nav = document.querySelector('.nav')
const overlay = document.querySelector('.overlay')

const btnLeft = document.querySelector('.fa-arrow-circle-left')
const btnRight = document.querySelector('.fa-arrow-circle-right')
const slider = document.querySelector('.community__slider')
const slides = document.querySelectorAll('.personal__card')
const dotsField = document.querySelector('.dots')

const footerList = document.querySelectorAll('.footer__list')
// MOBILE MENU
const actionWithMenu = function () {
  nav.classList.toggle('change')
  overlay.classList.toggle('hidden')
}
// EVENTS
hamburgerIcon.addEventListener('click', function () {
  actionWithMenu()
})
overlay.addEventListener('click', function () {
  actionWithMenu()
})
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && nav.classList.contains('change')) actionWithMenu()
})

// NAVIGATION SCROLL - NAV

document.querySelector('.nav__list').addEventListener('click', function (e) {
  e.preventDefault()
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href')
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' })
  }
})

// NAVIGATION SCROLL - FOOTER

document.querySelectorAll('.footer__list').forEach(function (f) {
  f.addEventListener('click', function (e) {
    e.preventDefault()
    if (e.target.classList.contains('footer__link')) {
      const id = e.target.getAttribute('href')
      document.querySelector(id).scrollIntoView({ behavior: 'smooth' })
    }
  })
})

//  SLIDES
let curSlide = 0
const maxSlide = slides.length

// FUNCTIONS
const creatDots = function () {
  slides.forEach(function (_, i) {
    dotsField.insertAdjacentHTML(
      'beforeend',
      `<button class="dot" data-slide="${i}"></button>`
    )
  })
}
const activeDot = function (slide) {
  document.querySelectorAll('.dot').forEach(function (dot) {
    dot.classList.remove('dot--active')
  })

  document
    .querySelector(`.dot[data-slide="${slide}"]`)
    .classList.add('dot--active')
}

const gotoSlide = function (slide) {
  slides.forEach(function (s, i) {
    s.style.transform = `translateX(${100 * (i - slide)}%)`
  })
}

const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0
  } else {
    curSlide++
  }
  gotoSlide(curSlide)
  activeDot(curSlide)
}

const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1
  } else {
    curSlide--
  }
  gotoSlide(curSlide)
  activeDot(curSlide)
}

const start = function () {
  gotoSlide(0)
  creatDots()
  activeDot(0)
}
start()

// EVENTS

btnRight.addEventListener('click', nextSlide)
btnLeft.addEventListener('click', prevSlide)

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowRight') nextSlide()
})
document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') prevSlide()
})

dotsField.addEventListener('click', function (e) {
  if (e.target.classList.contains('dot')) {
    const slide = e.target.dataset.slide
    gotoSlide(slide)
    activeDot(slide)
  }
})

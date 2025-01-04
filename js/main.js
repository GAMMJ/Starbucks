// HEADER

const searchEl = document.querySelector(".search")
const searchInputEl = searchEl.querySelector("input")

searchEl.addEventListener("click", function () {
  searchInputEl.focus()
})

searchInputEl.addEventListener("focus", function () {
  searchEl.classList.add("focused")
  searchInputEl.setAttribute("placeholder", "통합검색")
})

searchInputEl.addEventListener("blur", function () {
  searchEl.classList.remove("focused")
  searchInputEl.setAttribute("placeholder", "")
})

// BADGE
// throttle 사용 (lodash)
const badgeEl = document.querySelector("header .badges")
const toTopEl = document.querySelector("#to-top")

window.addEventListener(
  "scroll",
  _.throttle(function () {
    if (window.scrollY > 500) {
      // badge invisible
      // gsap.to(요소,지속시간,옵션)
      // opacity는 중간값이 있기에 gsap가능 display는 중간값이 없어 gsap 안됨
      gsap.to(badgeEl, 0.6, {
        // 배지 숨기기
        opacity: 0,
        display: "none",
      })
      // 버튼 숨기기
      gsap.to(toTopEl, 0.2, {
        x: 0,
      })
    } else {
      gsap.to(badgeEl, 0.6, {
        // 배지 보이기
        opacity: 1,
        display: "block",
      })

      // 버튼 보이기
      gsap.to(toTopEl, 0.2, {
        x: 100,
      })
    }
  }, 300)
)
// 클릭시 상단으로 이동하는 버튼
toTopEl.addEventListener("click", function () {
  gsap.to(window, 0.7, {
    // 화면 위치 옮기기
    scrollTo: 0,
  })
})

// FADE-IN

const fadeEls = document.querySelectorAll(".visual .fade-in")
fadeEls.forEach(function (fadeEl, index) {
  // gsap.to(요소,지속시간,옵션)
  gsap.to(fadeEl, 1, {
    delay: (index + 1) * 0.7,
    opacity: 1,
  })
})

// swiper
// new swiper(선택자,옵션)
new Swiper(".notice-line .swiper", {
  direction: "vertical",
  autoplay: true,
  loop: true,
})

new Swiper(".promotion .swiper", {
  // direction:"horizontal"
  slidesPerView: 3,
  spaceBetween: 10,
  centeredSlides: true, // 1번 슬라이드가 가운데 보이기
  loop: true,
  autoplay: {
    delay: 5000,
  },
  pagination: {
    el: ".promotion .swiper-pagination", // 페이지 번호 요소 선택자
    clickable: true, // 사용자의 페이지 번호 요소 제어 가능 여부
  },
  navigation: {
    prevEl: ".promotion .swiper-prev",
    nextEl: ".promotion .swiper-next",
  },
})

// 하단 swiper
new Swiper(".awards .swiper", {
  direction: "horizontal",
  autoplay: true,
  loop: true,
  spaceBetween: 30,
  slidesPerView: 5,
  navigation: {
    // 버튼지정
    prevEl: ".awards .swiper-prev",
    nextEl: ".awards .swiper-next",
  },
})

// promotion 버튼 클릭시 열고 닫기
const promotionEl = document.querySelector(".promotion")
const promotionToggleBtn = document.querySelector(".toggle-promotion")
let isHidePromotion = false
promotionToggleBtn.addEventListener("click", function () {
  isHidePromotion = !isHidePromotion

  if (isHidePromotion) {
    //숨김
    promotionEl.classList.add("hide")
  } else {
    //보임
    promotionEl.classList.remove("hide")
  }
})

// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}

function floatingObject(selector, delay, size) {
  gsap.to(selector, random(1.5, 2.5), {
    y: size,
    repeat: -1,
    // 다시 뒤로 재생
    yoyo: true,
    ease: "power1.inOut",
    delay: random(0, delay),
  })
}
floatingObject(".floating1", 1, 15)
floatingObject(".floating2", 0.5, 15)
floatingObject(".floating3", 1.5, 20)

// scroll magic
const spyEls = document.querySelectorAll("section.scroll-spy")
// 요소들 반복 처리!
spyEls.forEach(function (spyEl) {
  new ScrollMagic.Scene({
    // 감시할 장면(Scene)을 추가
    triggerElement: spyEl, // 보여짐 여부를 감시할 요소를 지정
    triggerHook: 0.8, // 화면의 80% 지점에서 보여짐 여부 감시
  })
    .setClassToggle(spyEl, "show") // 요소가 화면에 보이면 show 클래스 추가
    .addTo(new ScrollMagic.Controller()) // 컨트롤러에 장면을 할당(필수!)
})

// this year로 올해년도 나타내기
const thisYear = document.querySelector(".this-year")
thisYear.textContent = new Date().getFullYear()

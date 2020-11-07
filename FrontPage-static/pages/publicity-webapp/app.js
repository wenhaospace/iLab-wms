// Carousel
//页面初始化
window.onload = initCarousel;
document
  .querySelector(".carousel-pointer")
  .addEventListener("mouseover", pointerActive);
document
  .querySelector(".carousel-pointer")
  .addEventListener("mouseout", pointerRemoveActive);

//定义变量
var carouselTimer;
let carouselCounter;

function initCarousel() {
  carouselTimer = setInterval(startAnimate(), 5000);
}

//开始轮播 函数
function startAnimate() {
  carouselCounter = carouselCounter == undefined ? 0 : carouselCounter;
  document.querySelector(".first").style.marginLeft = `${-20 *
    carouselCounter}%`;
  removePointerStyle(carouselCounter);
  addPointerStyle(carouselCounter);
  carouselCounter++;
  if (carouselCounter > 4) {
    carouselCounter = 0;
  }
  return startAnimate;
}

//停止轮播 函数
function stopAnimate() {
  window.clearInterval(carouselTimer);
}

// 添加指示器样式
function addPointerStyle(num) {
  document.getElementById(`carousel-pointer-item${num}`).classList =
    "carousel-pointer-item-active";
}

// 移除单个指示器样式
function removePointerStyle(num) {
  document.getElementById(
    `carousel-pointer-item${num === 0 ? 4 : num - 1}`
  ).classList = "";
}
// 移除其他指示器样式
function removeOtherPointerStyle(num) {
  for (let i = 0; i < 5; i++) {
    if (i === num) {
      continue;
    }
    document.getElementById(`carousel-pointer-item${i}`).classList = "";
  }
}

//鼠标激活指示器 函数
function pointerActive(e) {
  if (e.target.parentElement.classList.contains("carousel-pointer")) {
    stopAnimate();
    let num = Number(e.target.id.slice(-1));
    addPointerStyle(num);
    removeOtherPointerStyle(num);
    carouselCounter = num;
    document.querySelector(".first").style.marginLeft = `${-20 * num}%`;
  }
}

//鼠标移开指示器 函数
function pointerRemoveActive(e) {
  if (e.target.parentElement.classList.contains("carousel-pointer")) {
    initCarousel();
  }
}

// Section-1

document.querySelectorAll(".icon-item").forEach(function(item) {
  item.addEventListener("click", showChange);
});

function showChange(e) {
  // inactive 全部 icon
  inaciveIcon();

  // console.log(e.target);

  // active 当前 icon
  let num = activeIcon(e.target);

  // 移动 triangle
  moveTriangle(num);

  // 改变文本
  changeText(num);
}

function inaciveIcon() {
  document.querySelectorAll("i").forEach(function(item) {
    item.classList = "icon-inactive";
  });
}

function activeIcon(item) {
  let num;
  if (item.classList.contains("icon-item")) {
    num = Number(item.id.slice(-1));
    document.getElementById(item.id).children[0].classList = "icon-active";
  } else if (item.parentElement.classList.contains("icon-item")) {
    num = Number(item.parentElement.id.slice(-1));
    document.getElementById(item.parentElement.id).children[0].classList =
      "icon-active";
  } else {
    num = Number(item.parentElement.parentElement.id.slice(-1));
    document.getElementById(
      item.parentElement.parentElement.id
    ).children[0].classList = "icon-active";
  }
  return num;
}

function moveTriangle(num) {
  switch (num) {
    case 1:
      document.querySelector(".triangle").style.left = "65px";
      break;
    case 2:
      document.querySelector(".triangle").style.left = "392px";
      break;
    case 3:
      document.querySelector(".triangle").style.left = "720px";
      break;
    case 4:
      document.querySelector(".triangle").style.left = "1047px";
      break;
  }
}

function changeText(num) {
  for (let i = 1; i < 5; i++) {
    if (i == num) {
      document.querySelector(`.wave-text-${i}`).style.display = "block";
    } else {
      document.querySelector(`.wave-text-${i}`).style.display = "none";
    }
  }
}

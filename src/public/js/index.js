window.onscroll = function() {myFunction()};

var header = document.getElementById("myHeader");

var sticky = header.offsetTop;

function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

const dots = document.querySelectorAll('.dot');

const imgNumber = document.querySelectorAll(".slide-content-left-top img");
let index = 0;

const rightbtn = document.querySelector('.fa-chevron-right');
const leftbtn = document.querySelector('.fa-chevron-left');

rightbtn.addEventListener("click", function(){
    index = (index + 1) % imgNumber.length;
    updateSlider();
});

leftbtn.addEventListener("click", function(){
    index = (index - 1 + imgNumber.length) % imgNumber.length;
    updateSlider();
});

function updateSlider() {
    const slideContent = document.querySelector(".slide-content-left-top");
    slideContent.style.right = index * 100 + "%";
    setActiveDot(index);
}

window.onload = function() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
            index = idx;
            updateSlider();
        });
    });
};

function setActiveDot(index) {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function imgAuto() {
    index = (index + 1) % imgNumber.length;
    updateSlider();
}

const intervalId = setInterval(imgAuto, 1000);

const slider = document.querySelector('.slider');
slider.addEventListener('mouseover', () => {
    clearInterval(intervalId);
});

slider.addEventListener('mouseout', () => {
    intervalId = setInterval(imgAuto, 10000);
});
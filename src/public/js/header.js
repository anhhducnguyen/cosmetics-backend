$(document).ready(function () {
    $(".gotopbtn").hide();

    $(window).scroll(function () {
        if ($(this).scrollTop() >= 200)
            $(".gotopbtn").show("slow");
        else
            $(".gotopbtn").hide("slow");
    });
    $(".gotopbtn").click(function () {
        $("html,body").animate({ scrollTop: 0, }, 1000);
    });
});

function toggleMenu() {
    var menu = document.getElementById("side-menu");
    var overlay = document.getElementById("overlay");
    var currentRight = menu.style.right;

    if (currentRight === "0px") {
        menu.style.right = "-200px";
        overlay.classList.remove("show");
    } else {
        menu.style.right = "0px";
        overlay.classList.add("show");
    }
}

function toggleCartMobile() {
    var menu = document.getElementById("list-product-cart");
    var overlay = document.getElementById("overlay-cart-mobile");
    var currentRight = menu.style.right;

    if (currentRight === "0px") {
        menu.style.right = "-350px";
        overlay.classList.remove("show");
    } else {
        menu.style.right = "0px";
        overlay.classList.add("show");
    }
}

function toggleCart() {
    var menu = document.getElementById("list-product-cart");
    var overlay = document.getElementById("overlay-cart");
    var currentRight = menu.style.right;

    if (currentRight === "0px") {
        menu.style.right = "-450px";
        overlay.classList.remove("show");
    } else {
        menu.style.right = "0px";
        overlay.classList.add("show");
    }
}

const btnOpen = document.querySelector('.open-modal-btn')
const modal = document.querySelector('.modal')
const iconClose = document.querySelector('.modal-header i')
const btnClose = document.querySelector('.modal-footer button')

function toggleModal(){
    modal.classList.toggle('hide')
}

btnOpen.addEventListener('click',toggleModal )
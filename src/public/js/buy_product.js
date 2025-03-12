document.addEventListener("DOMContentLoaded", function () {
  fetch("http://127.0.0.1:3000/api/v1/products")
      .then(response => response.json())
      .then(data => {
          if (data.success) {
              const productsContainer = document.querySelector(".product-items");
              productsContainer.innerHTML = ""; 

              data.data.forEach(product => {
                  const productElement = document.createElement("div");
                  productElement.classList.add("product-item");

                  productElement.innerHTML = `
                      <div class="product-item-image">
                          <a href="#"><img src="${product.imageUrls[0] || 'default.jpg'}" alt="${product.productName}"></a>
                          <span class="discount-circle">${product.discountPercentage}%</span>
                          <span class="add-product">
                              <i class="fa-solid fa-cart-plus fa-beat-fade fa-xl" style="color: #094410;"></i>
                          </span>
                      </div>
                      <div class="top-box-text">
                          <a href="#"><p>${product.productName}</p></a>
                          <ins> <span>${product.price.toLocaleString()}</span></ins>
                          <del> <span>${product.discountedPrice.toLocaleString()}</del> <br>
                          <div class="product-item-order">
                              <a href="#" class="product-item-detail">Mua hàng</a>
                          </div>
                      </div>
                  `;
                  productsContainer.appendChild(productElement);
              });
          } else {
              console.error("Lỗi khi tải sản phẩm:", data.message);
          }
      })
      .catch(error => console.error("Fetch error:", error));
});

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

function increaseQuantity() {
  const quantityInput = document.querySelector('.cartt .quantity');
  quantityInput.value = parseInt(quantityInput.value) + 1;
}

function decreaseQuantity() {
  const quantityInput = document.querySelector('.cartt .quantity');
  const newValue = parseInt(quantityInput.value) - 1;
  quantityInput.value = newValue >= 1 ? newValue : 1;
}

function addToCart() {
  const quantity = document.querySelector('.cartt .quantity').value;
  const cartDiv = document.getElementById('cartDiv');
  cartDiv.setAttribute('data-quantity', quantity);
}

function toggleContent() {
  var additionalContent = document.getElementById('additionalContent');
  var toggleButton = document.getElementById('toggleButton');

  if (additionalContent.style.display === 'none' || additionalContent.style.display === '') {
      additionalContent.style.display = 'block';
      toggleButton.innerText = 'Thu gọn';
  } else {
      additionalContent.style.display = 'none';
      toggleButton.innerText = 'Hiển thị thêm ...';
  }
}

const rightbtntwo = document.querySelector('.fa-chevron-right-two')
const leftbtntwo = document.querySelector('.fa-chevron-left-two')

const imgNumbertwo = document.querySelectorAll(".slider-product-one-content-items")
let index = 0
rightbtntwo.addEventListener("click", function(){
    index = index+1
    if(index>imgNumbertwo.length-1){
        index=0
    }
    document.querySelector(".slider-product-one-content-items-content").style.right = index * 100+"%"
})

leftbtntwo.addEventListener("click", function(){
    index = index-1
    if(index<0){
        index=imgNumbertwo.length-1
    }
    document.querySelector(".slider-product-one-content-items-content").style.right = index * 100+"%"
})

var imgList = document.querySelectorAll(".buy-product-main-left>.orther-img>img");
for (var i = 0; i < imgList.length;i++){
    imgList[i].onmouseover = function(){
        var mainImg = document.querySelector(".buy-product-main-left>.main-img");
        mainImg.src = this.src;
    };
}












document.addEventListener('DOMContentLoaded', function() {
  // --- แถบเลื่อนรูปภาพในส่วน Hero ---
  const sliderContainer = document.querySelector('.soon .slider-container');
  const slider = document.querySelector('.soon .slider');
  const slides = document.querySelectorAll('.soon .slider img');
  let counter = 0;
  let slideWidth;

  function setSlideWidth() {
    if (slides.length > 0) {
      slideWidth = slides[0].offsetWidth;
      slider.style.width = slideWidth * slides.length + 'px';
    }
  }

  if (slides.length > 0) {
    setSlideWidth();
    window.addEventListener('resize', setSlideWidth);

    function slideNext() {
      counter++;
      if (counter >= slides.length) {
        counter = 0;
      }
      slider.style.transform = `translateX(-${slideWidth * counter}px)`;
    }

    // เปลี่ยนสไลด์ทุกๆ 3 วินาที
    setInterval(slideNext, 3000);
  }

  // --- ระบบตะกร้าสินค้า ---
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  const cartCountElement = document.querySelector('.actions a:nth-child(2)'); // เลือก element ของจำนวนสินค้าในตะกร้า

  let cart = [];

  function updateCartCount() {
    cartCountElement.textContent = `ตะกร้าสินค้า (${cart.length})`;
  }

  addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
      const productName = this.dataset.productName;
      const productPrice = parseFloat(this.dataset.productPrice); // แปลงเป็นตัวเลข

      const existingItem = cart.find(item => item.name === productName);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        cart.push({
          name: productName,
          price: productPrice,
          quantity: 1
        });
      }

      updateCartCount();
      console.log('สินค้าในตะกร้า:', cart); // แสดงข้อมูลตะกร้าใน console
    });
  });

  // อัปเดตจำนวนสินค้าเริ่มต้น (ถ้ามีสินค้าอยู่แล้ว)
  updateCartCount();
});
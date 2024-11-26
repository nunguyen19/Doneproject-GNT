                                    // TIME
var thoiGianBatDau = 1000; // Thời gian bắt đầu (phút)
var time = thoiGianBatDau * 60; // Tổng số giây

// Lấy các phần tử giờ, phút, giây
var hoursEl = document.querySelector('.countdown-item.hours');
var minutesEl = document.querySelector('.countdown-item.minutes');
var secondsEl = document.querySelector('.countdown-item.seconds');

setInterval(function () {
    let giay = time % 60; // Lấy số giây
    let phut = Math.floor((time / 60) % 60); // Lấy số phút
    let gio = Math.floor(time / 3600); // Lấy số giờ

    // Định dạng hiển thị hai chữ số
    giay = giay < 10 ? `0${giay}` : giay;
    phut = phut < 10 ? `0${phut}` : phut;
    gio = gio < 10 ? `0${gio}` : gio;

    // Hiển thị nội dung đồng hồ
    hoursEl.innerHTML = gio;
    minutesEl.innerHTML = phut;
    secondsEl.innerHTML = giay;

    // Giảm thời gian và kiểm tra để chạy lại
    time--;
    if (time < 0) {
        time = thoiGianBatDau * 60; // Reset lại thời gian
    }
}, 1000);

// Lấy tất cả các checkbox và sản phẩm
const checkboxes = document.querySelectorAll('.filter-option input[type="checkbox"]');
const products = document.querySelectorAll('.product-card');
// Hàm lọc sản phẩm
function filterProducts() {
    const selectedRanges = []; // Lưu trữ khoảng giá lọc được chọn
    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            switch (checkbox.id) {
                case 'price1': selectedRanges.push([0, 100000]); break;
                case 'price2': selectedRanges.push([100000, 200000]); break;
                case 'price3': selectedRanges.push([200000, 300000]); break;
                case 'price4': selectedRanges.push([300000, 500000]); break;
                case 'price5': selectedRanges.push([500000, 1000000]); break;
                case 'price6': selectedRanges.push([1000000, Infinity]); break;
            }
        }
    });

    // Lọc sản phẩm dựa trên khoảng giá đã chọn
    products.forEach((product) => {
        const productPrice = parseInt(product.getAttribute('data-price'));
        const isVisible = selectedRanges.some(
            (range) => productPrice >= range[0] && productPrice <= range[1]
        );

        // Ẩn hoặc xóa sản phẩm không phù hợp
        if (!isVisible) {
            product.style.display = 'none';
        } else {
            product.style.display = 'block'; // Hiển thị sản phẩm
        }
    });

    // Xóa thẻ <div class="col-md-8"> sau khi lọc
    const colMd8Div = document.querySelector('.col-md-8');
    if (colMd8Div) {
        colMd8Div.remove(); // Xóa thẻ div có class "col-md-8"
    }

    // Cập nhật lại danh sách sản phẩm sau khi lọc
    arrangeProducts();
}



// Lắng nghe sự kiện khi người dùng nhấn nút "Áp dụng"
document.querySelector('.apply-button').addEventListener('click', filterProducts);

// Thêm data-price vào sau mỗi sản phẩm
const productCards = document.querySelectorAll('.product-card');

productCards.forEach(card => {
    const priceElement = card.querySelector('.product-price');
    if (priceElement) {
        const priceText = priceElement.textContent.trim();
        const numericPrice = parseInt(priceText.replace(/\D/g, ''), 10);
        card.setAttribute('data-price', numericPrice);
    }
});

function arrangeProducts() {
    const container = document.querySelector('.product-overview');
    const pagination = document.querySelector('.pagination'); // Lấy phần tử phân trang
    const visibleProducts = Array.from(products).filter(product => product.style.display === 'block');

    // Di chuyển các sản phẩm vào container
    visibleProducts.forEach(product => {
        container.appendChild(product);
    });

    // Đảm bảo pagination luôn nằm cuối
    if (pagination) {
        container.appendChild(pagination); // Đưa pagination xuống cuối
    }
}


                            // ÁP DỤNG
document.querySelector(".apply-button").addEventListener("click", function () {
  const selectedCategory = document.getElementById(".filter-container").value;
  const products = document.querySelectorAll(" .product-overview");

  products.forEach((product) => {
    if (selectedCategory === "all" || product.dataset.category === selectedCategory) {
      product.style.opacity = "1"; // Hiện sản phẩm
      product.style.transform = "scale(1)"; // Phóng to bình thường
      product.style.display = "block"; // Đảm bảo hiển thị
    } else {
      product.style.opacity = "0"; // Làm mờ sản phẩm
      product.style.transform = "scale(0.8)"; // Thu nhỏ sản phẩm
      setTimeout(() => {
        product.style.display = "none"; // Ẩn sau hiệu ứng
      }, 300); // Khớp với thời gian hiệu ứng
    }
  });
});
document.getElementById("sortPriceAsc").addEventListener("click", function () {
    const sortedProducts = Array.from(products).sort((a, b) => {
        const priceA = parseInt(a.getAttribute("data-price"));
        const priceB = parseInt(b.getAttribute("data-price"));
        return priceA - priceB; // Sort by price in ascending order
    });

    const container = document.querySelector(".product-overview");
    // Clear the container
    container.innerHTML = "";
    
    // Append the sorted products back to the container
    sortedProducts.forEach(product => {
        container.appendChild(product);
    });
}); 

// Sorting by price in descending order
document.getElementById("sortPriceDesc").addEventListener("click", function () {
    const sortedProducts = Array.from(products).sort((a, b) => {
        const priceA = parseInt(a.getAttribute("data-price"));
        const priceB = parseInt(b.getAttribute("data-price"));
        return priceB - priceA; // Sort by price in descending order
    });

    const container = document.querySelector(".product-overview");
    // Clear the container
    container.innerHTML = "";
    
    // Append the sorted products back to the container
    sortedProducts.forEach(product => {
        container.appendChild(product);
    });
});



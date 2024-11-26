// Tạo một mảng rỗng để lưu trữ các sản phẩm trong giỏ hàng
const cart = [];

// Hàm thêm sản phẩm vào giỏ
function addToCart(name, image, price) {
  const existingProduct = cart.find(item => item.name === name); // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
  if (existingProduct) {
    existingProduct.quantity += 1; // Nếu sản phẩm đã có trong giỏ, tăng số lượng lên 1
  } else {
    cart.push({ name, image, price, quantity: 1 }); // Nếu sản phẩm chưa có trong giỏ, thêm mới vào mảng cart
    
  }
  updateCartUI(); // Cập nhật giao diện giỏ hàng sau khi thay đổi
}

// Hàm cập nhật giao diện giỏ hàng
function updateCartUI() {
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0); // Tính tổng số lượng sản phẩm trong giỏ
  document.getElementById("cartCount").textContent = totalQuantity; // Cập nhật số lượng hiển thị trên icon giỏ hàng

  const cartItemsContainer = document.getElementById("cartItems");
  cartItemsContainer.innerHTML = ""; 

  let totalPrice = 0; // Lặp qua từng sản phẩm để hiển thị
  cart.forEach((item, index) => {
    totalPrice += item.price * item.quantity; // Tính tổng giá tiền
     // Thêm HTML cho mỗi sản phẩm
    cartItemsContainer.innerHTML += ` 
      <div class="d-flex align-items-center mb-3">
        <img src="${item.image}" alt="${item.name}" class="img-thumbnail me-2">
        <div class="flex-grow-1">
          <h6 class="mb-1">${item.name}</h6>
          <p class="mb-1">${item.price.toLocaleString()}₫ x ${item.quantity}</p>
          <div class="d-flex align-items-center">
            <button class="btn btn-outline-secondary btn-sm me-1" onclick="updateQuantity(${index}, -1)">-</button>
            <button class="btn btn-outline-secondary btn-sm" onclick="updateQuantity(${index}, 1)">+</button>
          </div>
        </div>
        <button style="background-color: #f2b6b6;" class="btn btn-sm ms-3" onclick="removeFromCart(${index})">Xóa</button>
      </div>
    `;
  });
  // Hiển thị tổng tiền
  document.querySelector(".cart-total").textContent = `Tổng tiền: ${totalPrice.toLocaleString()}₫`;
}

function updateQuantity(index, change) { // Thay đổi số lượng sản phẩm
  cart[index].quantity += change;
  if (cart[index].quantity <= 0) cart.splice(index, 1); // Nếu số lượng về 0 hoặc âm, xóa sản phẩm khỏi giỏ
  updateCartUI();  // Cập nhật lại giao diện
}
//Hàm xóa sản phẩm removeFromCart()
function removeFromCart(index) { // Xóa sản phẩm khỏi mảng giỏ hàng
  cart.splice(index, 1);
  updateCartUI();   // Cập nhật lại giao diện
}

// Gắn sự kiện mở modal
document.getElementById("cartButton").addEventListener("click", () => {   // Tạo modal Bootstrap khi nhấn nút giỏ hàng
  const cartModal = new bootstrap.Modal(document.getElementById("cartModal"));
  cartModal.show();
});
  
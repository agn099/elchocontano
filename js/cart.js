$(document).ready(function() {
  // Añadir producto al carrito desde el menú
  $('.btn-outline-primary').on('click', function(e) {
    e.preventDefault();
    const $card = $(this).closest('.menu-wrap, .menu-entry');
    const name = $card.find('h3').text().trim();
    const price = parseInt($card.find('.price span').text().replace(/[^0-9]/g, ''));
    const img = $card.find('.menu-img, .img').css('background-image') || $card.find('img').attr('src');
    let imgUrl = '';
    if (img) {
      imgUrl = img.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
    }

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let found = cart.find(p => p.name === name);
    if (found) {
      found.qty += 1;
    } else {
      cart.push({ name, price, img: imgUrl, qty: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
  });

  // Renderizar tabla y totales
  function renderCartTable() {
    if (!$('.cart-list').length) return;
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let $tbody = $('.cart-list tbody');
    $tbody.empty();
    let subtotal = 0;
    cart.forEach((p, i) => {
      let totalProd = p.price * p.qty;
      subtotal += totalProd;
      $tbody.append(`
        <tr class="text-center" data-index="${i}">
          <td class="product-remove"><a href="#" class="remove-item"><span class="icon-close"></span></a></td>
          <td class="image-prod"><div class="img" style="background-image:url('${p.img}');"></div></td>
          <td class="product-name"><h3>${p.name}</h3></td>
          <td class="price">$${p.price.toLocaleString()}</td>
          <td class="quantity">
            <div class="input-group mb-3">
              <input type="number" name="quantity" class="quantity form-control input-number" value="${p.qty}" min="1" max="100">
            </div>
          </td>
          <td class="total">$${totalProd.toLocaleString()}</td>
        </tr>
      `);
    });
    // Actualiza el subtotal y total
    $('.cart-total p.d-flex').eq(0).find('span:last').text(`$${subtotal.toLocaleString()}`);
    $('.cart-total .total-price span:last').text(`$${subtotal.toLocaleString()}`);
  }

  // Eliminar producto
  $(document).on('click', '.remove-item', function(e) {
    e.preventDefault();
    let idx = $(this).closest('tr').data('index');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(idx, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCartTable();
    updateCartBadge();
  });

  // Cambiar cantidad y actualizar todo
  $(document).on('input', '.quantity', function() {
    let idx = $(this).closest('tr').data('index');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let qty = parseInt($(this).val());
    if (isNaN(qty) || qty < 1) qty = 1;
    cart[idx].qty = qty;
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCartTable();
    updateCartBadge();
  });

  // Actualizar badge del carrito en el menú
  function updateCartBadge() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalQty = cart.reduce((sum, p) => sum + p.qty, 0);
    $('.bag small').text(totalQty);
  }

  // Mantener carrito entre páginas
  updateCartBadge();
  renderCartTable();

  // Checkout: guardar datos para pago (puedes ampliar aquí)
  $('.btn-primary.py-3.px-4').on('click', function(e) {
    if (window.location.pathname.indexOf('checkout.html') !== -1) {
      // Aquí puedes enviar los datos del carrito y del formulario a tu backend/PSE
      // Ejemplo: localStorage.getItem('cart') para productos
      // Recoge los datos del formulario y envíalos junto con el carrito
    }
  });
});
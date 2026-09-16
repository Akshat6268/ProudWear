document.addEventListener('DOMContentLoaded', () => {
  const productTableBody = document.getElementById('productTableBody');
  const totalProductsCount = document.getElementById('totalProducts');
  
  // Modal Elements
  const productModal = document.getElementById('productModal');
  const addProductBtn = document.getElementById('addProductBtn');
  const closeModalBtn = document.getElementById('closeModal');
  const cancelBtn = document.getElementById('cancelBtn');
  const productForm = document.getElementById('productForm');
  const modalTitle = document.getElementById('modalTitle');
  
  let editingProductId = null;

  // Render Table
  function renderTable() {
    const products = getProducts(); // from products.js
    productTableBody.innerHTML = '';
    totalProductsCount.textContent = products.length;

    products.forEach(product => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><img src="${product.image}" class="product-img-sm" alt="Product"></td>
        <td><strong>${product.id}</strong></td>
        <td>${product.title}</td>
        <td>₹${product.price.toLocaleString()}</td>
        <td>${product.category || product.fabric}</td>
        <td>
          <button class="btn-icon edit-btn" data-id="${product.id}" title="Edit"><i class="fas fa-edit"></i></button>
          <button class="btn-icon delete delete-btn" data-id="${product.id}" title="Delete"><i class="fas fa-trash"></i></button>
        </td>
      `;
      productTableBody.appendChild(tr);
    });

    // Attach Event Listeners to new buttons
    document.querySelectorAll('.edit-btn').forEach(btn => {
      btn.addEventListener('click', (e) => openModal(e.currentTarget.dataset.id));
    });
    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => deleteProduct(e.currentTarget.dataset.id));
    });
  }

  // Modal Logic
  function openModal(id = null) {
    editingProductId = id;
    if (id) {
      modalTitle.textContent = 'Edit Product';
      const products = getProducts();
      const product = products.find(p => p.id === id);
      if (product) {
        document.getElementById('productId').value = product.id;
        document.getElementById('productId').disabled = true; // Can't edit ID
        document.getElementById('productTitle').value = product.title;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productOriginalPrice').value = product.originalPrice || '';
        document.getElementById('productFabric').value = product.fabric || 'Silk';
        document.getElementById('productNeckline').value = product.neckline || 'Sweetheart';
        document.getElementById('productImage').value = product.image;
      }
    } else {
      modalTitle.textContent = 'Add New Product';
      productForm.reset();
      document.getElementById('productId').disabled = false;
    }
    productModal.classList.add('active');
  }

  function closeModal() {
    productModal.classList.remove('active');
    productForm.reset();
  }

  // Handle Form Submit
  productForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const newProduct = {
      id: document.getElementById('productId').value,
      title: document.getElementById('productTitle').value,
      price: parseInt(document.getElementById('productPrice').value),
      originalPrice: parseInt(document.getElementById('productOriginalPrice').value) || null,
      fabric: document.getElementById('productFabric').value,
      neckline: document.getElementById('productNeckline').value,
      image: document.getElementById('productImage').value,
      rating: 5, // default
      reviews: 0,
      badge: ''
    };

    let products = getProducts();

    if (editingProductId) {
      // Edit mode
      const index = products.findIndex(p => p.id === editingProductId);
      if (index !== -1) {
        // preserve rating/reviews
        newProduct.rating = products[index].rating;
        newProduct.reviews = products[index].reviews;
        newProduct.badge = products[index].badge;
        products[index] = newProduct;
      }
    } else {
      // Add mode
      // Check if ID already exists
      if (products.some(p => p.id === newProduct.id)) {
        alert('Product ID already exists!');
        return;
      }
      products.unshift(newProduct); // Add to top
    }

    saveProducts(products); // to localStorage
    closeModal();
    renderTable();
  });

  // Handle Delete
  function deleteProduct(id) {
    if (confirm(`Are you sure you want to delete product ${id}?`)) {
      let products = getProducts();
      products = products.filter(p => p.id !== id);
      saveProducts(products);
      renderTable();
    }
  }

  // Event Listeners
  addProductBtn.addEventListener('click', () => openModal());
  closeModalBtn.addEventListener('click', closeModal);
  cancelBtn.addEventListener('click', closeModal);

  // Initial Render
  renderTable();
});

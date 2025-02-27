let allProducts = [];

document.getElementById('loadProducts').addEventListener('click', function() {
    fetch('https://dummyjson.com/products')
        .then(response => response.json())
        .then(data => {
            allProducts = data.products.slice(0, 10);
            displayProducts(allProducts);
        })
        .catch(error => console.error('Error fetching data:', error));
});

document.getElementById('searchInput').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const filteredProducts = allProducts.filter(product => 
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );
    displayProducts(filteredProducts);
});

function displayProducts(products) {
    const container = document.getElementById('productContainer');
    container.innerHTML = '';
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>${product.description}</p>
            <p><strong>Price:</strong> $${product.price}</p>
            <p><strong>Rating:</strong> ${product.rating} ⭐</p>
        `;
        container.appendChild(productDiv);
    });
}

"use strict";
// Collection class
class Collection {
    items;
    constructor(items) {
        this.items = items;
    }
    getAll() {
        return this.items;
    }
    filter(callback) {
        return this.items.filter(callback);
    }
}
// Render product HTML
function renderProduct(product) {
    let details = "";
    switch (product.type) {
        case "book":
            details = `Book: ${product.title} by ${product.author}`;
            break;
        case "electronics":
            details = `Electronics: ${product.item} - ${product.model}`;
            if (product.warranty !== undefined) {
                details += ` - Warranty: ${product.warranty} year(s)`;
            }
            break;
        case "clothing":
            details = `Clothing: ${product.item} by ${product.brand}`;
            if (product.size !== undefined) {
                details += ` - Size ${product.size}`;
            }
            break;
        default:
            throw new Error(`Unknown product type: ${JSON.stringify(product)}`);
    }
    return `
    <div class="item" id="${product.id}">
      <p class="price">${product.price}</p>
      <p>${details}</p>
    </div>
  `;
}
// Product collection
const products = new Collection([
    {
        type: "book",
        id: "book1",
        price: 15,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald"
    },
    {
        type: "electronics",
        id: "electronics1",
        price: 500,
        item: "Laptop",
        model: "MacBook Pro",
        warranty: 2
    },
    {
        type: "clothing",
        id: "clothing1",
        price: 40,
        item: "T-Shirt",
        brand: "Nike",
        size: "M"
    }
]);
// Display products
function showProducts(filter) {
    const output = document.getElementById("output");
    if (!output)
        return;
    const filteredProducts = filter
        ? products.filter(product => product.type === filter)
        : products.getAll();
    output.innerHTML = filteredProducts
        .map(product => renderProduct(product))
        .join("");
}
// Wait for HTML to load
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("all")?.addEventListener("click", () => {
        showProducts();
    });
    document.getElementById("books")?.addEventListener("click", () => {
        showProducts("book");
    });
    document.getElementById("electronics")?.addEventListener("click", () => {
        showProducts("electronics");
    });
    document.getElementById("clothing")?.addEventListener("click", () => {
        showProducts("clothing");
    });
    // Display all products initially
    showProducts();
});

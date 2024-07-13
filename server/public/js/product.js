document.addEventListener("DOMContentLoaded", () => {
    const filterButton = document.getElementById("filter-button");
    const items = document.querySelectorAll(".product-row .product");

    filterButton.addEventListener("change", () => {
        const category = filterButton.value;
        filterItems(category);
    });

    function filterItems(category) {
        items.forEach(item => {
            const itemCategory = item.getAttribute("data-category");
            if (category === "all" || category === itemCategory) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });
    }
});

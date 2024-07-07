document.addEventListener("DOMContentLoaded", () => {
    const filterButton = document.getElementById("filter-button");
    const dropdown = document.getElementById("dropdown");
    const links = dropdown.querySelectorAll("a");
    const items = document.querySelectorAll(".product-row .product");

    filterButton.addEventListener("click", () => {
        dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
    });

    links.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const category = link.getAttribute("data-category");
            filterItems(category);
            dropdown.style.display = "none";
        });
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

    // Hide dropdown when clicking outside
    document.addEventListener("click", (event) => {
        if (!filterButton.contains(event.target) && !dropdown.contains(event.target)) {
            dropdown.style.display = "none";
        }
    });
});





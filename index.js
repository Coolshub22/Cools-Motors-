document.addEventListener('DOMContentLoaded', function() {
    fetch("db.json")
    .then(response => response.json())
    .then(data => {
        showCars(data);
        setupFilters(data);
    })
    .catch(error => console.error("Error loading car data: ", error));
});



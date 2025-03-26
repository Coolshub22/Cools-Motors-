document.addEventListener("DOMContentLoaded", () => {
    getCars();
});

function getCars() {
    fetch("https://freetestapi.com/api/v1/cars")
    .then(response=> response.json())
    .then(cars => {
        allCars = cars;
        showGallery(cars);
        fillCarDropdown(cars);
    })
    .catch(error => console.error("Error fetching cars:", error));
}

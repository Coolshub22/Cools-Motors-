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

function showGallery(cars) {
    let gallery = document.getElementById("car-list");
    gallery.innerText ="";

    cars.forEach(car => {
        let carItem = document.createElement("div");
        carItem.className.add("car-item");

        carItem.innerText = 
        `<img src =${car.image_url} alt =${car.make}>
        <h3>${car.make} ${car.model}</h3>
        <button onclick = showCarDetails(${car.id})>View Details</button>`;

        gallery.appendChild(carItem);
    })
};


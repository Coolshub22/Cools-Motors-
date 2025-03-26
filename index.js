document.addEventListener("DOMContentLoaded", () => {
    getCars();
});

function getCars() {
    
    fetch("https://myfakeapi.com/api/cars/")
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
console.log(cars)
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

document.getElementById("search-box").addEventListener("input", searchCars);

function searchCars() {
    const searchTerm = document.getElementById("search-box").value.toLowerCase();
    fetch("https://myfakeapi.com/api/cars/")
    .then(response => response.json())
    .then(cars => {
        const filteredCars = cars.filter(car =>
            car.brand.toLowerCase().includes(searchTerm) ||
            car.model.toLowerCase().includes(searchTerm)
        );
        displayCars(filteredCars);
    })
    .catch(error => console.error("Error searching cars", error));
}

function showCarDetails(carId) {
    let car = allCars.find(c => c.id === carId);

    let detailsContainer = document.getElementById("details-container");

    detailsContainer.innerText = `
    <h3>${car.make} ${car.model}</h3>
    <p><strong>Year:</strong> ${car.year}</p>
    <p><strong>Color:</strong> ${car.color}</p>
    <p><strong>Engine:</strong> ${car.engine}</p>
    <p><strong>Price:</strong> ${car.price}</p>`;
}

function fillCarDropdown(cars) {
    let select = document.getElementById("car-select");
    select.innerText = "";

    cars.forEach(car => {
        let option = document.createElement("option");
        option.value = car.id;
        option.innerText = `${car.make} ${car.model}`;
        select.appendChild(option);
    });
}

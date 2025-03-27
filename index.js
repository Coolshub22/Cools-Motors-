document.addEventListener('DOMContentLoaded', function() {
    fetch("db.json")
    .then(response => response.json())
    .then(data => {
        showCars(data.cars);
        setupFilters(data.cars);
    })
    .catch(error => console.error("Error loading car data: ", error));
});

function showCars(cars) {
    const carGallery = document.getElementById("car-gallery");
    carGallery.innerHTML = "";

    cars.forEach(car => {
        const carCard = document.createElement("div");
        carCard.className("car-card");

        const carImage = car.images.length > 0 ? car.images[0] : "placeholder.jpg";

        carCard.innerHTML = `
         <img src = "${carImage}" alt = "${car.make} ${car.model}">
         <h3>${car.make} ${car.model} (${car.year})</h3>
         <p><strong>Price:</strong>${car.price.currency} ${car.price.msrp.toLocaleString()}</p>
         <button class = "details-btn" data-car = ${JSON.stringify(car)}>View Details</button>
         `;
 
          carGallery.appendChild(carCard);
    });

    document.querySelectorAll("details-btn").forEach(button => {
        button.addEventListener("click", function() {
           showCarDetails(JSON.parse(button.dataset.car));
    })
   
})
};

function showCarDetails(car) {
    const detailsContainer = document.getElementById("details-container");
    detailsContainer.innerHTML =`
        <h3>${car.make} ${car.model} (${car.year})</h3>
        <p><strong>Engine:</strong>${car.specifications.engine}</p>
         <p><strong>Horsepower:</strong>${car.specifications.horsepower}HP</p>
         <P><strong>Fuel:</strong>${car.specifications.fuelType} | <strong>Transmission:</strong?${car.specifications.transmission}</p>
         <p><strong>Color:</strong>${car.color}</p>
         <p><strong>Body Style:</strong>${car.bodyStyle}</p>`
}

function carSearch(cars) {
    const searchBox = document.getElementById("search-box");

    searchBox.addEventListener("input", () => {
        const searchValue = searchBox.value.toLowerCase();

        const filteredCars = cars.filter(car => 
            car.make.toLowerCase().includes(searchValue) ||
            car.model.toLowerCase().includes(searchValue) ||
            car.year.toString().includes(searchValue)
        );
        displayCars(filteredCars);
    });
}

function bookingDropdown(cars) {
    const carSelect = document.getElementById("car-select");

    cars.forEach(car => {
        const option = document.createElement("option");
        option.value = car.make + " " + car.model;
        option.innerText = car.make + " " + car.model;
        carSelect.appendChild(option);
    });
}
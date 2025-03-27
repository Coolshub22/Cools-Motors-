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
         <h3>${car.make} ${car.model}</h3>
         <p><strong>Price:</strong>${car.price.currency} ${car.price.msrp.toLocaleString()}</p>
         <p><strong>Engine:</strong>${car.specifications.engine}</p>
         <p><strong>Horsepower:</strong>${car.specifications.horsepower}HP</p>
         <P><strong>Fuel:</strong>${car.specifications.fuelType} | <strong>Transmission:</strong?${car.specifications.transmission}</p>
         <p><strong>Color:</strong>${car.color}</p>
         <p><strong>Body Style:</strong>${car.bodyStyle}</p>
         <button class = "book-btn"
         data-make = "${car.make}"
         data-model = "${car.model}"
         data-msrp = "${car.price.msrp}"
         >Book Now</button>`;

          carGallery.appendChild(carCard);
    });

    document.querySelectorAll("book-btn").forEach(button => {
        button.addEventListener("click", function() {
            openBookingForm(this.dataset.make, this.dataset.model, this.dataset.msrp);
    })
   
})
};



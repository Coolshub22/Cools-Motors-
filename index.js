document.addEventListener('DOMContentLoaded', function() {
    fetch("db.json")
    .then(response => response.json())
    .then(data => {
        console.log("Data loaded:", data);
        showCars(data.cars);
        carSearch(data.cars); // Ensure carSearch is invoked
        bookingDropdown(data.cars); // Ensure bookingDropdown is invoked
    })
    .catch(error => console.error("Error loading car data: ", error));
});

function showCars(cars) {
    const carGallery = document.getElementById("car-list");
    carGallery.innerHTML = "";

    cars.forEach(car => {
        const carCard = document.createElement("div");
        carCard.classList.add("car-card");

        const carImage = car.images.length > 0 ? car.images[0] : "placeholder.jpg";

        carCard.innerHTML = `
         <img src="${carImage}" alt="${car.make} ${car.model}">
         <h3>${car.make} ${car.model} (${car.year})</h3>
         <p><strong>Price:</strong> ${car.price.currency} ${car.price.msrp.toLocaleString()}</p>
         <button class="details-btn" data-car='${encodeURIComponent(JSON.stringify(car))}'>View Details</button>
        `;
        carGallery.appendChild(carCard); // Moved outside the template literal
    });

    console.log("Attaching event listeners to details buttons...")

    document.getElementById("car-list").addEventListener("click", function(event) {
        if (event.target.classList.contains("details-btn")){
            console.log("View Details clicked!")
            const carData =  event.target.getAttribute("data-car");

            try{
                const car = JSON.parse(decodeURIComponent(carData));
                 console.log("Car details:", car);
            } catch (error) {
                console.error("Error parsing car data: ", error);
            }
        }
    });
        

}

function showCarDetails(car) {
    const detailsContainer = document.getElementById("details-container");
    detailsContainer.innerHTML = `
        <h3>${car.make} ${car.model} (${car.year})</h3>
        <p><strong>Engine:</strong> ${car.specifications.engine}</p>
        <p><strong>Horsepower:</strong> ${car.specifications.horsepower} HP</p>
        <p><strong>Fuel:</strong> ${car.specifications.fuelType} | <strong>Transmission:</strong> ${car.specifications.transmission}</p>
        <p><strong>Color:</strong> ${car.color}</p>
        <p><strong>Body Style:</strong> ${car.bodyStyle}</p>
    `;
    document.getElementById("car-details").scrollIntoView({behavior:"smooth"});
}

function carSearch(cars) {
    const searchBox = document.getElementById("search-box");

    searchBox.addEventListener("input", () => {
        const searchValue = searchBox.value.toLowerCase().trim();

        const filteredCars = cars.filter(car => 
            car.make.toLowerCase().includes(searchValue) ||
            car.model.toLowerCase().includes(searchValue) ||
            car.year.toString().includes(searchValue)
        );

        showCars(filteredCars);
    });
}

function bookingDropdown(cars) {
    const carSelect = document.getElementById("car-select");
    carSelect.innerHTML = "";

    cars.forEach(car => {
        const option = document.createElement("option");
        option.value = car.make + " " + car.model;
        option.innerText = car.make + " " + car.model;
        carSelect.appendChild(option);
    });
}


    const bookingForm = document.getElementById("booking-form");

    if (bookingForm) {
       
    bookingForm.addEventListener("submit", function (event) {
        event.preventDefault();
    
        const selectedCar = document.getElementById("car-select").value;
        alert(`Booking confirmed for: ${selectedCar}`)
        
});
    }else {
        console.error("Booking form not found!");
    }

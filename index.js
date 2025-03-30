document.addEventListener('DOMContentLoaded', function() {
    fetch("db.json")
    .then(response => response.json())
    .then(data => {
        console.log("Data loaded:", data);
        showCars(data.cars);
        carSearch(data.cars); 
        bookingDropdown(data.cars);
    })
    .catch(error => console.error("Error loading car data: ", error));

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

    const carList = document.getElementById("car-list");

    
    carList.addEventListener("click", function(event) {
        if (event.target.classList.contains("details-btn")) {
            console.log("View Details clicked!");
            const carData = event.target.getAttribute("data-car");

            try {
                const car = JSON.parse(decodeURIComponent(carData));
                console.log("Car details:", car);
                showCarDetails(car);
            } catch (error) {
                console.error("Error parsing car data: ", error);
            }
        }
    });
});

function showCars(cars) {
    if (!Array.isArray(cars)) {
        console.error("Invalid car data received:", cars);
        return;
    }

    const carGallery = document.getElementById("car-list");
    carGallery.innerHTML = "";

    cars.forEach(car => {
        if (!car || !car.make || !car.model) {
            console.error("Invalid car object:", car);
            return;
        }

        const carCard = document.createElement("div");
        carCard.classList.add("car-card");

        const carImage = car.images && car.images.length > 0 ? car.images[0] : "placeholder.jpg";

        carCard.innerHTML = `
         <img src="${carImage}" alt="${car.make} ${car.model}">
         <h3>${car.make} ${car.model} (${car.year})</h3>
         <p><strong>Price:</strong> ${car.price.currency} ${car.price.msrp.toLocaleString()}</p>
         <button class="details-btn" data-car='${encodeURIComponent(JSON.stringify(car))}'>View Details</button>
        `;
        carGallery.appendChild(carCard);
    });

    console.log("Car list updated.");
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
    const searchStatus = document.getElementById("search-status");
    const carGallery = document.getElementById("car-list");

    if (!searchBox || !searchStatus || !carGallery) {
        console.error("Search elements not found!");
        return;
    }

    searchBox.addEventListener("input", () => {
        const searchValue = searchBox.value.toLowerCase().trim();

        if (searchValue === "") {
            searchStatus.innerText = "";
            showCars(cars); 
            return;
        }

        
        const filteredCars = cars.filter(car => 
            car.make.toLowerCase().includes(searchValue) ||
            car.model.toLowerCase().includes(searchValue) ||
            car.year.toString().includes(searchValue)
        );

       
        searchStatus.innerHTML = `<strong>Showing results for:</strong> "${searchBox.value}"`;

        if (filteredCars.length === 0) {
            searchStatus.innerHTML = `<strong>🚗 No cars found for:</strong> "${searchBox.value}"`;
        }

        showCars(filteredCars);
    });

    console.log("Search functionality initialized.");
}

function bookingDropdown(cars) {
    const carSelect = document.getElementById("car-select");

    if (!carSelect) {
        console.error("Car select dropdown not found! Ensure an element with ID 'car-select' exists in the HTML.");
        return;
    }

    console.log("Booking dropdown function invoked with cars:", cars);

    carSelect.innerHTML = ""; 

    if (!cars || cars.length === 0) {
        console.warn("No cars available to populate the dropdown.");
        const noCarsOption = document.createElement("option");
        noCarsOption.value = "";
        noCarsOption.innerText = "No cars available";
        carSelect.appendChild(noCarsOption);
        return;
    }

    cars.forEach(car => {
        if (!car.make || !car.model) {
            console.warn("Car data is missing 'make' or 'model':", car);
            return;
        }

        const option = document.createElement("option");
        option.value = `${car.make} ${car.model}`;
        option.innerText = `${car.make} ${car.model}`;
        carSelect.appendChild(option);
    });

    console.log("Booking dropdown updated with available cars.");
}




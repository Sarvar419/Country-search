const url = "https://restcountries.com/v3.1/all";

const countries = document.querySelector(".country");
const inputSearch = document.querySelector(".search-country");
const formSelect = document.querySelector(".form-select");

let countryData = [];

async function fetchCountryData() {
    try {
        const response = await fetch(url);
        const data = await response.json();

        const countrySort = data.sort((a, b) => {
            return a.name.common.localeCompare(b.name.common);
        });

        countryData = countrySort;
        renderCountry(countryData);
    } catch (error) {
        console.log("Ma'lumotlarni olib kelishda xatolik", error);
    }
}

function renderCountry(data) {
    countries.innerHTML = "";
    data.forEach(country => {
        const countryName = country.name.common;
        const population = country.population.toLocaleString();
        const region = country.region || "Noma'lum";
        const capital = country.capital ? country.capital[0] : "Noma'lum";
        const flag = country.flags.svg;
        const altText = country.flags.alt || `${countryName} flag`;

        const col = document.createElement("div");
        col.classList.add('col-12', 'col-md-6', 'col-lg-3', 'my-4');

        const cardLink = document.createElement('a');
        cardLink.setAttribute('href', `./country.html?name=${country.name.common}`);
        cardLink.classList.add("card");

        cardLink.innerHTML = `
            <img src="${flag}" class="card-img-top" alt="${altText}">
            <div class="card-body">
                <h5 class="card-title">${countryName}</h5>
                <p class="card-text"><span class="card-text__span">Population:</span> ${population}</p>
                <p class="card-text"><span class="card-text__span">Region: </span>${region}</p>
                <p class="card-text"><span class="card-text__span">Capital: </span>${capital}</p>
            </div>
        `;

        col.appendChild(cardLink);
        countries.appendChild(col);
    });
}

inputSearch.addEventListener("input", () => {
    const intVal = inputSearch.value.toLowerCase();
    const filtered = countryData.filter(country =>
        country.name.common.toLowerCase().includes(intVal)
    );
    renderCountry(filtered);
});

formSelect.addEventListener("change", () => {
    const selectRegion = formSelect.value;
    
    if (selectRegion === "All") {
        renderCountry(countryData);
    } else {
        const filteredCountries = countryData.filter(country => {
            return country.region === selectRegion;
        });
        renderCountry(filteredCountries);
    }
});

fetchCountryData();
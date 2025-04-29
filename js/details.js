const countryDetall = document.querySelector('.country-detal')
let countryName = new URLSearchParams(window.location.search)
    countryName = countryName.get('name')

    async function fetchCountryDetail() {
        try{
            const response = await fetch(`https://restcountries.com/v3.1/all${countryName}`)
            const data = await response.json()
            
            data.forEach((country) =>{
                    console.log(country)
                    const countryName = country.name.common
                    const lang = Object.values()
            });

        }catch(error){
            console.log("Ma'lumolar olib kelishda xatolik",error)
        }

    }
    fetchCountryDetail()
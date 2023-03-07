import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description

  let cities = await fetchCities();
  console.log(cities);

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    let c = await fetch(config.backendEndpoint + "/cities");
    let x = await c.json();
    return x;
  } catch (err) {
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let contentDiv=document.querySelector(".content #data")
  let newCard=document.createElement("a");
  newCard.setAttribute("class","col-6 col-lg-3 mb-5")
  newCard.setAttribute("href",`pages/adventures/?city=${id}`)
  newCard.setAttribute("id",id)
  newCard.innerHTML=`
  <div class="tile">
    <img src="${image}" alt="${city}">
    <div class="tile-text">
      <h4>${city}</h4>
      <p>${description}</p>
    </div>
  </div>
  `
  contentDiv.appendChild(newCard);

}

export { init, fetchCities, addCityToDOM };

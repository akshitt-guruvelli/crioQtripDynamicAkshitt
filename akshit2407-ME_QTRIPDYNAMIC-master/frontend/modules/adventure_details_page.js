import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const searchParams = new URLSearchParams(search);
  // Place holder for functionality to work in the Stubs
  return searchParams.get("adventure");
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    let apiCallPromise = await fetch(
      `${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`
    );
    let apiCall = await apiCallPromise.json();
    return apiCall;
  } catch (err) {
    return null;
  }

  // Place holder for functionality to work in the Stubs
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  let advName = document.getElementById("adventure-name");
  let advSubtitle = document.getElementById("adventure-subtitle");
  let advImages = document.getElementById("photo-gallery");
  let advContent = document.getElementById("adventure-content");

  advName.textContent = adventure.name;
  advSubtitle.textContent = adventure.subtitle;
  advContent.textContent = adventure.content;

  for (let i = 0; i < adventure.images.length; i++) {
    let newChild = document.createElement("div");
    newChild.innerHTML = `
    <img src=${adventure.images[i]} class="activity-card-image">
    `;
    advImages.appendChild(newChild);
  }
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images

  let photoGallery = document.getElementById("photo-gallery");
  photoGallery.innerHTML = "";
  photoGallery.innerHTML = `
    <div id="photo-gallery-carousel" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-indicators" id="carousel-sliders"></div>
      <div class="carousel-inner" id="carousel-images"></div>
      <button class="carousel-control-prev" type="button" data-bs-target="#photo-gallery-carousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
        </button>
      <button class="carousel-control-next" type="button" data-bs-target="#photo-gallery-carousel" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  `;
  let carouselIndicators = document.getElementById("carousel-sliders");
  let carouselImages = document.getElementById("carousel-images");
  let imagesLength = images.length;
  for (let i = 0; i < imagesLength; i++) {
    let newButton = document.createElement("button");
    let newDiv = document.createElement("div");
    newButton.setAttribute("type", "button");
    newButton.setAttribute("data-bs-target", "#photo-gallery-carousel");
    newButton.setAttribute("data-bs-slide-to", `${i}`);
    newButton.setAttribute("aria-label", `slide ${i}`);
    newDiv.setAttribute("class", "carousel-item");
    newDiv.innerHTML = `
      <img src=${images[i]} class="d-block activity-card-image">
    `;
    if (i == 0) {
      newButton.setAttribute("class", "active");
      newButton.setAttribute("aria-current", "true");
      newDiv.setAttribute("class", "carousel-item active");
    }
    carouselIndicators.appendChild(newButton);
    carouselImages.appendChild(newDiv);
  }
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  let soldOut=document.getElementById("reservation-panel-sold-out");
  let available=document.getElementById("reservation-panel-available");
  let costPerHead=document.getElementById("reservation-person-cost");
  if(adventure.available===true){
    available.style.display="block";
    soldOut.style.display="none";
    costPerHead.textContent=adventure.costPerHead;
  }
  else{
    available.style.display="none";
    soldOut.style.display="block";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let reservationCost=document.getElementById("reservation-cost");
  reservationCost.textContent=adventure.costPerHead*persons;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  let form=document.getElementById("myForm");
  form.addEventListener('submit', function(event){
    event.preventDefault();
    const update={
      name: event.target.elements.name.value,
      date: event.target.elements.date.value,
      person: event.target.elements.person.value,
      adventure: adventure.id,
    };
    console.log(update);
    const options={
      method: 'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify(update),
    };
    let postCall = fetch(`${config.backendEndpoint}/reservations/new`,options);
    postCall.then(function(x){
      alert('Success!');
    }).catch(function(err){
      alert('Failed!');
    })
  })
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  let banner=document.getElementById("reserved-banner");
  console.log(adventure.reserved);
  if(adventure.reserved){
    banner.style.display="block";
  }
  else{
    banner.style.display="none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};

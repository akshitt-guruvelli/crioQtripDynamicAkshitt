import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const params = new URLSearchParams(search);
  return params.get("city");
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    let adventuresResponse = await fetch(
      `${config.backendEndpoint}/adventures?city=${city}`
    );
    let adventures = await adventuresResponse.json();
    return adventures;
  } catch (err) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  let adventureCards = document.getElementById("data");
  for (let i = 0; i < adventures.length; i++) {
    const newCard = document.createElement("a");
    newCard.setAttribute("class", "col-6 col-lg-3 my-3");
    newCard.setAttribute("href",`detail/?adventure=${adventures[i].id}`);
    newCard.setAttribute("id",adventures[i].id);

    newCard.innerHTML = `
    <div class="activity-card">
      <img src="${adventures[i].image}" alt="${adventures[i].name}">
      <div class="category-banner">
        ${adventures[i].category}
      </div>
      <div class="activity-card-body w-100 p-3 pb-0">
        <h6>${adventures[i].name}</h6>
        <h6>₹${adventures[i].costPerHead}</h6>
      </div>
      <div class="activity-card-body w-100 p-3 pb-0">
        <h6>Duration</h6>
        <h6>${adventures[i].duration}</h6>
      </div>
    </div>
    `;
    adventureCards.appendChild(newCard);
  }
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let resultList=[]
  resultList=list.filter(function(item){
    if(low<=item.duration && item.duration<=high){
      return item;
    }
  });
  return resultList;
  
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let resultList=[]
  resultList=list.filter(function(item){
    if(categoryList.includes(item.category)){
      return item;
    }
  });
  return resultList;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods

  // Place holder for functionality to work in the Stubs
  if(filters.category.length==0 && filters.duration.length==0){
    return list;
  }
  else if(filters.duration.length==0){
    return filterByCategory(list, filters.category);
  }
  else if(filters.category.length==0){
    let durationArr=filters.duration.split("-");
    let low=Number(durationArr[0]);
    let high=Number(durationArr[1]);
    return filterByDuration(list,low,high);
  }
  else{
    let durationArr=filters.duration.split("-");
    let low=Number(durationArr[0]);
    let high=Number(durationArr[1]);
    let categoryResult=filterByCategory(list, filters.category);
    return filterByDuration(categoryResult,low,high);
  }
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters",JSON.stringify(filters));
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  let localStorageFilters=localStorage.getItem("filters");
  // Place holder for functionality to work in the Stubs
  return JSON.parse(localStorageFilters);
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let durSelect=document.getElementById("duration-select").options;
  for(let i=1; i<5; i++){
    if(durSelect[i].value===filters.duration){
      document.getElementById("duration-select").selectedIndex=i;
    }
  }
  // durSelect=durSelect.selectedIndex;
  let categoryList = filters.category;
  let pillsList=document.getElementById("category-list");
  for(let i=0; i<categoryList.length; i++){
    let newChild=document.createElement("span");
    newChild.setAttribute("class","category-filter");
    newChild.textContent=categoryList[i];
    pillsList.appendChild(newChild);
  }
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};

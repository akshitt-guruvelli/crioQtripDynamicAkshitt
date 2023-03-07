import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  try {
    // 1. Fetch Reservations by invoking the REST API and return them
    let x = await fetch(`${config.backendEndpoint}/reservations/`);
    let reservations=await x.json();
    // Place holder for functionality to work in the Stubs
    return(reservations);
  } catch (err) {
    return null;
  }
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

  console.log(reservations);
  let reservationBanner = document.getElementById("no-reservation-banner");
  let reservationTable = document.getElementById("reservation-table");
  let reservationTableParent = document.getElementById("reservation-table-parent");
  
  if (reservations.length > 0) {
    reservationBanner.style.display = "none";
    reservationTableParent.style.display="block";
    for (let i = 0; i < reservations.length; i++) {
      // let newBtn=document.createElement("a");
      // newBtn.setAttribute("href",`../detail/?adventure=${reservations[i].adventure}`);
      // newBtn.innerHTML=`
      // <button type="button" class="reservation-visit-button">Visit Adventure</button>
      // `;
      let row = document.createElement("tr");
      let date=new Date(reservations[i].date);
      let time = new Date(reservations[i].time);
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      };
      let modifiedTime = time.toLocaleString("en-IN", options);
      modifiedTime = modifiedTime.replace(" at ",", ");
      row.innerHTML = `
    <td>${reservations[i].id}</td>
    <td>${reservations[i].name}</td>
    <td>${reservations[i].adventureName}</td>
    <td>${reservations[i].person}</td>
    <td>${date.toLocaleDateString("en-IN")}</td>
    <td>${reservations[i].price}</td>
    <td>${modifiedTime}</td>
    <th id="${reservations[i]["id"]}"><a href= "../detail/?adventure=${reservations[i]["adventure"]}"><button type = "button" class="reservation-visit-button">Visit Adventure</button></a></th>
    `;
      // let newTd=document.createElement("td");
      // newTd.appendChild(newBtn);
      // row.appendChild(newTd);
      reservationTable.appendChild(row);
    }
  }
  else{
    reservationTableParent.style.display = "none";
    reservationBanner.style.display = "block";
  }
}

export { fetchReservations, addReservationToTable };

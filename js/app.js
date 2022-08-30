const loadPhones = async (searchText, itemCount) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhones(data.data, itemCount);
};

const displayPhones = (phones, itemCount) => {
  //console.log(phones);
  const showAll = document.getElementById("show-all");
  if (itemCount && phones.length > 10) {
    phones = phones.slice(0, 10);
    showAll.classList.remove("d-none");
  } else {
    showAll.classList.add("d-none");
  }
  const errMessage = document.getElementById("err-message");
  if (phones.length === 0) {
    errMessage.classList.remove("d-none");
  } else {
    errMessage.classList.add("d-none");
  }
  const phonesContainer = document.getElementById("phones-container");
  phonesContainer.innerHTML = "";
  phones.forEach((phone) => {
    const phoneDiv = document.createElement("div");
    phoneDiv.classList.add("col");
    phoneDiv.innerHTML = `
    <div class="card p-3">
        <img src=${phone.image} class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${phone.phone_name}</h5>
        <p class="card-text">Using color to add meaning only provides a visual indication, which will not be conveyed to users of assistive technologies</p>
        </div>
        <button onclick="loadPhoneDetail('${phone.slug}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Detail</button>
    </div>
    `;
    phonesContainer.appendChild(phoneDiv);
  });
  toggleSpiner(false);
};

const processSearch = (itemCount) => {
  toggleSpiner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhones(searchText, itemCount);
};

document.getElementById("btn-search").addEventListener("click", function () {
  processSearch(10);
});

const toggleSpiner = (isLoading) => {
  const loadingField = document.getElementById("spiner-field");
  if (isLoading) {
    loadingField.classList.remove("d-none");
  } else {
    loadingField.classList.add("d-none");
  }
};

document.getElementById("btn-show-all").addEventListener("click", function () {
  processSearch();
});

document.getElementById("search-field").addEventListener("keyup", function (e) {
  //console.log(e.key);
  if (e.key == "Enter") {
    processSearch(10);
  }
});

const loadPhoneDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhoneDetail(data.data);
};
const displayPhoneDetail = (phone) => {
  console.log(phone);
  const modalTitle = (document.getElementById(
    "phoneDetailModalLabel"
  ).innerText = `${phone.name}`);
  const modalBody = document.getElementById("modal-body");
  modalBody.innerHTML = `
   <h3>Brand: ${phone.brand}</h3>
   <p>Details: ${
     phone.mainFeatures.memory ? phone.mainFeatures.memory : "Not Found"
   }</p>
   <p>Release Date: ${
     phone.releaseDate ? phone.releaseDate : "Release Date Not Found!"
   }</p>
  `;
};

loadPhones("apple");

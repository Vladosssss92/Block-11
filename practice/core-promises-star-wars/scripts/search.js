// Методы, которые могут пригодиться:
// starWars.searchCharacters(query),
// starWars.searchPlanets(query),
// starWars.searchSpecies(query).
// starWars.getCharactersById(id),
// starWars.getPlanetsById(id),
// starWars.getSpeciesById(id)
// Тут ваш код.
const inputSearch = document.querySelector(".input-search");
const inputGetById = document.querySelector(".input-get-by-id");
const buttonSearch = document.querySelector(".button-search");
const buttonGetById = document.querySelector(".button-get-by-id");
const divContent = document.getElementById("result-container");
const closeInformation = document.querySelector(".delete");
const messageHeader = document.querySelector(".message-header>p");
const divInformation = document.getElementById("content");
const spinner = document.querySelector(".spinner");
const selectSearch = document.querySelector(".select-search");
const selectGetById = document.querySelector(".select-get-by-id");
let innerText;
let searchById;
const notFound = "not found";

const searchForAResource = (search, select, input) => {
  innerText = input.value;
  if (innerText === "") return;
  divContent.style.visibility = "hidden";
  spinner.style.visibility = "visible";
  search(select.value)
    .then((data) => {
      if (searchById) {
        return data;
      } else return data.results[0];
    })
    .then((data) => {
      if (data.homeworld) {
        return getPlanetById(data.homeworld).then((planet) => {
          data.homeworld = planet;
          return data;
        });
      } else return data;
    })
    .catch((error) => {
      messageHeader.innerHTML = notFound;
      divInformation.innerHTML = notFound;
      divContent.style.visibility = "visible";
      console.log(error);
    })
    .then((data) => {
      if (data) {
        messageHeader.innerHTML = data.name;
        divInformation.innerHTML = "";
        for (let element in data) {
          if (data.hasOwnProperty(element)) {
            if (Array.isArray(data[element])) {
              const filmsList = data[element]
                .map((elem) => `<br>${elem}`)
                .join("");
              divInformation.innerHTML += `${element}: ${filmsList}<br>`;
            } else
              divInformation.innerHTML += `${element}: ${data[element]}<br>`;
          }
        }
        divContent.style.visibility = "visible";
      }
    })
    .finally(() => (spinner.style.visibility = "hidden"));
};

const typeOfSearch = (type) => {
  switch (type) {
    case "people":
      return starWars.searchCharacters(innerText);
    case "species":
      return starWars.searchSpecies(innerText);
    case "planets":
      return starWars.searchPlanets(innerText);
  }
};

const typeGetById = (type) => {
  switch (type) {
    case "people":
      return starWars.getCharactersById(innerText);
    case "species":
      return starWars.getSpeciesById(innerText);
    case "planets":
      return starWars.getPlanetsById(innerText);
  }
};

const getPlanetById = (url) => {
  const urlArray = url.split("/");
  const planetId = urlArray[urlArray.length - 2];
  return starWars.getPlanetsById(planetId).then((data) => data.name);
};

buttonSearch.addEventListener("click", () => {
  searchById = false;
  inputGetById.value = "";
  searchForAResource(typeOfSearch, selectSearch, inputSearch);
});

buttonGetById.addEventListener("click", () => {
  searchById = true;
  inputSearch.value = "";
  searchForAResource(typeGetById, selectGetById, inputGetById);
});

closeInformation.addEventListener("click", () => {
  divContent.style.visibility = "hidden";
  inputSearch.value = "";
  inputGetById.value = "";
});

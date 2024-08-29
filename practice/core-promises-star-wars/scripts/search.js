// Методы, которые могут пригодиться:
// starWars.searchCharacters(query),
// starWars.searchPlanets(query),
// starWars.searchSpecies(query).
// starWars.getCharactersById(id),
// starWars.getPlanetsById(id),
// starWars.getSpeciesById(id)
// Тут ваш код.
let searchPerson = document.querySelector(".input");
let buttonSearch = document.querySelector(".button");
function clickBut() {
  console.log(searchPerson.innerHTML);
}

searchPerson.addEventListener("click", clickBut);
buttonSearch.addEventListener("click", clickBut);

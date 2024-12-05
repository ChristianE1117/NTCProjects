const formName = document.getElementById('animalName');
const formSpecies = document.getElementById('animalSpecies');
const formAge = document.getElementById('animalAge');
const formGender = document.getElementById('animalGender');
const formButton = document.getElementById('addAnimalButton');


class Animal {
    constructor(name, species, age, gender)
    {
        this.name = name;
        this.species = species;
        this.age = age;
        this.gender = gender;
        this.baby;
        this.isPregnant = false;
    }
};

const divInput = document.getElementById('animalCards');

const form = document.getElementById('animalForm');

export const zooAnimals = [];

function createAnimalCards()
{
    divInput.innerHTML = "";
    const query = searchInput.value.trim();

    if (!query)
    {
        zooAnimals.forEach((animal, index) => CreateCard(animal, index + 1));
    }
    else
    {
        let animalList = zooAnimals.filter((animal) => animal.name.toLowerCase().includes(query.toLowerCase()));

        animalList.forEach((animal, index) => CreateCard(animal, index + 1));
    }

    setAnimalCount()
}

form.addEventListener('submit', (event) => {

    event.preventDefault();
    let formNameV = document.getElementById('animalName').value;
    let formSpeciesV = document.getElementById('animalSpecies').value;
    let formAgeV = document.getElementById('animalAge').value;
    let formGenderV = document.getElementById('animalGender').value;

    let animal = new Animal(formNameV, formSpeciesV, formAgeV, formGenderV);

    zooAnimals.push(animal);

    createAnimalCards();

    clearForm();

    console.log(zooAnimals);

    console.log(animal);
});


function editAnimal(index)
{
    const animalItem = zooAnimals[index - 1];

    formName.value = animalItem.name;
    formSpecies.value = animalItem.species;
    formGender.value = animalItem.gender;
    formAge.value = animalItem.age;


    formButton.style.display = 'none';
}

function saveAnimal(index) {
    const animalItem = zooAnimals[index - 1];
    
    animalItem.name = document.getElementById('animalName').value;
    animalItem.species = document.getElementById('animalSpecies').value;
    animalItem.gender = document.getElementById('animalGender').value;
    animalItem.age = document.getElementById('animalAge').value;

    formButton.style.display = 'inline';

    createAnimalCards();
    clearForm();
}

function removeAnimal(index)
{
    zooAnimals.splice(index - 1, 1);

    createAnimalCards();
    clearForm();
}

function clearForm()
{
    formName.value = "";
    formSpecies.value = "";
    formAge.value = "";
    formGender.value = "";

    const radioButtons = document.querySelectorAll('input[name="animalLocation"]');

    radioButtons.forEach((button) => {
        button.checked = false;
    });
}

function birthAnimal(parent)
{
    const divE = document.getElementById('pregBtn');

    parent.baby = new Animal(`${formName.value}(${parent.name})`, formSpecies.value, formAge.value, formGender.value)

    zooAnimals.push(parent.baby);

    createAnimalCards();
    clearForm();

    divE.innerHTML = "";
    formButton.style.display = "inline";
}

function makeAnimalPregnant(index)
{
    const divE = document.getElementById('pregBtn');

    const animalItem = zooAnimals[index - 1];
    if (animalItem.gender === "female" || animalItem.gender === "Female")
    {
        let pBtn = document.createElement("Button");
        pBtn.innerHTML = 'Birth Child Animal';
        formButton.style.display = "none";
        pBtn.addEventListener('click', function() {
            birthAnimal(animalItem);
        });
        divE.appendChild(pBtn);
    }
    else
    {
        formButton.style.display = "inline";
        divE.innerHTML = "";

        alert(`This animal is unable to become pregnant`);
    }
    
}

function CreateCard(animal, index)
{
    const card = document.createElement("div");

    const name = document.createElement("h2");
    name.textContent = animal.name;

    const species = document.createElement("p");
    species.textContent = animal.species;

    const age = document.createElement("p");
    age.textContent = animal.age;

    const gender = document.createElement("p");
    gender.textContent = animal.gender;

    // Animal Location Radio Buttons
    const anLocation = document.createElement("p");
    let selectedValue;

    const radioButtons = document.querySelectorAll('input[name="animalLocation"]');

    radioButtons.forEach((button) => {
        if (button.checked) {
            locationsList.locations.forEach((local) => {
                if(local.locationName === button.id)
                {
                    selectedValue = local;
                }
            });
        };
    });

    console.log(selectedValue);

    anLocation.innerHTML = (`Location: ${selectedValue.locationName} <br> Temperature: ${selectedValue.temperature}`);

    const editButton = document.createElement("button");
    editButton.textContent = "Edit Animal";
    editButton.addEventListener('click', () => editAnimal(index));

    const saveButton = document.createElement("button");
    saveButton.textContent = "Save Animal";
    saveButton.addEventListener('click', () => saveAnimal(index));

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener('click', () => removeAnimal(index));

    const makePregnantButton = document.createElement("button");
    makePregnantButton.textContent = "Make Animal Pregnant";
    makePregnantButton.addEventListener('click', () => makeAnimalPregnant(index));

    const Id = document.createElement("p");
    animal.Id = index;
    Id.textContent = animal.Id;

    card.appendChild(name);
    card.appendChild(species);
    card.appendChild(age);
    card.appendChild(gender);
    card.appendChild(anLocation);
    card.appendChild(editButton);
    card.appendChild(saveButton);
    card.appendChild(removeButton);
    card.appendChild(makePregnantButton);

    divInput.appendChild(card);
}

const searchInput = document.getElementById('searchAnimal');

searchInput.addEventListener('change', createAnimalCards);
searchInput.addEventListener('keyup', createAnimalCards);

function setAnimalCount()
{
    let length = zooAnimals.length;

    const countHeading = document.getElementById('listCount');
    countHeading.innerHTML = `There are ${length} animals in the zoo!`;
}

let obj = '{ "locations" : [' +
'{ "locationName":"Safari Zone" , "temperature": "90" },' +
'{ "locationName":"Arctic" , "temperature": "10" },' +
// '{ "locationName":"Jungle" , "temperature": "85" },' +
'{ "locationName":"North American Plains" , "temperature": "80" }]}';

const locationsList = JSON.parse(obj);

function createLocationRadials(locations)
{
    console.log(locations);

    const locationDiv = document.getElementById('location');

    locations.forEach((location) => {

        // Creating the Radio for selection.
        const radial = document.createElement('input');
        radial.type = "radio";
        radial.id = location.locationName;
        radial.name = "animalLocation";

        // Creating the label component
        const label = document.createElement('label');
        label.for = location.locationName;
        label.textContent = location.locationName;
        
        locationDiv.appendChild(radial);
        locationDiv.appendChild(label);
    });
}

createLocationRadials(locationsList.locations);

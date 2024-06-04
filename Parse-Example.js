// This is a JSON string variable:
var dog = '{"name": "Dax", "breed": "Great Pyrenees", "color": "White"}';

// Convert JSON string into JavaScript object:
var JSONstring = JSON.parse(dog);
document.getElementById('myDog').innerHTML = JSONstring.name + " the " + JSONstring.breed;

// JavaScript dictionary object
var dog = {name: "Dax", breed: "Great Pyrenees", color: "White"};

// Convert JavaScript objects to string format:
var JSONstring = JSON.stringify(dog);
document.getElementById('myDog').innerHTML = JSONstring;

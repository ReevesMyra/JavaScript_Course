// localStorage() is a JavaScript method that will store data locally in the web broser, without the need for utilizing a separate database.  The data will persist in the browser's memory and the data will not be deleted even if the web browser has been closed.  Since local storage doesn't get sent back and forth with every HTTP request it speeds up webpage load time.


// Set the data as a key/value pair to be saved locally in your browser:
localStorage.setItem('Name', 'Clifford the big red dog');

// Use the key 'Name' to return its value ('Spot'):
document.getElementById('myDog').innerHTML = localStorage.getItem('Name');
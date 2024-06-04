
// Get the task from input:
function get_todos() {

    // Create an array of tasks that are inputed:
    let todos = new Array;

    // Pull any tasks saved in the web browser's memory:
    let todos_string = localStorage.getItem('todo');

    // If the contents of local storage aren't null, JSON.parse will turn the task(s) into a JavaScript object:
    if (todos_string !== null) {
        todos = JSON.parse(todos_string);
    }
    return todos;
}



// Add the inputed task to the above function's array:
function addTask() {

    // Take the inputed task and create a variable from it's value:
    let task = document.getElementById('task').value;

    let todos = get_todos();

    // Add a new task to the end of the array:
    todos.push(task);

    // Convert the task input into a JSON stringL
    localStorage.setItem('todo', JSON.stringify(todos));
    document.getElementById('task').value = "";

    show ();        // this function is defined below

    return false;
}



// Keep the tasks permanently displayed on the screen:
function show() {

    // Set the task that was retrieved from input above as a variable:
    let todos = get_todos();

    // Create an unordered list:
    let unorderedList = '<ul>';

    // Display the tasks in the order that they were inputed:
    for (let i=0; i < todos.length; i++) {

        // Display the tasks as a list and create an "x" button to close each task:
        unorderedList += '<li>' + todos[i] + '<button class="removeTask" id=" ' + i + ' "> x </button></li>';
    };
    unorderedList += '</ul>';

    // Send the list into the html file via the DOM:
    document.getElementById('todos').innerHTML = unorderedList;
}



// Display the inputed task when the 'Add Item' button is clicked:
document.getElementById('add').addEventListener('click', add);


// Call the show() function to keep the inputs displayed on the screen:
show();
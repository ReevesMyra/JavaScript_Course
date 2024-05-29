const viewOrder = document.getElementById('order');
//Hide button after clicking it
viewOrder.addEventListener('click', () => {
    viewOrder.style.display = 'none';});


function getReceipt() {
    const heading = "<h4>Your Order:</h4>"
    let text;
    let runningTotal = 0;
    let sizeTotal = 0;
    let sizeArray = document.getElementsByClassName("size");
    let sauceArray = document.getElementsByClassName("sauce");
    
    for (let i = 0; i < sizeArray.length; i++) {
        if (sizeArray[i].checked) {
            var selectedSize = sizeArray[i].value;
            text = "<br> <hr>" + heading + "<br>" + selectedSize + "<br>";
        }
    }

    for (let j = 0; j < sauceArray.length; j++) {
        if (sauceArray[j].checked) {
            var sauceChoice = sauceArray[j].value;
            text = text + sauceChoice + " sauce <br> <br>";
        }
    }

    if (selectedSize === 'Personal Pizza') { sizeTotal = 10;}
    else if (selectedSize === 'Small pizza') {sizeTotal = 12;}
    else if (selectedSize === 'Medium pizza') {sizeTotal = 14;}
    else if (selectedSize === 'Large pizza') {sizeTotal = 16;}
    else if (selectedSize === 'Extra Large pizza') {sizeTotal = 18;}

    runningTotal = sizeTotal;

    console.log("Receipt so far = " + text);
    console.log(selectedSize + " with " + sauceChoice + " = $"+sizeTotal + ".00");
    console.log("Subtotal: $" + runningTotal + ".00");
    
    getToppings(runningTotal, text);

}



function getToppings(runningTotal, text) {
    let toppingTotal = 0;
    let selectedTopping = [];
    let toppingArray = document.getElementsByClassName('toppings');
    for (let i = 0; i < toppingArray.length; i++) {
        if (toppingArray[i].checked) {
            selectedTopping.push(toppingArray[i].value);
            console.log("Selected topping: " + toppingArray[i].value);
            text = text + toppingArray[i].value + "<br>"
        }
    }
    let toppingCount = selectedTopping.length;

    // First topping is "free"
    if (toppingCount > 1) { toppingTotal = (toppingCount - 1) * 2; }
    else {toppingTotal = 0;}

    runningTotal = (runningTotal + toppingTotal);
    console.log("Total number of toppings = " + toppingCount);
    console.log(toppingCount + ' toppings at $2 each minus 1 "free" topping = ' + '$' + toppingTotal + '.00');
    console.log("Choices made:" + text);
    console.log("Subtotal: " + "$" + runningTotal + ".00");

    let taxTotal = (runningTotal * 0.09).toFixed(2);

    document.getElementById("showText").innerHTML = text;
    document.getElementById("subtotal").innerHTML = "Subtotal: $" + runningTotal + ".00 <br>";
    document.getElementById("tax").innerHTML = "Tax: $" + taxTotal + "<hr>"; 
    document.getElementById("totalPrice").innerHTML = "Total due: $" + (parseFloat(runningTotal) + parseFloat(taxTotal));
};
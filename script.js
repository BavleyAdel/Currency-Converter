var response, currencies = [];
const convert = document.getElementById("convert"),
    result = document.getElementById("result"),
    from = document.getElementById("from"),
    to = document.getElementById("to");
    let search = document.querySelector(".searchBox");
    let resultFrom , resultTo , searchValue;

onload = getData();
// Event when currency is changed
from.addEventListener('change', (event) => {
    resultFrom = `${event.target.value}`;
});

// Event when currency is changed
to.addEventListener('change', (event) => {
    resultTo = `${event.target.value}`;
});

search.addEventListener('input', updateValue);

// Function for updating value
function updateValue(e) {
    searchValue = e.target.value;
}

async function getData(currency = 'USD') {
    response = await fetch(`https://api.exchangerate-api.com/v4/latest/${currency}`)
    response = await response.json()
    currencies = Object.keys(response["rates"])
    setOptions(currencies, to)
    setOptions(currencies, from)
}

convert.addEventListener("click", async function (e) {
    e.preventDefault();
    let fromRate = response.rates[resultFrom];
    let toRate = response.rates[resultTo];
    let finalValue = document.querySelector(".finalValue");
    let finalAmount = document.getElementById("finalAmount");

    await getData(resultFrom)

    finalValue.innerHTML =
        ((toRate / fromRate) * searchValue).toFixed(2);
    finalAmount.style.display = "block";
});

function setOptions(arr, selector) {
    for (var i = 0; i < arr.length; i++)
        selector.innerHTML += "<option>" + arr[i] + "</option>"
}

function clearVal() {
    window.location.reload();
    document.getElementsByClassName("finalValue").innerHTML = "";
};


let rows = 100;
let cols = 26;

let rowAddressContainer = document.querySelector(".left-row-address-container");
let colAddressContainer = document.querySelector(".top-col-address-container");
let cellContainer = document.querySelector(".cell-container");
let addressBar = document.querySelector(".address-bar")

for (let i = 0; i < rows; i++) {
    let rowAddress = document.createElement("div");
    rowAddress.setAttribute("class", "row-address")
    rowAddress.innerHTML = i + 1;
    rowAddressContainer.appendChild(rowAddress)
}

for (let i = 0; i < cols; i++) {
    let colAddress = document.createElement("div");
    colAddress.setAttribute("class", "col-address")
    colAddress.innerHTML = String.fromCharCode(65 + i);
    colAddressContainer.appendChild(colAddress)
}

for (let i = 0; i < rows; i++) {
    let rowContainer = document.createElement("div");
    rowContainer.setAttribute("class", "cell-row")
    for (let j = 0; j < cols; j++) {
        let cell = document.createElement("div");
        cell.setAttribute("class", "cell")
        cell.setAttribute("contenteditable", "true")
        rowContainer.appendChild(cell);
        addListnerForAddress(cell, i, j);

    }
    cellContainer.appendChild(rowContainer);
}

function addListnerForAddress(cell, i, j) {
    cell.addEventListener("click", (e) => {
        let rowId = i + 1;
        let colId = String.fromCharCode(65 + j);
        addressBar.value = `${colId}${rowId}`
    })
}
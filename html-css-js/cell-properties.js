// Defining Storage Properties
let sheetDB = [];

for (let i = 0; i < rows; i++) {
    let sheetRow = [];
    for (let j = 0; j < cols; j++) {
        let cellProp = {
            fontFamily: "arial",
            fontSize: "12",
            fontColor: "#000000",
            bgColor: "#000000",
            bold: false,
            italic: false,
            underline: false,
            alignment: "left",
            value: "",
            formula: "",
            children: []
        }
        sheetRow.push(cellProp);
    }
    sheetDB.push(sheetRow);
}


// Selectors for cell properties
let fontFamily = document.querySelector(".font-family");
let fontSize = document.querySelector(".font-size");
let fontColor = document.querySelector(".font-color");
let bgColor = document.querySelector(".bg-color");
let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");
let alignment = document.querySelectorAll(".alignment");
let leftAlign = alignment[0];
let centerAlign = alignment[1];
let rightAlign = alignment[2];


let activeColor = "#d1d8e0";
let inactiveColor = "#ecf0f1";


// Application of two-way binding
// Add Event listners to properties
bold.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);

    // Modifcation
    // Data Change
    cellProp.bold = !cellProp.bold;

    // UI Change
    cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
    bold.style.backgroundColor = cellProp.bold ? activeColor : inactiveColor;
})

italic.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);

    // Modifcation 
    // Data Change
    cellProp.italic = !cellProp.italic;

    // UI Change
    cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
    italic.style.backgroundColor = cellProp.italic ? activeColor : inactiveColor;
})

underline.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);

    // Modifcation
    // Data Change
    cellProp.underline = !cellProp.underline;

    // UI Change
    cell.style.textDecoration = cellProp.underline ? "underline" : "none";
    underline.style.backgroundColor = cellProp.underline ? activeColor : inactiveColor;
})

fontFamily.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);

    // Modifcation
    // Data Change
    cellProp.fontFamily = fontFamily.value;

    // UI Change
    cell.style.fontFamily = cellProp.fontFamily;
    fontFamily.value = cellProp.fontFamily;
})

fontSize.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);

    // Modifcation
    // Data Change
    cellProp.fontSize = fontSize.value;

    // UI Change
    cell.style.fontSize = cellProp.fontSize + "px";
    fontSize.value = cellProp.fontSize;
})

fontColor.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);

    // Modifcation
    // Data Change
    cellProp.fontColor = fontColor.value;

    // UI Change
    cell.style.color = cellProp.fontColor;
    fontColor.value = cellProp.fontColor;
})

bgColor.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);

    // Modifcation
    // Data Change
    cellProp.bgColor = bgColor.value;

    // UI Change
    cell.style.backgroundColor = cellProp.bgColor;
    bgColor.value = cellProp.bgColor;
})

alignment.forEach(alignEl => {
    alignEl.addEventListener("click", (e) => {
        let address = addressBar.value;
        let [cell, cellProp] = getCellAndCellProp(address);

        let alignValue = e.target.classList[0];
        // Modifcation
        // Data Change
        cellProp.alignment = alignValue;

        // UI Change
        cell.style.textAlign = cellProp.alignment;

        switch (alignValue) {
            case "left":
                leftAlign.style.backgroundColor = activeColor;
                centerAlign.style.backgroundColor = inactiveColor;
                rightAlign.style.backgroundColor = inactiveColor;
                break;
            case "center":
                leftAlign.style.backgroundColor = inactiveColor;
                centerAlign.style.backgroundColor = activeColor;
                rightAlign.style.backgroundColor = inactiveColor;
                break;
            case "right":
                leftAlign.style.backgroundColor = inactiveColor;
                centerAlign.style.backgroundColor = inactiveColor;
                rightAlign.style.backgroundColor = activeColor;
                break;
            default:
                break;
        }
        bgColor.value = cellProp.bgColor;
    })
})

let allCells = document.querySelectorAll(".cell");
for (let i = 0; i < allCells.length; i++) {
    getSetPredefinedCellProps(allCells[i])
}

function getSetPredefinedCellProps(cell) {
    cell.addEventListener("click", (e) => {
        let address = addressBar.value;
        let [rid, cid] = getRidCidFromAddress(address);
        let cellProp = sheetDB[rid][cid];

        // Apply cell properties
        cell.style.fontFamily = cellProp.fontFamily;
        cell.style.fontSize = cellProp.fontSize + "px";
        cell.style.color = cellProp.fontColor;
        cell.style.backgroundColor = cellProp.bgColor === "#000000" ? "transparent" : cellProp.bgColor;
        cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
        cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
        cell.style.textDecoration = cellProp.underline ? "underline" : "none";
        cell.style.textAlign = cellProp.alignment;


        // Apply properties to cell props UI
        fontFamily.value = cellProp.fontFamily;
        fontSize.value = cellProp.fontSize;
        fontColor.value = cellProp.fontColor;
        bgColor.value = cellProp.bgColor;
        bold.style.backgroundColor = cellProp.bold ? activeColor : inactiveColor;
        italic.style.backgroundColor = cellProp.italic ? activeColor : inactiveColor;
        underline.style.backgroundColor = cellProp.underline ? activeColor : inactiveColor;
        switch (cellProp.alignment) {
            case "left":
                leftAlign.style.backgroundColor = activeColor;
                centerAlign.style.backgroundColor = inactiveColor;
                rightAlign.style.backgroundColor = inactiveColor;
                break;
            case "center":
                leftAlign.style.backgroundColor = inactiveColor;
                centerAlign.style.backgroundColor = activeColor;
                rightAlign.style.backgroundColor = inactiveColor;
                break;
            case "right":
                leftAlign.style.backgroundColor = inactiveColor;
                centerAlign.style.backgroundColor = inactiveColor;
                rightAlign.style.backgroundColor = activeColor;
                break;
            default:
                break;
        }

        // Set formula for selected cell
        let formulaBar = document.querySelector('.formula-bar');
        formulaBar.value = cellProp.formula;
        cell.value = cellProp.value;

    })
}

function getCellAndCellProp(address) {
    let [rid, cid] = getRidCidFromAddress(address);
    // Access cell & storage object
    let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    let cellProp = sheetDB[rid][cid];
    return [cell, cellProp];

}

function getRidCidFromAddress(address) {
    let rid = Number(address.slice(1)) - 1;
    let cid = Number(address.charCodeAt(0)) - 65;
    return [rid, cid];
}


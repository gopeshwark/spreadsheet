for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
        cell.addEventListener("blur", (e) => {
            let address = addressBar.value;
            let [activeCell, cellProp] = getCellAndCellProp(address);
            let cellValue = activeCell.innerText;

            if (cellValue === cellProp.value) return;

            /* If data modified,
            remove parent-child relation,
            clear the formula,
            update children with new modified value*/
            cellProp.value = cellValue;
            removeChildFromParent(cellProp.formula);
            cellProp.formula = "";
            updateChildrenCells(address);
        })
    }
}


// Functionality for Formula
let formulaBar = document.querySelector('.formula-bar');
formulaBar.addEventListener("keydown", (e) => {
    let inputFormula = formulaBar.value;
    if (e.key === 'Enter' && inputFormula) {
        let evaluatedValue = evaluateFormula(inputFormula);

        let address = addressBar.value;
        /* If change in formula, 
        break old parent-child relation, 
        evaluate new formula, and 
        add new parent-cuild relation*/
        let [, childCellProp] = getCellAndCellProp(address);
        if (inputFormula !== childCellProp.formula) removeChildFromParent(childCellProp.formula)

        // To update UI and cell prop in DB 
        setCellUIAndCellProp(evaluatedValue, inputFormula, address);
        console.log(sheetDB);

        // To update child address and formula
        updateChildrenCells(address);
    }
})

function evaluateFormula(formula) {
    let childAddress = addressBar.value;
    let encodedFormula = formula.split(" ");
    for (let i = 0; i < encodedFormula.length; i++) {
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if (asciiValue >= 65 && asciiValue <= 90) {
            let [, parentCellProp] = getCellAndCellProp(encodedFormula[i]);
            encodedFormula[i] = parentCellProp.value;

            // Add child to cell prop;
            parentCellProp.children.push(childAddress);
        }
    }
    let decodedFormula = encodedFormula.join(" ");
    return eval(decodedFormula);
}

function removeChildFromParent(formula) {
    let childAddress = addressBar.value;
    let encodedFormula = formula.split(" ");
    for (let i = 0; i < encodedFormula.length; i++) {
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if (asciiValue >= 65 && asciiValue <= 90) {
            let [, parentCellProp] = getCellAndCellProp(encodedFormula[i]);
            let idx = parentCellProp.children.indexOf(childAddress);
            parentCellProp.children.splice(idx, 1);
        }
    }
}

function updateChildrenCells(parentAddress) {
    let [parentCell, parentCellProp] = getCellAndCellProp(parentAddress);
    let children = parentCellProp.children;

    for (let i = 0; i < children.length; i++) {
        let childAddress = children[i];
        let [childCell, childCellProp] = getCellAndCellProp(childAddress);
        let childFormula = childCellProp.formula;

        let evaluatedValue = evaluateFormula(childFormula);
        setCellUIAndCellProp(evaluatedValue, childFormula, childAddress);
        console.log(childAddress);
        updateChildrenCells(childAddress);
    }
}

function setCellUIAndCellProp(evaluatedValue, formula, address) {
    let [cell, cellProp] = getCellAndCellProp(address);

    // UI Update
    cell.innerText = evaluatedValue;

    // DB Update
    cellProp.value = evaluatedValue;
    cellProp.formula = formula;
}

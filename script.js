/** ad new row */
let node = 0;
$('.btn-add-row').on('click', () => {
    node++;
    let lastRow = $('.item:first');
    let newRow = lastRow.clone();

    /** adding delete button for repeater*/
    if (newRow[0].lastElementChild.getElementsByTagName('button').length === 0) {
        let deleteBtnRow = document.createElement('td');
        let deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'delete';
        deleteBtn.classList = 'btn btn-danger mt-2 btn-sm';
        deleteBtn.addEventListener('click', (e) => handleRowDelete(e));
        deleteBtnRow.appendChild(deleteBtn)
        newRow.append(deleteBtnRow);
    }
    newRow.find('input').val('');
    let insertRow = $('.item:last');
    newRow.insertAfter(insertRow[0]);
    newRow.find('input:first').focus();

    for (let i = 0; i < newRow.length; i++) {
        let item = newRow[i];
        let itemChilds = item.childNodes;
        for (let j = 0; j < itemChilds.length; j++) {
            let tdTags = itemChilds[j];
            let childNode = tdTags.childNodes;
            for (let k = 0; k < childNode.length; k++) {
                if(childNode[k].tagName){
                    /** getting attribute name */
                    let nameAttributes = childNode[k].getAttribute('name');
                    if(nameAttributes){
                        let splitArr = nameAttributes.split('[');
                        let changedNameAttr = `${splitArr[0]}[${node}][${splitArr[2]}`;
                        console.log(changedNameAttr)
                        childNode[k].setAttribute('name', changedNameAttr);
                    }
                }
            }
        }
    }
});

/** delete button handler*/
function handleRowDelete(evt) {
    evt.preventDefault();
    let parentRow = evt.target.parentElement.parentNode;
    parentRow.parentNode.removeChild(parentRow);
}

/** select type change*/
function handleTypeChange(element) {
    let typeDiv = $(element);
    let typeElements = element.parentElement.parentElement.querySelectorAll('input');
    if (typeDiv.val() === 'Hourly') {
        $(typeElements[0]).attr("placeholder", "Price Hourly");
        $(typeElements[1]).attr("placeholder", "No Of Hours");
    } else if (typeDiv.val() === 'Fixed') {
        $(typeElements[0]).attr("placeholder", "Fixed Amount");
        $(typeElements[1]).attr("placeholder", "Fixed Quantity Quantity");
    }
}

/** calculation total */
function calculateTotals(inputTotal) {
    let totalInputs = inputTotal.parentElement.parentElement.querySelectorAll('input');
    let quantity1 = totalInputs[0].value;
    let quantity2 = totalInputs[1].value;
    let totalPrice = totalPriceOfValues(quantity1, quantity2);
    let total = totalInputs[2].value = totalPrice;
    calculateSubtotal();
}

/** calculate subtotal */
function calculateSubtotal() {
    let subTotalElements = document.getElementsByClassName('total');
    let total = 0;
    for (let item of subTotalElements) {
        total = total + parseFloat(item.value);
    }
    document.getElementById('subTotal').value = total;

}

/** functoin of subtal tax and discount */
function subCalculateTotals(item) {
    let lastRow = item.parentElement.parentElement.lastElementChild;
    let subElements = item.parentElement.parentElement.querySelectorAll('input');
    let tax = subElements[1].value;
    let discount = subElements[2].value;
    let subTotalAll = subElements[0].value;
    let getAfterTaxPrice = taxCalculation(subTotalAll, tax);
    let getFinalPrice = getAfterTaxPrice - discount;
    document.getElementById('finalPrice').value = getFinalPrice;

}

/**price of two fixed or hourly quantities*/
function totalPriceOfValues(val1, val2) {
    return val1 * val2;
}

/** tax calculation*/
function taxCalculation(total, taxPrice) {
    let tax = total / 100 * taxPrice;
    return total - tax;
}


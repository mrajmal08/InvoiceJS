/** ad new row */
$('.btn-add-row').on('click', () => {
    let $lastRow = $('.item:last');
    let $newRow = $lastRow.clone();

    $newRow.find('input').val('');
    $newRow.find('td:last').text('$0.00');
    $newRow.insertAfter($lastRow);
    $newRow.find('input:first').focus();
});

/** select type change */
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
    let inputElements = $(inputTotal);
    let lastRow = inputTotal.parentElement.parentElement.lastElementChild;
    let totalInputs = inputTotal.parentElement.parentElement.querySelectorAll('input');
    let quantity1 = totalInputs[0].value;
    let quantity2 = totalInputs[1].value;
    let tax = totalInputs[3].value;
    let discount = totalInputs[4].value;
    let totalPrice = totalPriceOfValues(quantity1, quantity2);
    let total = totalInputs[2].value = totalPrice;
    let getTaxPrice = taxCalculation(total, tax);
    let price = getTaxPrice - discount;
    lastRow.innerHTML = price;
    calculateSubtotal();
}

/** calculate subtotal */
function calculateSubtotal() {
    let subTotalElements = document.getElementsByClassName('subtotal');

    let total = 0;
    for (let item of subTotalElements) {
        total = total + parseFloat(item.innerHTML);
    }
    $('.subTotalPrice').text(total);
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


/** tax calculation function */
function taxFunction(total, tax) {
    var totalTax = total / 100 * tax;
    return totalTax;
}

/** sub total function */
function subTotalFunction(total, totalTax, discount) {
    var result = total + totalTax - discount;
    return result;
}

/** select Invoice */
$(document).ready(function () {
    $("#selectOpt").change(function () {
        var selectOpt = $(this);
        if (selectOpt.val() === "Project" || selectOpt.val() === "Service") {
            if ($("#getOpt").children().length > 0) {
                return false;
            } else {
                $("#getOpt").append('<br>Select Type<select class="browser-default custom-select" id="typeOpt" name="getType"><option selected disabled="">...</option><option value="Hourly">Hourly</option><option value="Fixed">Fixed</option></select>');
            }
        }

        /** get type function */
        $("#typeOpt").change(function () {
            var type = $(this);
            /** if selected value in Hourly*/
            if (type.val() === "Hourly") {
                if ($("#getType:has(input)")) {
                    $('#inputField').remove();

                    $("#getType").append('<div id="inputField">Entere Details<input type="text" class="form-control" id="price" name="price" placeholder="Enter Price Hourly"><input type="text" class="form-control" id="hour" name="hours" placeholder="Enter no of hours">Total <input class="form-control" id="total" name="total"/><input class="form-control" id="tax" name="tax" placeholder="Enter Tax in %"/><input class="form-control" id="discount" name="discount" placeholder="Enter Discount"/>Sub Total<input class="form-control" id="subTotal" name="subTotal"/></div>');

                    $("#inputField").on('change', function () {
                        var price = $('#price').val();
                        var hour = $('#hour').val();
                        var total = price * hour;
                        $('#total').val(total);

                        var tax = $('#tax').val();
                        var discount = $('#discount').val();
                        var totalTax = taxFunction(total, tax)
                        var subTotal = subTotalFunction(total, totalTax, discount);
                        $("#subTotal").val(subTotal);

                    });
                }
                /** if selected value is Fixed*/
            } else if (type.val() === "Fixed") {
                if ($("#getType:has(input)")) {
                    $('#inputField').remove();

                    $("#getType").append('<div id="inputField">Entere Details<input type="text" class="form-control" id="amount" name="amount" placeholder="Enter Amount"><input type="text" class="form-control" id="qty" name="qty" placeholder="Enter Quantity">Total<input class="form-control" id="total" name="total"/><br><input class="form-control" id="tax" name="tax" placeholder="Enter Tax in %"/><input class="form-control" id="discount" name="discount" placeholder="Enter Disocunt Price"/>Sub Total<input class="form-control" id="subTotal" name="subTotal"/></div>');

                    $("#inputField").on('change', function () {
                        var amount = $('#amount').val();
                        var qty = $('#qty').val();
                        var total = qty * amount;
                        $('#total').val(total);

                        var tax = $('#tax').val();
                        var discount = $('#discount').val();
                        var totalTax = taxFunction(total, tax);
                        var subTotal = subTotalFunction(total, totalTax, discount);

                        $("#subTotal").val(subTotal);
                    });
                }
            }
        });
    });
});
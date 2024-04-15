    var input_values = {}
    function perform_tax_calculation() {

        input_values['income'] = parseFloat($("#id_income_input").val()) || 0;
        input_values['extra_income'] = parseFloat($("#id_extra_income_input").val()) || 0;
        input_values['age_group'] = $("#id_age_group").val() || 0;
        input_values['total_deductions'] = parseFloat($("#id_total_deductions_input").val()) || 0;

        var taxable_income = input_values['income'] + input_values['extra_income'] - input_values['total_deductions'];
        // console.log("Total Taxable Income:", taxable_income);

        let tax_rate = 0;
        let age = input_values['age_group']
        if (age === "40-") {
            tax_rate = 0.3;
        } else if (age === "40-60") {
            tax_rate = 0.4;
        } else if (age === "60+") {
            tax_rate = 0.1;
        }

        let tax = 0;
        if (taxable_income > 800000) {
            tax = tax_rate * (taxable_income - 800000);
        }

        let overall_income = taxable_income - tax;
        console.log(overall_income)
        $("#id_taxable_income").html(overall_income)
        $("#id_show_calculated_tax_modal").modal('show')
    }   

    function show_the_error_message(element, error_message) {
        element.html(error_message).show('fast')
    }

    function isConvertibleToInt(str) {
        return /^\d+$/.test(str);
    }

    function get_incomes_validation(element, error_element, obj_key) {
        var element_value = element.val()
        if(!element_value) {
            show_the_error_message(error_element, "Mandatory input field")
            return false;
        } else if(!isConvertibleToInt(element_value)) {
            show_the_error_message(error_element, "Please enter a valid integer value")
            return false;
        } else if (parseInt(element_value)<0) {
            show_the_error_message(error_element, "Please enter a positive integer value")
            return false;
        }
        input_values[obj_key] = element_value
        return true;
    }

    function get_age_group() {
        var element = $("#id_age_group")
        input_values['age_group'] = element.val()
        if(!element.val()) {
            show_the_error_message($("#id_age_group_error"), "Please select age group")
            return false;
        }
        return true;
    }

    function check_input_validations() {
        is_valid_income = get_incomes_validation($("#id_income_input"), $("#id_income_error"), "income")
        is_valid_extra_income = get_incomes_validation($("#id_extra_income_input"), $("#id_extra_income_error"), "extra_income")
        is_valid_total_deductions = get_incomes_validation($("#id_total_deductions_input"), $("#id_total_deductions_input_error"), "total_deductions")
        is_valid_age_group = get_age_group()
        return is_valid_income && is_valid_extra_income && is_valid_age_group && is_valid_total_deductions;
    }

    $("#id_tax_calculation_form").submit(function(e){
        $(".error-message").hide('fast')
        e.preventDefault();
        validation_status = check_input_validations();
        if(validation_status) {
            perform_tax_calculation();
        }
    });

    // Initialize tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })
$().ready(function() {
    var hourBegin, hourEnd, dateBegin, dateEnd, totalBegin, totalEnd, CurrentDate;
    $('input[name="dateBegin"]').on('focus', function() {
        f = $(this);
        removeFormFocus(f);
    });
    $('input[data-name="dateEnd"]').on('focus', function() {
        f = $(this);
        removeFormFocus(f);
    });
    $('#hourBegin').on('blur', function() {
        validateTime(this);
    });
    $('#hourEnd').on('blur', function() {
        validateTime(this);
    });

    $('input[data-name="dateBegin"]').on('blur', function() {
        var dateBeginInput = $(this).val().split('-');
        var dateBegin = new Date(dateBeginInput[2], dateBeginInput[1] - 1, dateBeginInput[0]);
        var hourBeginInput = $("#hourBegin").val().split(':');
        day1 = dateBegin.setHours(hourBeginInput[0], hourBeginInput[1]);
        console.log(dateBegin);
        f = $(this);
        var CurrentDate = new Date().getTime();
        if (dateBegin < CurrentDate) {
            addFormError(f);
        } else {
            removeFormFocus(f);
        }
    })

    $('input[data-name="dateEnd"]').on('blur', function() {
        var dateEndInput = $(this).val().split('-');
        var dateEnd = new Date(dateEndInput[2], dateEndInput[1] - 1, dateEndInput[0]);
        var hourEndInput = $("#hourEnd").val().split(':');
        day2 = dateEnd.setHours(hourEndInput[0], hourEndInput[1]);

        f = $(this);
        if (day2 < day1) {
            addFormError(f);
        } else {
            removeFormFocus(f)
        }
    })

    // listen event keypress on input form-control
    $('.form-control[required]').keypress(function() {
        var currentValue = $(this).val();
        if (!isBlank(currentValue)) {
            $(this).removeClass('error');
            $(this).next('.error').html('');
        }
    });
});

// validate hour
function validateTime(obj) {
    var timeValue = obj.value;
    var mess = "Vui lòng nhập đúng giờ";
    if (timeValue == "" || timeValue.indexOf(":") < 0) {
        return false;
        obj.classList.add('error');
        obj.nextElementSibling.innerText = mess;
    } else {
        var sHours = timeValue.split(':')[0];
        var sMinutes = timeValue.split(':')[1];
        obj.classList.remove('error');

        if (sHours == "" || isNaN(sHours) || parseInt(sHours) > 23) {
            obj.classList.add('error');
            obj.nextElementSibling.innerText = mess;
            return false;
        } else if (parseInt(sHours) == 0) {
            sHours = "00";
            obj.classList.remove('error');
        }

        if (sMinutes == "" || isNaN(sMinutes) || parseInt(sMinutes) > 59) {
            obj.classList.add('error');
            obj.nextElementSibling.innerText = mess;
            return false;
        } else if (parseInt(sMinutes) == 0) {
            sMinutes = "00";
            obj.classList.remove('error');
        }

        obj.value = sHours + ":" + sMinutes;
    }
    return true;
}

function removeFormFocus(form) {
    form.removeClass('error');
    form.next('.error').remove();
}

function addFormError(form) {
    form.addClass('error');
    if (form.attr('data-name') === "dataBegin") {
        form.after('<label class="error">Ngày bắt đầu không được nhỏ hơn ngày hiện tại</label>');
    } else {
        form.after('<label class="error">Ngày kết thúc không được nhỏ hơn ngày bắt đầu</label>');
    }
}

function ValidateForm(formTarget) {
    var isTrue = true;
    $(formTarget).each(function() {
        var value = $(this).val();
        var inputType = $(this).attr('type');
        if (isBlank(value)) {
            $(this).addClass('error').next('.error').text($(this).data('require'));
            isTrue = false;
        } else if (inputType === 'email') {
            if (!validateEmail(value)) {
                $(this).addClass('error').next('.error').text('Nhập đúng định dạng email');
                isTrue = false;
            } else {
                $(this).removeClass('error').next('.error').html('');
            }
        }
    });
    return isTrue;
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function isBlank(str) {
    return !str || str.replace(/\s/g, "") === "";
}
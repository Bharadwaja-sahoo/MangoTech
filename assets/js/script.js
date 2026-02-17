const scriptURL = "https://script.google.com/macros/s/AKfycbwh-QGOjynaytF2VSDM_pKaW5Mtr9WYjP0ZNkEWZA2N9oV5MFnJEkhDyOCqwGzGq5j8/exec";

function validateEmail() {
    const email = document.getElementById("email");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.value.trim() === "") return;

    if (!emailPattern.test(email.value)) {
        email.value = "";
        Swal.fire("Invalid Email", "Please enter a valid email address", "error");
        return false;
    }
}
function validateEmail1() {
    const email = document.getElementById("email1");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.value.trim() === "") return;

    if (!emailPattern.test(email.value)) {
        email.value = "";
        Swal.fire("Invalid Email", "Please enter a valid email address", "error");
        return false;
    }
}

function validatePhone() {
    const phone = document.getElementById("phone");

    if (phone.value.trim() === "") return;

    if (!/^\d{10}$/.test(phone.value)) {
        phone.value = "";
        Swal.fire("Invalid Phone", "Phone number must be exactly 10 digits", "error");
        return false;
    }
}

function onlyNumber(e) {
    const charCode = e.which ? e.which : e.keyCode;

    // Allow backspace, delete
    if (charCode === 8 || charCode === 46) return true;

    // Allow only numbers
    if (charCode < 48 || charCode > 57) {
        e.preventDefault();
        return false;
    }
    return true;
}

function submitInquiry() {
    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const address = document.getElementById("address");
    const joinType = document.getElementById("joinType");

    // FIRST NAME
    if (firstName.value.trim() === "") {
        Swal.fire("Alert", "Please provide First Name", "warning");
        return false;
    }

    // EMAIL
    if (email.value.trim() === "") {
        Swal.fire("Alert", "Please provide Email", "warning");
        return false;
    }

    // PHONE
    if (phone.value.trim() === "") {
        Swal.fire("Alert", "Please provide Phone Number", "warning");
        return false;
    }

    // PLAN
    if (joinType.value.trim() === "") {
        Swal.fire("Alert", "Please select a Plan", "warning");
        return false;
    }

    // DATA OBJECT
    const data = {
        first_name: firstName.value,
        last_name: lastName.value,
        email: email.value,
        phone: phone.value,
        address: address.value,
        join_type: joinType.value
    };

    // LOADING ALERT
    Swal.fire({
        title: "Submitting...",
        text: "Please wait",
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });

    // POST TO GOOGLE SHEET
    fetch(scriptURL, {
        method: "POST",
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(() => {
            Swal.fire("Success", "Inquiry submitted successfully!", "success");
            document.getElementById("contactForm").reset();
            const modal = bootstrap.Modal.getInstance(
                document.getElementById("contactModal")
            );
            modal.hide();
        })
        .catch(() => {
            Swal.fire("Error", "Something went wrong. Try again.", "error");
        });
}

const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbxT6MkbzEmkoDUGiC0sQuW2VoyuQ4tjE7tmHZ_znB--KjpqgNqpCTEwxM_0v_-YnrZ6/exec";

function submitContact() {
    const form = document.getElementById('contactPageForm');
    const firstName = document.getElementById('name');
    const email = document.getElementById('email1');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');

    // FIELD-BY-FIELD VALIDATION
    if (firstName.value.trim() === "") {
        Swal.fire("Alert", "Please provide your Full Name", "warning");
        return false;
    }

    if (email.value.trim() === "") {
        Swal.fire("Alert", "Please provide your Email Address", "warning");
        return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) {
        Swal.fire("Alert", "Please provide a valid Email Address", "warning");
        return false;
    }

    if (subject.value.trim() === "") {
        Swal.fire("Alert", "Please provide the Subject", "warning");
        return false;
    }

    if (message.value.trim() === "") {
        Swal.fire("Alert", "Please write your Message", "warning");
        return false;
    }

    // SUBMIT TO GOOGLE SHEETS
    const formData = {
        full_name: firstName.value.trim(),
        email_id: email.value.trim(),
        subject: subject.value.trim(),
        message: message.value.trim()
    };

    // LOADING ALERT
    Swal.fire({
        title: "Submitting...",
        text: "Please wait",
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });

    fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => {
            if (data.status === "success") {
                Swal.fire("Success", "Your message has been sent!", "success");
                form.reset();
            } else {
                Swal.fire("Error", "Something went wrong. Please try again.", "error");
            }
        })
        .catch(err => {
            Swal.fire("Error", "Cannot connect to Google Sheets.", "error");
            console.error(err);
        });
}
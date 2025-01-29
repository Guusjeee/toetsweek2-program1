
const ticketPrijzen = [15, 10]; 


function createElement(tag, attributes = {}, text = "") {
    const element = document.createElement(tag);
    for (let key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
    if (text) {
        element.textContent = text;
    }
    return element;
}


function generateForm() {
    const main = document.getElementById("mainContent");

    const form = createElement("form", { id: "ticketForm", action: "#", method: "post" });

    const fields = [
        { label: "Naam:", type: "text", id: "name", required: true, placeholder: "Uw naam" },
        { label: "E-mail:", type: "email", id: "email", required: true, placeholder: "Uw e-mail" },
        { label: "Leeftijd (18+ verplicht):", type: "number", id: "age", required: true, min: "18", placeholder: "Uw leeftijd" },
        { label: "Aantal Tickets (€15 per stuk):", type: "number", id: "ticketCount", min: "1", max: "5", value: "1" }
    ];

    
    for (let i = 0; i < fields.length; i++) {
        const div = createElement("div", { class: "form-group" });
        div.appendChild(createElement("label", { for: fields[i].id }, fields[i].label));
        div.appendChild(createElement("input", fields[i]));
        div.appendChild(createElement("span", { class: "error", id: fields[i].id + "Error" }));
        form.appendChild(div);
    }

  
    const discountDiv = createElement("div", { class: "form-group" });
    const discountCheckbox = createElement("input", { type: "checkbox", id: "discount" });
    discountCheckbox.addEventListener("change", updateTotalPrice);
    discountDiv.appendChild(discountCheckbox);
    discountDiv.appendChild(createElement("label", { for: "discount" }, "Ik heb een kortingskaart (-€5 per ticket)"));
    form.appendChild(discountDiv);


    const priceDiv = createElement("h3", {}, "Totaalprijs: €");
    const priceSpan = createElement("span", { id: "totalPrice" }, "15");
    priceDiv.appendChild(priceSpan);
    form.appendChild(priceDiv);

  
    const submitButton = createElement("button", { type: "submit" }, "Ticket Bestellen");
    form.appendChild(submitButton);

   
    form.addEventListener("submit", validateForm);

    main.appendChild(form);
}


function updateTotalPrice() {
    const ticketCount = parseInt(document.getElementById('ticketCount').value) || 0;
    const hasDiscount = document.getElementById('discount').checked;
    const ticketPrice = hasDiscount ? ticketPrijzen[1] : ticketPrijzen[0];

    let totalPrice = 0;
    let i = 0;

    while (i < ticketCount) {
        totalPrice += ticketPrice;
        i++;
    }

    document.getElementById('totalPrice').innerText = totalPrice >= 0 ? totalPrice : 0;
}


function validateForm(event) {
    event.preventDefault();

    let isValid = true;
    const errors = ["name", "email", "age", "ticketCount"];


    for (let i = 0; i < errors.length; i++) {
        document.getElementById(errors[i] + "Error").innerText = "";
    }

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const age = parseInt(document.getElementById('age').value) || 0;
    const ticketCount = parseInt(document.getElementById('ticketCount').value) || 0;

    if (name.length < 2) {
        document.getElementById('nameError').innerText = 'Naam moet minimaal 2 tekens bevatten.';
        isValid = false;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email.match(emailPattern)) {
        document.getElementById('emailError').innerText = 'Voer een geldig e-mailadres in.';
        isValid = false;
    }

    if (age < 18) {
        document.getElementById('ageError').innerText = 'Je moet 18 jaar of ouder zijn om een ticket te bestellen.';
        isValid = false;
    }

    if (ticketCount < 1 || ticketCount > 5) {
        document.getElementById('ticketCountError').innerText = 'Je moet tussen 1 en 5 tickets bestellen.';
        isValid = false;
    }

    if (!isValid) return;

    const totalPrice = document.getElementById('totalPrice').innerText;

    document.getElementById('mainContent').innerHTML = `
        <div class="confirmation">
            <h2>Bedankt voor uw bestelling!</h2>
            <p>U heeft <strong>${ticketCount}</strong> kaarten gereserveerd.</p>
            <p>Het totaalbedrag voor uw bestelling is <strong>€${totalPrice}</strong>.</p>
        </div>
    `;
}

document.addEventListener("DOMContentLoaded", () => {
    generateForm();
    document.getElementById("ticketCount").addEventListener("input", updateTotalPrice);
    document.getElementById("discount").addEventListener("change", updateTotalPrice);
});

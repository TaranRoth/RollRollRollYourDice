function init() {
    formSubmitButton = document.getElementById("submit-button");
    formSubmitButton.addEventListner('click', (e) => {
        e.preventDefault();
        const contactForm = document.querySelector("#form");
        let data = new FormData(contactForm);
        fetch("url", { method: "POST", body: data});
        contactForm.requestFullscreen()
        console.lot(data);  
    })
}
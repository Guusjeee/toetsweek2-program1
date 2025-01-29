const paintings = [
    { name: "The Old Guitarist", image: "kunstwerk/photo1.jpg" },
    { name: "The Weeping Woman", image: "kunstwerk/photo2.jpg" },
    { name: "Le Rêve", image: "kunstwerk/photo3.jpg" },
    { name: "Dove", image: "kunstwerk/dove.jpg" },
    { name: "Girl Before a Mirror", image: "kunstwerk/photo5.jpg" },
    { name: "The Kiss", image: "kunstwerk/photo6.jpeg" },
    { name: "Portrait of Dora Maar", image: "kunstwerk/photo7.jpg" },
    { name: "Bull's Head", image: "kunstwerk/photo8.jpg" },
    { name: "Don Quixote", image: "kunstwerk/photo9.jpg" },
    { name: "Woman with Flower", image: "kunstwerk/photo10.jpg" }
];

function generateGallery() {
    const galleryContainer = document.getElementById("kunst-grid");
    galleryContainer.innerHTML = "";
    
    paintings.forEach(painting => {
        const div = document.createElement("div");
        div.classList.add("kunst");
        div.onclick = () => showInfo(painting.name);
        
        const img = document.createElement("img");
        img.src = painting.image;
        img.alt = painting.name;
        
        div.appendChild(img);
        galleryContainer.appendChild(div);
    });
}

generateGallery();

function showInfo(painting) {
    const modal = document.getElementById("infoModal");
    const title = document.getElementById("paintingTitle");
    const description = document.getElementById("paintingDescription");
    
    const paintingsInfo = {
        "The Old Guitarist": {
            title: "The Old Guitarist (1903)",
            description: "Dit schilderij is gemaakt tijdens Picasso's Blauwe Periode."
        },
        "The Weeping Woman": {
            title: "The Weeping Woman (1937)",
            description: "Een expressief werk dat de pijn van oorlog uitbeeldt."
        },
        "Le Rêve": {
            title: "Le Rêve (1932)",
            description: "Een beroemd schilderij van Picasso dat een dromerig portret laat zien."
        },
        "Dove": {
            title: "Dove (1949)",
            description: "Een iconisch symbool van vrede, geschilderd door Picasso."
        },
        "Girl Before a Mirror": {
            title: "Girl Before a Mirror (1932)",
            description: "Een kleurrijk portret van een meisje dat in de spiegel kijkt."
        },
        "The Kiss": {
            title: "The Kiss (1969)",
            description: "Een abstracte interpretatie van een kus door Picasso."
        },
        "Portrait of Dora Maar": {
            title: "Portrait of Dora Maar (1937)",
            description: "Een portret van Dora Maar, een geliefde en muze van Picasso."
        },
        "Bull's Head": {
            title: "Bull's Head (1942)",
            description: "Een kunstwerk gemaakt van een fietszadel en een stuur."
        },
        "Don Quixote": {
            title: "Don Quixote (1955)",
            description: "Een dynamische inkttekening van de beroemde ridder."
        },
        "Woman with Flower": {
            title: "Woman with Flower (1932)",
            description: "Een kleurrijke weergave van een vrouw met een bloem."
        }
    };
    
    title.innerText = paintingsInfo[painting].title;
    description.innerText = paintingsInfo[painting].description;
    modal.style.display = "flex";
}

function closeModal() {
    document.getElementById("infoModal").style.display = "none";
}

document.getElementById("infoModal").addEventListener("click", function(event) {
    if (event.target === this) {
        closeModal();
    }
});

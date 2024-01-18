// Définition des slides avec leurs images et légendes
const slides = [
	{ image: "slide1.jpg", tagLine: "Impressions tous formats <span>en boutique et en ligne</span>" },
	{ image: "slide2.jpg", tagLine: "Tirages haute définition grand format <span>pour vos bureaux et events</span>" },
	{ image: "slide3.jpg", tagLine: "Grand choix de couleurs <span>de CMJN aux pantones</span>" },
	{ image: "slide4.png", tagLine: "Autocollants <span>avec découpe laser sur mesure</span>" }
];

// Transforme les éléments en variables facilement accessibles
const src = "./assets/images/slideshow";

const arrows = [document.getElementById("arrow_left"), document.getElementById("arrow_right")];
const dots = [];

for (let i = 0; i < slides.length; i++) {
	const dot = document.getElementById("dot-" + (i + 1));
	dots.push(dot);
}

const slide = document.getElementById("slide");
const updateTagLine = (index) => {
	const tagLineElement = document.getElementById("tag-line");
	tagLineElement.innerHTML = slides[index].tagLine;
};
dots.forEach((dot, index) => dot.addEventListener("click", () => {
	const newDot = dots[index];

	// Reset tous les dots sélectionnés (1 seul normalement)
	dots.find(dot => dot.classList.contains("dot_selected")).classList.remove("dot_selected");

	// Sélectionne le dot sur lequel l'utilisateur a cliqué
	newDot.classList.add("dot_selected");

	// Affiche la slide correspondante
	slide.src = `${src}/${slides[index].image}`;

	// Update la tag line
	updateTagLine(index);
}));

arrows.forEach((arrow, index) => arrow.addEventListener("click", () => {
	// Cherche le dot sélectionné
	const currentDot = dots.find(dot => dot.classList.contains("dot_selected"));

	// Trouve quelle flèche a été cliquée
	switchSlides(index === 0 ? "left" : "right", currentDot);
}));

const switchSlides = (direction, currentDot) => {
	const currentIndex = dots.indexOf(currentDot);

	// Utilisation des maths pour créer une boucle en une ligne:
	// (x - y + z) % z sera toujours compris entre 0 et z-1 car:
	// un reste est toujours positif
	// si x = 4, l'expression donne 0
	const newIndex = (direction === "left") ? (currentIndex - 1 + dots.length) % dots.length : (currentIndex + 1) % dots.length;

	// Reset l'ancien dot
	currentDot.classList.remove("dot_selected");

	// Sélectionne le nouveau dot
	dots[newIndex].classList.add("dot_selected");

	// Affiche la nouvelle slide
	slide.src = `${src}/${slides[newIndex].image}`;

	// Update la tag line
	updateTagLine(newIndex);
};
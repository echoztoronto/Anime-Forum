let index = 0;
let slides = document.querySelectorAll(".slide");
let dots = document.querySelectorAll(".dot");
showSlides();

function showSlides() {
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace("dot_on", "");
    }
    index++;
    if (index == slides.length){
        index = 0;
    }    
    slides[index].style.display = "block";  
    dots[index].className += " dot_on";
    setTimeout(showSlides, 3000);
}

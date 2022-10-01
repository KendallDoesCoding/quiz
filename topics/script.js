const dropdown = document.querySelectorAll(".dropdown");

for(i=0; i<dropdown.length; i++){
    dropdown[i].addEventListener("click", visibility);
}

function visibility(e){
    const more = e.target.parentElement.nextElementSibling;
    if(more.classList.contains("hide")){
        more.classList.remove("hide");
        more.classList.add("show");
        more.style.display = "flex";
    }
    else if(more.classList.contains("show")){
        more.classList.remove("show");
        more.classList.add("hide");
        more.style.display = "none";
    }
}
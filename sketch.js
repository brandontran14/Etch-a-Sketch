const container = document.getElementById("container");
const resetbtn = document.getElementById("reset");
const btnselections = Array.from(document.querySelectorAll(".selections"));

//initialize the grid
makerows(16);
//reset the grid
function resetall(){
    while (container.firstChild) {
    container.removeChild(container.firstChild);
    }
    let numrows = prompt("What size grid would you like?");
    makerows(numrows);
    return;
}
//Make the grid
function makerows(rowscols){
    container.style.setProperty('--grid-rows',rowscols);
    container.style.setProperty('--grid-cols',rowscols);
    for(i=0; i<(rowscols**2);i++){
        let cell = document.createElement("div");
        container.appendChild(cell).className = "grid-item";
    }
    return;
}


//draw with a black color
function drawblack(e){
    e.target.style.backgroundColor = 'rgba(0,0,0,1)';
    return;
}

//draw with random colors
function drawrand(e){
    e.target.style.backgroundColor = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)},1)`; 
    return;
}

//draw with shades
function drawshade(e){
    let oldcolor = (e.target.style.backgroundColor == "")? 'rgba(0,0,0,0)' : e.target.style.backgroundColor;
    let newcolor = oldcolor.match(/[.?\d]+/g);
    newcolor[3]=(Number(newcolor[3]) + 0.1);
    e.target.style.backgroundColor = `rgba(${newcolor[0]},${newcolor[1]},${newcolor[2]},${newcolor[3]})`;
    return;
}



//Function for changing colors or drawing 
btnselections.forEach(el => el.addEventListener('click',function(e){
    const gridelements = Array.from(document.querySelectorAll(".grid-item"));
    switch(e.target.id){
        case ("black"):
            gridelements.forEach(griditem => griditem.removeEventListener('mouseover',drawrand));
            gridelements.forEach(griditem => griditem.removeEventListener('mouseover',drawshade));
            gridelements.forEach(griditem => griditem.addEventListener('mouseover',drawblack));
            break;
        case ("random"):
            gridelements.forEach(griditem => griditem.removeEventListener('mouseover',drawblack));
            gridelements.forEach(griditem => griditem.removeEventListener('mouseover',drawshade));
            gridelements.forEach(griditem => griditem.addEventListener('mouseover',drawrand));
            break;
        case("shade"):
            gridelements.forEach(griditem => griditem.removeEventListener('mouseover',drawblack));
            gridelements.forEach(griditem => griditem.removeEventListener('mouseover',drawrand));
            gridelements.forEach(griditem => griditem.addEventListener('mouseover',drawshade));
            break;
        case("reset"):
            gridelements.forEach(griditem => griditem.removeEventListener('mouseover',drawblack));
            gridelements.forEach(griditem => griditem.removeEventListener('mouseover',drawrand));      
            gridelements.forEach(griditem => griditem.removeEventListener('mouseover',drawshade));
            resetall();
            break;
    }
    return;
    })
);


// gridelements.forEach(griditem => griditem.addEventListener('mouseover',colorchooser));
// resetbtn.addEventListener('click',resetall);
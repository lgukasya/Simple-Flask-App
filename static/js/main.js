// Main.js
'use strict';


// URL
const url = 'http://localhost:5000/xml';

// Changes
var select = document.getElementById('select');
var title = document.getElementById('title-header');
var genre = document.getElementById('dish-title');
var list = document.getElementById('ingredients-container');
var preparation = document.getElementById('preparation');
var serving = document.getElementById('serving');
var recipe_info = document.getElementById('recipe_info');
var recipe_list = document.getElementById('recipe-list');

var class_list_item = 'list-group-item';
var img = document.getElementById('img-container');
var spinner = document.getElementById('spinner');
var main = document.getElementById('main');

function loadXML(e) {

    if(e.target.value == 'Select Dish') return;

    var xmlhtpp = new XMLHttpRequest();

    xmlhtpp.onreadystatechange = (() => {

        if(xmlhtpp.readyState == 4 && xmlhtpp.status == 200){ 
            spinner.style.display = "none";
            main.style.display = "block";
            showResponse(xmlhtpp.responseXML.documentElement, e.target.value);
        } else {
            spinner.style.display = "block";
            main.style.display = "none";
        }
    });

    xmlhtpp.open("GET", `${url}?dish=${e.target.value}`, true);
    xmlhtpp.send();
}

function showResponse(data, img_name){

    var r_title = (data.getElementsByTagName('title')[0]) ? data.getElementsByTagName('title')[0].firstChild.nodeValue : "";
    var r_genre = (data.getElementsByTagName('genre')[0]) ? data.getElementsByTagName('genre')[0].firstChild.nodeValue : "";
    var ingredients = (data.getElementsByTagName('ingredient')) ? data.getElementsByTagName('ingredient') : "";
    var r_preparation = (data.getElementsByTagName('preparation')[0]) ? data.getElementsByTagName('preparation')[0].firstChild.nodeValue: "";
    var r_serving = (data.getElementsByTagName('serving')[0]) ? data.getElementsByTagName('serving')[0].firstChild.nodeValue: ""; 
    var r_recipe = (data.getElementsByTagName('recipeinfo')[0]) ? data.getElementsByTagName('recipeinfo')[0].children : "";

    img.style.backgroundImage = `url(/static/xml/recipes/img/${img_name}.png)`;

    list.innerHTML = '';

    for(let i = 0; i < ingredients.length; i++){
        var li = document.createElement('li');
        
        li.innerHTML = ingredients[i].firstChild.nodeValue;
        li.classList.add(class_list_item);

        list.appendChild(li);
    }

    console.log(r_recipe);

    recipe_list.innerHTML = '';

    for(let j = 0; j < r_recipe.length; j++){
        var li = document.createElement('li');
        li.innerHTML = `${r_recipe[j].nodeName}: ${r_recipe[j].innerHTML}`;
        recipe_list.appendChild(li);
    }

    title.innerHTML = r_title;
    genre.innerHTML = r_genre;
    preparation.innerHTML = r_preparation;
    serving.innerHTML = r_serving;

}
for(let i = 0; i < receptes_data.length; i++){
    var option = document.createElement('option');
    option.value = receptes_data[i].name;
    option.innerHTML = receptes_data[i].name;

    select.appendChild(option);
}


select.onchange = loadXML;
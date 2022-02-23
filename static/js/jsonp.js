let global_url = "";

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

function get_list(){
    let tempscript = document.createElement('script');
    tempscript.type = "text/javascript";
    tempscript.src = "http://joanqc.no-ip.biz/iesbalmes/wec/receptes/list_recipes_callback_json.php?callback=loadLlistaReceptesJSONP";
	document.body.appendChild(tempscript);
}

function loadLlistaReceptesJSONP(data) {
	let arrReceptes = JSON.parse(data)
	let sel = document.getElementById("select");
	for (let i=0;i<arrReceptes.length;i++) {
		let option = document.createElement("option")
		option.text = arrReceptes[i].title;
		option.value = arrReceptes[i].file;
		sel.appendChild(option);
	}
}

async function loadXMLDoc_jsonp(url)
{
	global_url = url.target.value;
	let tempscript = document.createElement("script");
	tempscript.type = "text/javascript";
	tempscript.id = "tempscript";
	tempscript.src = "http://joanqc.no-ip.biz/iesbalmes/wec/receptes/read_xml_recipe.php?callback=JSONPHandler&url="+url.target.value;
	document.body.appendChild(tempscript);
}

async function JSONPHandler(value) {
    console.log(value);
    main.style.display = "none";
    spinner.style.display = "block";

	parser = new DOMParser();
	data = parser.parseFromString(value,"text/xml");

    var r_title = (data.getElementsByTagName('title')[0]) ? data.getElementsByTagName('title')[0].firstChild.nodeValue : "";
    var r_genre = (data.getElementsByTagName('genre')[0]) ? data.getElementsByTagName('genre')[0].firstChild.nodeValue : "";
    var ingredients = (data.getElementsByTagName('ingredient')) ? data.getElementsByTagName('ingredient') : "";
    var r_preparation = (data.getElementsByTagName('preparation')[0]) ? data.getElementsByTagName('preparation')[0].firstChild.nodeValue: "";
    var r_serving = (data.getElementsByTagName('serving')[0]) ? data.getElementsByTagName('serving')[0].firstChild.nodeValue: ""; 
    var r_recipe = (data.getElementsByTagName('recipeinfo')[0]) ? data.getElementsByTagName('recipeinfo')[0].children : "";

    console.log(r_title);
    await new Promise(r => setTimeout(r, 1000));
    main.style.display = "block";
    spinner.style.display = "none";

    title.innerHTML = r_title;
    img.style.backgroundImage = `url(http://joanqc.no-ip.biz/iesbalmes/wec/receptes/recipes22/img/${global_url.replace('xml','png')})`;
    console.log(img.style.backgroundImage);

    list.innerHTML = '';

    for(let i = 0; i < ingredients.length; i++){
        var li = document.createElement('li');
        
        li.innerHTML = ingredients[i].firstChild.nodeValue;
        li.classList.add(class_list_item);
        list.appendChild(li);
    }

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

document.body.onload = get_list;
select.onchange = loadXMLDoc_jsonp;
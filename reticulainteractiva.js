// Inert polyfill https://github.com/GoogleChrome/inert-polyfill

window.addEventListener("load",function(){function h(a,b,c){if(0>b){if(a.previousElementSibling){for(a=a.previousElementSibling;a.lastElementChild;)a=a.lastElementChild;return a}return a.parentElement}if(a!=c&&a.firstElementChild)return a.firstElementChild;for(;null!=a;){if(a.nextElementSibling)return a.nextElementSibling;a=a.parentElement}return null}function g(a){for(;a&&a!==document.documentElement;){if(a.hasAttribute("inert"))return a;a=a.parentElement}return null}(function(a){var b=document.createElement("style");
b.type="text/css";b.styleSheet?b.styleSheet.cssText=a:b.appendChild(document.createTextNode(a));document.body.appendChild(b)})("/*[inert]*/[inert]{position:relative!important;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;pointer-events:none}[inert]::before{content:'';display:block;position:absolute;top:0;left:0;right:0;bottom:0}");var c=0;document.addEventListener("keydown",function(a){c=9===a.keyCode?a.shiftKey?-1:1:0});document.addEventListener("mousedown",
function(){c=0});document.body.addEventListener("focus",function(a){var b=a.target,f=g(b);if(f){if(document.hasFocus()&&0!==c){var d=document.activeElement,e=new KeyboardEvent("keydown",{keyCode:9,which:9,key:"Tab",code:"Tab",keyIdentifier:"U+0009",shiftKey:!!(0>c),bubbles:!0});Object.defineProperty(e,"keyCode",{value:9});document.activeElement.dispatchEvent(e);if(d!=document.activeElement)return;for(d=f;;){d=h(d,c,f);if(!d)break;a:{e=b;if(!(0>d.tabIndex)&&(d.focus(),document.activeElement!==e)){e=
!0;break a}e=!1}if(e)return}}b.blur();a.preventDefault();a.stopPropagation()}},!0);document.addEventListener("click",function(a){g(a.target)&&(a.preventDefault(),a.stopPropagation())},!0)});


// https://github.com/Bowserinator/Periodic-Table-JSON

var elements = {
    "elements": [{
        "nombre" : "Cálculo diferencial",
        "horas" : "Horas totales 5",
        "horasAula" : "Horas Aula: 3",
        "horasLab"  : "Horas Lab: 2",
        "semestre"  : 1,
        "xpos" : 1,
        "ypos" : 1
    },
    {
      "nombre" : "Fundamentos de programación",
      "horas" : "Horas totales 5",
      "horasAula" : "Horas Aula: 3",
      "horasLab"  : "Horas Lab: 2",
      "semestre"  : 1,
      "xpos" : 1,
      "ypos" : 2
  },
    {
      "nombre" : "Taller de etica",
      "horas" : "Horas totales 5",
      "horasAula" : "Horas Aula: 3",
      "horasLab"  : "Horas Lab: 2",
      "semestre"  : 1,
      "xpos" : 1,
      "ypos" : 3
  },
  {
    "nombre" : "Matemáticas discretas",
    "horas" : "Horas totales 5",
    "horasAula" : "Horas Aula: 3",
    "horasLab"  : "Horas Lab: 2",
    "semestre"  : 1,
    "xpos" : 1,
    "ypos" : 4
  },

  {
  "nombre" : "Taller de administración",
  "horas" : "Horas totales 5",
  "horasAula" : "Horas Aula: 3",
  "horasLab"  : "Horas Lab: 2",
  "semestre"  : 1,
  "xpos" : 1,
  "ypos" : 5
  },

  {
    "nombre" : "Fundamentos de investigación",
    "horas" : "Horas totales 5",
    "horasAula" : "Horas Aula: 3",
    "horasLab"  : "Horas Lab: 2",
    "semestre"  : 1,
    "xpos" : 1,
    "ypos" : 6
  },

  {
    "nombre" : "Fundamentos de investigación 2",
    "horas" : "Horas totales 5",
    "horasAula" : "Horas Aula: 3",
    "horasLab"  : "Horas Lab: 2",
    "semestre"  : 2,
    "xpos" : 2,
    "ypos" : 1
  },

    ]
}

// Global variable for the dialog close
var DialogTrigger;

function ParseElements(data, elmID) {
  try {
    // Use this if the JSON is coming over the wire
    // var JSONdata = JSON.parse(data);
    var JSONdata = data;
    // Get the container that will hold our table
    var theContainer = document.getElementById(elmID);
    // Clear the placeholder non-JS content
    theContainer.innerHTML = "";
    // Create an <ol> to contain it all and add it to the page
    var ol = document.createElement("ol");
    ol.setAttribute("id","Table");
    theContainer.appendChild(ol);
    // Grab the JSON nodes
    var filteredNodes = JSONdata.elements;
    // Blank category array
    var catLookup = {};
    var catArray = [];
    // Loop through the elements nodes
    for (var a = 0; a < filteredNodes.length; a++) {
      var json = filteredNodes[a];
      console.log(filteredNodes[a])
      // Create the <li>, give it an id and row/col info
      var elementNode = document.createElement("li");
      elementNode.setAttribute("id",json.nombre);
      elementNode.classList.add("row" + json.ypos);
      elementNode.classList.add("col" + json.xpos);
      // Get the category and concatenate into the class
      var rawCat = json.semestre;
      var stringCat = rawCat;
      //stringCat = stringCat.split(' ').join('_');
      //stringCat = stringCat.split(',').join('');
      elementNode.classList.add("cat-" + stringCat);
      
      // Make the name container and give it an id
      var nameDiv = document.createElement("div");
      nameDiv.setAttribute("id","name" + json.nombre);
      nameDiv.innerHTML = json.nombre; //Este cambia el valor central de cada recuadro
      // Make tye symbol container
      var symbolDiv = document.createElement("div"); //Cambiar nombre de la variable
      symbolDiv.innerHTML = json.semestre;
      var hrsTotales = document.createElement("div"); //Corresponde a hrsTotales - HrsAulasDiv + HrsLabDiv
      hrsTotales.innerHTML = json.horas;
      var hrsAulaDiv = document.createElement("div"); //  Corresponde a HrsAulaDiv
      hrsAulaDiv.innerHTML = json.horasAula;    //Corresponde a HrsAulaDiv
      var hrsLabDiv = document.createElement("div"); //  Corresponde a HrsLabDiv
      hrsLabDiv.innerHTML = json.horasLab;
      
      // Make the button and give it an id and ARIA bits
      var detailButton = document.createElement("button");
      detailButton.innerHTML = "details.";
      detailButton.setAttribute("type","button");
      detailButton.setAttribute("id","btn" + json.nombre);
      var labelledby = "name" + json.nombre + " btn" + json.nombre;
      detailButton.setAttribute("aria-labelledby",labelledby);
      detailButton.setAttribute("onclick","OpenDialog(this.id,'" + json.nombre + "');");
      // Add all the nodes to the <li>
      //elementNode.appendChild(numberDiv);
      elementNode.appendChild(symbolDiv);
      elementNode.appendChild(nameDiv);
      elementNode.appendChild(hrsTotales);
      elementNode.appendChild(hrsAulaDiv); //Se debe cambiar hrsAulaDiv
      elementNode.appendChild(hrsLabDiv);
      
      elementNode.appendChild(detailButton);
      // Add the <li> to the <ol>
      ol.appendChild(elementNode);
      // Loop through the category and add distinct to array
      if (!(rawCat in catLookup)) {
        catLookup[rawCat] = 1;
        catArray.push(rawCat);
        // console.log(rawCat);
      }
    }
    // Create a <dl> to hold categories
    var dl = document.createElement("dl");
    for (var i = 0; i < catArray.length; i++) {
      var catText = catArray[i];
      var catString;
      //catString = catText.split(' ').join('_');
      //catString = catString.split(',').join('');
      catString = "cat-" + catString;
      console.log(catString);
      // Make the color container and class it
      var dt = document.createElement("dt");
      dt.classList.add(catString);
      // Make the category container
      var dd = document.createElement("dd");
      dd.innerHTML = catText;
      dd.setAttribute("id",catString);
      // Make the button
      var showButton = document.createElement("button");
      showButton.innerHTML = "highlighting";
      showButton.setAttribute("type","button");
      showButton.setAttribute("onmouseover","ToggleStyleBlock('" + catString + "','show');");
      showButton.setAttribute("onfocus","ToggleStyleBlock('" + catString + "','show');");
      showButton.setAttribute("onmouseout","ToggleStyleBlock('','hide');");
      showButton.setAttribute("onblur","ToggleStyleBlock('','hide');");
      showButton.setAttribute("id","btn-" + catString);
      var labelledby = " btn-" + catString + " " + catString;
      showButton.setAttribute("aria-labelledby",labelledby);
      // Append these to the <dl>
      dt.appendChild(showButton);
      dl.appendChild(dt);
      dl.appendChild(dd);
    }
    // Create a new <li>
    var keyItem = document.createElement("li");
    keyItem.setAttribute("role","presentation");
    // keyItem.setAttribute("aria-hidden","true");
    keyItem.setAttribute("id","Key");
    // Give it some context
    var h2 = document.createElement("h2");
    h2.innerHTML = "Category key:";
    // Add the context text
    keyItem.appendChild(h2);
    // Add the new list to it
    keyItem.appendChild(dl);
    // Add this entire mess to the <ol>
    ol.appendChild(keyItem);
  } catch (e) {
    console.log("ParseElements(): " + e);
  }
}
ParseElements(elements, "Elements");


function ToggleStyleBlock(strClass, showhide) {
  try {
    if (showhide == "show") {
      // Create a style block
      var styleBlock = document.createElement("style");
      styleBlock.setAttribute("id","ShowCat");
      document.head.appendChild(styleBlock);
      styleBlock.sheet.insertRule(
        "#Elements li:not(#Key):not(." + strClass + ") { background-color: #999; opacity: .5; }",0
      );
      styleBlock.sheet.insertRule(
        "@media screen and (prefers-color-scheme: dark) { #Elements li:not(#Key):not(." + strClass + ") { background-color: #333; opacity: .5; } }",1
      );
      styleBlock.sheet.insertRule(
        "@media screen and (-ms-high-contrast: active) { #Elements li:not(#Key):not(." + strClass + ") { opacity: .25; } }",2
      );
    } else {
      var node = document.getElementById("ShowCat");
      node.parentNode.removeChild(node);
    }
  } catch (e) {
    console.log("ToggleStyleBlock(): " + e);
  }
}

function OpenDialog(eID,elName) {
  try {
    DialogTrigger = eID;
    // Get all the elements to manipulate
    var body = document.getElementsByTagName("body");
    var landmarks = document.querySelectorAll("header, main, footer");
    var overlay = document.getElementById("Overlay");
    var dialog = document.getElementById("Dialog");
    var heading = document.getElementById("DialogName");
    var closeBtn = document.getElementById("DialogClose");
    // Set the heading
    heading.innerHTML = elName;
    // Call the function to populate the dialog
    ParseElementDetail(elements,"ElementDetail",elName);
    // Hide the content regions from AT
    for (var i = 0; i < landmarks.length; i++) {
      landmarks[i].setAttribute("aria-hidden","true");
      landmarks[i].setAttribute("inert","");
    }
    // Hide the content behind the overlay
    overlay.style.display = "block";
    // Add click handler to overlay
    overlay.setAttribute("onclick","CloseDialog('" + eID + "');");
    // Kill the page scroll
    body[0].style.overflow = "hidden";
    // Set the dialog to modal
    dialog.setAttribute("aria-modal","true");
    // dialog.setAttribute("data-id",eID);
    dialog.removeAttribute("hidden"); 
    // Put focus on the close button
    // Normally I would put it on the modal, but this fits
    closeBtn.setAttribute("onclick","CloseDialog('" + eID + "');");
    closeBtn.focus();
  } catch (e) {
    console.log("OpenDialog(): " + e);
  }
}

function CloseDialog(eID) {
  try {
    // Get all the elements to manipulate
    var body = document.getElementsByTagName("body");
    var landmarks = document.querySelectorAll("header, main, footer");
    var overlay = document.getElementById("Overlay");
    var dialog = document.getElementById("Dialog");
    var triggerBtn = document.getElementById(eID);
    // Make the regions available to AT
    for (var i = 0; i < landmarks.length; i++) {
      landmarks[i].removeAttribute("aria-hidden");
      landmarks[i].removeAttribute("inert");
    }
    // Remove the overlay
    overlay.style.display = "none";
    // Return the scrollbar
    body[0].style.overflow = "auto";
    // Kill the dialog
    dialog.removeAttribute("aria-modal");
    dialog.removeAttribute("data-id");
    dialog.setAttribute("hidden","");
    // Return focus to trigger
    triggerBtn.focus();
  } catch (e) {
    console.log("CloseDialog(): " + e);
  }
}

function ParseElementDetail(data, elmID, elName) {
  try {
    // Get the container that will hold our table
    var theContainer = document.getElementById(elmID);
    // Clear the placeholder non-JS content
    theContainer.innerHTML = "";
    // Use this if the JSON is coming over the wire
    // var JSONdata = JSON.parse(data);
    var JSONdata = data;
    // Grab the JSON nodes
    var filteredNodes = JSONdata.elements;
    // Loop through the elements nodes
    for (var a = 0; a < filteredNodes.length; a++) {
      var json = filteredNodes[a];
      if (json.name == elName) {
        // Summary
        var p = document.createElement("p");
        p.innerHTML = json.summary;
        theContainer.appendChild(p);
        // Create a <dl> to hold categories
        var dl = document.createElement("dl");
        // Symbol
        if (json.symbol != undefined) {
          var dt = document.createElement("dt");
          dt.innerHTML = "Symbol";
          var dd = document.createElement("dd");
          dd.innerHTML = json.symbol;
          dl.appendChild(dt);
          dl.appendChild(dd);
        }
        // Atomic mass
        if (json.atomic_mass != undefined) {
          var dt = document.createElement("dt");
          dt.innerHTML = "Atomic mass";
          var dd = document.createElement("dd");
          dd.innerHTML = json.atomic_mass;
          dl.appendChild(dt);
          dl.appendChild(dd);
        }
        // Appearance
        if (json.appearance != undefined) {
          var dt = document.createElement("dt");
          dt.innerHTML = "Appearance";
          var dd = document.createElement("dd");
          dd.innerHTML = json.appearance;
          dl.appendChild(dt);
          dl.appendChild(dd);
        }
        // Category
        if (json.category != undefined) {
          var dt = document.createElement("dt");
          dt.innerHTML = "Category";
          var dd = document.createElement("dd");
          dd.innerHTML = json.category;
          dl.appendChild(dt);
          dl.appendChild(dd);
        }
        // Density
        if (json.density != undefined) {
          var dt = document.createElement("dt");
          dt.innerHTML = "Density";
          var dd = document.createElement("dd");
          dd.innerHTML = json.density + " g/L";
          dl.appendChild(dt);
          dl.appendChild(dd);
        }
        // Boil
        if (json.boil != undefined) {
          var dt = document.createElement("dt");
          dt.innerHTML = "Boiling Point";
          var dd = document.createElement("dd");
          dd.innerHTML = Number(json.boil).toLocaleString() + "K";
          dl.appendChild(dt);
          dl.appendChild(dd);
        }
        // Melt
        if (json.melt != undefined) {
          var dt = document.createElement("dt");
          dt.innerHTML = "Melting Point";
          var dd = document.createElement("dd");
          dd.innerHTML = Number(json.melt).toLocaleString() + "K";
          dl.appendChild(dt);
          dl.appendChild(dd);
        }
        // Phase
        if (json.phase != undefined) {
          var dt = document.createElement("dt");
          dt.innerHTML = "At room temperature";
          var dd = document.createElement("dd");
          dd.innerHTML = json.phase;
          dl.appendChild(dt);
          dl.appendChild(dd);
        }
        // Molar heat
        if (json.molar_heat != undefined) {
          var dt = document.createElement("dt");
          dt.innerHTML = "Molar heat";
          var dd = document.createElement("dd");
          dd.innerHTML = json.molar_heat + " (mol*K)";
          dl.appendChild(dt);
          dl.appendChild(dd);
        }
        // Discovered
        if (json.discovered_by != undefined) {
          var dt = document.createElement("dt");
          dt.innerHTML = "Discovered by";
          var dd = document.createElement("dd");
          dd.innerHTML = json.discovered_by;
          dl.appendChild(dt);
          dl.appendChild(dd);
        }
        // Named
        if (json.named_by != undefined) {
          var dt = document.createElement("dt");
          dt.innerHTML = "Named by";
          var dd = document.createElement("dd");
          dd.innerHTML = json.named_by;
          dl.appendChild(dt);
          dl.appendChild(dd);
        }
        theContainer.appendChild(dl);
        // Source
        if (json.source != undefined) {
          var p = document.createElement("p");
          var a = document.createElement("a");
          a.setAttribute("href",json.source);
          a.innerHTML = "Source";
          p.appendChild(a);
          theContainer.appendChild(p);
        }
      }
    }
  } catch (e) {
    console.log("ParseElementDetail(): " + e);
  }
}

document.onkeydown = function(evt) {
  evt = evt || window.event;
  var isEscape = false;
  if ("key" in evt) {
    isEscape = evt.key == "Escape" || evt.key == "Esc";
  } else {
    isEscape = evt.keyCode == 27;
  }
  if (isEscape) {
    CloseDialog(DialogTrigger);
  }
};

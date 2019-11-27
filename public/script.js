//nav bar function
function openNav() {
    document.querySelector("#main").style.marginLeft = "25%";
    document.querySelector("#mySidenav").style.width = "25%";   
}

function closeNav() {
    document.querySelector("#main").style.marginLeft = "0";
    document.querySelector("#mySidenav").style.width = "0";
}
function openRightNav() {
    document.querySelector("#main").style.marginRight = "25%";
    document.querySelector("#mySidenavRight").style.width = "25%";
}

function closeRightNav() {
    document.querySelector("#main").style.marginRight = "0";
    document.querySelector("#mySidenavRight").style.width = "0";
}
//----------------------------------------------------------------------
/* Loop through all dropdown buttons to toggle between hiding and showing its dropdown content - This allows the user to have multiple dropdowns without any conflict */
var dropdown = document.querySelectorAll(".dropdown-btn");
//var i;

for (let i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function() {
  this.classList.toggle("active_DropDown");
  let dropdownContent = this.nextElementSibling;
  if (dropdownContent.style.display === "block") {
    dropdownContent.style.display = "none";
  } else {
    dropdownContent.style.display = "block";
  }
  });
}


//--------------------------------------------------------------
//drag and drop function
//below specify what should happen when the element is dragged.


function dragstart_handler(ev) {
 // Add this element's id to the drag payload so the drop handler will
 // know which element to add to its tree
    ev.dataTransfer.setData("text/html", ev.target.id);
    ev.dataTransfer.dropEffect = "move";
    
//    this will add EL to the main element
    let canvasElement = document.querySelector("#main");
    let str = ev.target.id;
    let n = str.search(/Sheets_/);
    if(n != -1){
//        console.log("Found The Sheet!");
        canvasElement.addEventListener("dragenter",function(){
            this.style.backgroundColor = "#f39c12";
        });
        canvasElement.addEventListener("dragleave",function(){
            this.style.backgroundColor = "red";
        });
        canvasElement.addEventListener("drop",function(){
            this.style.backgroundColor = "#333";
        });
    } else {
        console.log("regex not working");
    }
    
}

function drop_handler(ev) {
    ev.preventDefault();
 // Get the id of the target and add the moved element to the target's DOM
    let data = ev.dataTransfer.getData("text/html");
//    this will create a new div element
    let new_element = document.createElement("DIV");
//    this will create a textnode for the above div element
    let new_textNode = document.createTextNode(document.getElementById(data).textContent);

//    let newid = "new"+data;
//// Change the id attribute of the newly created element:    
    new_element.removeAttribute("id");
    new_element.classList.add('mainDrag');

    new_element.appendChild(new_textNode);
    
    ev.target.appendChild(new_element);
    
    //Make the DIV element draggagle:
    
    let dragItem = document.querySelectorAll(".mainDrag");
    let container = document.querySelector("#main");
    
    for(let i = 0; i < dragItem.length; i++){
        dragElement(dragItem[i], container);
    }
    
    let params = {"key":data};
//    now we will post the sheet name to mongodb and fetch the result in a table
    dynamicPost("/dataSource", params);
    
}

function dragover_handler(ev) {
 ev.preventDefault();
 ev.dataTransfer.dropEffect = "move";
}

function dragElement(dragItem, container) {
    let active = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;

    container.addEventListener("touchstart", dragStart, false);
    container.addEventListener("touchend", dragEnd, false);
    container.addEventListener("touchmove", drag, false);

    container.addEventListener("mousedown", dragStart, false);
    container.addEventListener("mouseup", dragEnd, false);
    container.addEventListener("mousemove", drag, false);

    function dragStart(e) {
      if (e.type === "touchstart") {
        initialX = e.touches[0].clientX - xOffset;
        initialY = e.touches[0].clientY - yOffset;
      } else {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
      }
        
      if (e.target === dragItem) {
        active = true;
      }
    }

    function dragEnd(e) {
      initialX = currentX;
      initialY = currentY;

      active = false;
    }

    function drag(e) {
      if (active) {
      
        e.preventDefault();
      
        if (e.type === "touchmove") {
          currentX = e.touches[0].clientX - initialX;
          currentY = e.touches[0].clientY - initialY;
        } else {
          currentX = e.clientX - initialX;
          currentY = e.clientY - initialY;
        }

        xOffset = currentX;
        yOffset = currentY;

        setTranslate(currentX, currentY, dragItem);
      }
    }

    function setTranslate(xPos, yPos, el) {
      el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
    }
}


/**
 * sends a request to the specified url from a form. this will change the window location.
 * @param {string} path the path to send the post request to
 * @param {object} params the paramiters to add to the url
 * @param {string} [method=post] the method to use on the form
 */
function dynamicPost(path, params, method='post') {

  // The rest of this code assumes you are not using a library.
  // It can be made less wordy if you use one.
  const form = document.createElement('form');
  form.method = method;
  form.action = path;
  form.enctype = "text/plain";

  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const hiddenField = document.createElement('input');
      hiddenField.type = 'hidden';
      hiddenField.name = key;
      hiddenField.value = params[key];
      form.appendChild(hiddenField);
    }
  }

  document.body.appendChild(form);
  form.submit();
}
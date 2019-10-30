//nav bar function
function openNav() {
    document.getElementById("main").style.marginLeft = "25%";
    document.getElementById("mySidenav").style.width = "25%";   
}

function closeNav() {
    document.getElementById("main").style.marginLeft = "0";
    document.getElementById("mySidenav").style.width = "0";
}
function openRightNav() {
    document.getElementById("main").style.marginRight = "25%";
    document.getElementById("mySidenavRight").style.width = "25%";
}

function closeRightNav() {
    document.getElementById("main").style.marginRight = "0";
    document.getElementById("mySidenavRight").style.width = "0";
}
//----------------------------------------------------------------------
/* Loop through all dropdown buttons to toggle between hiding and showing its dropdown content - This allows the user to have multiple dropdowns without any conflict */
var dropdown = document.getElementsByClassName("dropdown-btn");
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

//var dragElem;

function dragstart_handler(ev) {
 // Add this element's id to the drag payload so the drop handler will
 // know which element to add to its tree
    ev.dataTransfer.setData("text/html", ev.target.id);
    ev.dataTransfer.dropEffect = "move";
}

function drop_handler(ev) {
    ev.preventDefault();
 // Get the id of the target and add the moved element to the target's DOM
    let data = ev.dataTransfer.getData("text/html");
    let cln = document.getElementById(data).cloneNode(true);
    
    console.log(document.getElementById(data).innerHTML);

    let newid = "new"+data;
//// Change the id attribute of the newly created element:    
    cln.setAttribute( 'id', newid);
    cln.setAttribute( 'style', "position: absolute;z-index: 9;border: 1px solid #d3d3d3;background-color: #f1f1f1;");
    cln.ondragstart = "return false;"; //clear ondragstart attribute
    cln.draggable = false; //clear draggable event
    ev.target.appendChild(cln);
    
//    this function will take sheet name as input and display the table on the html table
//    
//    let worksheet = document.getElementById("worksheet").value;
//        
////        
//    
//    console.log(worksheet);
    
    
    
    
    
    
    //Make the DIV element draggagle:
    //this will run the dragelement
    dragElement(cln);

    function dragElement(elmnt) {
          let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
          if (elmnt) {
            /* if present, the header is where you move the DIV from:*/
            elmnt.onmousedown = dragMouseDown;
          } else {
            /* otherwise, move the DIV from anywhere inside the DIV:*/
            elmnt.onmousedown = dragMouseDown;
          }

      function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
          }

          function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
          }

          function closeDragElement() {
            /* stop moving when mouse button is released:*/
            document.onmouseup = null;
            document.onmousemove = null;
          }
        }
    
}

function dragover_handler(ev) {
 ev.preventDefault();
 ev.dataTransfer.dropEffect = "move";
}


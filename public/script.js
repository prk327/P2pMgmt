//nav bar function
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}
function openRightNav() {
  document.getElementById("mySidenavRight").style.width = "250px";
}

function closeRightNav() {
  document.getElementById("mySidenavRight").style.width = "0";
}
//----------------------------------------------------------------------
/* Loop through all dropdown buttons to toggle between hiding and showing its dropdown content - This allows the user to have multiple dropdowns without any conflict */
var dropdown = document.getElementsByClassName("dropdown-btn");
var i;

for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function() {
  this.classList.toggle("active_DropDown");
  var dropdownContent = this.nextElementSibling;
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
    ev.dataTransfer.dropEffect = "copy";
}

function drop_handler(ev) {
    ev.preventDefault();
 // Get the id of the target and add the moved element to the target's DOM
    var data = ev.dataTransfer.getData("text/html");
    var cln = document.getElementById(data).cloneNode(true);
//creating a new id
//    var newid = "new"+data;
//// Change the id attribute of the newly created element:    
//    cln.setAttribute( 'id', newid);
//    console.log(cln);
//    console.log(newid);
//    console.log(document.getElementById(newid));
    
    ev.target.appendChild(cln);
}

function dragover_handler(ev) {
 ev.preventDefault();
 ev.dataTransfer.dropEffect = "move";
}
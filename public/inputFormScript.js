//the event listner function    
var x = document.getElementById("excelDS");
if (x.addEventListener) {
    x.addEventListener("change", toggleExcel);
} else if (x.attachEvent) {
    x.attachEvent("change", toggleExcel);
}
//the toggle function to show excel form
function toggleExcel() {
    if (this.value === "Excel") {
        document.getElementById("noExcelForm").classList.toggle("excelDS");
        document.getElementById("excelForm").classList.toggle("excelDS");
    }
}
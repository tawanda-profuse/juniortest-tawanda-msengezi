var selectCategory = document.getElementById('productType');
var dvdForm = document.getElementById('dvdForm');
var furnitureForm = document.getElementById('furnitureForm');
var bookForm = document.getElementById('bookForm');

console.log(document.getElementById('color').value);

document.addEventListener("DOMContentLoaded", () => {
    selectCategory.addEventListener("click", function(){
        if(selectCategory.value === 'DVD'){
            dvdForm.classList.remove("hide");
            furnitureForm.classList.add("hide");
            bookForm.classList.add("hide");
        } else if(selectCategory.value === 'Furniture'){
            furnitureForm.classList.remove("hide");
            dvdForm.classList.add("hide");
            bookForm.classList.add("hide");
        }else {
            bookForm.classList.remove("hide");
            dvdForm.classList.add("hide");
            furnitureForm.classList.add("hide");
        }
        console.log(selectCategory.firstChild);
    });
});    

/*
<input
        type="color"
        name="color"
        id="color"
        value="<%= product.color %>"
        title="Click to pick a color"
      /> 
 */


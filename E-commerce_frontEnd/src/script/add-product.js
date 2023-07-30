
const modal = document.getElementById("myModal");
const createProductButton = document.getElementById("create-product-button");
const span = document.getElementsByClassName("close")[0];
createProductButton.addEventListener("click", (e) => {
    console.log("hi");
    modal.style.display = "block";
   
});
span.addEventListener("click", (e) => { 
    modal.style.display = "none";
   
});   
  


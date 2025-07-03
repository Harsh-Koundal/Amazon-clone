import { products } from "./products";

const xhr = new XMLHttpRequest();

xhr.addEventListener('load', () =>{
    console.log(xhr.response);
})
function loadProductsFetch(){
    fetch('https://supersimplebackend.dev').then((response) =>{
      return response.json()
    }).then((data) =>{
     products =data.map((productsDetails)=>{
        if(productsDetails === 'clothing'){
            return new Clothing (productsDetails);
        }
        return new products(productsDetails)
     })
    })

    loadProductsFetch()
}

    xhr.open('GET', 'https://supersimplebackend.dev');
    xhr.send();


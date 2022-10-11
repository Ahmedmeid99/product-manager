
const title=document.getElementById('title')
const price=document.getElementById('price')
const taxes=document.getElementById('taxes')
const ads=document.getElementById('ads')
const discount=document.getElementById('discount')
const total=document.getElementById('total')
const count=document.getElementById('count')
const category=document.getElementById('category')
const submit=document.getElementById('submit')
// console.log(title,price,taxes,ads,discount,total)
// console.log(count,category,submit)
let mood='create';
let temp;
/*-------------------- get Total --------------------*/
function getTotal()
{
    if(price.value!=='')
    {
        let result=(+price.value + +taxes.value + +ads.value)- +discount.value
        total.innerHTML= result 
        total.style.cssText='background-color: #03d300;' 
    }else
    {
        total.innerHTML='00';
        total.style.cssText='background-color: #ffae00;' 
    }
}
/*--------------------------------------------------*/
/*----------------- create product -----------------*/
let productsArray;
if(localStorage.product !=null)
{
    productsArray=JSON.parse(localStorage.product)
}else
{
    productsArray=[]
}
submit.addEventListener('click',()=>{
    let object={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    if(mood==='create'){
        if(object.count>1)
    {
        for(let i=0;i<object.count;i++)
        {
            productsArray.push(object)
        }
        }else{productsArray.push(object)}

    }else
    {
        productsArray[ temp ]= object
        mode='update'
        submit.innerHTML='create'
        count.style.cssText='display:block'
    }
    
    /*                  save inlocalStorage                 */
    localStorage.setItem('product',JSON.stringify(productsArray))
    clearInputs()
    if(total.innerHTML=='00')
    {
        total.style.cssText='background-color: #ffae00;' 
    }
    showData()
    
})
/*--------------------------------------------------*/
/*----------------- clear inputs -----------------*/

function clearInputs()
{
    title.value=''
    price.value=''
    taxes.value=''
    ads.value=''
    discount.value=''
    total.innerHTML='00';
    count.value=''
    category.value=''
}

/*--------------------------------------------------*/
/*-----------------  show DeleteAll btn ---------------*/
/*----------------- show data -----------------*/
function showData()
{
    let table='';
    for(let i=0; i<productsArray.length;i++)
    {
        table +=`
        <tr>
            <td>${i+1}</td>
            <td>${productsArray[i].title}</td>
            <td>${productsArray[i].price}</td>
            <td>${productsArray[i].taxes}</td>
            <td>${productsArray[i].ads}</td>
            <td>${productsArray[i].discount}</td>
            <td>${productsArray[i].total}</td>
            <td>${productsArray[i].category}</td>
            <td><button onClick=updateItem(${i}) id="update">update</button></td>
            <td><button onClick=deleteItem(${i}) id="delete">deltet</button></td>
        </tr>`
    }
    document.getElementById('tbody').innerHTML=table
    showDeleteAll()
}
/*--------------------------------------------------*/

function showDeleteAll()
{
    let deleteAll=document.getElementById('delete-all')
if(productsArray.length > 0)
{
    deleteAll.innerHTML=`<button onClick='deleteAllData()' id="delete">delete All (${productsArray.length})</button>`
}else{
    deleteAll.innerHTML='';
}
}
/*--------------------------------------------------*/
/*----------------- delete item -----------------*/
function deleteItem(i)
{
    productsArray.splice(i,1)
    //update localStorage
    localStorage.product=JSON.stringify(productsArray)
    //update lshowData
    showData()
}
/*--------------------------------------------------*/
/*----------------- delete All items ---------------*/
function deleteAllData()
{
    localStorage.clear()
    productsArray.splice(0)
    showData()
}
/*--------------------------------------------------*/
/*------------------ update item -------------------*/
function updateItem(i)
{
title.value=productsArray[i].title
price.value=productsArray[i].price
taxes.value=productsArray[i].taxes
ads.value=productsArray[i].ads
discount.value=productsArray[i].discount
total.value=productsArray[i].total
category.value=productsArray[i].category
getTotal()
count.style.cssText='display:none;'
submit.innerHTML='update'
mood='update'
temp= i;
scroll({
    top:0,
    behavior:'smooth'
})
}
/*--------------------------------------------------*/
/*------------------ search mood -------------------*/
let searchMood='title'
function getsearchMood(id)
{
    let searchInput=document.getElementById('search')
    if(id == "searchTitle")
    {
        searchMood='title'
    }else
    {
        searchMood='category'
    }
    searchInput.placeholder= `Search by ${searchMood}`
    searchInput.focus()
    searchInput.value=''
    showData()
}
/*--------------------------------------------------*/
/*----------------- search function ----------------*/
function searchData(value){
    let table=''
    for(let i=0; i<productsArray.length;i++){
        if(searchMood='title'){
            if(productsArray[i].title.includes(value.toLowerCase())){
             table +=`
             <tr>
                 <td>${i+1}</td>
                 <td>${productsArray[i].title}</td>
                 <td>${productsArray[i].price}</td>
                 <td>${productsArray[i].taxes}</td>
                 <td>${productsArray[i].ads}</td>
                 <td>${productsArray[i].discount}</td>
                 <td>${productsArray[i].total}</td>
                 <td>${productsArray[i].category}</td>
                 <td><button onClick=updateItem(${i}) id="update">update</button></td>
                 <td><button onClick=deleteItem(${i}) id="delete">deltet</button></td>
             </tr>`;
             } ;
         }else{
            if(productsArray[i].category.includes(value.toLowerCase())){
            table +=`
            <tr>
                <td>${i+1}</td>
                <td>${productsArray[i].title}</td>
                <td>${productsArray[i].price}</td>
                <td>${productsArray[i].taxes}</td>
                <td>${productsArray[i].ads}</td>
                <td>${productsArray[i].discount}</td>
                <td>${productsArray[i].total}</td>
                <td>${productsArray[i].category}</td>
                <td><button onClick=updateItem(${i}) id="update">update</button></td>
                <td><button onClick=deleteItem(${i}) id="delete">deltet</button></td>
            </tr>`
             }
        }   
    }
    document.getElementById('tbody').innerHTML=table
}
/*--------------------------------------------------*/

//show data now
showData()
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
// console.log(title,price,ads,discount,taxes,total,count,category)
// cruds
let mood = "create";
let temp;
//get total
function getTotal() {
  if (price.value > 0) {
    total.style.background = "green";
  } else {
    total.style.background = "#ffae00";
  }
  total.innerHTML = +price.value + +taxes.value + +ads.value - +discount.value;
}
//create
let productsArray;
if (localStorage.product != null) {
  productsArray = JSON.parse(localStorage.product);
} else {
  productsArray = [];
}
function createProducts() {
  let object = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  if (title.value != "" && price.value != "" && category.value != "") {
    if (mood === "create") {
      if (object.count > 1) {
        for (let i = 0; i < object.count; i++) {
          if (object.count < 100) {
            productsArray.push(object);
          }
        }
      } else {
        productsArray.push(object);
      }
    } else {
      productsArray[temp] = object;
      mode = "update";
      submit.innerHTML = "create";
      count.style.cssText = "display:block";
    }
    clearData();
  }

  localStorage.setItem("product", JSON.stringify(productsArray));

  showData();
  getTotal();
}
//read
function showData() {
  let table = "";
  for (let i = 0; i < productsArray.length; i++) {
    table += `<tr>
                    <td>${i + 1}</td>
                    <td>${productsArray[i].title}</td>
                    <td>${productsArray[i].price}</td>
                    <td>${productsArray[i].taxes}</td>
                    <td>${productsArray[i].ads}</td>
                    <td>${productsArray[i].discount}</td>
                    <td>${productsArray[i].total}</td>
                    <td>${productsArray[i].category}</td>
                    <td><button onclick=updateData(${i}) id="update" class="update-item">update</button></td>
                    <td><button onClick=deleteItem(${i}) id="delete" class="delete-item">delete</button></td>        
                </tr>`;
  }
  document.getElementById("tbody").innerHTML = table;

  showDeleteAllbtn();
}
//clear inputs
function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "00";
  count.value = "";
  category.value = "";
}
//delete
function deleteItem(i) {
  productsArray.splice(i, 1);
  localStorage.product = JSON.stringify(productsArray);
  showData();
}
//deleteAll
function showDeleteAllbtn() {
  if (productsArray.length > 0) {
    document.getElementById(
      "delete-all"
    ).innerHTML = `<button onClick="deleteAllItems()"id="delete">delete All (${productsArray.length})</button>`;
  } else {
    document.getElementById("delete-all").innerHTML = "";
  }
}
function deleteAllItems() {
  localStorage.clear();
  productsArray.splice(0);
  showData();
}
//update
function updateData(i) {
  title.value = productsArray[i].title;
  price.value = productsArray[i].price;
  taxes.value = productsArray[i].taxes;
  ads.value = productsArray[i].ads;
  discount.value = productsArray[i].discount;
  total.innerHTML = productsArray[i].total;
  category.value = productsArray[i].category;
  count.style.display = "none";
  mood = "update";
  temp = i;
  submit.innerHTML = "update";
  getTotal();
  scroll({
    top: 0,
    behavior: "smooth",
  });
}
//search
function searchItems(value) {
  table = "";
  for (let i = 0; i < productsArray.length; i++) {
    if (productsArray[i].title.includes(value.toLowerCase())) {
      table += `<tr>
            <td>${i + 1}</td>
            <td>${productsArray[i].title}</td>
            <td>${productsArray[i].price}</td>
            <td>${productsArray[i].taxes}</td>
            <td>${productsArray[i].ads}</td>
            <td>${productsArray[i].discount}</td>
            <td>${productsArray[i].total}</td>
            <td>${productsArray[i].category}</td>
            <td><button onclick=updateData(${i}) id="update">update</button></td>
            <td><button onClick=deleteItem(${i}) id="delete">deltet</button></td>        
        </tr>`;
    } else if (productsArray[i].category.includes(value)) {
      table += `<tr>
            <td>${i + 1}</td>
            <td>${productsArray[i].title}</td>
            <td>${productsArray[i].price}</td>
            <td>${productsArray[i].taxes}</td>
            <td>${productsArray[i].ads}</td>
            <td>${productsArray[i].discount}</td>
            <td>${productsArray[i].total}</td>
            <td>${productsArray[i].category}</td>
            <td><button onclick=updateData(${i}) id="update">update</button></td>
            <td><button onClick=deleteItem(${i}) id="delete">deltet</button></td>        
        </tr>`;
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
function focusInput() {
  let search = document.getElementById("search");
  search.focus();
}
//showData at all
showData();

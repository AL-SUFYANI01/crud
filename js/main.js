let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let btnMode = "create";
let tmp;
let pop = document.getElementById("pop");

var currentPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

// console.log(title,price,taxes,ads
//     ,discount,total,count.category,submit);

// get total

function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#040";
  } else {
    total.innerHTML = "";
    total.style.background = "#a00d02";
  }
}

/**********************/

// create product

let dataProduct;
if (localStorage.product != null) {
  dataProduct = JSON.parse(localStorage.product);
} else {
  dataProduct = [];
}

submit.onclick = function () {
  let newProduct = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  // clean data
  if (btnMode === "create") {
    if (
      title.value != "" &&
      price.value != "" &&
      taxes.value != "" &&
      ads.value != "" &&
      discount.value != "" &&
      total.innerHTML != "" &&
      count.value != "" &&
      category.value != "" && count.value < 100
    ) {
      if (newProduct.count > 1) {
        // count
        for (let i = 0; i < newProduct.count; i++) {
          dataProduct.push(newProduct);
        }
      } else {
        dataProduct.push(newProduct);
      }
      // save localstorage
      // console.log(newProduct.stringify);
      localStorage.setItem("product", JSON.stringify(dataProduct));
      cleardata();
      showData();
      Swal.fire({
        title: 'إضافة منتج',
        text: newProduct.count + ' :تمت إضافة منتج جديد',
        icon: 'success',
        confirmButtonText: 'موافق'
      });
    }
  } else {
    // update data
    Swal.fire({
      title: '!تعديل',
      text: '!تم تعديل المنتج',
      icon: 'success',
      confirmButtonText: 'موافق'
    });
    dataProduct[tmp] = newProduct;
    btnMode = 'create';
    submit.innerHTML = btnMode;
    localStorage.setItem("product", JSON.stringify(dataProduct));
    cleardata();
    showData();
    count.style.display = 'block'
  }

  //***************** */
  // console.log(newProduct);
};

// clear input

function cleardata() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

//**********************/ */

// read

function showData() {
  getTotal();
  let table = "";
  for (let i = 0; i < dataProduct.length; i++) {
    table += `
        <tr>
            <th>${1000000+i+1}</th>
            <th>${dataProduct[i].title}</th>
            <th>${dataProduct[i].price}</th>
            <th>${dataProduct[i].taxes}</th>
            <th>${dataProduct[i].ads}</th>
            <th>${dataProduct[i].discount}</th>
            <th>${dataProduct[i].total}</th>
            <th>${dataProduct[i].category}</th>
            <th><button onclick = "updateData(${i})" id="update">update</button></th>
            <th><button onclick = "deleteData(${i})" id="delete">delete</button></th>
        </tr>
      
      `;
  }

  document.getElementById("tbody").innerHTML = table;

  let buttonDelete = document.getElementById("deleteAllData");
  if (dataProduct.length > 0) {
    buttonDelete.innerHTML = `
        <th><button  onclick = "deleteAll()" id="btndeleteAllData">delete All (${dataProduct.length})</button></th>

        `;
  } else {
    buttonDelete.innerHTML = "";
  }
}

showData();

// delete

function deleteData(i) {
  Swal.fire({
    title: "هل أنت متأكد أنك تريد حذف هذا المنتج؟",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "نعم",
    cancelButtonText: "لا",
    confirmButtonColor: "#ff0000", // لون زر "نعم" - أحمر
    cancelButtonColor: "#175951", // لون زر "لا" - أخضر
    customClass: {
      popup: "my-sweetalert-popup",
      title: "my-sweetalert-title",
      text: "my-sweetalert-text",
      confirmButton: "my-sweetalert-confirm-button",
      cancelButton: "my-sweetalert-cancel-button",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      // تم النقر على "نعم"
      dataProduct.splice(i, 1);
      localStorage.product = JSON.stringify(dataProduct);
      showData();
      togglePopup();
      pop.innerHTML = "تم الحذف .";
      document.getElementById("popup").style.background = "#ff0000";
      setTimeout(function () {
        hidePopup();
      }, 800);
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      // تم النقر على "لا" أو الخروج من مربع الحوار
      togglePopup();
      document.getElementById("popup").style.background = "#5bc5f2";
      pop.innerHTML = "تم إلغاء الحذف .";
      setTimeout(function () {
        hidePopup();
      }, 800);
    }
  });
}

function deleteAll() {
  Swal.fire({
    title: "هل أنت متأكد أنك تريد حذف كل المنتجات؟",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "نعم",
    cancelButtonText: "لا",
    confirmButtonColor: "#ff0000", // لون زر "نعم" - أحمر
    cancelButtonColor: "#175951", // لون زر "لا" - أخضر
    customClass: {
      popup: "my-sweetalert-popup",
      title: "my-sweetalert-title",
      text: "my-sweetalert-text",
      confirmButton: "my-sweetalert-confirm-button",
      cancelButton: "my-sweetalert-cancel-button",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      // تم النقر على "نعم"
      localStorage.clear();
      dataProduct.splice(0);
      showData();
      togglePopup();
      pop.innerHTML = "تم الحذف .";
      document.getElementById("popup").style.background = "#ff0000";
      setTimeout(function () {
        hidePopup();
      }, 800);
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      // تم النقر على "لا" أو الخروج من مربع الحوار
      togglePopup();
      document.getElementById("popup").style.background = "#5bc5f2";
      pop.innerHTML = "تم إلغاء الحذف .";
      setTimeout(function () {
        hidePopup();
      }, 800);
    }
  });
}

function togglePopup() {
  var popupContainer = document.getElementById("popupContainer");
  var currentDisplay = window
    .getComputedStyle(popupContainer)
    .getPropertyValue("display");

  if (currentDisplay === "none") {
    popupContainer.style.display = "block";
  } else {
    popupContainer.style.display = "none";
  }
}

function hidePopup() {
  var popupContainer = document.getElementById("popupContainer");
  popupContainer.style.display = "none";
}

// update

function updateData(i) {
  title.value = dataProduct[i].title;
  price.value = dataProduct[i].price;
  taxes.value = dataProduct[i].taxes;
  ads.value = dataProduct[i].ads;
  discount.value = dataProduct[i].discount;
  getTotal();
  count.style.display = "none";
  category.value = dataProduct[i].category;
  submit.innerHTML = "Update";
  btnMode = "update";
  tmp = i;

  window.scrollTo({
    top: 0,
    behavior: 'smooth' // يمرر الصفحة بشكل سلس إلى الإحداثية العمودية 500
  });

}

// search

let searchMode = 'Title';

function getSearchMode(id) {
  let search = document.getElementById('search');

  if (id == 'searchTitle') {
    searchMode = 'Title';
  } else {
    searchMode = 'Category';
  }

  search.placeholder = 'Search By title ' + searchMode;
  search.focus();
  search.value = '';
  showData();

}


function searchData(value) {

  let table = '';
  for (let i = 0; i < dataProduct.length; i++) {
    if (searchMode == 'Title') {
      if (dataProduct[i].title.includes(value.toLowerCase())) {

        table += `
          <tr>
              <th>${1000000+i+1}</th>
              <th>${dataProduct[i].title}</th>
              <th>${dataProduct[i].price}</th>
              <th>${dataProduct[i].taxes}</th>
              <th>${dataProduct[i].ads}</th>
              <th>${dataProduct[i].discount}</th>
              <th>${dataProduct[i].total}</th>
              <th>${dataProduct[i].category}</th>
              <th><button onclick = "updateData(${i})" id="update">update</button></th>
              <th><button onclick = "deleteData(${i})" id="delete">delete</button></th>
          </tr>
        
        `;


      }
    } else {


      if (dataProduct[i].category.includes(value.toLowerCase())) {

        table += `
          <tr>
              <th>${i1000000+i+1}</th>
              <th>${dataProduct[i].title}</th>
              <th>${dataProduct[i].price}</th>
              <th>${dataProduct[i].taxes}</th>
              <th>${dataProduct[i].ads}</th>
              <th>${dataProduct[i].discount}</th>
              <th>${dataProduct[i].total}</th>
              <th>${dataProduct[i].category}</th>
              <th><button onclick = "updateData(${i})" id="update">update</button></th>
              <th><button onclick = "deleteData(${i})" id="delete">delete</button></th>
          </tr>
        
        `;

      }




    }
  }

  document.getElementById("tbody").innerHTML = table;
}
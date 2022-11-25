let firstPage = document.getElementById("requests");
let secondPage = document.getElementById("newRequest");

let btnNewRequest = document.getElementById("btn-novo-pedido");
let btnFind = document.getElementById("btn-find");
let btnAddProduct = document.getElementById("btn-add");
let btnSave = document.getElementById("btn-save-id");
let btnCancel = document.getElementById("btn-cancel");
let btnDelete = document.getElementById("btn-delete");


let inputQuantidade = document.getElementById("amount-product");
let inputProduct = document.getElementById("name-product");
let inputPrice = document.getElementById("price-product");
let inputFindProduct = document.getElementById("codeProduct");


let tableBody = document.getElementById("table-body");
let tableBodyStatus = document.getElementById("table-body-result");
let resultPrice = document.getElementById("result");
let dateTimer = document.getElementById('date');

let imgBody = document.getElementById("img-hidden");
let imgFirstPage = document.getElementById("img-hidden-first");
// Elements HTML To use;

let product = [
  {
    code: "1001",
    productFood: "Super SMACH COMBO Programado – Hambúrguer + Fritas",
    price: 55,
  },
  {
    code: "1002",
    productFood: "SMACH VariavelBurguer – Hambúrguer com bacon",
    price: 45,
  },
  {
    code: "1003",
    productFood: "SMACH BUG EM PROD – Hambúrguer meio torto",
    price: 25,
  },
  {
    code: "1004",
    productFood: "Combo Econômico SMACH Char 1 – Pão com Carne",
    price: 15,
  },
  {
    code: "1005",
    productFood: "Especial SMACH CSS – Hambúrguer colorido e alinhado",
    price: 65,
  },
  {
    code: "2001",
    productFood: "Refrigerante 350 ml",
    price: 8,
  },
  {
    code: "2002",
    productFood: "Água 500 ml",
    price: 5,
  },
  {
    code: "2003",
    productFood: "SMACH VariavelBurguer – Hambúrguer com bacon",
    price: 7,
  },
  {
    code: "3001",
    productFood: "Sorvete 300 ml",
    price: 15,
  },
  {
    code: "3002",
    productFood: "Sobremesa doce SMACH ARRAY",
    price: 50,
  },
];


let arrayProductOrder = [];
let arrayOrders = [];
let orderNumber = 1;
let totalSum = 0;
const dataHora = new Date().toLocaleString();
dateTimer.innerHTML = dataHora
// Array and Variavel default That will be filled during the process

let tradePage = () => {
  firstPage.setAttribute("hidden", "true");
  secondPage.removeAttribute("hidden");
  resultPrice.setAttribute("hidden", "true");

  tableBodyStatus.innerHTML = "";
  inputFindProduct.value = "";
  tableBody.innerHTML = "";
  btnSave.removeAttribute('class', 'btn-save-inactive')
  btnSave.setAttribute('class', 'btn-save btn-config btn-save-inactive');
  btnSave.setAttribute('disabled','true')
  arrayProductOrder = [];
}; // Purpose of function: Change page view and return empty order array and inputs;

let findProduct = () => {
  let valueInput = inputFindProduct.value;
  if (valueInput.length > 4) {
    alertify.error("Por favor digite apenas 4 numeros para o codigo");
    return false;
  }

  let findObj = product.filter((value) => {
    let valueCode = value.code;
    if (valueInput == "") {
      return false;
    }
    return valueCode.indexOf(valueInput) != -1;
  }); // Checks if the code entered by the user is present in the object and returns the object referring to the code 

  let arrSum = findObj.map((value) => {
    let totalySum = inputQuantidade.value * value.price;
    return totalySum;
  }); // Return sum total between quantity and price;

  if (
    findObj.length == 0 ||
    inputQuantidade.value == "" ||
    inputQuantidade.value <= 0 ||
    inputFindProduct.value == ""
  ) {
    alertify.error("Por favor, verifique o código do produto ou Quantidade estão corretos.",'aa');
  } else {
    inputProduct.value = findObj[0].productFood;
    inputPrice.value = arrSum[0].toFixed(2);
    // inside the inputs, put the name of the product and the price that was found in FindObj;

    btnAddProduct.removeAttribute("class", "btn-inactive");
    btnAddProduct.removeAttribute("disabled", "true");
    btnAddProduct.setAttribute(
      "class",
      "btn-active btn-save-product btn-config mt-3"
    );
  }
};

let newProductOrder = () => {
  imgBody.setAttribute("hidden", "true");

  arrayProductOrder.push({
    cod: inputFindProduct.value,
    productName: inputProduct.value,
    qty: inputQuantidade.value,
    price: parseInt(inputPrice.value),
  }); // Fill the empty array with cetted data in the inputs

  inputFindProduct.value = "";
  inputProduct.value = "";
  inputQuantidade.value = "";
  inputPrice.value = "";
  // Then return the default inputs

  let mapPrice = arrayProductOrder.map((valor) => {
    return valor.price;
  });

  totalSum = 0;
  totalSum = mapPrice.reduce((total, next) => {
    return (total += next);
  });

  resultPrice.removeAttribute("hidden");
  resultPrice.innerHTML = `<h4>Total do pedido: <strong>${totalSum.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</strong:</h4>`;
  alertify.success('Produto adicionado!')
  btnSave.removeAttribute("class", "btn-save-inactive");
  btnSave.removeAttribute("disabled", "true");
  btnSave.setAttribute("class", "btn-save btn-config btn-save-active");

  if (inputFindProduct.value == "" || inputQuantidade.value == "") {
    btnAddProduct.removeAttribute("class", "btn-active");
    btnAddProduct.setAttribute("class","btn-inactive btn-save-product btn-config mt-3");
    btnAddProduct.setAttribute("disabled", "true");
  }
  
  tableOrderView();
  return false;
};


let tableOrderView = () => {
  tableBody.innerHTML = "";
  arrayProductOrder.forEach((item) => {
    tableBody.innerHTML += `<tr>
                          <td>${item.cod}</td>
                          <td>${item.productName}</td>
                          <td>${item.qty}</td>
                          <td>R$ ${item.price}</td>
                        </tr>`;
  }); // It loops through the filled array and puts the data in the HTML
};

const changeStatus = (orderNumber) => {
  arrayOrders.forEach((value) => {
    if (value.orderNumber == orderNumber) {
      if (value.status === "Recebido") {
        value.status = "Pronto";
      } else if (value.status === "Pronto") {
        value.status = "Entregue";
      }
    } // Function to change the class names of status buttons on click
  });
  viewTable(arrayOrders);
};



let resultFilterType = '';
let filterType = () => {
  let valueFilterType = document.getElementById("filter-types").value;
  resultFilterType = valueFilterType
  return arrayOrders.filter((values) => {
    if (values.type == valueFilterType) {
      return values;
    } else if(valueFilterType == ''){
      return arrayOrders;
    }
  });
};


let resultFilterStatus = ''
let filterStatus = () =>{
  let valueFilterStatus = document.getElementById("filter-status").value;
  resultFilterStatus = valueFilterStatus
  return arrayOrders.filter((values) => {
    if (values.status == valueFilterStatus) {
      return values;
    }
      else if(valueFilterStatus == ''){
      return arrayOrders;
    }
  });
}

let filter = () => {
  let arrFilterType = filterType();
  viewTable(arrFilterType)
};

let filters = () =>{
  let arrFilterStatus = filterStatus();
  viewTable(arrFilterStatus)
}

let viewTable = (arrView) => {
  tableBodyStatus.innerHTML = "";
  arrView.forEach((element) => {
    let html = "";
    element.itens.forEach((item) => {
      html += `${item.qty + "-" + item.productName + "<br>"}`;
    });
    tableBodyStatus.innerHTML += `<tr>
                                <td> <input name="check" id="${
                                  element.orderNumber
                                }" type="checkbox" class="checkClass" onclick="viewBtn()"/> ${element.orderNumber}</td>
                                <td>${html}</td>
                                <td>${element.type}</td>
                                <td>R$ ${element.total.toFixed(2)}</td>
                                <td><button id="buttonStatus" class="btn-config ${validStatus(element.status)}"onclick="changeStatus(${element.orderNumber})">${element.status}</button></td>
                              </tr>`;
  }); // Standard function to loop through desired array and show in HTML.
};
let validStatus = (status) => {
  let statusClass = "";
  switch (status) {
    case "Recebido":
      statusClass = "received";
      break;

    case "Pronto":
      statusClass = "ready";
      break;

    case "Entregue":
      statusClass = "delivered";
      break;

    default:
      statusClass = "received";
      break;
  }
  return statusClass;
};

let saveOrder = () => {
  let status = document.querySelector('input[name="option"]:checked').value;
  secondPage.setAttribute("hidden", "true");
  firstPage.removeAttribute("hidden");

  imgFirstPage.setAttribute("hidden", "");
  tableBodyStatus.innerHTML = "";

  arrayOrders.push({
    orderNumber: (orderNumber += 1),
    itens: arrayProductOrder,
    type: status,
    total: totalSum,
    status: "Recebido",
  }); // Added new items to empty array;
  alertify.success('Pedido Salvo!')
  viewTable(arrayOrders);
}; 

let viewBtn = () =>{
  let valueChecked = document.querySelectorAll('input[name="check"]:checked');
  let valueFilter = document.getElementById("filter-user");
  let valuesCheckeds = [];
  valueChecked.forEach((values) =>{
    valuesCheckeds.push(values.id)
  })
  if(valuesCheckeds.length > 0){
    valueFilter.setAttribute('hidden','true');
    btnDelete.removeAttribute('hidden','true')
  } else{
    valueFilter.removeAttribute('hidden');
    btnDelete.setAttribute('hidden','true')
  };
} // Appear and disappear delete button;


let filterCheckbox = () =>{
  let checked = document.querySelectorAll('input[name="check"]:checked');
  let checkedMarked = [];
  checked.forEach((value) =>{
    checkedMarked.push(value.id)
  }); // return id of CheckBox to empy Array

  filtrado = checkedMarked.map((value) =>{
    return value
  })

  arrayOrders = arrayOrders.filter((received) =>{
    const select = filtrado.some((checked) => checked == received.orderNumber);
    if(!select){
      return received
    }
  })

  let valueFilterType = document.getElementById("filter-types");
  valueFilterType.value = '';

  let valueFilterStatus = document.getElementById("filter-status");
  valueFilterStatus.value = '';
  alertify.error('Pedido Excluido(s)!')

  viewTable(arrayOrders);
}
let viewQuestion = () =>{
  alertify.confirm("Excluir pedido", "Você deseja realmente excluir um pedido?.",
   function(){
    filterCheckbox();
    },
    function(){
    });
}


function printIt() {
  let contentPrint = document.getElementById('table').innerHTML;
  var win = window.open();
  self.focus();
  win.document.open();
  win.document.write('<'+'html'+'><'+'body'+'>');
  win.document.write(contentPrint);
  win.document.write('<'+'/body'+'><'+'/html'+'>');
  win.document.close();
  win.print();
  win.close();
} // function responsible for printing the screen when clicking on the "Print" button

btnDelete.addEventListener('click',viewQuestion)
btnNewRequest.addEventListener("click", tradePage);
btnFind.addEventListener("click", findProduct);
btnAddProduct.addEventListener("click", newProductOrder);
btnSave.addEventListener("click", saveOrder);
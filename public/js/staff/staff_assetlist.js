// add or edit methods
var action = "add";
// edit product ID
var editID = 0;
// get all products
getProducts();
// add modal
const productModal = new bootstrap.Modal(
  document.querySelector("#productModal")
);
const formProduct = document.querySelector("#formProduct");
// getProducts();

//---------------GET PRODUCTS-----------------
function getProducts() {
  fetch("/products")
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
      throw Error("Bad response");
    })
    .then(function (data) {
      // Sort the data array alphabetically by name
      data.sort((a, b) => a.name.localeCompare(b.name));

      let normalRows = ""; // Rows with statusproduct = 0
      let status1Rows = ""; // Rows with statusproduct = 1
      let status2Rows = ""; // Rows with statusproduct = 2

      data.forEach(function (product) {
        let rows = `<tr><td>${product.id}</td>`;
        if (product.image == "") {
          rows += `<td><img src="" alt="Placeholder Image" /></td>`;
        } else {
          rows += `<td><img src="/public/img/${product.image}" style="max-height:150px; max-width:150px" alt="Product Image" /></td>`;
        }
        rows += `<td>${product.name}</td>`;

        if (product.statusproduct == 0) {
          rows += `<td class='td-rowls'><button class="btn btn-warning" onclick="editProduct(${product.id}, '${product.name}')">Edit</button>`;
          rows += `<button class="btn btn-danger" onclick="offandonproduct(${product.id}, ${product.statusproduct})">OFF</button>`;
          rows += `<button class="btn btn-danger" onclick="deleteProduct(${product.id})"><i class="fa fa-trash"></i></button></td></tr>`;
          normalRows += rows;
        } else if (product.statusproduct == 1) {
          rows += `<td class='td-rowls'><button class="btn btn-warning" onclick="editProduct(${product.id}, '${product.name}')">Edit</button>`;
          rows += `<button class="btn btn-success" onclick="offandonproduct(${product.id}, ${product.statusproduct})">ON</button>`;
          rows += `<button class="btn btn-danger" onclick="deleteProduct(${product.id})"><i class="fa fa-trash"></i></button></td></tr>`;
          status1Rows += rows;
        } else if (product.statusproduct == 2) {
          rows += `<td class='td-rowls'><div class="badge bg-secondary text-white p-2 rounded">Asset is borrowing</div>`;
          status2Rows += rows;
        }
      });

      tblProduct.innerHTML = normalRows + status1Rows + status2Rows;
    })
    .catch(function (err) {
      console.error(err);
      alert(err);
    });
}

function alerts() {
  alert("this asset is borrow now!");
}
//---------------DELETE PRODUCT-----------------
function deleteProduct(id) {
  Swal.fire({
    icon: "warning",
    title: "Warning",
    text: "Sure to delete this product?",
    showCancelButton: true,
    confirmButtonText: "Yes",
  }).then(function (result) {
    if (result.isConfirmed) {
      fetch(`/products/${id}`, { method: "DELETE" })
        .then(function (response) {
          if (response.ok) {
            // get updated data
            getProducts();
          }
        })
        .catch(function (err) {
          console.error(err);
          alert(err);
        });
    }
  });
}

//---------------ADD NEW PRODUCT-----------------
function addProduct() {
  action = "add";
  formProduct.reset();
  document.querySelector("h4.modal-title").innerText = "Add new product";
  productModal.show();
  document.querySelector("#status").innerHTML = "";
}

formProduct.onsubmit = function (e) {
  e.preventDefault();
  const pname = formProduct.elements["pname"].value;
  const pimageInput = formProduct.elements["pimage"];

  // Check if both name and image are provided for adding a new product
  if (action === "add" && (!pname || !pimageInput.files[0])) {
    alert("Please enter both product name and select an image.");
    return;
  }

  // Check if an image is selected
  const hasImage = pimageInput.files.length > 0;
  const pimage = hasImage ? pimageInput.files[0].name : null;

  // Create a FormData object to send data including the image (if selected)
  let formData = new FormData();
  formData.append("name", pname);

  if (hasImage) {
    formData.append("image", pimage);
  }

  // Add or update data
  // Default is 'add'
  let url = "/products";
  let httpMethod = "POST";
  if (action === "edit") {
    url = `/products/${editID}`;
    httpMethod = "PUT";
    formData.append("id", editID);
  }

  fetch(url, {
    method: httpMethod,
    body: formData,
  })
    .then(function (response) {
      if (response.ok) {
        formProduct.reset();
        productModal.hide();
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Add/Edit product successfully",
        }).then(function (result) {
          // Get updated data
          getProducts();
        });
      } else {
        throw Error("Bad response");
      }
    })
    .catch(function (err) {
      console.error(err);
      alert(err);
    });
};

// -------------- off/on
async function offandonproduct(idproduct, status) {
  try {
    if (status == 0) {
      status = 1;
    } else {
      status = 0;
    }
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        idproduct: idproduct,
        status: status,
      }),
    };
    const res = await fetch("/onoffitem", options);
    if (res.ok) {
      getProducts();
    }
  } catch (err) {}
}

//---------------EDIT PRODUCT-----------------
function editProduct(id, name) {
  action = "edit";
  editID = id;
  console.log(name);
  document.querySelector("h4.modal-title").innerText = "Edit product";
  document.querySelector('input[name="pname"]').value = name;
  const status = document.querySelector("#status");
  // // show modal
  productModal.show();
}

// Add this function to handle the search
function searchProducts() {
  const searchInput = document
    .getElementById("searchInput")
    .value.toLowerCase();
  const rows = document.querySelectorAll("#tblProduct tr"); // Assuming your table has an id of 'tblProduct'

  rows.forEach((row) => {
    const nameCell = row.querySelector("td:nth-child(3)"); // Assuming the name is in the third column

    if (nameCell) {
      const name = nameCell.textContent.toLowerCase();
      const index = name.indexOf(searchInput);

      if (index === 0) {
        row.style.display = ""; // Show the row if the search input matches at the beginning of the name
      } else {
        row.style.display = "none"; // Hide the row if it doesn't match at the beginning
      }
    }
  });
}

// Add this line to the end of the getProducts function to reset the search input
document.getElementById("searchInput").value = "";

document
  .getElementById("staffhome")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default link behavior
    window.location.href = "/staffHomepage";
  });
document.getElementById("staffass").addEventListener("click", function (event) {
  event.preventDefault(); // Prevent the default link behavior
  window.location.href = "/staffAsset";
});
document.getElementById("staffhis").addEventListener("click", function (event) {
  event.preventDefault(); // Prevent the default link behavior
  window.location.href = "/staffHistory";
});
document.getElementById("rolepage").addEventListener("click", function (event) {
  event.preventDefault(); // Prevent the default link behavior
  window.location.href = "/rolePage";
});

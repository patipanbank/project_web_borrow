const product = document.querySelector("#product");
// get user info
async function getUser() {
  try {
    const response = await fetch("/user");
    if (response.ok) {
      const data = await response.json();
      document.querySelector("#user").innerText = data.email;
      document.querySelector("#id").value = data.userid;
    } else {
      throw Error("Connection error");
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
}
// get borrow
async function getborrow() {
  try {
    const response = await fetch("/borrows");
    if (response.ok) {
      const borrow = await response.json();
      getProduct(borrow);
    } else {
      throw Error("No borrow");
    }
  } catch (error) {
    console.log(error.message);
  }
}

// get products
async function getProduct() {
  try {
    const response = await fetch("/products");
    if (response.ok) {
      const data = await response.json();

      // Sort products alphabetically by name
      data.sort((a, b) => a.name.localeCompare(b.name));

      const productRow = document.getElementById("product-row");

      // Clear existing content in productRow
      productRow.innerHTML = "";
      let i = 1;

      // Separate data into two arrays based on statusproduct
      const statusZeroData = data.filter((d) => d.statusproduct == 0);
      const statusNonZeroData = data.filter((d) => d.statusproduct != 0);

      // Sort the array with non-zero statusproduct values
      statusNonZeroData.sort((a, b) => a.statusproduct - b.statusproduct);

      const combinedData = statusZeroData.concat(statusNonZeroData);

      combinedData.forEach(function (d, index) {
        const cardCol = document.createElement("div");
        cardCol.className = `col-12 col-sm-6 col-md-4 col-lg-3 mt-3 ${
          d.statusproduct !== 0 ? "faded-card" : ""
        }`;

        cardCol.innerHTML = `<div class="card shadow">
            <img src="/public/img/${
              d.image
            }" class="card-img-top" alt="product">
            <div class="card-body">
              <h5 class="card-title">${d.name}</h5>
              ${
                d.statusproduct === 0
                  ? `<button class="btn btn-primary borrow-btn" data-id="${d.id}" data-name="${d.name}" data-image="${d.image}" id="borrow-button-${d.id}">Borrow</button>`
                  : `<button class="btn btn-secondary" disabled>Borrow</button>`
              }
            </div>
          </div>`;
        productRow.appendChild(cardCol);
        i++;

        if ((index + 1) % 4 === 0) {
          const clearDiv = document.createElement("div");
          clearDiv.className = "w-100";
          productRow.appendChild(clearDiv);
        }

        // Add event listener for the "Borrow" button
        if (d.statusproduct === 0) {
          const borrowButton = cardCol.querySelector(`#borrow-button-${d.id}`);
          borrowButton.addEventListener("click", () => {
            handleBorrowClick(d.id, d.name, d.image);
          });

          // Add a class to the "Borrow" button for styling
          borrowButton.classList.add("borrow-btn");
        }
      });
    } else {
      throw Error("Connection error");
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
}

// get current user
getUser();
// get all products
getborrow();

function handleBorrowClick(productId, productName, productImage) {
  let borrowDate = "";
  let returnDate = "";
  const userEmail = document.querySelector("#user").innerText;
  const userId = document.querySelector("#id").value;

  const formHtml = `
<div>
<img src="/public/img/${productImage}" alt="${productName}" style="max-width: 100%;">
<h3>${productName}</h3> <h4>Id product: ${productId}</h4>
</div>
<form id="borrow-form">
<label for="borrow-date">Borrow Date:</label>
<input type="date" id="borrow-date" required min="${
    new Date().toISOString().split("T")[0]
  }" oninput="setReturnDateMin(this.value)"><br>

<label for="return-date">Return Date:</label>
<input type="date" id="return-date" required min="${
    new Date().toISOString().split("T")[0]
  }">
</form>`;

  Swal.fire({
    title: "Borrow Confirmation",
    html: formHtml,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Confirm",
    cancelButtonText: "Cancel",
    preConfirm: () => {
      borrowDate = document.getElementById("borrow-date").value;
      returnDate = document.getElementById("return-date").value;

      if (!borrowDate || !returnDate) {
        Swal.showValidationMessage(
          "Both Borrow Date and Return Date are required"
        );
      }
    },
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const options = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: productId,
            userid: userId,
            borrowdate: borrowDate,
            returndate: returnDate,
          }),
        };
        const response = await fetch("/borrows", options);
        if (response.ok) {
          const data = await response.text();
          alert(data);
          // location.reload();
        } else if (response.status == 401) {
          const data = await response.text();
          throw Error(data);
        } else {
          throw Error("You can't borrow this asset right now.");
        }
      } catch (err) {
        console.error(err.message);
        alert(err.message);
      }
      setStatusproduct(2, productId);
      getProduct();
      // ผู้ใช้คลิก "Confirm" และกรอกวันที่ยืมและวันที่คืนแล้ว
      // คุณสามารถดำเนินการตามที่คุณต้องการ
      console.log("Borrow action performed for product with ID:", productId);
      console.log(userEmail);
      console.log(productImage);
      console.log(productName);
      console.log("Borrow Date:", borrowDate);
      console.log("Return Date:", returnDate);
    }
  });
}
function setReturnDateMin(borrowDateValue) {
  const returnDateInput = document.getElementById("return-date");

  // Calculate the minimum and maximum allowed return dates
  const minReturnDate = new Date(borrowDateValue);
  const maxReturnDate = new Date(borrowDateValue);

  // Set the minimum return date to the borrow date
  const formattedMinReturnDate = minReturnDate.toISOString().split("T")[0];
  returnDateInput.min = formattedMinReturnDate;

  // Set the maximum return date to 7 days from the borrow date
  maxReturnDate.setDate(minReturnDate.getDate() + 7);
  const formattedMaxReturnDate = maxReturnDate.toISOString().split("T")[0];
  returnDateInput.max = formattedMaxReturnDate;

  // Check if the return date is before the minimum allowed date
  if (new Date(returnDateInput.value) < minReturnDate) {
    returnDateInput.value = formattedMinReturnDate;
  }

  // Check if the return date is after the maximum allowed date
  if (new Date(returnDateInput.value) > maxReturnDate) {
    returnDateInput.value = formattedMaxReturnDate;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.querySelector(".searchbutton");

  // Event listener for the search button click
  searchButton.addEventListener("click", performSearch);

  // Event listener for Enter key press in the search input
  searchInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent the default form submission
      performSearch(); // Trigger the search
    }
  });

  async function performSearch() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const productRow = document.getElementById("product-row");

    try {
      const response = await fetch("/products");
      if (response.ok) {
        const data = await response.json();

        // Filter products based on the search term
        const filteredProducts = data.filter((product) =>
          product.name.toLowerCase().includes(searchTerm)
        );

        // Sort products based on statusproduct and then alphabetical order
        filteredProducts.sort((a, b) => {
          if (a.statusproduct === b.statusproduct) {
            // If statusproduct is the same, sort by product name
            return a.name.localeCompare(b.name);
          } else if (a.statusproduct === 0) {
            // Products with statusproduct 0 come first
            return -1;
          } else {
            // Products with other statusproduct values come later
            return 1;
          }
        });

        // Clear existing content in productRow
        productRow.innerHTML = "";

        // Rebuild productRow with the filtered and sorted products
        filteredProducts.forEach((product, index) => {
          const cardCol = createCardCol(product);
          productRow.appendChild(cardCol);
        });
      } else {
        throw Error("Connection error");
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }

  function createCardCol(product) {
    const cardCol = document.createElement("div");
    cardCol.className = `col-12 col-sm-6 col-md-4 col-lg-3 mt-3 ${
      product.statusproduct !== 0 ? "faded-card" : ""
    }`;

    cardCol.innerHTML = `<div class="card shadow">
        <img src="/public/img/${
          product.image
        }" class="card-img-top" alt="product">
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          ${
            product.statusproduct === 0
              ? `<button class="btn btn-primary borrow-btn" data-id="${product.id}" data-name="${product.name}" data-image="${product.image}" id="borrow-button-${product.id}">Borrow</button>`
              : `<button class="btn btn-secondary" disabled>Borrow</button>`
          }
        </div>
      </div>`;

    // Add event listener for the "Borrow" button
    if (product.statusproduct === 0) {
      const borrowButton = cardCol.querySelector(
        `#borrow-button-${product.id}`
      );
      borrowButton.addEventListener("click", () => {
        handleBorrowClick(product.id, product.name, product.image);
      });
    }

    return cardCol;
  }
});

async function setStatusproduct(statusproduct, idproductx) {
  console.log(statusproduct);
  try {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: statusproduct,
        idproduct: idproductx,
      }),
    };
    const response = await fetch("/onoffitem", options);
    if (response.ok) {
      const data = await response.text();
      // alert(data);
    } else {
      throw Error("Error naja");
    }
  } catch (error) {
    console.error(error.message);
    alert(error.message);
  }
}

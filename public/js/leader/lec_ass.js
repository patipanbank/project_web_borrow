const tblProduct = document.querySelector("#tblProduct");

// get products
async function getProducts() {
  try {
    const response = await fetch("/products");
    if (response.ok) {
      const data = await response.json();
      
      // Sort the data by product name (assuming product name is in the 'name' property)
      data.sort((a, b) => a.name.localeCompare(b.name));

      let rows = "";
      data.forEach(function (p) {
        rows += `<tr><td style="width:100px; height:150px;text-align:center; vertical-align:middle">${p.id}</td>`;
        rows += `<td><img src="/public/img/${p.image}" style="max-height:150px; max-width:150px"></td>`;
        rows += `<td>${p.name}</td>`;
        rows += `</td></tr>`;
      });
      tblProduct.innerHTML = rows;
    } else {
      throw Error("Connection error");
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
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

// get all products and sort them
getProducts();

// Add this line to the end of the getProducts function to reset the search input
document.getElementById("searchInput").value = "";

document.getElementById("lechome").addEventListener("click", function (event) {
  event.preventDefault(); // Prevent the default link behavior
  window.location.href = "/lecturerHomepage";
});
document.getElementById("lecass").addEventListener("click", function (event) {
  event.preventDefault(); // Prevent the default link behavior
  window.location.href = "/lecAss";
});
document.getElementById("lecre").addEventListener("click", function (event) {
  event.preventDefault(); // Prevent the default link behavior
  window.location.href = "/lecRe";
});
document.getElementById("lechis").addEventListener("click", function (event) {
  event.preventDefault(); // Prevent the default link behavior
  window.location.href = "/lecHis";
});
document.getElementById("rolepage").addEventListener("click", function (event) {
  event.preventDefault(); // Prevent the default link behavior
  window.location.href = "/rolePage";
});

const tblProduct = document.querySelector("#tblProduct");
const userId = document.querySelector("#id").value;

// get borrow
async function getBorrows() {
  try {
    const response = await fetch("/borrows-currentId");
    if (response.ok) {
      const data = await response.json();
      let rows = "";
      data.forEach(function (b) {
        rows += `<tr><td>${b.id}</td>`;
        rows += `<td><img src="/public/img/${b.image}" style="max-height:150px; max-width:150px alt="Product Image"></td>`;
        rows += `<td>${b.name}</td>`;
        rows += `<td>${new Date(b.borrowdate).toLocaleDateString()}</td>`;
        rows += `<td>${new Date(b.returndate).toLocaleDateString()}`;
        rows += `<td><div class="badge ${
          b.statusborrow == 1
            ? "bg-warning"
            : b.statusborrow == 2
            ? "bg-success"
            : b.statusborrow == 3
            ? "bg-danger"
            : "bg-info"
        } text-white" style="font-size: 16px;">${
          b.statusborrow == 1
            ? "waiting"
            : b.statusborrow == 2
            ? "Approve"
            : b.statusborrow == 3
            ? "Disapprove"
            : "Returned"
        }</div></td>`;
        rows += `<td>${b.reason}`;
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
// get all products
getBorrows();

fetch("/user")
  .then(function (response) {
    if (response.ok) {
      return response.json();
    }
    throw Error("Cannot get user information");
  })
  .then(function (data) {
    // Display the user's email on the page
    document.querySelector("#email").innerHTML = data.email;
    document.querySelector("#id").value = data.userid;
  })
  .catch(function (error) {
    console.error(error);
  });

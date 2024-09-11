const tblProduct = document.querySelector("#tblProduct");
function showConfirmationDialog(
  userEmail,
  productId,
  productImage,
  productName,
  borrowid
) {
  Swal.fire({
    title: "<h1 style='color:black'>Choose an action</h1>",
    background: "white",
    text: "black",
    html:
      `<div style="text-align: center;">` +
      `<img src="/public/img/${productImage}" alt="${productName}" style="max-width: 100%; margin: auto;">` +
      `<div style = "font-size: 20;">Approve for ${userEmail} with ID ${productId}</div>` +
      `</div>`,
    showCancelButton: true,
    confirmButtonColor: "rgb(18, 102, 18)",
    cancelButtonColor: "red",
    confirmButtonText: "Approve",
    cancelButtonText: "Disapprove",
  }).then(async (result) => {
    if (result.isConfirmed) {
      // If the user clicks "Approve," you can perform the approval action here
      // For now, let's just show another success message
      try {
        const options = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            borrowid: borrowid,
            tpyeApporDis: true,
          }),
        };
        const res = await fetch("/appordis", options);
        if (res.ok) {
          getBorrows();
        }
      } catch (err) {
        alert(err);
      }
      Swal.fire({
        title: "<h1 style='color:black'>Approve</h1>",
        background: "white",
        html: "<h3 style='color: black;'>The request has been approved.</h3>",
        icon: "success",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      // If the user clicks "Disapprove," prompt for a reason

      Swal.fire({
        title: "<h1 style='color: black'>Enter Disapproval Reason</h1>",
        background: "white",
        input: "text",
        inputAttributes: {
          autocapitalize: "off",
          style: "color: black", // Set the text color of the input field
        },
        customClass: {
          input: 'custom-input-class' // Define a custom class for the input
        },
        
        showCancelButton: true,
        confirmButtonText: "Submit",
        cancelButtonText: "Cancel",
        showLoaderOnConfirm: true,
        preConfirm: (reason) => {
          // You can perform actions with the entered reason here
          return new Promise((resolve) => {
            // Simulate a delay for demonstration purposes
            setTimeout(() => {
              resolve();
            }, 1000);
          });
        },
        allowOutsideClick: () => !Swal.isLoading(),
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const options = {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                borrowid: borrowid,
                tpyeApporDis: false,
                reasons: result.value,
              }),
            };
            const res = await fetch("/appordis", options);
            if (res.ok) {
              getBorrows();
            }
          } catch (err) {
            alert(err);
          }
          Swal.fire({
            title: '<h1 style="color: black">Disapproved!</h1>',
            background: 'white',
            html: `<div style="color: black; text-align: left;">
                      <h3>The request has been disapproved.</h3>
                      <h5>Reason: ${result.value}</h5>
                   </div>`,
            icon: 'error',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
          });
        }
      });
      setStatusproduct(0, productId);
    }
  });
}

// get products
async function getBorrows() {
  try {
    const response = await fetch("/borrows");
    if (response.ok) {
      const data = await response.json();
      let rows = "";
      data.forEach(function (b) {
        if (b.statusborrow == 1) {
          rows += `<tr><td>${b.userid}</td>`;
          rows += `<td>${b.email}</td>`;
          rows += `<td>${b.id}</td>`;
          rows += `<td><img src="/public/img/${b.image}" style="max-height:150px; max-width:150px alt="Product Image"></td>`;
          rows += `<td>${b.name}</td>`;
          rows += `<td>${new Date(b.borrowdate).toLocaleDateString()}</td>`;
          rows += `<td>${new Date(b.returndate).toLocaleDateString()}</td>`;
          rows += `<td><button class="btn btn-primary" onclick="showConfirmationDialog('${b.email}', '${b.id}', '${b.image}', '${b.name}', '${b.borrowid}')">Choose</button>`;

          rows += `</td></tr>`;
        }
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

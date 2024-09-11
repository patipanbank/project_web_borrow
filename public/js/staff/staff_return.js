async function GetDataBorrow() {
    try {
      const res = await fetch("/GetDataBorrow");
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        let output = "";
        data.resu.forEach((e) => {
          // Only add rows for statusborrow 2 or 3
          if (e.statusborrow === 2) {
            output += `
              <tr class="">
                <td scope="row">${e.email}</td>
                <td>${e.name}</td>
                <td>${new Date(e.borrowdate).toLocaleDateString()} - ${new Date(
                  e.returndate
                ).toLocaleDateString()}</td>
                <td>
                  <div class="badge ${
                    e.statusborrow == 1
                      ? "bg-warning"
                      : e.statusborrow == 2
                      ? "bg-success"
                      : e.statusborrow == 3
                      ? "bg-danger"
                      : "bg-info" // Use a light background for "Returned" status
                  } text-${
                    e.statusborrow === 4 ? "dark" : "white"
                  } p-2 rounded">
                    ${
                      e.statusborrow == 1
                        ? "waiting"
                        : e.statusborrow == 2
                        ? "Approve"
                        : e.statusborrow == 3
                        ? "Disapprove"
                        : "Returned"
                    }
                  </div>
                </td>
                <td>${e.reason}</td>
                <td>
                  ${
                    e.statusborrow !== 4
                      ? `<button class="btn btn-info" onclick="confirmReturn(${
                          e.borrowid
                        }, ${e.id})">Return</button>`
                      : ""
                  }
                </td>
              </tr>
            `;
          }
        });
        document.querySelector("table tbody").innerHTML = output;
      }
    } catch (err) {
      alert(err);
    }
  }
  
  function updateStatusToReturned(borrowid) {
    // You can use fetch to send a PUT request to your server
    fetch(`/borrows/${borrowid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: 4 }), // Set the status to 4 for returned
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update status to returned");
        }
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          alert(data.message); // Display success message or handle as needed
          GetDataBorrow(); // Refresh the table after status update
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to update status to returned");
      });
  }
  
  function confirmReturn(borrowid, productID) {
    if (confirm("Are you sure you want to return this item?")) {
      updateStatusToReturned(borrowid);
      setStatusproduct(0, productID);
      console.log(productID);
    } else {
      // Do nothing or handle the cancel action
    }
  }
  
    function searchTable() {
        const input = document.getElementById("searchInput").value.toLowerCase();
        const rows = document.querySelectorAll(".table-body tr");
  
        rows.forEach((row) => {
          const email = row.querySelector("td:first-child").textContent.toLowerCase();
          if (email.includes(input)) {
            row.style.display = "";
          } else {
            row.style.display = "none";
          }
        });
      }
  
  GetDataBorrow();

  async function setStatusproduct(statusproduct, idproductx) {
    console.log(statusproduct);
    try {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          "status": statusproduct,
          "idproduct": idproductx,
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
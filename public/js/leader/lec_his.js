GetDataBorrow();
async function GetDataBorrow() {
  try {
    const res = await fetch("/GetDataBorrow");
    if (res.ok) {
      const data = await res.json();
      console.log(data);
      let output = "";
      // const Asset_List = document.getElementById('Asset_List')
      // const Available = document.getElementById('Available')
      // const Disable = document.getElementById('Disable')
      data.resu.forEach((e) => {
        if (
          e.statusborrow === 2 ||
          e.statusborrow === 3 ||
          e.statusborrow === 4
        ) {
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
            } text-${e.statusborrow === 4 ? "dark" : "white"} p-2 rounded">
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
              </tr>
              `;
        }
      });
      document.querySelector("table").innerHTML += output;
    }
  } catch (err) {
    alert(err);
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
// fetch("/sideLecturer")
//   .then((response) => response.text())
//   .then((data) => {
//     document.getElementById("sidebar-container").innerHTML = data;
//   })
//   .catch((error) => console.error("Error:", error));

const Edit = document.getElementById("edit");
Edit.addEventListener("click", function () {});

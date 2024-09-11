GetDataBorrow();
async function GetDataBorrow() {
  try {
    const res = await fetch("/GetDataBorrow");
    if (res.ok) {
      const data = await res.json();
      console.log(data);
      let output = "";
      data.resu.forEach((e) => {
        // Display only records with statusborrow equal to 3 (Disapprove)
        if (e.statusborrow === 3) {
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
                    : "bg-danger"
                } text-white p-2 rounded">
                  ${
                    e.statusborrow == 1
                      ? "waiting"
                      : e.statusborrow == 2
                      ? "Approve"
                      : "Disapprove"
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
const Edit = document.getElementById("edit");
Edit.addEventListener("click", function () {});

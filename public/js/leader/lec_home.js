GetDataBorrow();
async function GetDataBorrow() {
  try {
    const res = await fetch("/GetDataBorrow");
    if (res.ok) {
      const data = await res.json();
      console.log(data);
      let output = "";
      let Approve = 0;
      let DisApprove = 0;
      let request = 0;
      let returned = 0;
      data.resu.forEach((e) => {
        if (e.statusborrow == 2) {
          Approve += 1;
        } else if (e.statusborrow == 3) {
          DisApprove += 1;
        } else if (e.statusborrow == 1){
          request += 1;
        } else if (e.statusborrow == 4) {
          returned += 1;
        }
      });
      document.getElementById("amountasset").innerHTML = data.resu2.length;
      document.getElementById("amountapprove").innerHTML = Approve;
      document.getElementById("amountdisapprove").innerHTML = DisApprove;
      document.getElementById("amountrequest").innerHTML = request;
      document.getElementById("return").innerHTML = returned;

      // Create and update the chart with the fetched data
      updateChart(data);
    }
  } catch (err) {
    alert(err);
  }
}
// Add a click event listener to the Asset List widget
const assetListWidget = document.getElementById("Asset-list");
assetListWidget.addEventListener("click", function () {
  // Get the destination URL from the data-href attribute
  const asset = assetListWidget.getAttribute("asset-href");

  // Navigate to the destination URL
  window.location.href = asset;
});
// approve
const approveWidget = document.getElementById("Approve");
approveWidget.addEventListener("click", function () {
  // Get the destination URL from the data-href attribute
  const app = approveWidget.getAttribute("app-href");

  // Navigate to the destination URL
  window.location.href = app;
});
// disapprove
const disapproveWidget = document.getElementById("Disapprove");
disapproveWidget.addEventListener("click", function () {
  // Get the destination URL from the data-href attribute
  const dis = disapproveWidget.getAttribute("dis-href");

  // Navigate to the destination URL
  window.location.href = dis;
});
// request
const requestWidget = document.getElementById("Request");
requestWidget.addEventListener("click", function () {
  // Get the destination URL from the data-href attribute
  const re = requestWidget.getAttribute("re-href");

  // Navigate to the destination URL
  window.location.href = re;
});
// returned
const returnedWidget = document.getElementById("Returned");
returnedWidget.addEventListener("click", function () {
  // Get the destination URL from the data-href attribute
  const returned = returnedWidget.getAttribute("re-href");

  // Navigate to the destination URL
  window.location.href = returned;
});

// Add the following code to create and update the chart
const ctx = document.getElementById("assetChart").getContext("2d");

const assetChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Asset List", "Approve", "Disapprove", "Request", "Returned"],
    datasets: [
      {
        label: "Assets",
        backgroundColor: [
          "orange",
          "mediumseagreen",
          "firebrick",
          "blueviolet",
          "#0fcaf1",
        ],
        data: [0, 0, 0, 0, 0],
      },
    ],
  },
});

// Function to update the chart data
function updateChart(data) {
  let assetList = 0;
  let approve = 0;
  let disapprove = 0;
  let request = 0;
  let Returned = 0;

  data.resu2.forEach((e) => {
    assetList += 1;
  });
  data.resu.forEach((e) => {
    if (e.statusborrow == 2) {
      approve += 1;
    } else if (e.statusborrow == 3) {
      disapprove += 1;
    } else if (e.statusborrow == 1){
      request += 1;
    } else if (e.statusborrow == 4) {
      Returned += 1;
    }
  });

  assetChart.data.datasets[0].data = [assetList, approve, disapprove, request,Returned];
  assetChart.update();
}

// Call this function after fetching data
updateChart(data);
// GetDataBorrow();
// async function GetDataBorrow() {
//   try {
//     const res = await fetch("/GetDataBorrow");
//     if (res.ok) {
//       const data = await res.json();
//       console.log(data);
//       let output = "";
//       let Approve = 0;
//       let DisApprove = 0;
//       let request = 0;
//       data.resu.forEach((e) => {
//         if (e.statusborrow == 2) {
//           Approve += 1;
//         } else if (e.statusborrow == 3) {
//           DisApprove += 1;
//         } else {
//           request += 1;
//         }
//       });
//       document.getElementById("amountasset").innerHTML = data.resu2.length;
//       document.getElementById("amountapprove").innerHTML = Approve;
//       document.getElementById("amountdisapprove").innerHTML = DisApprove;
//       document.getElementById("amountrequest").innerHTML = request;

//       data.resu.forEach((e) => {
//         output += `
//             <tr class="">
//               <td scope="row">${e.email}</td>
//               <td>${e.name}</td>

//               <td>${new Date(e.borrowdate).toLocaleDateString()} - ${new Date(
//           e.returndate
//         ).toLocaleDateString()}</td>
//               <td>
//                 <div class="badge ${
//                   e.statusborrow == 1
//                     ? "bg-warning"
//                     : e.statusborrow == 2
//                     ? "bg-success"
//                     : "bg-danger"
//                 } text-white p-2 rounded">
//                   ${
//                     e.statusborrow == 1
//                       ? "waiting"
//                       : e.statusborrow == 2
//                       ? "Approve"
//                       : "Disapprove"
//                   }
//                 </div>
//               </td>
//               <td>${e.reason}</td>
//             </tr>
//             `;
//       });
//       document.querySelector("table").innerHTML += output;
//     }
//   } catch (err) {
//     alert(err);
//   }
// }

// const Assetlist = document.getElementById("Asset-list");
// const Approve = document.getElementById("Approve");
// const Disapprove = document.getElementById("Disapprove");
// const Request = document.getElementById("Request");

// Assetlist.addEventListener("click", function () {
//   window.location.href = "/lecAss";
// });

// Approve.addEventListener("click", function () {
//   window.location.href = "/lecApp";
// });

// Disapprove.addEventListener("click", function () {
//   window.location.href = "/lecDis";
// });

// Request.addEventListener("click", function () {
//   window.location.href = "/lecRe";
// });

// const widgets = document.querySelectorAll(".widget");

// widgets.forEach((widget) => {
//   widget.addEventListener("mouseenter", () => {
//     widget.classList.add("hovered");
//   });

//   widget.addEventListener("mouseleave", () => {
//     widget.classList.remove("hovered");
//   });
// });
// document.getElementById("lechome").addEventListener("click", function (event) {
//   event.preventDefault(); // Prevent the default link behavior
//   window.location.href = "/lecturerHomepage";
// });
// document.getElementById("lecass").addEventListener("click", function (event) {
//   event.preventDefault(); // Prevent the default link behavior
//   window.location.href = "/lecAss";
// });
// document.getElementById("lecre").addEventListener("click", function (event) {
//   event.preventDefault(); // Prevent the default link behavior
//   window.location.href = "/lecRe";
// });
// document.getElementById("lechis").addEventListener("click", function (event) {
//   event.preventDefault(); // Prevent the default link behavior
//   window.location.href = "/lecHis";
// });
// document.getElementById("rolepage").addEventListener("click", function (event) {
//   event.preventDefault(); // Prevent the default link behavior
//   window.location.href = "/rolePage";
// });

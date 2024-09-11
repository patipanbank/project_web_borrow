GetDataBorrow();
async function GetDataBorrow() {
  try {
    const res = await fetch("/GetDataBorrow");
    if (res.ok) {
      const data = await res.json();
      console.log(data);
      let output = "";
      let Available = 0;
      let Disable = 0;
      let Return = 0;
      let Borrowing = 0;

      data.resu2.forEach((e) => {
        if (e.statusproduct == 0) {
          Available += 1;
        } else if (e.statusproduct == 1) {
          Disable += 1;
        } else if (e.statusproduct == 2) {
          Borrowing += 1;
        }
      });

      data.resu.forEach((e) => {
        if (e.statusborrow == 2 ) {
          Return += 1;
        }
      });
      document.getElementById("Returna").innerHTML = Return;
      document.getElementById("Asset_List").innerHTML = data.resu2.length;
      document.getElementById("Availablea").innerHTML = Available;
      document.getElementById("Disablea").innerHTML = Disable;
      document.getElementById("Borrowinga").innerHTML = Borrowing;

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
// available
const availableWidget = document.getElementById("Available");
availableWidget.addEventListener("click", function () {
  // Get the destination URL from the data-href attribute
  const ava = availableWidget.getAttribute("ava-href");

  // Navigate to the destination URL
  window.location.href = ava;
});
// disable
const disableWidget = document.getElementById("Disable");
disableWidget.addEventListener("click", function () {
  // Get the destination URL from the data-href attribute
  const dis = disableWidget.getAttribute("dis-href");

  // Navigate to the destination URL
  window.location.href = dis;
});
// Return
const returnWidget = document.getElementById("Return");
returnWidget.addEventListener("click", function () {
  // Get the destination URL from the data-href attribute
  const re = returnWidget.getAttribute("re-href");

  // Navigate to the destination URL
  window.location.href = re;
});
// Borrowing
const borrowingWidget = document.getElementById("Borrowing");
borrowingWidget.addEventListener("click", function () {
  // Get the destination URL from the data-href attribute
  const bow = borrowingWidget.getAttribute("re-href");

  // Navigate to the destination URL
  window.location.href = bow;
});

// Add the following code to create and update the chart
const ctx = document.getElementById("assetChart").getContext("2d");

const assetChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Asset List", "Available", "Disable", "Return", "Borrowing"],
    datasets: [
      {
        label: "Assets",
        backgroundColor: ["orange", "#2ecc71", "#e74c3c", "#0fcaf1", "5a6268"],
        data: [0, 0, 0, 0, 0],
      },
    ],
  },
});

// Function to update the chart data
function updateChart(data) {
  let assetList = 0;
  let available = 0;
  let disable = 0;
  let returns = 0;
  let borrowing = 0;

  data.resu2.forEach((e) => {
    if (e.statusproduct == 0) {
      available += 1;
    } else if (e.statusproduct == 1) {
      disable += 1;
    } else if (e.statusproduct == 2) {
      borrowing += 1;
    }
    assetList += 1;
  });

  data.resu.forEach((e) => {
    if (e.statusborrow == 2) {
      returns += 1;
    }
  });

  assetChart.data.datasets[0].data = [assetList, available, disable, returns, borrowing];
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
//       let Available = 0;
//       let Disable = 0;
//       let Return = 0;
//       data.resu2.forEach((e) => {
//         if (e.statusproduct == 0) {
//           Available += 1;
//         } else if (e.statusproduct == 0){
//           Disable += 1;
//         }
//       });
//       document.getElementById("Asset_List").innerHTML = data.resu2.length;
//       document.getElementById("Availablea").innerHTML = Available;
//       document.getElementById("Disablea").innerHTML = Disable;

//       // Create and update the chart with the fetched data
//       updateChart(data);
//     }
//   } catch (err) {
//     alert(err);
//   }
// }
// // Add a click event listener to the Asset List widget
// const assetListWidget = document.getElementById("Asset-list");
// assetListWidget.addEventListener("click", function () {
//   // Get the destination URL from the data-href attribute
//   const asset = assetListWidget.getAttribute("asset-href");

//   // Navigate to the destination URL
//   window.location.href = asset;
// });
// // available
// const availableWidget = document.getElementById("Available");
// availableWidget.addEventListener("click", function () {
//   // Get the destination URL from the data-href attribute
//   const ava = availableWidget.getAttribute("ava-href");

//   // Navigate to the destination URL
//   window.location.href = ava;
// });
// // disable
// const disableWidget = document.getElementById("Disable");
// disableWidget.addEventListener("click", function () {
//   // Get the destination URL from the data-href attribute
//   const dis = disableWidget.getAttribute("dis-href");

//   // Navigate to the destination URL
//   window.location.href = dis;
// });
// // Return
// const returnWidget = document.getElementById("Return");
// returnWidget.addEventListener("click", function () {
//   // Get the destination URL from the data-href attribute
//   const dis = returnWidget.getAttribute("dis-href");

//   // Navigate to the destination URL
//   window.location.href = dis;
// });

// // Add the following code to create and update the chart
// const ctx = document.getElementById("assetChart").getContext("2d");

// const assetChart = new Chart(ctx, {
//   type: "bar",
//   data: {
//     labels: ["Asset List", "Available", "Disable"],
//     datasets: [
//       {
//         label: "Assets",
//         backgroundColor: ["orange", "#2ecc71", "#e74c3c"],
//         data: [0, 0, 0],
//       },
//     ],
//   },
// });

// // Function to update the chart data
// function updateChart(data) {
//   let assetList = 0;
//   let available = 0;
//   let disable = 0;

//   data.resu2.forEach((e) => {
//     if (e.statusproduct == 0) {
//       available += 1;
//     } else {
//       disable += 1;
//     }
//     assetList += 1;
//   });

//   assetChart.data.datasets[0].data = [assetList, available, disable];
//   assetChart.update();
// }

// // Call this function after fetching data
// updateChart(data);

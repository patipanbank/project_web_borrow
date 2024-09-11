
// get products
async function getProducts() {
  try {
    const response = await fetch("/Available");
    if (response.ok) {
      const data = await response.json();
      let rows = "";
      data.forEach(function (p) {
        rows += `<tr><td style="width:100px; height:150px;text-align:center; vertical-align:middle">${p.id}</td>`;
        rows += `<td><img src="/public/img/${p.image}" style="max-height:150px; max-width:150px"></td>`;
        rows += `<td>${p.name}</td>`;
        rows += `<td><div class="badge bg-success text-white p-2 rounded">Available</div></td>`;
        rows += `<td><button class="btn ${
          p.statusproduct == 0 ? "btn-danger" : "btn-success"
        }"onclick="offandonproduct(${p.id}, ${p.statusproduct})">${
          p.statusproduct == 0 ? "OFF" : "ON"
        }</button>`;
        rows += `</td></tr>`;
      });
      document.querySelector('tbody').innerHTML = rows;
    } else {
      throw Error("Connection error");
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
}

// get all products
getProducts();

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

    document.getElementById("staffhome").addEventListener("click", function (event) {
        event.preventDefault(); // Prevent the default link behavior
        window.location.href ="/staffHomepage";
      });
      document.getElementById("staffass").addEventListener("click", function (event) {
        event.preventDefault(); // Prevent the default link behavior
        window.location.href ="/staffAsset";
      });
      document.getElementById("staffhis").addEventListener("click", function (event) {
        event.preventDefault(); // Prevent the default link behavior
        window.location.href ="/staffHistory";
      });
      document.getElementById("rolepage").addEventListener("click", function (event) {
        event.preventDefault(); // Prevent the default link behavior
        window.location.href ="/rolePage";
      });
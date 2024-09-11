// get products
async function getProducts() {
    try {
      const response = await fetch("/Borrowing");
      if (response.ok) {
        const data = await response.json();
        let rows = "";
        data.forEach(function (p) {
          rows += `<tr><td style="width:100px; height:150px;text-align:center; vertical-align:middle">${p.id}</td>`;
          rows += `<td><img src="/public/img/${p.image}" style="max-height:150px; max-width:150px"></td>`;
          rows += `<td>${p.name}</td>`;
          rows += `<td><div class="badge bg-secondary text-white p-2 rounded">Asset is borrowing</div></td>`;
          rows += `</td></tr>`;
        });
        document.querySelector("tbody").innerHTML = rows;
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
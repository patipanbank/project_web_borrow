const formSignup = document.querySelector("#formSignup");
formSignup.onsubmit = async function (e) {
  e.preventDefault();
  const username = formSignup["txtUsername"].value;
  const password = formSignup["txtPassword"].value;
  const repassword = formSignup["txtRePassword"].value;
  const email = formSignup["txtEmail"].value;

  try {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        username: username,
        password: password,
        repassword: repassword,
      }),
    };
    const response = await fetch("/registerUser", options);
    if (response.ok) {
      const data = await response.text();
      alert("Register succes");

      window.location.replace(data);
    } else if (response.status == 401) {
      const data = await response.text();
      throw Error(data);
    } else if (response.status == 402) {
      const data = await response.text();
      throw Error(data);
    } else {
      throw Error("Connection error");
    }
  } catch (err) {
    alert(err.message);
  }
};

function togglePasswordVisibility(inputId, iconId) {
  var passwordField = document.getElementById(inputId);
  var passwordIcon = document.getElementById(iconId);

  if (passwordField.type === "password") {
    passwordField.type = "text";
    passwordIcon.classList.remove("fa-eye");
    passwordIcon.classList.add("fa-eye-slash");
  } else {
    passwordField.type = "password";
    passwordIcon.classList.remove("fa-eye-slash");
    passwordIcon.classList.add("fa-eye");
  }
}

document
  .getElementById("clickable-link")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default link behavior
    window.location.href = "/loginUser";
  });
function LoginClick() {
  var navigateButton = document.getElementById("navigateButton");
}
function BackClick() {
  var navigateButton = document.getElementById("navigateButton");

  // ทำให้กลับไปหน้าก่อน
  window.location.href = "/loginUser";
}
// icon button
var icon = document.getElementById("clickable-icon");
icon.addEventListener("click", function () {
  // Add your action here
  window.location.href = "/loginUser";
});

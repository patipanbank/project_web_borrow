
function togglePasswordVisibility() {
      var passwordField = document.getElementById("txtPassword");
      var passwordIcon = document.getElementById("password-icon");

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

    const formLogin = document.querySelector('#formLogin');
    formLogin.onsubmit = async function (e) {
      e.preventDefault();
      const username = formLogin['txtUsername'].value;
      const password = formLogin['txtPassword'].value;

      try {
        const options = {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ "username": username, "password": password }),
        };
        const response = await fetch('/loginUser', options)
        if (response.ok) {
          const data = await response.text();
          // alert(data);
          //  Notiflix.Report.success('Success', data, 'OK');
          window.location.replace(data);

        }
        else if (response.status == 401) {
          const data = await response.text();
          throw Error(data);
        }
        else if (response.status == 999) {
          const data = await response.text();
          throw Error(data);
        }
        else {
          throw Error('Connection error');
        }
      } catch (err) {

        alert(err.message);

      }
    }

    document.getElementById("clickable-link").addEventListener("click", function (event) {
      event.preventDefault(); // Prevent the default link behavior
      window.location.href = "/rolePage";
    });
    function SignupClick() {
      var navigateButton = document.getElementById("navigateButton");

      window.location.href = "/registerUser"; // Replace with the correct URL
    }
    // icon button
    var icon = document.getElementById("clickable-icon");
    icon.addEventListener("click", function () {
      // Add your action here
      window.location.href = "/rolePage";
    });
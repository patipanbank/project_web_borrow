<script>
      const Assetlist = document.getElementById("Assetlist");
      const Available = document.getElementById("Available");
      const Disable = document.getElementById("Disable");
      const Approve = document.getElementById("Approve");
      const Reject = document.getElementById("Reject");
      const Waiting = document.getElementById("Waiting");

      Assetlist.addEventListener("click", function () {
        window.location.href = "/staffEdit";
      });

      Available.addEventListener("click", function () {
        window.location.href = "/staffAva";
      });

      Disable.addEventListener("click", function () {
        window.location.href = "/staffDis";
      });
    </script>
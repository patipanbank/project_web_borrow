const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");
const bcrypt = require("bcrypt");
const con = require("./config/db");
const app = express();
const { raw } = require("mysql2");
const session = require("express-session");
const { log } = require("console");
const e = require("express");
const MemoryStore = require("memorystore")(session);

// set the public folder
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
    secret: "iday",
    resave: false,
    saveUninitialized: true,

    store: new MemoryStore({
      checkPeriod: 24 * 60 * 60 * 1000, // prune expired entries every 24h
    }),
  })
);
// ------------- Change status --------------
app.post("/borrowstatus/:borrowid", function (req, res) {
  const borrowid = req.params.borrowid;
  const status = req.body;
  const sql = "UPDATE borrow SET statusborrow = ? WHERE borrowid = ?";
  con.query(sql, [status.status, borrowid], function (err, results) {
    if (err) {
      console.error(err);
      return res.status(500).send("Database server error");
    } else if (results.affectedRows != 1) {
      console.error("Row updated is not 1");
      return res.status(500).send("Update failed");
    } else {
      res.send("Update succesfully");
    }
  });
});

// ------------- GET all borrows --------------
app.get("/borrows", function (_req, res) {
  const sql =
    "SELECT borrow.*, product.*,user.email FROM borrow JOIN product ON borrow.id = product.id JOIN user ON borrow.userid = user.userid;";
  con.query(sql, function (err, results) {
    if (err) {
      console.error(err);
      return res.status(500).send("Database server error");
    }
    res.json(results);
  });
});

// ------------- get-currentID --------------
app.get("/borrows-currentId", function (_req, res) {
  const id = _req.session.userId;
  const sql =
    "SELECT borrow.*, product.*,user.email FROM borrow JOIN product ON borrow.id = product.id JOIN user ON borrow.userid = user.userid WHERE borrow.userid = ?;";
  con.query(sql, [id], function (err, results) {
    if (err) {
      console.error(err);
      return res.status(500).send("Database server error");
    }
    res.json(results);
  });
});

// ------------- Update product OLD --------------
// app.put("/updateproduct/:id", function (req, res) {
//   const id = req.params.id;
//   const updateProduct = req.body;
//   const sql = "UPDATE product SET ? WHERE id = ?";
//   con.query(sql, [updateProduct, id], function (err, results) {
//     if (err) {
//       console.error(err);
//       return res.status(500).send("Database server error");
//     }
//     if (results.affectedRows != 1) {
//       console.error("Row updated is not 1");
//       return res.status(500).send("Update failed");
//     }
//     res.send("Update succesfully");
//   });
// });

// ------------- Update a product --------------
app.put("/products/:id", function (req, res) {
  const id = req.params.id;
  const updateProduct = req.body;
  const sql = "UPDATE product SET ? WHERE id = ?";
  con.query(sql, [updateProduct, id], function (err, results) {
    if (err) {
      console.error(err);
      return res.status(500).send("Database server error");
    }
    if (results.affectedRows != 1) {
      console.error("Row updated is not 1");
      return res.status(500).send("Update failed");
    }
    res.send("Update succesfully");
  });
});
// ------------- GET all products --------------
app.get("/products", function (_req, res) {
  const sql = "SELECT * FROM product";
  con.query(sql, function (err, results) {
    if (err) {
      console.error(err);
      return res.status(500).send("Database server error");
    }
    res.json(results);
  });
});
// ------------- GET all products borrow--------------
app.get("/productss", function (_req, res) {
  const sql =
    "SELECT p.*, b.statusborrow FROM product p LEFT JOIN borrow b ON p.id = b.id WHERE p.statusproduct = 0";

  // const sql = "SELECT * FROM product WHERE statusproduct = 0";
  con.query(sql, function (err, results) {
    if (err) {
      console.error(err);
      return res.status(500).send("Database server error");
    }
    res.json(results);
  });
});

// ------------- Delete a product --------------
app.delete("/products/:id", function (req, res) {
  const id = req.params.id;
  const sql = "DELETE FROM product WHERE id = ?";
  con.query(sql, [id], function (err, results) {
    if (err) {
      console.error(err);
      return res.status(500).send("Database server error");
    }
    if (results.affectedRows != 1) {
      console.error("Row deleted is not 1");
      return res.status(500).send("Delete failed");
    }
    res.send("Delete succesfully");
  });
});

// ------------- Return a borrow --------------
app.put("/borrows/:borrowid", function (req, res) {
  const borrowid = req.params.borrowid;
  const status = req.body.status;
  const sql = "UPDATE borrow SET statusborrow = ? WHERE borrowid = ?";

  con.query(sql, [status, borrowid], function (err, results) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database server error" });
    }
    if (results.affectedRows != 1) {
      console.error("Row updated is not 1");
      return res
        .status(500)
        .json({ error: "Update failed: No or multiple rows affected" });
    }
    res.json({ message: "Return successfully" });
  });
});

// ------------- Add a new product --------------
app.post("/products", function (req, res) {
  const newProduct = req.body;
  const sql = "INSERT INTO product SET ?";
  con.query(sql, newProduct, function (err, results) {
    if (err) {
      console.error(err);
      return res.status(500).send("Database server error");
    }
    if (results.affectedRows != 1) {
      console.error("Row added is not 1");
      return res.status(500).send("Add failed");
    }
    res.send("Add succesfully");
  });
});

// ------------- Available and Disable --------------
app.post("/onoffitem", (req, res) => {
  let sql = "UPDATE product SET statusproduct = ? WHERE id = ?";
  let params = [req.body.status, req.body.idproduct];
  con.query(sql, params, (err, ress) => {
    if (err) {
      res.status(500).send("DB ERROR");
      throw err;
    }
    res.send("ok");
  });
});

// ------------- Add Borrow --------------
app.post("/borrows", function (req, res) {
  const newBorrow = req.body;
  const sql =
    "INSERT INTO borrow (borrowdate, returndate, userid, id, statusborrow) VALUES (?, ?, ?, ?, 1)";
  con.query(
    sql,
    [
      newBorrow.borrowdate,
      newBorrow.returndate,
      newBorrow.userid,
      newBorrow.id,
    ],
    function (err, results) {
      if (err) {
        console.error(err);
        return res.status(500).send("Database server error");
      }
      if (results.affectedRows != 1) {
        console.error("Row added is not 1");
        return res.status(500).send("Add failed");
      }
      res.send("success");
    }
  );
});

///// lecturer request page
app.post("/appordis", (req, res) => {
  let sql;
  let params;
  if (req.body.tpyeApporDis) {
    sql = "UPDATE borrow SET statusborrow = ? WHERE borrowid = ?";
    params = [2, req.body.borrowid];
  } else {
    sql = "UPDATE borrow SET statusborrow = ? , reason = ? WHERE borrowid = ?";
    params = [3, req.body.reasons, req.body.borrowid];
  }

  con.query(sql, params, (err, resule) => {
    if (err) {
      res.status(500).send("DB ERROR");
      throw err;
    }

    res.send("ok");
  });
});

// ============= Create hashed password ==============
// === web sevices ===
app.get("/password/:raw", function (req, res) {
  const raw = req.params.raw;
  bcrypt.hash(raw, 10, function (err, hash) {
    if (err) {
      res.status(500).send("Hash error");
    } else {
      res.send(hash);
    }
  });
});

//---------------Get user info----------------
app.get("/user", function (req, res) {
  // res.send(req.session.username);
  res.json({
    userid: req.session.userId,
    username: req.session.username,
    email: req.session.email,
    role: req.session.userRole,
  });
});

// login user
app.post("/loginUser", function (req, res) {
  const { username, password } = req.body;
  const sql = "SELECT * FROM user WHERE username= ?";
  con.query(sql, [username], function (err, results) {
    if (err) {
      console.error(err);
      res.status(500).send("DB error");
    } else if (results.length != 1) {
      res.status(401).send("Wrong username and password");
    } else {
      //compare raw with hashed password
      bcrypt.compare(password, results[0].password, function (err, same) {
        if (err) {
          res.status(500).send("Password error");
        } else {
          if (same) {
            if (results[0].role == 3) {
              req.session.username = username;
              req.session.userId = results[0].userid;
              req.session.userRole = results[0].role;
              req.session.email = results[0].email; // เพิ่มบรรทัดนี้เพื่อเก็บอีเมลใน session
              res.send("/userBorrowlist");
            } else {
              res.status(401).send("you are not user");
            }
          } else {
            res.status(401).send("Wrong password");
          }
        }
      });
    }
  });
});

// ---------------Logout----------------
app.get("/logout", function (req, res) {
  req.session.destroy(function (err) {
    if (err) {
      return res.status(500).send("Session error");
    }
    res.redirect("/");
  });
});

// Login user
app.get("/loginUser", function (_req, res) {
  res.sendFile(path.join(__dirname, "/views/user/user_login.html"));
});

// user request status
app.get("/reQuest", function (_req, res) {
  res.sendFile(path.join(__dirname, "/views/user/user_request_statust.html"));
});
// User homepage
app.get("/userBorrowlist", function (_req, res) {
  res.sendFile(path.join(__dirname, "/views/user/user_borrow_list.html"));
});
// user register
app.get("/registerUser", function (_req, res) {
  res.sendFile(path.join(__dirname, "/views/user/user_register.html"));
});

app.post("/loginStaff", function (req, res) {
  const { username, password } = req.body;
  const sql = "SELECT * FROM user WHERE username= ?";
  con.query(sql, [username], function (err, results) {
    if (err) {
      console.error(err);
      res.status(500).send("DB error");
    } else if (results.length != 1) {
      res.status(401).send("Wrong username and password");
    } else {
      //compare raw with hashed password
      bcrypt.compare(password, results[0].password, function (err, same) {
        if (err) {
          res.status(500).send("Password error");
        } else {
          if (same) {
            if (results[0].role == 1) {
              req.session.username = username;
              req.session.userId = results[0].userid;
              req.session.userRole = results[0].role;
              res.send("/staffHomepage");
            } else {
              res.status(401).send("you are not staff");
            }
          } else {
            res.status(401).send("Wrong password");
          }
        }
      });
    }
  });
});

////GetDataBorrow
app.get("/GetDataBorrow", (req, res) => {
  let sql =
    // "SELECT borrow.*, product.*,user.email FROM borrow JOIN product ON borrow.id = product.id JOIN user ON borrow.userid = user.userid;";
    "SELECT borrow.*, user.email, product.name FROM borrow INNER JOIN user ON borrow.userid = user.userid INNER JOIN product ON borrow.id = product.id";
  con.query(sql, (err, resu) => {
    if (err) {
      res.status(500).send("DB");
    }
    let sql = "SELECT * FROM product";
    con.query(sql, (err2, resu2) => {
      if (err2) {
        res.status(500).send("DB");
      }

      res.send({ resu: resu, resu2: resu2 });
    });
  });
});

////Disable
app.get("/Disable", (req, res) => {
  const countQuery = "SELECT * FROM product WHERE statusproduct = '1'";
  con.query(countQuery, function (err, result) {
    if (err) {
      console.error(err);
      res.status(500).send("connecttion error");
    } else {
      res.send(result);
    }
  });
});

////Available
app.get("/Available", (req, res) => {
  const countQuery = "SELECT * FROM product WHERE statusproduct = '0'";
  con.query(countQuery, function (err, result) {
    if (err) {
      console.error(err);
      res.status(500).send("connecttion error");
    } else {
      res.send(result);
    }
  });
});

////Borrowing
app.get("/Borrowing", (req, res) => {
  const countQuery = "SELECT * FROM product WHERE statusproduct = '2'";
  con.query(countQuery, function (err, result) {
    if (err) {
      console.error(err);
      res.status(500).send("connecttion error");
    } else {
      res.send(result);
    }
  });
});

// staff sidebar
app.get("/sideStaff", function (_req, res) {
  res.sendFile(path.join(__dirname, "/views/staff/staff_sidebar.html"));
});
// staff login
app.get("/loginStaff", function (_req, res) {
  res.sendFile(path.join(__dirname, "/views/staff/staff_login.html"));
});
// staff homepage
app.get("/staffHomepage", function (_req, res) {
  res.sendFile(path.join(__dirname, "/views/staff/staff_homepage.html"));
});
// staff history
app.get("/staffHistory", function (_req, res) {
  res.sendFile(path.join(__dirname, "/views/staff/staff_history.html"));
});
// staff return
app.get("/staffReturn", function (_req, res) {
  res.sendFile(path.join(__dirname, "/views/staff/staff_return.html"));
});
// staff assetlist
app.get("/staffAsset", function (_req, res) {
  res.sendFile(
    path.join(__dirname, "/views/staff/dashboard/dash_assetlist.html")
  );
});
// staff availiable
app.get("/staffAva", function (_req, res) {
  res.sendFile(
    path.join(__dirname, "/views/staff/dashboard/dash_available.html")
  );
});
// staff disable
app.get("/staffDis", function (_req, res) {
  res.sendFile(
    path.join(__dirname, "/views/staff/dashboard/dash_disable.html")
  );
});
// staff borrowing
app.get("/staffBow", function (_req, res) {
  res.sendFile(
    path.join(__dirname, "/views/staff/dashboard/dash_borrowing.html")
  );
});
// staff additem
app.get("/staffAdd", function (_req, res) {
  res.sendFile(
    path.join(__dirname, "/views/staff/dashboard/dash_additem.html")
  );
});
// staff edit
app.get("/staffEdit", function (_req, res) {
  res.sendFile(path.join(__dirname, "/views/staff/dashboard/dash_edit.html"));
});

app.post("/loginLecturer", function (req, res) {
  const { username, password } = req.body;
  const sql = "SELECT * FROM user WHERE username= ?";
  con.query(sql, [username], function (err, results) {
    if (err) {
      console.error(err);
      res.status(500).send("DB error");
    } else if (results.length != 1) {
      res.status(401).send("Wrong username and password");
    } else {
      //compare raw with hashed password
      bcrypt.compare(password, results[0].password, function (err, same) {
        if (err) {
          res.status(500).send("Password error");
        } else {
          if (same) {
            if (results[0].role == 2) {
              req.session.username = username;
              req.session.userId = results[0].userid;
              req.session.userRole = results[0].role;
              res.send("/lecturerHomepage");
            } else {
              res.status(401).send("you are not lecturer");
            }
          } else {
            res.status(401).send("Wrong password");
          }
        }
      });
    }
  });
});

// lecturer login
app.get("/loginLecturer", function (_req, res) {
  res.sendFile(path.join(__dirname, "/views/leader/lecturer_login.html"));
});
// lecturer homepage
app.get("/lecturerHomepage", function (_req, res) {
  res.sendFile(path.join(__dirname, "/views/leader/lecturer_homepage.html"));
});
// lecturer sidebar
app.get("/sideLecturer", function (_req, res) {
  res.sendFile(path.join(__dirname, "/views/leader/lecturer_sidebar.html"));
});
// lecturer history
app.get("/lecHis", function (_req, res) {
  res.sendFile(path.join(__dirname, "/views/leader/lecturer_history.html"));
});
// lecturer approve
app.get("/lecApp", function (_req, res) {
  res.sendFile(
    path.join(__dirname, "/views/leader/dashboard/lecturer_approve.html")
  );
});
// lecturer asset
app.get("/lecAss", function (_req, res) {
  res.sendFile(
    path.join(__dirname, "/views/leader/dashboard/lecturer_asset.html")
  );
});
// lecturer disapprove
app.get("/lecdis", function (_req, res) {
  res.sendFile(
    path.join(__dirname, "/views/leader/dashboard/lecturer_disapprove.html")
  );
});
// lecturer returned
app.get("/lecReturned", function (_req, res) {
  res.sendFile(
    path.join(__dirname, "/views/leader/dashboard/lec_returned.html")
  );
});
// lecturer request
app.get("/lecRe", function (_req, res) {
  res.sendFile(
    path.join(__dirname, "/views/leader/dashboard/lecturer_request.html")
  );
});

// ------------ root service ----------
app.get("/", function (_req, res) {
  res.sendFile(path.join(__dirname, "/views/role_page.html"));
});

const PORT = 3000;
app.listen(PORT, function () {
  console.log("Server is runnint at port " + PORT);
});

// role page
app.get("/rolePage", function (_req, res) {
  res.sendFile(path.join(__dirname, "/views/role_page.html"));
});

app.post("/registerUser", function (req, res) {
  const { email, username, password, repassword, role } = req.body;

  // Check if email is already in use
  const emailCheckSQL = "SELECT email FROM user WHERE email = ?";
  con.query(emailCheckSQL, [email], function (err, emailResult) {
    if (err) {
      console.error(err);
      return res.status(500).send("Server error!");
    } else if (emailResult.length > 0) {
      return res.status(401).send("Email is already in use!");
    }

    // Hash password
    bcrypt.hash(password, 10, function (err, hash) {
      if (err) {
        return res.status(500).send("Hash error!");
      } else if (
        email == "" ||
        username == "" ||
        password == "" ||
        repassword == ""
      ) {
        res.status(402).send("Please enter information");
      } else {
        const usernameCheckSQL = "SELECT username FROM user WHERE username= ?";
        con.query(usernameCheckSQL, [username], function (err, usernameResult) {
          if (err) {
            console.error(err);
            res.status(500).send("Server error!");
          } else if (usernameResult.length > 0) {
            res.status(401).send("Username has already been used!");
          } else {
            // Check password
            if (password !== repassword) {
              return res.status(401).send("Password mismatch!");
            }
            // Correct data
            const sql =
              "INSERT INTO user (email, username, password, role) VALUES (?,?,?,3)";
            con.query(
              sql,
              [email, username, hash, role],
              function (err, result) {
                if (err) {
                  console.error(err);
                  res.status(500).send("Server error inserting data!");
                } else {
                  // Save user data in session after registration
                  req.session.user = { email, username };
                  res.send("/loginUser");
                }
              }
            );
          }
        });
      }
    });
  });
});

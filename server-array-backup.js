const pool = require("./db");

pool.query("SELECT NOW()", (err, result) => {

    if(err){
        console.log(err);
    }
    else{
        console.log(result.rows);
    }

});
const express = require("express");

const app = express();

app.use(express.json());

app.get("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const user = users.find(u => u.id === id);

    if (!user) {
        return res.send({ message: "User not found" });
    }

    res.send(user);
});

app.post("/register", (req, res) => {
    const { name, email, password } = req.body;
    const user = {
        id: users.length + 1,
        name,
        email,
        password
    };
    users.push(user);
    res.send({
        message: "User registered successfully",
        user
    });
});

app.put("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);

    if (!user) {
        return res.send({
            message: "User not found"
        });
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    res.send({
        message: "User updated",
        user
    });
});

app.delete("/users/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const index = users.findIndex(u => u.id === id);

    if (index === -1) {
        return res.send({
            message: "User not found"
        });
    }

    users.splice(index, 1);

    res.send({
        message: "User deleted"
    });

});

app.listen(5000, () => {
  console.log("Server Started on 5000");
});

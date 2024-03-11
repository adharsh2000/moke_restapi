import  express  from "express";
import  {users}  from "./user.js";
const app = express()
const port = 4000

app.use(express.json())

app.get("/users",(req,res) => {
    res.json(users)
})

app.post("/user",(req,res) => {
    const user = req.body.data
    users.push(user);
    res.json({
        message:"user added succesfully",
        data:user
    })
})

app.get("/user/:id",(req,res) => {
    const id = req.params.id
    const user = users.find((item) => item.id == id)
    res.json({
        message:"user fetch succesfully",
        data:user
    })
})

app.put("/user/:id", (req, res) => {
    const id = req.params.id;
    const updatedUser = req.body.data;
    const index = users.findIndex((item) => item.id == id);
    if (index !== -1) {
        users[index] = { ...users[index], ...updatedUser };
        res.json({
            message: "User updated successfully",
            data: users[index]
        });
    } else {
        res.status(404).json({
            message: "User not found"
        });
    }
});

app.delete("/user/:id", (req, res) => {
    const id = req.params.id;
    const index = users.findIndex((item) => item.id == id);
    if (index !== -1) {
        users.splice(index, 1);
        res.json({
            message: "User deleted successfully"
        });
    } else {
        res.status(404).json({
            message: "User not found"
        });
    }
});


app.listen(port,() => {
    console.log(`server started on port : ${port}`)
})
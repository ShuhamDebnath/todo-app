require("dotenv").config();

const Todo = require("./Todo");
const express = require("express");
const router = new express.Router();

router.get("/api/todo", async (req, res) => {
  try {
    const todoData = await Todo.find();
    res.status(200).send(todoData);
    console.log(todoData);
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
});

router.get("/api/todo/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const todoData = await Todo.findById(_id);
    res.status(200).send(todoData);
    console.log(todoData);
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
});

// http://localhost:5000/api/todo/

router.post("/api/todo", async (req, res) => {
  const { task, priority, color, date, completed } = req.body;

  try {
    let todo_exist = await Todo.findOne({ task });
    if (todo_exist) {
      return res.status(400).json({
        success: false,
        message: "User already exist",
      });
    }

    let todo = new Todo();

    todo.task = task;
    todo.priority = priority;
    todo.color = color;
    todo.date = date;
    todo.completed = completed;
    todo.save();

    res.status(200).send(todo);
    console.log(req.body);
  } catch (err) {
    res.status(400).send(err);
    console.log(err);
  }
});

router.patch("/api/todo/:_id", async (req, res) => {
  try {
    const _id = req.params._id;
    const todoData = await Todo.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    res.status(200).send(todoData);
  } catch (err) {
    res.status(404).send(err);
  }
});

router.delete("/api/todo/:_id", async (req, res) => {
  try {
    const _id = req.params._id;
    const todoData = await Todo.deleteOne({ _id });
    res.status(200).send(todoData);
    console.log(todoData);
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
});

router.delete("/api/todo", async (req, res) => {
  try {
    const todoData = await Todo.deleteMany();
    res.status(200).send(todoData);
    console.log(todoData);
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
});

// router.post("/api/todo", async (req, res) => {
//   const { topic, priority, color, date,completed } = req.body;

//   try {
//     let todo_exist = await User.findOne({ topic });
//     if (user_exist) {
//       return res.status(400).json({
//         success: false,
//         message: "User already exist",
//       });
//     }

//     let user = new User();

//     user.username = username;
//     user.email = email;

//     let size = 200;
//     const avatarUrl = `https://gravatar.com/avatar/?s=${size}&d=retro`;
//     const passwordhash = await bcryptjs.hash(password, 10);

//     user.password = passwordhash;
//     user.avatar = avatarUrl;

//     user.save();

//     const payload = {
//       user: {
//         id: user.id,
//       },
//     };
//     jwt.sign(
//       payload,
//       process.env.JWT_USER_SECRET,
//       {
//         expiresIn: 3600000,
//       },
//       (err, token) => {
//         if (err) throw err;
//         res.status(200).json({
//           success: true,
//           message: "Login success",
//           token: token,
//           user: user,
//         });
//       }
//     );
//   } catch (err) {
//     res.status(400).send(err);
//     console.log(err);
//   }
// });

// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       res.status(400).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     const isMatch = await bcryptjs.compare(password, user.password);

//     if (!isMatch) {
//       res.json({
//         success: false,
//         message: "Password not match",
//       });
//       console.log(isMatch);
//     }

//     const payload = {
//       user: {
//         id: user.id,
//       },
//     };
//     jwt.sign(
//       payload,
//       process.env.JWT_USER_SECRET,
//       {
//         expiresIn: 3600000,
//       },
//       (err, token) => {
//         if (err) throw err;
//         res.status(200).json({
//           success: true,
//           message: "Login success",
//           token: token,
//           user: user,
//         });
//       }
//     );
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       sucess: false,
//       msg: " Server Error",
//     });
//   }
// });

module.exports = router;

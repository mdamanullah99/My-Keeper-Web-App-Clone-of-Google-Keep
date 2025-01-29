import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy } from "passport-local";
import GoogleStrategy from "passport-google-oauth2";
import session from "express-session";
import env from "dotenv";
import cors from "cors";

// Configurations
const app = express();
const port = 3000;
const saltRounds = 10;
env.config();

// MiddleWares

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("public"));

// DB configuration 
const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
  });
  
  // DB connected
  db.connect();

  app.get("/notes/:id", async (req, res)=>{
    const id = req.params.id;
    console.log(req.params.id);
   try{
     const result =  await db.query("SELECT * FROM notes WHERE user_id = $1 ORDER BY id DESC", [id]);
     console.log(result.rows);
     res.send(result.rows);
      }
      catch(err){
       console.log(err)
       }
    
  });

  app.post("/create", async(req, res)=>{
    console.log(req.body.note);
    const { title, content} = req.body.note;
    const user_id = req.body.note.id;
    
    
    
    const result = await db.query("INSERT INTO notes (title, content, user_id) VALUES ($1, $2, $3) RETURNING *", [title, content, user_id]);
    console.log(result.rows[0]);
    if(result.rows[0]){
      res.send(result.rows[0]);

    }
  });

  app.delete("/delete/:id", async (req, res)=>{
    const id = req.params.id;
    const username = req.query.username;
    console.log(req.params.id);
    console.log(req.query.username);

    try{
       await db.query("DELETE FROM notes WHERE id = $1",[id]);

       const result =  await db.query("SELECT * FROM notes WHERE user_id = $1 ORDER BY id DESC", [username]);
     console.log(result.rows);
     res.send(result.rows);

    }
    catch(error){
      console.log(error);
    }

  });

  app.put("/update/:id", async (req, res)=>{
    console.log(req.body);
    const id = req.params.id;
    const {title, content, user_id} = req.body;

    try{
       await db.query("UPDATE notes SET title = $1 , content = $2, user_id = $3 WHERE id = $4",[title, content, user_id, id]);

       const result =  await db.query("SELECT * FROM notes WHERE user_id = $1 ORDER BY id DESC", [user_id]);
     console.log(result.rows);
     res.send(result.rows);

    }
    catch(error){
      console.log(error);
    }

  });


  app.post("/register", async (req, res)=>{
    console.log(req.body);
    const email = req.body.username;
    const password = req.body.password;


    try {
      const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);
  
      if (checkResult.rows.length > 0) {
        console.log("Already registered");
      } else {
        bcrypt.hash(password, saltRounds, async (err, hash) => {
          if (err) {
            console.error("Error hashing password:", err);
          } else {
            const result = await db.query(
              "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
              [email, hash]
            );
            const user = result.rows[0];
            console.log(user);
            res.send(user.id.toString());
            // req.login(user, (err) => {
            //   console.log("success");
            //   res.redirect("/secrets");
            // });
          }
        });
      }
    } catch (err) {
      console.log(err);
    }

  });


  app.post("/login", async (req, res)=>{
    console.log(req.body);
    const email = req.body.username;
    const password = req.body.password;
    console.log("email: "+ email + "  " + "passoword: " + password);


    try {
      const result = await db.query("SELECT * FROM users WHERE email = $1 ", [
        email
      ]);
      if (result.rows.length > 0) {
        const user = result.rows[0];
        const storedHashedPassword = user.password;
        bcrypt.compare(password, storedHashedPassword, (err, valid) => {
          if (err) {
            console.error("Error comparing passwords:", err);
           
            // return cb(err);
          } else {
            
            if (valid) {
              res.send(user.id.toString());

              //return cb(null, user);
            } 
            else {
              res.status(401).send("Wrong password");
              // Handle invalid password case
            }
            // else {
            //   return cb(null, false);
            // }
          }
        });
      } else {
        console.log("User not found");
        res.status(401).send("User not found");
        // return cb("User not found");
      }
    } catch (err) {
      console.log(err);
    }

  });




  // We are Listening to Port: 3000
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
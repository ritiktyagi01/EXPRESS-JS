//const express = require('express');
import express from 'express';
import router from './route.js';
import mongoose from 'mongoose';
import multer from 'multer';
import { connectdb } from './congfi/db.js';
import { storage } from './congfi/multer.js';
const app = express()
const port = 3000
app.use('/user', router);
import { aboutcontroller, getid, searchcontroller, usercontroller } from './controller.js';
import { person } from './model/Person.js';



//DATa base work here 
// const MONGODB_URL='mongodb+srv://ritiktyagi287:ritik123@cluster0.ybr6lw3.mongodb.net/express';

//  await mongoose.connect(MONGODB_URL). then(()=>{
//   console.log('database is connected successfullly!')
// })

await connectdb()


app.use(express.json());
app.post('/person', async (req, res) => {

  const { name, email, age } = req.body;
  const newPerson = new person({
    name,
    email,
    age
  })
  await newPerson.save();
  console.log(newPerson);
  res.send('Person route is working!')
})

/* to find someone by name and update their details
 app.put('/person/:name', async (req, res) => {
   const { name } = req.body;
  const newperson = await person.find({ name });


   console.log(newperson);
  res.send('Person updated!')
 })*/

/* Update a person's details by their name
 This endpoint updates a person's details based on their name*/
app.put('/person/:name', async (req, res) => {
  const { name, email, age } = req.body; // Get new data from body
  const oldName = req.params.name; // Get old name from URL

  // Find the person by old name and update with new data
  const updatedPerson = await person.findOneAndUpdate(
    { name: oldName },
    { name, email, age },
    { new: true }
  );

  if (!updatedPerson) {
    return res.status(404).send('Person not found!');
  }

  console.log(updatedPerson);
  res.send('Person updated!');
})

app.delete('/person/:name', async (req, res) => {
  const name = req.params.name; // Get name from URL

  // Find the person by name and delete
  const deletedPerson = await person.findOneAndDelete({ name });

  if (!deletedPerson) {
    return res.status(404).send('Person not found!');
  }

  console.log(deletedPerson);
  res.send('Person deleted successfully!');
})




// app.get('/about',aboutcontroller)
// app.get('/user/:username',usercontroller)
// app.get('/search',searchcontroller)

// app.use(express.json()) // Middleware to parse JSON bodies

// app.post('/users', express.json(), (req, res) => {
//     const { name, email } = req.body
//     res.json({
//         message: `Your Name is ${name} and your email is ${email}`,
//     })
// })

/*app.put('/users/:id', (req, res) => {
  const userid = req.params.id
  const { name, email } = req.body
  res.json({
    message: `Your id is ${userid} and your name is ${name} and your email is ${email}`,
  })
})*/

// app.delete('/users/:id', (req, res) => {
//     const userid = req.params.id
//     const { name, email } = req.body
//     res.json({
//         message: `Your id ${userid} is deleted sucessfully! `,
//     })
// })

// app.use('/things',router)
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Doe', email: 'jane@example.com' }
];
app.use(express.json()); // Middleware to parse JSON bodies
// PATCH request to update a user's email
// app.patch('/users/:id', (req, res) => {
//   const userId =parseInt(req.params.id);
//   const { email } = req.body;

//   const user = users.find(u => u.id === userId);
//   if (!user) {
//     return res.status(404).send({ message: 'User not found' });
//   }

//   if (email) {
//    if(email) user.email = email; // Update only the email field
//   }

//   res.send(user);
// });

//middleware to handle 404 errors
// app.use((req,res,next)=>{

//     console.log(`next function is callled! at `+Date.now())
//     next()

// })
// app.get('/', (req, res) => {
//     res.send("Hello World!");

// })
// app.get('/error',()=>
// {
//     throw new Error("This is an error!");
// })
// // Error handling middleware
// app.use((err,req,res,next)=>{
//     console.error( err.message);
//     res.send('Internal Server Error');
//     console.log('error is handled!')
// })
app.set('view engine', 'ejs');
// app.get('/',(req,res)=>{
//   const name = 'ritik tyagi'  
//   //res.render('filename', data).
//   res.render('index',{name})
// })


// Serve static files from the "public" directory
app.use(express.static('public'))
app.use('/images', express.static('images'))
app.get('/', (req, res) => {
  res.send('hello world!');
})
app.use(express.urlencoded({ extended: true }));
//app.use(upload.array());
const upload = multer({ storage });
app.use(upload.single('image'));
app.post('/form', (req, res) => {
  console.log(req.body);
  console.log(req.file);
  res.send('form is submitted successfully!')
})
app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
})
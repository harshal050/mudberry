const express = require("express");
const app = express();
const path = require('path');
const hbs = require("hbs");
const port = process.env.PORT || 3000;
const bcrypt = require("bcrypt")
const nodemailer = require('nodemailer')
// const jwt = require('jsonwebtoken')
const cookieparser = require("cookie-parser")


require("./db/conn")

const Register = require("./models/register")
const Subscribe = require("./models/subscriber")
const Prebook =require("./models/prebook") 
const Privateplan = require("./models/privateplan")


const staticPath = path.join(__dirname, "../public");
const templatePath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


app.use(cookieparser())
app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.use(express.static(staticPath));
app.set("view engine", "hbs");
app.set('views', templatePath);
hbs.registerPartials(partialsPath);



// Set up routes
app.get("/", (req, res) => {
    res.render("index") 
});


// app.get("/logout", (req, res) => {
//     res.cookie('access-token' , "",{maxAge:1})
//     res.redirect("/login")
// });

app.get("/login", (req, res) => {
    res.render("login")
});
app.get("/register", (req, res) => {
    res.render("register")
});
app.get("/prebook", (req, res) => {
    res.render("prebook")
});
app.get("/plans" , (req,res)=>{
    res.render("plans")
})
app.get("/intermidprivate" , (req,res)=>{
    res.render("intermidprivate")
})
app.get("/intermidmaster" , (req,res)=>{
    res.render("intermidmaster")
})
app.get("/master" , (req,res)=>{
    res.render("master")
})
app.get("/private" , (req,res)=>{
    res.render("private")
})
app.get("/aboutus" , (req,res)=>{
    res.render("aboutus")
})
app.get("/mycourses" , (req,res)=>{
    res.render("mycourses")
})
// app.get("/api/enrolledCourses" , (req,res)=>{
//     res.render("/api/enrolledCourses")
// })

app.get('*', (req, res)=>{
    res.render("404");
});


// var transporter = nodemailer.createTransport({
//     service:'gmail',
//     auth:{
//         user:'harshalupwork07@gmail.com',
//         pass:"Harshal@2772"
//     },
//     tls:{   
//         rejectUnauthorized:false
//     }
// })  
app.post('/register', async (req, res) => {
    try {
        const { password, confirmPassword } = req.body;

        if (password === confirmPassword) {
            const registerEmployee = new Register({
                firstname: req.body.fname,
                lastname: req.body.lname,
                email: req.body.email,
                gender: req.body.gender,
                phonenumber: req.body.phone,
                age: req.body.age,
                password: req.body.password,
                confirmPassword: req.body.confirmPassword // Assuming this field is in the schema
            });

            // const token = await registerEmployee.generateAuthToken();
            // console.log('Generated Token:', token);

            const registered = await registerEmployee.save();
            console.log('Registered Employee:', registered);
            
            res.render('index', { message: 'Registration Successful!' });
        } else {
            res.status(400).send('Passwords do not match');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});


const creatToken = (id) => {
    return jwt.sign({ id }, 'mynameisharshalhareshbhaimalaviyafromjasdan');
}

app.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = await Register.findOne({ email: email });

        if (user) {
            const match = await bcrypt.compare(password, user.password);

            if (match) {
                const token = creatToken(user._id);
                res.cookie('access-token', token);

                res.redirect("/");
            } else {
                res.status(404).send("Invalid credentials");
            }
        } else {
            res.status(404).send("Invalid user");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

app.get('/logout', (req, res) => {
    // Implement logout logic here - clear the session or token
    res.clearCookie('access-token'); // Clear the access token cookie
    res.redirect('/login'); // Redirect to login page after logout
  });

const Feedback = require("./models/feedback")

app.post("/contact", async (req, res) => {
    try {
        const newFeedback = new Feedback({
            yourname: req.body.yourname,
            youremail: req.body.youremail,
            yoursubject: req.body.yoursubject,
            yourmessage: req.body.yourmessage
        });

        const savedFeedback = await newFeedback.save(); // Save the feedback
        console.log(savedFeedback); // Log the saved feedback for verification

        // Pass a success message to the rendered page
        res.render("index");
    } catch (error) {
        console.error(error); // Log the error for debugging

        // Send an error response back to the client
        res.status(500).json({ message: 'Error saving feedback', error: error.message });
    }
});

  app.post("/subscribe", async (req, res) => {
    try {
      const newFeedback = new Subscribe({
        subemail:req.body.subemail
      });
  
      const savedFeedback = await newFeedback.save(); // Save the feedback
  
      console.log(savedFeedback); // Log the saved feedback for verification
  
      // Send a success response back to the client
      res.render("index");
    } catch (error) {
      console.error(error); // Log the error for debugging
  
      // Send an error response back to the client
      res.status(500).json({ message: 'Error saving feedback', error: error.message });
    }
  });


  
  app.post("/prebook", async (req, res) => {
    try {
        const newPrebook = new Prebook({
            pname: req.body.pname,
            pnumber: req.body.pnumber,
            pdate: req.body.pdate
        });

            const savedPrebook = await newPrebook.save(); 
            console.log(savedPrebook); // Log the saved feedback for verification

            res.render("index");
    } 
    catch (error) {
            console.error(error); // Log the error for debugging

        // Send an error response back to the client
            res.status(500).json({ message: 'Error saving Premium', error: error.message });
        }
    });

    

    app.post("/private", async (req, res) => {
        try {
            const newPrivateplan = new Privateplan({
                email: req.body.email,
                phonenumber: req.body.phonenumber,
                date: req.body.date,
                people: req.body.people,
                slot: req.body.slot
            });
    
            const savedPrivateplan = await newPrivateplan.save();
            console.log(savedPrivateplan); // Log the saved feedback for verification
    
            res.render("index");
        } catch (error) {
            console.error(error); // Log the error for debugging
    
            // Send the error message back to the client-side
            res.status(500).send({ message: 'Error saving plan', error: error.message });
        }
    });

        const Masterplan = require("./models/mplan")
        app.post("/master", async (req, res) => {
            try {
                const newMasterplan = new Masterplan({
                    email: req.body.email,
                    phonenumber: req.body.phonenumber,
                    monthyear: req.body.monthyear
                });
        
                    const savedMasterplan = await newMasterplan.save(); 
                    console.log(savedMasterplan); // Log the saved feedback for verification
        
                    res.render("index");
            } 
            catch (error) {
                    console.error(error); // Log the error for debugging
        
                // Send an error response back to the client
                    res.status(500).json({ message: 'Error saving plan', error: error.message });
                }
            });

        

const securePassword = async (password)=>{
    const passwordHash =  await bcrypt.hash(password , 10)
    const passwordmatch = await bcrypt.compare(password,passwordHash)
    console.log(passwordmatch)
}

async function fetchCoursesByEmail(email) {
    console.log(email)
    const client = new MongoClient(url, { useUnifiedTopology: true });

    try {
        await client.connect();
        const db = client.db(dbName);

        const masterPlansCollection = db.collection('masterplans');
        const privatePlanCollection = db.collection('privateplans');

        const masterPlans = await masterPlansCollection.find({ email: email }).toArray();
        const privatePlans = await privatePlanCollection.find({ email: email }).toArray();

        return { masterPlans, privatePlans };
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    } finally {
        client.close();
    }
}
app.get('/api/enrolledCourses', async (req, res) => {
    const email = req.query.email; // Retrieve email from query parameter

    if (!email) {
        return res.status(400).send('Email is required');
    }

    try {
        const courses = await fetchCoursesByEmail(email);
        res.json(courses);
    } catch (error) {
        res.status(500).send('An error occurred while fetching data');
    }
});

const jwt = require("jsonwebtoken")

// const creatToken =async()=>{
//     const token = await jwt.sign({_id:"658a54d6d53dd6e093139140"} , process.env.SECRET_KEY
//     ,{expiresIn:"2 seconds"}
//     )
//     const userver = await jwt.verify(token, process.env.SECRET_KEY)
//     console.log(userver)
// }

// securePassword("djhaf")
// creatToken()
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

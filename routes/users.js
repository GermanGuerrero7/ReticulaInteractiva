const User = require("../models/user.js")
const {ensureAuthenticated} = require("../config/auth.js")

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const passport = require('passport')

//login handle
// router.get('/login',(req,res)=>{
//     // res.render('./pages/login');
// })
// router.get('/register',(req,res)=>{
//     // res.render('./pages/register')
//     })

router.get('/',ensureAuthenticated, function (req, res) {
        res.render('pages/home',{
            user: req.user, error: false
        });
        
    });    
//Register handle
// router.post('/register',(req,res)=>{
//     const {name,email, password, password2} = req.body;
//     let errors = [];
//     console.log(' Name ' + name+ ' email :' + email+ ' pass:' + password);
//     if(!name || !email || !password || !password2) {
//         errors.push({msg : "Please fill in all fields"})
//     }
//     //check if match
//     if(password !== password2) {
//         errors.push({msg : "passwords dont match"});
//     }
//     //check if password is more than 6 characters
//     if(password.length < 6 ) {
//         errors.push({msg : 'password atleast 6 characters'})
//     }
//     if(errors.length > 0 ) {
//         res.render('register', {
//             errors : errors,
//             name : name,
//             email : email,
//             password : password,
//             password2 : password2})
//         } else {
//             // Validation passed
//             User.findOne({email: email}).exec((err,user) =>{
//                 console.log(user);
//                 if(user){
//                     errors.push({msg: 'email already registered'});
//                     res.render('register', {errors, name, email, password, password2});
//                 } else {
//                     const newUser = new User({
//                         name: name,
//                         email: email,
//                         password: password
//                     });
//                     bcrypt.genSalt(10,(err,salt)=> 
//                         bcrypt.hash(newUser.password,salt,
//                         (err,hash)=> {
//                     if(err) throw err;
//                         //save pass to hash
//                         newUser.password = hash;
//                     //save user
//                     newUser.save()
//                     .then((value)=>{
//                         console.log(value)
//                         req.flash('success_msg','You have now registered!')
//                     res.redirect('/users/login');
//                     })
//                     .catch(value=> console.log(value));
                      
//                 }));
//                 }
//             })
//         }
// })

router.post('/register',(req,res)=>{
    const {userid, nombre, password, password2, email, carrera, semestre, especialidad} = req.body;
    let errors = [];
    console.log(' No ctrl ' + userid + ' nombre: ' + nombre + ' email :' + email+ ' pass:' + password);
    if(!userid || !nombre || !email || !password || !password2 || !carrera  || !especialidad) {
        errors.push({msg : "Por favor llena todo los campos"})
    }
    //check if match
    if(password !== password2) {
        errors.push({msg : "Los passwords no coinciden"});
    }
    //check if password is more than 6 characters
    if(password.length < 6 ) {
        errors.push({msg : 'El password debe tener al menos 6 caracteres'})
    }
    if(errors.length > 0 ) {
        res.get('/register', {
            errors : errors,
            userid : userid,
            nombre: nombre,
            email : email,
            carrera : carrera,
            semestre: semestre,
            especialidad: especialidad,
            password : password,
            password2 : password2})
        } else {
            // Validation passed
            User.findOne({userid: userid}).exec((err,user) =>{
                console.log(user);
                if(user){
                    errors.push({msg: 'Número de control ya registrado'});
                    res.render('pages/register', {errors, userid, nombre, email, password, password2, carrera, semestre, especialidad});
                } else {
                    const newUser = new User({
                        userid: userid,
                        nombre: nombre,
                        password: password,
                        email: email,
                        carrera: carrera,
                        semestre: semestre,
                        especialidad: especialidad
                    });
                    bcrypt.genSalt(10,(err,salt)=> 
                        bcrypt.hash(newUser.password,salt,
                        (err,hash)=> {
                    if(err) throw err;
                        //save pass to hash
                        newUser.password = hash;
                    //save user
                    newUser.save()
                    .then((value)=>{
                        console.log(value)
                        req.flash('success_msg','Registro satisfactorio!')
                    res.redirect('/login');
                    })
                    .catch(value=> console.log(value));
                      
                }));
                }
            })
        }
})

router.post('/login',(req,res,next)=>{
    passport.authenticate('local',{
        successRedirect : '/',
        failureRedirect : '/login',
        failureFlash : true,
        })(req,res,next);
  })

//logout
router.get('/logout',(req,res)=>{
    req.logout();
    req.flash('success_msg','Has cerrado sesión');
    res.redirect('./login');
 })


//  router.put('/save',
//  function(req, res) {
//    // If this function gets called, authentication was successful.
//    // `req.user` contains the authenticated user.
//    console.log(req.user.userid)
//       //const userid = req.user._id; 
//       const filter = {userid: req.user.userid};
      
//     const user = User.findOneAndUpdate({ filter, seleccion:  [0,3,12,13,14,15,18,19,20,21,24,25,26,27,48,51])
//     user.seleccion = req.body.seleccion;
//     // const doc = user.update();
//     console.log(req.body.seleccion);
//  });

// router.put('/save/', (req, res) => {
//       User.findOne({userid: req.user.userid})
//     .then(puppies => res.json(puppies))
//     .catch(err => res.status(400).json("Error: " + err))
// })

router.put('/save/', async (req, res) => {
    const updates = await req.body
      console.log(updates)
      User.findOneAndUpdate({userid: req.user.userid}, updates, {new: true})
    .then(puppies => res.json(puppies))
    .catch(err => res.status(400).json("Error: " + err))
})


 module.exports  = router;
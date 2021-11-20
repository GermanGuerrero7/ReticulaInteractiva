const mongoose = require('mongoose');
const UserSchema  = new mongoose.Schema({
//   name :{
//       type  : String,
//       required : true
//   } ,
//   email :{
//     type  : String,
//     required : true
// } ,
// password :{
//     type  : String,
//     required : true
// } ,
// date :{
//     type : Date,
//     default : Date.now
// }
// });

userid :{
    type  : Number, min: 11111111, max: 99999999,
    required : true
} ,
nombre :{
  type  : String,
  required : true
} ,
password :{
  type  : String,
  required : true
} ,
email :{
    type : String,
    require : true
},
carrera :{
    type : String,
    require: true
},
semestre : {
    type : Number, max : 15,
    required : false
},
especialidad : {
    type : String,
    required : true
},
date :{
  type : Date,
  default : Date.now
}
});

const User= mongoose.model('User',UserSchema);

module.exports = User;
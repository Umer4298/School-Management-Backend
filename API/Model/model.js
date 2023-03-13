const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const studentSchema = new mongoose.Schema({
    name: { type: String, required: true, },
    cnic: { type: String, required: true,length:13,unique: true  },
    class:{ type: String,required:true }
  });
  const classSchema = new mongoose.Schema({
    title: {type:String, required:true},
    classCode:{type:String,required:true},
    students:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }]
  });
// adminSchema.pre('save',  function(next) {
//   const user = this;
//   // Only hash the password if it has been modified (or is new)
//   if (!user.isModified('password')) {
//     return next();
//   }
//     bcrypt.genSalt(10, (err, salt) => {
//     if (err) {
//       return next(err);
//     }
//      // Hash the password using the salt
//       bcrypt.hash(user.password, salt, (err, hash) => {
//       if (err) {
//         return next(err);
//       }
//       user.password = hash;
//       next();
//     })
//   })
// })
const Admin = mongoose.model("adminbranches", adminSchema);
const Class = mongoose.model("class", classSchema);
const Student= mongoose.model("students", studentSchema);

module.exports = {Admin,Class,Student};
// userSchema.pre('save',  async function(next){
//     if(this.password){
//         console.log(this.password)
//         const hashedPassword = await bcrypt.hash(this.password,5);
//         this.password = hashedPassword;
//         next()
//     }
// })
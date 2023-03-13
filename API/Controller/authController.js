const jwt = require("jsonwebtoken");
const sec = "hbhjgvhghvghghf";
const port = 3000;
const { Admin, Class, Student } = require("../Model/model");

const login = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  await Admin.findOne({ email: email, password: password })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          message: "user not found",
        });
      } else {
        let token = jwt.sign({ email }, sec);
        return res.status(200).json({
          user,
          token,
        });
      }
    })
    .catch(() => {
      return res.status(401).json({
        message: "Please Check your Email or Password",
      });
    });
};

const getStudbtn=async (req,res)=>{
await Student.find({}).then((response)=>{
  return res.status(200).json({
    response
  });
})
}

const addStudbtn=async (req,res)=>{
  await Class.find({}).then((response)=>{
    return res.status(200).json({
      response
    });
  })
  }


const addClass = async (req, res) => {
  let classCode = req.body.classCode;
  await Class.findOne({ classCode })
    .then(async (obj) => {
      if (obj) {
        return res.status(401).json({
          message: "class Already Exist",
        });
      } else {
        if (!req.body.students) {
          req.body.students = [];
        }
        const Newclass = new Class(req.body);
        await Newclass.save();
        return res.status(200).json({
          Newclass,
        });
      }
    })
    .catch(() => {
      return res.status(401).json({
        message: "Error Occured",
      });
    });
};

const addStudents = async (req, res) => {
 await Student.findOne({ cnic: req.body.cnic }).then((user) => {
  if(user){
    return res.status(401).json({
      message: "Student Already Exist",
    });
  }
  else{
    let stdClass = req.body.classTitle;
    Class.findOne({ title: stdClass })
      .then(async (obj) => {
        if (!obj) {
          return res.status(401).json({
            message: "This class does not exist",
          });
        } else {
          req.body.class = obj.title;
          let cnic = req.body.cnic.toString();
          if (cnic.length !== 13) {
            return res.status(404).json({
              message: "Invalid Cnic",
            });
          }
          const student = new Student(req.body);
          console.log("Found class:", stdClass);
          obj.students.push(student._id);
          await student.save();
          await obj.save();
          return res.status(200).json({
            message: "Student added Successfully",
            student,
          });
        }
      })
      .catch(() => {
        return res.status(401).json({
          message: "Error Occured",
        });
      });
  }
  });
};

//
const getStudents=async (req,res)=>{
let cls=req.body.filter
let name="";
let cnic="";
let checkSearch= parseInt(req.body.query)

console.log(checkSearch,typeof checkSearch)
// if(typeof req.body.query=="string"){
  
// }
if(isNaN(checkSearch)){
  name=req.body.query;
}else{
  cnic=req.body.query;
}

if(!name && !cls && !cnic){
 await Student.find({}).then(students=>{
    if(!students){
      return res.status(401).json({
        message: "Couldnt find",
      });
    }else{
      return res.status(200).json({
        students
      });
    }
  }).catch(err=>{
    return res.status(401).json({
      message: "Couldnt find",
      err
    });
  })
}else if(name && !cls){
  await Student.find({name}).then(students=>{
     if(!students){
       return res.status(401).json({
         message: "Couldnt find",
       });
     }else{
       return res.status(200).json({
         students
       });
     }
   }).catch(err=>{
     return res.status(401).json({
       message: "Couldnt find",
       err
     });
   })
 }
 else if(name && cls){
  await Student.find({name,class:cls}).then(students=>{
     if(!students){
       return res.status(401).json({
         message: "Couldnt find",
       });
     }else{
       return res.status(200).json({
         students
       });
     }
   }).catch(err=>{
     return res.status(401).json({
       message: "Couldnt find",
       err
     });
   })
 }
 else if(cnic && !cls){
  await Student.find({cnic}).then(students=>{
     if(!students){
       return res.status(401).json({
         message: "Couldnt find",
       });
     }else{
       return res.status(200).json({
         students
       });
     }
   }).catch(err=>{
     return res.status(401).json({
       message: "Couldnt find",
       err
     });
   })
 }
 else if(cnic && cls){
  await Student.find({cnic,class:cls}).then(students=>{
     if(!students){
       return res.status(401).json({
         message: "Couldnt find",
       });
     }else{
       return res.status(200).json({
         students
       });
     }
   }).catch(err=>{
     return res.status(401).json({
       message: "Couldnt find",
       err
     });
   })
 }
 else if(!cnic && !name && cls){
  await Student.find({class:cls}).then(students=>{
     if(!students){
       return res.status(401).json({
         message: "Couldnt find",
       });
     }else{
       return res.status(200).json({
         students
       });
     }
   }).catch(err=>{
     return res.status(401).json({
       message: "Couldnt find",
       err
     });
   })
 }

}
module.exports = { login, addClass,addStudbtn, getStudbtn,addStudents,getStudents };

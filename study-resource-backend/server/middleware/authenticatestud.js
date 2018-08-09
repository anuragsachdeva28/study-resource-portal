var {Userstud}=require('./../User-Data/userstud.js')

var authenticatestud=(req,res,next)=>{
  var token=req.header('x-auth');
  Userstud.findByToken(token).then((user)=>{
    if(!user){
      return Promise.reject();
    }
    req.user=user;
    req.token=token;
    next();
  }).catch((e)=>{
    res.status(401).send();
  });
}
module.exports={
  authenticatestud
};

var {Userstaf}=require('./../User-Data/userstaf.js');

var authenticatestaf=(req,res,next)=>{
  var token=req.header('x-auth');
  Userstaf.findByToken(token).then((user)=>{
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
  authenticatestaf
};

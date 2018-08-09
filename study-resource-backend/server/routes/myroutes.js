const express=require('express');
const router=express.Router();
const _=require('lodash');
const {ObjectID}=require('mongodb');
var formidable = require('formidable');
var fs = require('fs');
var path=require('path');

var {mongoose}=require('./../db/mongoose.js');
var {Userstud}=require('./../User-Data/userstud.js');
var {Userstaf}=require('./../User-Data/userstaf.js');
var {Vlink}=require('./../User-Data/vlink.js');
var {notetxt}=require('./../User-Data/note.js');
var {authenticatestud}=require('./../middleware/authenticatestud.js');
var {authenticatestaf}=require('./../middleware/authenticatestaf.js');

router.post('/addlinks',authenticatestaf,(req,res)=>{
   var vlink=new Vlink({
      _creator:req.user._id,
      vlink:req.body.vlink,
      sem:req.user.sem
   });
   vlink.save().then((doc)=>{
     res.send(doc);
   },(e)=>{
     res.status(400).send(e);
   });
});

router.get('/getlinks',authenticatestud,(req,res)=>{
  Vlink.find({sem:req.user.sem}).then((vlinks)=>{
    res.send({vlinks});
  },(e)=>{
    res.status(400).send(e);
  });
});

// TO ADD NOTES IN TEXT FORM {{{{{{{{
// router.post('/addnotetxt',authenticatestaf,(req,res)=>{
//    var notetxt=new Notetxt({
//       _creator:req.user._id,
//       notetxt:req.body.notetxt,
//       sem:req.user.sem
//    });
//    notetxt.save().then((doc)=>{
//      res.send(doc);
//    },(e)=>{
//      res.status(400).send(e);
//    });
// });
// router.get('/getnotetxt',authenticatestud,(req,res)=>{
//   Vlink.find({sem:req.user.sem}).then((notetxt)=>{
//     res.send({notetxt});
//   },(e)=>{
//     res.status(400).send(e);
//   });
// });//}}}}}}}}}}}

router.post('/addasin',(req, res)=>{
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.path;
      var newpath = 'C:/Users/lexicon/desktop/projectmmil/resoursehub-backend/server/user-data/uploadasin/' + files.filetoupload.name;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        res.write('File uploaded and moved!');
        res.end();
      });
 });
});//HTML CODE TO RUN ADDASSIGNMENTFILES
// router.get('/',(req,res)=>{
//   res.writeHead(200, {'Content-Type': 'text/html'});
//   res.write('<form action="addasin" method="post" enctype="multipart/form-data">');
//   res.write('<input type="file" name="filetoupload"><br>');
//   res.write('<input type="submit">');
//   res.write('</form>');
//   return res.end();
// })

router.post('/addnotes',(req, res)=>{
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.path;
      var newpath = 'C:/Users/lexicon/desktop/projectmmil/resourcehub-backend/server/user-data/uploadnote/' + files.filetoupload.name;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        res.write('File uploaded and moved!');
        res.end();
      });
 });
});//HTML CODE TO RUN ADDNOTESFILES
// router.get('/',(req,res)=>{
//   res.writeHead(200, {'Content-Type': 'text/html'});
//   res.write('<form action="addnotes" method="post" enctype="multipart/form-data">');
//   res.write('<input type="file" name="filetoupload"><br>');
//   res.write('<input type="submit">');
//   res.write('</form>');
//   return res.end();
// })

router.post('/userstud',(req,res)=>{
  var body=_.pick(req.body,['email','name','branch','year','sem','password']);
  var user=new Userstud(body);

   user.save().then(()=>{
    return user.generateAuthToken();
  }).then((token)=>{
    res.header('x-auth',token).send(user);
  }).catch((e)=>{
    res.status(400).send(e);
  });
});
router.post('/userstaf',(req,res)=>{
  var body=_.pick(req.body,['email','name','dept','year','sem','password']);
  var user=new Userstaf(body);

   user.save().then(()=>{
    return user.generateAuthToken();
  }).then((token)=>{
    res.header('x-auth',token).send(user);
  }).catch((e)=>{
    res.status(400).send(e);
  });
});


router.get('/userstud/profile', authenticatestud,(req,res)=>{
  var token=req.header('x-auth');
  Userstud.findByToken(token).then((user)=>{
    res.send(req.user);
});
});
router.get('/userstaf/profile', authenticatestaf,(req,res)=>{
  var token=req.header('x-auth');
  Userstaf.findByToken(token).then((user)=>{
    res.send(req.user);
});
});

router.delete('/userstud/logout',authenticatestud,(req,res)=>{
  req.user.removeToken(req.token).then(()=>{
    res.status(200).send();
  },()=>{
    res.status(400).send();
  });
});
router.delete('/userstaf/logout',authenticatestaf,(req,res)=>{
  req.user.removeToken(req.token).then(()=>{
    res.status(200).send();
  },()=>{
    res.status(400).send();
  });
});

router.post('/userstud/login',(req,res)=>{
  var body=_.pick(req.body,['email','password']);
  Userstud.findByCredentials(body.email,body.password).then((user)=>{
    return user.generateAuthToken().then((token)=>{
      res.header('x-auth',token).send(user);
    });
  }).catch((e)=>{
   res.status(400).send();
  });
});
router.post('/userstaf/login',(req,res)=>{
  var body=_.pick(req.body,['email','password']);
  Userstaf.findByCredentials(body.email,body.password).then((user)=>{
    return user.generateAuthToken().then((token)=>{
      res.header('x-auth',token).send(user);
    });
  }).catch((e)=>{
   res.status(400).send();
  });
});

module.exports=router;

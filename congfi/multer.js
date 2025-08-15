import multer from "multer";
//const upload = multer({ dest: 'uploads/' }); // Set the destination for uploaded files
//const upload = multer({storage: storage ,limits: { fileSize:3  ,files:1}} )
 export const storage = multer.diskStorage({

  destination : 'uploads',
  filename: (req,file,cb)=>{
    //cb(null, file.fieldname + '_' + Date.now() + '_' + file.originalname)
    cb(null,file.fieldname+'_'+Date.now()+file.originalname);
  }
}
)


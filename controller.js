export const aboutcontroller= (req,res)=>{
    res.send("This is the about page!");
}
export const searchcontroller =(req,res)=>{
    const keyword = req.query.keyword;
    res.send(`you are searching for ${keyword}`)
}
export const usercontroller =(req,res)=>{
    const username=req.params.username;
    res.send(`hello ${username} welcome to the user page!`);
}
export const userlogin = (req,res)=>{
    res.send(`Hii ${req.params.username}, you are logged in!`);
}
export const usersignup = (req,res)=>{
    res.send(`Hii ${req.params.username}, you are signed in!`);
}
export const getid=(req,res)=>{
    const {username,id}=req.params
    res.json({
        id,
        username,
        message: `Hello ${username}, your id is ${id}`
    })
}
export const getname = (req,res)=>{
    const name = 'john dee'
    res.render('index',{name}); 
}
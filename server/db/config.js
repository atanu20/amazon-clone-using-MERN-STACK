const mongoose =require('mongoose')

mongoose.connect('mongodb+srv://atanumongo:atanumongo@firstmongoapp.dgqpo.mongodb.net/amazon?retryWrites=true&w=majority',{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(()=>{
    console.log("connection done")
}).catch((e)=>{
    console.log("something error")
})
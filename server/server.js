import express, { response } from 'express'
import mysql from 'mysql'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import cookieParser from 'cookie-parser'
import path from 'path'
import {fileURLToPath} from 'url';


const salt=10;

const app = express();
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(cookieParser());


console.log(path.join(__dirname, '../client/quiz/build'))
// app.use(express.static(path.join(__dirname, '../client/quiz/build')));

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:'quiz'
});

// app.get("/*", (req, res) => {
    // res.sendFile(path.join(__dirname + "../client/quiz/build"));
//   });




app.post('/register',(req,res)=>{
    const sql="INSERT INTO login (`name`,`email`,`password`) VALUES (?)";
    bcrypt.hash(req.body.password.toString(),salt,(err,hash)=>{
        if(err) return res.json({Error: "Error for hassing password"});

        const values=[
            req.body.name,
            req.body.email,
            hash
        ]
        db.query(sql,[values],(err,result)=>{
            if(err) return res.json({Error:"Inserting data Error in server"});

            return res.json({Status:"Success"});
        })
    })
    
})


app.post('/login',(req,res)=>{
    
    const sql='SELECT * FROM login WHERE email = ?';
    db.query(sql,[req.body.email],(err,data)=>{
        if(err) return res.json({Error:"Login error in server"});
        if(data.length>0){
            bcrypt.compare(req.body.password.toString(),data[0].password,(err,response)=>{
                if(err) return res.json({Error:"Password compare error"});
                if(response){
                    console.log(data[0])
                    const name=data[0].name
                    const id=data[0].LoginID
                    const token=jwt.sign({payload: { name: name, id: id}},"jwt-secret-key",{expiresIn:'1d'});
                    res.cookie('token',token);
                    return res.json({Status:"Success"});
                }
                else{
                    return res.json({Error:"Password not matched"})
                }
            })
        } else{
            return res.json({Error:"No email existed"});
        }
    })
})

app.post('/getquiz',(req,res)=>{
    const sql='SELECT * from questions order by rand() limit 10;';
    db.query(sql,(err,data)=>{
        if(err) return res.json({Error:"Nie pobrano danych"});
        if(data.length>0){
            if(response){
                return res.json(data);
            }
            else{
                return res.json({Error:"Coś poszło nie tak..."})
            }
        }
        else{
            return res.json({Error:"Nie ma żadnych pytań"});
        }
        
})

app.post('/sendscore',(req,res)=>{
    const sql="INSERT INTO scoreboard (`id_login`,`wynik`) VALUES (?,?)";
    db.query(sql,[req.body.id,req.body.poprawneOdp],(err,data)=>{
        if(err) return res.json({Error:"Inserting data Error in server"});

        return res.json({Status:"Success"});
    })
        
})
})


const verifyUser=(req,res,next)=>{
    const token=req.cookies.token;
    if(!token){
        return res.json({Error: "You are not authenticated"});
    } else{
        jwt.verify(token,"jwt-secret-key",(err,decoded)=>{
            if(err){
                return res.json({Error: "Token is not okey!"});
            } else{
                req.id=decoded.payload.id;
                req.name=decoded.payload.name;
                next();
            }
        })
    }
}

app.get('/',verifyUser,(req,res)=>{
   // res.sendFile(path.join(__dirname + "../client/quiz/build"));
    return res.json({Status:"Success",name:req.name,id:req.id})
})

app.get('/logout',(req,res)=>{
    res.clearCookie('token');
    return res.json({Status:"Success"});
})




app.listen(8082,()=>{
    console.log("Running...");
})


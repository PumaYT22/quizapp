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


const corsOptions = {
    origin: true,
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use(cookieParser());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", req.headers.origin); // Update to match the domain you will make the request from
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});


console.log(path.join(__dirname, '../client/quiz/build'))
app.use(express.static(path.join(__dirname, '../client/quiz/build')));

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:'quiz'
});



 



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
    }); // Brakujący średnik i zakończenie bloku if-else
});





app.post('/sendscore',(req,res)=>{
    const sql="INSERT INTO scoreboard (`id_login`,`wynik`,`termin`,`czas`) VALUES (?,?,?,?)";
    db.query(sql,[req.body.id,req.body.poprawneOdp+1,req.body.termin,req.body.minuty],(err,data)=>{
        if(err) return res.json({Error:"Inserting data Error in server"});

        return res.json({Status:"Success"});
    })
        
})

app.get('/getsc',(req,res)=>{
    const sql='SELECT login.name,scoreboard.wynik,scoreboard.termin,scoreboard.czas FROM scoreboard,login WHERE scoreboard.id_login=login.LoginID ORDER BY scoreboard.wynik DESC;';
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
        
})})



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
    
     return res.sendFile(path.join(__dirname + "/../client/quiz/build"));
 })

app.get('/verify',verifyUser,(req,res)=>{
    res.sendFile(path.join(__dirname + "../client/quiz/build"));
    return res.json({Status:"Success",name:req.name,id:req.id})
})

app.get('/logout',(req,res)=>{
    res.clearCookie('token');
    return res.json({Status:"Success"});
})




app.listen(8082,()=>{
    console.log("Running...");
})




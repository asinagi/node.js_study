const express = require('express');
const mysql = require('mysql')
const path = require('path')
const static = require('serve-static')
const dbconfig = require('./config/dbconfig.json')
// const app = express();
// app.listen();

//database connection pool
const pool = mysql.createPool({
    connectionLimit: 10,
    host: dbconfig.host,
    user:dbconfig.user,
    password: dbconfig.password,
    database: dbconfig.database,
    debug:false
})
const app = express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/public', static(path.join(__dirname, 'public')));

app.post('/process/adduser', (req, res)=>{
    console.log('/process/adduser 호출됨',+req)

    const paramid = req.body.id;
    const paramName = req.body.name;
    const paramAge = req.body.age;
    const paramPassword=req.body.password;

    pool.getConnection((err, conn)=> {
        if (err) {
            conn.release();
            console.log("Mysql getConnetion error. aborted")
            res.writeHead('200', {'Content-Type': 'text/html; charset=utf8'})
            res.write('<h1>db 서버연결  실패</h1>')
            res.end();
            return;
        }
        console.log('database Get Connection!');

        conn.query('insert into users (id, name, age, password) values (?,?,?,password(?))'),
                    [paramid, paramName, paramAge, paramPassword],
                    (err, result)=>{
                        conn.release();
                        console.log('실행된 sql:'+exec.sql)
                        if (err) {
                            console.log('sql 쿼리 실행시 오류 발생')
                            console.dir(err);
                            res.writeHead('200', {'Content-Type': 'text/html; charset=utf8'})
                            res.write('<h1>sql  실패</h1>')
                            res.end();

                            return;
                        }

                        if (result) {
                            console.dir(result)
                            console.log('inserted 성공')

                            res.writeHead('200', {'Content-Type': 'text/html; charset=utf8'})
                            res.write('<h2>사용자 추가 성공</h2>')
                            res.end();
                        }
                        else {
                            console.dir(result)
                            console.log('inserted 실패')

                            res.writeHead('200', {'Content-Type': 'text/html; charset=utf8'})
                            res.write('<h1>사용자 추가 실패</h1>')
                            res.end();

                        }
                    }
    })
})

app.listen(3000, ()=>{
    console.log('Listening on port 3000');
})
// app.listen(8080, function(){
//     console.log('listening on 8080')
// });

// //누군가가 /pet으로 방문을 하면, pet관련된 안내문을 띄워주자
// app.get('/pet', function(요청,응답){ //request
//     응답.send('팻 용품 쇼핑 사이트');

// });
// // 누군가가 /beauty Url로 접속하면 안내문을 띄워주기
// app.get("/beauty", function(request, response){
//     response.send("뷰티 페이지로 접속 완료!");
// });

// // 수정할 떄마다 수정 귀찮음- 자동화
// // node install nodemon

// app.get('/', function(요청,응답){
//     응답.sendFile(__dirname +'/index.html');
// });
// app.get('/sign_in', function(요청,응답){
//     응답.sendFile(__dirname +'/adduser.html');
// });
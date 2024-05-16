const express = require('express');
const app = express();

app.listen();

app.listen(8080, function(){
    console.log('listening on 8080')
});

//누군가가 /pet으로 방문을 하면, pet관련된 안내문을 띄워주자
app.get('/pet', function(요청,응답){ //request
    응답.send('팻 용품 쇼핑 사이트');

});
// 누군가가 /beauty Url로 접속하면 안내문을 띄워주기
app.get("/beauty", function(request, response){
    response.send("뷰티 페이지로 접속 완료!");
});

// 수정할 떄마다 수정 귀찮음- 자동화
// node install nodemon

app.get('/', function(요청,응답){
    응답.sendFile(__dirname +'/index.html');
});
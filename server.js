const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// content-type이 application/json인 요청을 파싱합니다.
app.use(bodyParser.json());

// content-type이 application/x-www-form-urlencoded인 요청을 파싱합니다.
app.use(bodyParser.urlencoded({ extended: true }));

// 간단한 라우트
app.get("/", (req, res) => {
  //res.json({ message: "홈화면입니다!!~~" });
  res.sendFile(__dirname+'/index.html')
});

// tutorial.routes.js 파일에서 정의된 라우트를 사용합니다.
require("./app/routes/tutorial.routes")(app);

// 포트를 설정하고 요청을 대기합니다.
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});

// db 설정은 app/models 폴더에서
const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("데이터베이스에 연결되었습니다!");
  })
  .catch(err => {
    console.log("데이터베이스에 연결할 수 없습니다!", err);
    process.exit();
  });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // cors 미들웨어 추가

const server = express();
const Review = require("./models/Review");

require("dotenv").config({ path: "variables.env" }); // 보안설정 - 깃에 안 올라게 함

server.use(express.json()); // JSON body 파싱을 위한 미들웨어 설정
// cors 미들웨어를 추가합니다.
server.use(cors());

// 리뷰 등록 몽고 디비 에 들어가는거지?
server.post("/reviews", (req, res) => {
  // 요청받아
  const { title, score } = req.body; // 클라이언트에서 전달한 데이터에서 title과 score를 추출
  // console.log(req.params);

  const newReview = new Review({ title, score });

  newReview
    .save()
    .then((user) => {
      console.log(user);
      res.json({
        message: "리뷰가 등록되었습니다",
      });
    })
    .catch((err) => {
      res.json({
        message: "리뷰 등록 실패",
      });
    });
});

// 리뷰 조회
server.get("/reviews", (req, res) => {
  Review.find()
    .then((reviews) => {
      res.json(reviews);
    })
    .catch((err) => {
      res.status(500).json({
        message: "리뷰 조회 실패",
      });
    });
});

// 3000포트 사용
server.listen(3000, (err) => {
  if (err) {
    return console.log(err);
  } else {
    mongoose
      .connect(process.env.MONGODB_URL)
      .then(() => {
        console.log("MongoDB에 연결되었습니다.");
        // 여기에 추가적인 로직을 작성하세요.
      })
      .catch((error) => {
        console.error("MongoDB 연결 에러:", error);
      });
  }
});

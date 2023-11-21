const express = require('express');
const mongoose = require('mongoose');
const server = express();

const Review = require('./models/Review')
const FriendReview = require('./models.FriendReview')


require('dotenv').config({path:'variables.env'}); // 보안설정 - 깃에 안 올라게 함

server.use(express.json()); // JSON body 파싱을 위한 미들웨어 설정

// 친구 정보 등록


// 친구 정보 조회


// 친구 리뷰 등록
server.post('/friendreviews', (req, res) => {
  const { friendId, rating, comment, reviewDate } = req.body;

  const newFriendReview = new FriendReview({ friendId, rating, comment, reviewDate });

  newFriendReview.save()
    .then((user) => {
      console.log(user);
      res.json({
        message: '친구 리뷰가 등록되었습니다'
      });
    })
    .catch((err) => {
      res.json({
        message: '친구 리뷰 등록 실패'
      });
    });
});

// 친구 리뷰 조회
server.get('/friendreviews', (req, res) => {
  FriendReview.find()
    .then((friendreviews) => {
      res.json(friendreviews);
    })
    .catch((err) => {
      res.status(500).json({
        message: '리뷰 조회 실패'
      });
    });
});


// 운전자 리뷰 등록
server.post('/reviews', (req, res) => {
    const { title, content, score } = req.body;
  
    const newReview = new Review({ title, content, score });
  
    newReview.save()
      .then((user) => {
        console.log(user);
        res.json({
          message: '리뷰가 등록되었습니다'
        });
      })
      .catch((err) => {
        res.json({
          message: '리뷰 등록 실패'
        });
      });
  });


// 운전자 리뷰 조회
server.get('/reviews', (req, res) => {
  Review.find()
    .then((reviews) => {
      res.json(reviews);
    })
    .catch((err) => {
      res.status(500).json({
        message: '리뷰 조회 실패'
      });
    });
});




// 3000포트 사용
server.listen(3000, (err)=>{
    if(err){
        return console.log(err);
    }else{
        mongoose.connect(process.env.MONGODB_URL)
        .then(() => {
            console.log("MongoDB에 연결되었습니다.");
            // 여기에 추가적인 로직을 작성하세요.
        })
        .catch((error) => {
            console.error("MongoDB 연결 에러:", error);
        });
    }
})


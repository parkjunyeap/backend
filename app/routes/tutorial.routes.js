module.exports = app => {
    const tutorials = require("../controllers/tutorial.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", tutorials.create);
  
    // Retrieve all Tutorials
    router.get("/", tutorials.findAll);
  
    // Retrieve all published Tutorials
    router.get("/published", tutorials.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", tutorials.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", tutorials.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", tutorials.delete);
  
    // Delete all Tutorials
    router.delete("/", tutorials.deleteAll);
  
    app.use('/api/tutorials', router);


    // POST 요청에 대한 핸들러
    app.post("/submit-form", (req, res) => {
    // 폼 데이터 추출
    const area = req.body.area;
    const start = req.body.start;
    const end = req.body.end;
    const time = req.body.time;

    // 데이터베이스에 저장할 로직을 작성하세요
    // 여기서는 예시로 console.log로 데이터를 출력합니다.
    // console.log("area:", area);
    // console.log("start:", start);
    // console.log("end:", end);
    // console.log("Time:", time);

    // 응답을 보냅니다.
    // res.send("Form submitted successfully");
    
    const Tutorial = require("../models/tutorial.model");


    // Tutorial 모델을 사용하여 데이터 저장
    const tutorial = new Tutorial({
    area: area,
    start: start,
    end: end,
    time: time
  });
  
    // 데이터 저장
    tutorial.save()
    .then(result => {
      console.log("Data saved successfully:", result);
      res.send("Form submitted successfully");
    })
    .catch(error => {
      console.error("Failed to save data:", error);
      res.status(500).send("Failed to submit form");
    });
  });

  };
// module.exports = mongoose => {
//     const Tutorial = mongoose.model(
//       "tutorial",
//       mongoose.Schema(
//         {
//           title: String,
//           description: String,
//           published: Boolean
//         },
//         { timestamps: true }
//       )
//     );
  
//     return Tutorial;
//   };


// Mongoose 모듈을 이용해서 MongoDB 데이터베이스의 스키마를 정의하는 함수를 내보냅니다.
module.exports = mongoose => {

  // Schema 객체를 생성합니다. 이 객체는 MongoDB 컬렉션에 저장될 각 문서의 구조를 정의합니다.
  var schema = mongoose.Schema(
    {
      area: String,  // 'area' 필드는 String 타입입니다.
      start: String,  
      end: String,  
      time : Number
    },
    { timestamps: true }  // 'timestamps' 옵션은 createdAt과 updatedAt 필드를 자동으로 관리합니다.
  );

  // 'toJSON' 메소드를 스키마에 추가합니다. 이 메소드는 문서를 JSON 형태로 변환할 때 사용됩니다.
  schema.method("toJSON", function() {
      // 현재 문서의 정보를 가져옵니다.
      const { __v, _id, ...object } = this.toObject();
      // _id 필드를 id로 변경합니다.
      object.id = _id;
      // 변환된 JSON 객체를 반환합니다.
      return object;
  });

  // 'tutorial'이라는 이름의 모델을 생성합니다. 이 모델은 위에서 정의한 스키마를 사용합니다.
  const Tutorial = mongoose.model("tutorial", schema);

  // 생성한 모델을 반환합니다.
  return Tutorial;
};

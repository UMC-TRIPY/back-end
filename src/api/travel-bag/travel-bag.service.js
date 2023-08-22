const travelBagRepository = require("./travel-bag.repository");

//내 여행 목록 조회 API
exports.getUserTravelPlan = async (uid) => {
    try {
      const result = await travelBagRepository.getUserTravelPlan(uid);
      return result;
    } catch (err) {
      throw err;
    }
};

//내 여행 가방 목록 불러오기 API
exports.getUserBag = async(uid) =>{
    try {
        const result = await travelBagRepository.getUserBag(uid);
        return result;
    }catch(err){
        throw err;
    }
};

// 가방 만들기 API
exports.createBag = async(uid,pid,bagname) => {
    try{
        const result = await travelBagRepository.createBag(uid,pid,bagname);
        return result;
    }catch(err){
        throw err;
    }
};

//여행 가방 리스트와 가방 내 준비물 불러오기 API
exports.getUserBagMaterial = async(pid) => {
    try{
        const result = await travelBagRepository.getUserBagMaterial(pid);
        return result;
    }catch(err){
        throw err;
    }
};

//여행지 준비물 불러오기 API
exports.getCountryMaterial = async(cname) =>{
    try{
        const result = await travelBagRepository.getCountryMaterial(cname);
        return result;
    }catch(err){
        throw err;
    }
};

//여행지별 날씨 불러오기 API


//가방 내부에 메모 작성 API
exports.createBagMemo = async(bid,memo) =>{
    try{
        const result = await travelBagRepository.createBagMemo(bid,memo);
        return result;
    }catch(err){
        throw err;
    }
};

//가방 내부에 준비물 추가 API
exports.createBagMaterial = async(bid,material) =>{
    try{
        const result = await travelBagRepository.createBagMaterial(bid,material);
        return result;
    }catch(err){
        throw err;
    }
};

//가방 준비물 이름 수정  API
exports.updateBagMaterial = async(mid,material) =>{
    try{
        const result = await travelBagRepository.updateBagMaterial(mid,material);
        return result;
    }catch(err){
        throw err;
    }
};

//가방 준비물 삭제 API
exports.deleteBagMaterial = async(bid, mid) =>{
    try{
        const result = await travelBagRepository.deleteBagMaterial(bid, mid);
        return result;
    }catch(err){
        throw err;
    }
};

//가방 준비물 체크박스 기능 API
exports.MaterialCheck = async(bid,mid) =>{
    try{
        const result = await travelBagRepository.MaterialCheck(bid,mid);
        return result;
    }catch(err){
        throw err;
    }
};



//일정에 해당하는 모든 가방 불러오기 API
exports.getUserPlanBag = async(pid) =>{
    try{
        const result = await travelBagRepository.getUserPlanBag(pid);
        return result;
    }catch(err){
        throw err;
    }
};

//가방 인덱스로 준비물 불러오기 API 
exports.UserBagMaterial = async(bid) => {
    try{
        const result = await travelBagRepository.UserBagMaterial(bid);
        return result;
    }catch(err){
        throw err;
    }
};
const travelPlanRepository = require("./travel-plans.repository");

exports.createTravel = async (userId, departureDate, arrivalDate) => {
  const createdTravelPlanId = await travelPlanRepository.createTravelPlan(
    userId,
    departureDate,
    arrivalDate
  );

  return createdTravelPlanId;
};

exports.createCityPlan = async (travelPlanId, cityId) => {
  const createdCityPlan = await travelPlanRepository.createCityPlan(
    travelPlanId,
    cityId
  );
};

exports.createTravel = async (userId, departureDate, arrivalDate) => {
  const createdTravelPlanId = await travelPlanRepository.createTravelPlan(
    userId,
    departureDate,
    arrivalDate
  );

  return createdTravelPlanId;
};

exports.createCityPlan = async (travelPlanId, cityId) => {
  const createdCityPlan = await travelPlanRepository.createCityPlan(
    travelPlanId,
    cityId
  );
};

//내 여행 목록 조회 API
exports.getUserTravelPlan = async (uid) => {
  try {
    const result = await travelPlanRepository.getUserTravelPlan(uid);
    return result;
  } catch (err) {
    throw err;
  }
};

//일정 공유 중인 친구 조회 API
exports.getFriendTravelPlan = async (uid) => {
  try{
    const result = await travelPlanRepository.getFriendTravelPlan(uid);
    return result;
  }catch(err){
    throw err;
  }
};

//일정에 친구 초대 기능 API
exports.postFriendTravelPlan = async(pid,rid) =>{
  try{
    const result = await travelPlanRepository.postFriendTravelPlan(pid,rid);
    return result;
  }catch(err){
    throw err;
  }
}

//세부일정 등록 API
exports.postUserDetailedPlan = async (pid, plan_date, plan_color, plan_lindColor, plan_title, plan_column, start_time, plan_halfHour , plan_place, plan_budget, plan_memo, plan_image, plan_file) => {
  try{
    const detailedplan= await travelPlanRepository.postUserDetailedPlan(
      pid,
      plan_date,
      plan_color,
      plan_lindColor, 
      plan_title,
      plan_column, 
      start_time, 
      plan_halfHour, 
      plan_place, 
      plan_budget,
      plan_memo,
      plan_image,
      plan_file
    );

    return detailedplan;
  }catch(err){
    console.error(err);
    throw err;
  }
};

//상세 일정 수정 API
exports.putUserDetailedPlan = async (tid,plan_date, plan_color, plan_lindColor, plan_title, plan_column, start_time, plan_halfHour , plan_place, plan_budget, plan_memo, plan_image, plan_file) => {
  try{
    const detailedplan= await travelPlanRepository.putUserDetailedPlan(
      tid,
      plan_date,
      plan_color,
      plan_lindColor, 
      plan_title,
      plan_column, 
      start_time, 
      plan_halfHour, 
      plan_place, 
      plan_budget,
      plan_memo,
      plan_image,
      plan_file
    );

    return detailedplan;
  }catch(err){
    console.error(err);
    throw err;
  }
};

//상세 일정 삭제 API
exports.deleteUserDetailedPlan = async(tid) =>{
  try{
    const detaildeplan = await travelPlanRepository.deleteUserDetailedPlan(tid);
    return detaildeplan;
  }catch(err){
    throw err;
  }
};

//모든 상세 일정 조회 API
exports.getUserAllTravelPlan = async(pid) =>{
  try{
    const travelplan = await travelPlanRepository.getUserAllTravelPlan(pid);
    return travelplan;
  }catch(err){
    throw err;
  }
}

//상세 일정 조회 기능(하나) API
exports.getUserOneTravelPlan = async(tid) =>{
  try{
    const travelplan = await travelPlanRepository.getUserOneTravelPlan(tid);
    return travelplan;
  }catch(err){
    throw err;
  }
}
let travelPlanService = require("./travel-plans.service");

exports.createTravelPlan = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { departureDate, arrivalDate, cityId } = req.body;

    const travelPlanId = await travelPlanService.createTravel(
      userId,
      departureDate,
      arrivalDate
    );

    await travelPlanService.createCityPlan(travelPlanId, cityId);

    res.status(201).json({ message: "여행 계획 등록에 성공하였습니다!" });
  } catch (err) {
    res.status(500).json({ message: "서버 내부 오류" });
  }
};


//내 여행 목록 조회 API
exports.getUserTravelPlan = async function(req,res) {
  try{
    const uid = req.params.uid;
    if (!uid) {
      return res.status(400).json({ error: "user 인덱스를 확인해주세요." });
    }
    const result = await travelPlanService.getUserTravelPlan(uid);
    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "에러" });
  }
};

//일정 공유 중인 친구 조회 API
exports.getFriendTravelPlan = async function(req,res) {
  try{
    const uid = req.params.uid;
    if(!uid){
      return res.status(400).json({error: "user_index 확인해주세요."});
    }
    const result = await travelPlanService.getFriendTravelPlan(uid);
    return res.status(200).json(result);
  }catch(err){
    return res.status(400).json({error: "err"});
  }
};

//일정에 친구 초대 기능 API
exports.postFriendTravelPlan = async function(req,res){
  try{
    const pid = req.params.pid;
    const rid = req.body.rid;
    if(!pid){
      return res.status(400).json({error: "plan_index 확인해주세요"});
    }
    const result = await travelPlanService.postFriendTravelPlan(pid,rid);
    return res.status(200).json(result);
  }catch(err){
    return res.status(400).json({error:"err"});
  }
};

//상세 일정 추가 기능 API
exports.postUserDetailedPlan = async function(req,res){
  try{
    const pid = req.params.pid;
    const { plan_date, plan_color, plan_title, start_time, end_time, plan_place, plan_budget, plan_memo, plan_image, plan_file } = req.body;
    
    await travelPlanService.postUserDetailedPlan(
      pid,
      plan_date,
      plan_color, 
      plan_title, 
      start_time, 
      end_time, 
      plan_place, 
      plan_budget,
      plan_memo,
      plan_image,
      plan_file
    );
      res.status(200).json({ message: "여행 세부 계획 등록에 성공하였습니다!" });
    } catch (err) {
      res.status(500).json({ message: "서버 내부 오류" });
  } 
 };

 //상세 일정 수정 기능 API
 exports.putUserDetailedPlan = async function(req,res){
  try{
    const tid = req.params.tid; //timeplna_index
    const {plan_date,plan_color,plan_title,start_time,end_time,plan_place,plan_budget,plan_memo,plan_image,plan_file} = req.body;
    await travelPlanService.putUserDetailedPlan(
      tid,
      plan_date,
      plan_color, 
      plan_title, 
      start_time, 
      end_time, 
      plan_place, 
      plan_budget,
      plan_memo,
      plan_image,
      plan_file
    );
      res.status(200).json({ message: "여행 세부 계획 수정에 성공하였습니다!" });
    } catch (err) {
      res.status(500).json({ message: "서버 내부 오류" });
  } 
 };

 //상세 일정 삭제 기능 API
 exports.deleteUserDetailedPlan = async function(req,res){
  try{
    const tid = req.params.tid; // timeplan_index
    if (!tid) {
      return res.status(400).json({ error: "timeplan index입력" });
    }
    await travelPlanService.deleteUserDetailedPlan(tid);
    return res.status(200).json({ message: " 상세 일정 삭제" });
  } catch (err) {
    res.status(500).json({ error: "API 호출 실패" });
    console.log(err);
  }
};

//전체 일정 조회 API
exports.getUserAllTravelPlan = async function(req, res){
  try{
    const pid = req.params.pid;
    if(!pid){
      return res.status(400).json({error:"plan index 입력"});
    }
    const result = await travelPlanService.getUserAllTravelPlan(pid);
    return res.status(200).json(result);
  }catch (err){
    res.status(500).json({error:"API 호출 실패"});
  }
};

//상세 일정 조회 기능(하나) API
exports.getUserOneTravelPlan = async function(req, res){
  try{
    const tid = req.params.tid;
    if(!tid){
      return res.status(400).json({error:"timeplan_index 입력"});
    }
    const result = await travelPlanService.getUserOneTravelPlan(tid);
    return res.status(200).json(result);
  }catch (err){
    res.status(500).json({error:"API 호출 실패"});
  }
};
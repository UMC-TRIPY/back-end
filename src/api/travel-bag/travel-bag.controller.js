const travelBagService = require("./travel-bag.service");



//내 여행 목록 조회 API
exports.getUserTravelPlan = async function(req,res) {
    try{
      const uid = req.params.uid;
      if (!uid) {
        return res.status(400).json({ error: "plan 인덱스를 확인해주세요." });
      }
      const result = await travelBagService.getUserTravelPlan(uid);
      return res.status(200).json(result);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "에러" });
    }
};

//내 여행 가방 불러오기 API
exports.getUserBag = async function(req,res) {
    try{
        const uid = req.params.uid;
        if(!uid){
            return res.status(400).json({error:"user 인덱스를 확인해주세요."});
        }
        const result = await travelBagService.getUserBag(uid);
        return res.status(200).json(result);
    }catch(err){
        return res.status(500).json({error: err.message});
    }
};

//일정 해당하는 가방 만들기 API
exports.createBag = async function(req,res){
    try{
        const uid = req.params.uid;
        const pid = req.params.pid;
        const bagname = req.body.bagname;
        
        if(!uid){
            return res.status(400).json({error: "user 인덱스를 확인해주세요."});
        }
        if(!pid){
            return res.status(400).json({error:"plan 인덱스를 확인해주세요."});
        }
        const result = await travelBagService.createBag(uid,pid,bagname);
        return res.status(200).json({message: "가방 만들기 성공"});
    }catch(err){
        return res.status(500).json({error: "에러"});
    }
};

//여행 가방 리스트와 가방 내 준비물 불러오기 API
exports.getUserBagMaterial = async function(req,res){
    try{
        const pid = req.params.pid;
        if(!pid){
            return res.status(400).json({error:"plan 인덱스를 확인해주세요."});
        }
        const result = await travelBagService.getUserBagMaterial(pid);
        return res.status(200).json(result);
    }catch(err){
        return res.status(500).json({error:"에러"});
    }
};

//여행지별 준비물 불러오기 API
exports.getCountryMaterial = async function(req,res){
    try{
        const cid = req.params.cid; // country_index
        if(!cid){
            return res.status(400).json({error: "country 인덱스를 확인해주세요."});
        }
        const result = await travelBagService.getCountryMaterial(cid);
        return res.status(200).json(result);
    }catch(err){
        return res.status(500).json({error:"에러"});
    }
};

//여행지별 날씨 불러오기 API


//가방 내부에 메모 작성 API
exports.createBagMemo = async function(req,res){
    try{
        const bid = req.params.bid;  //bag_index
        const memo = req.body.memo;
        if(!bid){
            return res.status(400).json({error:"bag 인덱스를 확인해주세요."});
        }
        const result = await travelBagService.createBagMemo(bid,memo);
        return res.status(200).json({message: "가방 내부에 메모 작성 성공"});
    }catch(err){
        return res.status(500).json({error:"error"});
    }
};

//가방 내부에 준비물 추가 API
exports.createBagMaterial = async function(req,res){
    try{
        const bid = req.params.bid;  //bag_index
        const material = req.body.material;
        if(!bid){
            return res.status(400).json({error:"bag 인덱스를 확인해주세요."});
        }
        const result = await travelBagService.createBagMaterial(bid,material);
        return res.status(200).json({ message: "가방 내부에 준비물 추가 성공" });
    }catch(err){
        return res.status(500).json({error:"error"});
    }
};

//가방 준비물 이름 수정
exports.updateBagMaterial = async function(req,res){
    try{
        const mid = req.params.mid;  //material_index
        const material = req.body.material
        if(!mid){
            return res.status(400).json({error:"material 인덱스를 확인해주세요."});
        }
        const result = await travelBagService.updateBagMaterial(mid,material);
        return res.status(200).json({ message: "가방 준비물 이름 수정 완료" });
    }catch(err){
        return res.status(500).json({error:"error"});
    }
};

//가방 준비물 삭제
exports.deleteBagMaterial = async function(req,res){
    try{
        const mid = req.params.mid;  //material_index
        if(!mid){
            return res.status(400).json({error:"material 인덱스를 확인해주세요."});
        }
        const result = await travelBagService.deleteBagMaterial(mid);
        return res.status(200).json({ message: "가방 준비물 삭제" });
    }catch(err){
        return res.status(500).json({error:err.message});
    }
};

//가방 준비물 체크박스 기능 API
exports.MaterialCheck = async function(req,res){
    try{
        const bid = req.params.bid; //bag_index
        const mid = req.params.mid; //materials_index
        if(!bid){
            return res.status(400).json({error:"bag 인덱스를 확인해주세요."});
        }
        if(!mid){
            return res.status(400).json({error:"materials 인덱스를 확인해주세요."});
        }
        const result = await travelBagService.MaterialCheck(bid,mid);
        return res.status(200).json({ message: "가방 내부에 준비물 체크" });
    }catch(err){
        return res.status(500).json({error:"error"});
    }
};

//가방 준비물 체크박스 취소 기능 API
exports.deleteMaterialCheck = async function(req,res){
    try{
        const bid = req.params.bid; //bag_index
        const mid = req.params.mid; //materials_index
        if(!bid){
            return res.status(400).json({error:"bag 인덱스를 확인해주세요."});
        }
        if(!mid){
            return res.status(400).json({error:"materials 인덱스를 확인해주세요."});
        }
        const result = await travelBagService.deleteMaterialCheck(bid,mid);
        return res.status(200).json({ message: "가방 내부에 준비물 체크취소" });
    }catch(err){
        return res.status(500).json({error:"error"});
    }
};

//일정에 해당하는 가방 모두 불러오기 API
exports.getUserPlanBag = async function(req,res){
    try{
        const pid = req.params.pid; //plan_index
        if(!pid){
            return res.status(400).json({error:"plan 인덱스를 확인해주세요."});
        }
        const result = await travelBagService.getUserPlanBag(pid);
        return res.status(200).json(result);
    }catch(err){
        return res.status(500).json({error:"error"});
    }
};
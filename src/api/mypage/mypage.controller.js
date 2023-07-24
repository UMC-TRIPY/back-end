const mypageService = require("./myapge.service");

//kakoId로 나의 정보 조회
exports.getUserByInfoId = async function (req, res) {
    try {
      const kakaoId = req.params.kakaoId;
      
        
      if (!kakaoId) {
        return res.status(400).json({ error: '유저 아이디를 입력해주세요.' });
      }
      const result = await mypageService.getUserByInfoId(kakaoId);
  
      if (!result) {
        return res.status(404).json({ error: '유저를 찾을 수 없음' });
      }
  
      return res.status(200).json(result);
    } catch (err) {
        console.log(err)
      return res.status(500).json({ error: '에러' });
    }
};  

// 회원 탈퇴 API
exports.deleteUser = async function(req, res){
    try{
        const kakaoId = req.params.kakaoId;
        
        if(!kakaoId){
            return res.status(400).json({error: '유저 아이디가 없습니다.'});
        }
        const result = await mypageService.deleteUser(kakaoId);
        
        if(!result){
            return res.status(404).json({error: '유저를 찾을 수 없음'});
        }
        return res.status(200).json(result);
    }catch(err){
        return res.status(500).json({error:'err'});
    }
};


//profile img 등록 API
exports.saveProfileImage = async (req, res) => {
    const  kakaoId  = req.params.kakaoId;
    const  profileImg  = req.body.profileImg;
    try {
    const result = await mypageService.saveProfileImage(kakaoId, profileImg);
       if (kakaoId) {
      res.json({ success: true, message: '프로필 URL이 업데이트되었습니다.' });
    } else {
      res.status(404).json({ error: '사용자를 찾을 수 없습니다.' });
    }
    } catch (err) {
    res.status(500).json({ error: 'API 호출 실패' });
    console.log(err);
    }
};

//Profile Img 삭제 API
exports.deleteProfileImage = async(req, res) => {
    try{
        const kakaoId = req.params.kakaoId;

        if(!kakaoId){
            return res.status(400).json({error: 'kakaoid 입력'});
        }
        await mypageService.deleteProfileImage(kakaoId);
        return res.status(200).json({message: 'profile 이미지 삭제'});
    } catch (err){
        res.status(500).json({ error: 'API 호출 실패' });
        console.log(err);
    }

}


// 국적 등록 API
exports.saveNationality = async (req, res) => {
    const kakaoId  = req.params.kakaoId;
    const nationality  = req.body.nationality;
    try {
    const result = await mypageService.saveNationality(kakaoId, nationality);
        if (kakaoId) {
        res.json({ success: true, message: '국적이 등록되었습니다.' });
    } else {
        res.status(404).json({ error: '사용자를 찾을 수 없습니다.' });
    }
    } catch (err) {
    res.status(500).json({ error: 'API 호출 실패' });
    console.log(err);
    }
};

//국적 수정 API
exports.updateNationality = async (req, res) => {
    const kakaoId  = req.params.kakaoId;
    const nationality  = req.body.nationality;
    try {
    const result = await mypageService.updateNationality(kakaoId, nationality);
        if (kakaoId) {
        res.json({ success: true, message: '국적이 수정되었습니다.' });
    } else {
        res.status(404).json({ error: '사용자를 찾을 수 없습니다.' });
    }
    } catch (err) {
    res.status(500).json({ error: 'API 호출 실패' });
    console.log(err);
    }
};

//국적 삭제 API
exports.deleteNationality = async(req, res) => {
    try{
        const kakaoId = req.params.kakaoId;

        if(!kakaoId){
            return res.status(400).json({error: 'kakaoid 입력'});
        }
        await mypageService.deleteNationality(kakaoId);
        return res.status(200).json({message: ' 국적 정보 삭제'});
    } catch (err){
        res.status(500).json({ error: 'API 호출 실패' });
        console.log(err);
    }

};




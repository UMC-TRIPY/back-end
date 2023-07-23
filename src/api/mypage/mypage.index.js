const router = require("express").Router();
const mypageController = require("./mypage.controller");


// 내 정보 조회 API
router.get('/api/user/:kakaoId', mypageController.getUserByInfoId);

// 회원 탈퇴 API
router.delete('/user/delete/:kakaoId', mypageController.deleteUser);

// profile 등록 API
router.post('/user/profile/:kakaoId', mypageController.saveProfileImage );

// profile 삭제 API 
router.delete('/user/profileDelete/:kakaoId',mypageController.deleteProfileImage);

// 국적 등록
router.post('/user/nationality/:kakaoId', mypageController.saveNationality );

// 국적 삭제 API
router.delete('/user/nationalityDelete/:kakaoId',mypageController.deleteNationality);


module.exports = router;



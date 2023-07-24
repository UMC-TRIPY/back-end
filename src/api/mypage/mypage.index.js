const router = require("express").Router();
const mypageController = require("./mypage.controller");


// 내 정보 조회 API
router.get('/user/:kakaoId', mypageController.getUserByInfoId);

// 회원 탈퇴 API
router.delete('/user/delete/:kakaoId', mypageController.deleteUser);

// profile 등록 API
router.post('/user/profile/:kakaoId', mypageController.saveProfileImage );

// profile 삭제 API 
router.delete('/user/profile/:kakaoId',mypageController.deleteProfileImage);

// 국적 등록 API
router.post('/user/nationality/:kakaoId', mypageController.saveNationality );

// 국적 수정 API
router.put('/user/nationality/:kakaoId',mypageController.updateNationality);

// 국적 삭제 API
router.delete('/user/nationality/:kakaoId',mypageController.deleteNationality);


module.exports = router;



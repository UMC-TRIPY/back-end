const myPageRepository = require('./mypage.repository');


// profile Img 등록 API
exports.saveProfileImage = async (kakaoId, profileImg) => {
    try {
    await myPageRepository.saveProfileImage(userId, profileImg);
    return;

    } catch (err) {
    throw err;
    }
};

//profile Img 삭제 API
exports.deleteProfileImage = async(kakaoId) => {
    try{
        await myPageRepository.deleteProfileImage(kakaoId);
        return;

    } catch(err){
        throw err;
    }
}

// 국적 등록  API
exports.saveNationality = async (kakaoId, nationality) => {
    try {
    await myPageRepository.saveNationality(kakaoId, nationality);
    return;

    } catch (err) {
    throw err;
    }
};

//국적 삭제 API
exports.deleteNationality = async(kakaoId) => {
    try{
        await myPageRepository.deleteNationality(kakaoId);
        return;

    } catch(err){
        throw err;
    }
}

// 유저 정보 조회 API
exports.getUserByInfoId = async (kakaoId) => {
    try {
        const result = await myPageRepository.getUserByInfoId(kakaoId);
        return result;

    } catch (err) {
        throw err;
    }
};

//유저 삭제 API
exports.deleteUser = async (kakaoId) => {
    try{
        const result = await myPageRepository.deleteUser(kakaoId);
        return result;
    } catch (err){
        throw err;
    }
};



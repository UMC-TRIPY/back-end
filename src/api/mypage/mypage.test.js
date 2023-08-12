const request = require("supertest");
const { conn } = require("../../../module/db_connect");
const app = require("../../../app");
const { redisClient } = require("../../../module/redis_connect");

beforeAll(async () => {
  await conn();
});

describe("POST /friends/:uid/request", () => {
  test("redis connection test", async () => {
    const connectPromise = new Promise((resolve) => {
      redisClient.on("connect", () => {
        console.info("Redis connected!");
        resolve(); // Redis 연결 시 프라미스를 완료
      });
    });

    // 여기서 다른 테스트 로직 수행 가능

    await connectPromise; // Redis 연결이 완료될 때까지 기다림
  });
  test("친구 요청 api", async () => {
    const response = await request(app)
      .post("/api/mypage/friends/1/request")
      .send({
        friend_idx: 4,
      });
    expect(response.body.message).toBe("친구 요청 성공");
    expect(response.status).toBe(200);
  });
});

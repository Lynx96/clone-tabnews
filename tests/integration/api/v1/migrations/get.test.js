import database from "infra/database.js"

beforeAll(cleanDatabase)

async function cleanDatabase() {
  await database.Query("drop schema public cascade; create schema public;")
}

test("GET to /api/v1/migrations should return 200", async() => {
  const response = await fetch("http://localhost:3000/api/v1/migrations")
  expect(response.status).toBe(200);  

  const responseBody = await response.json(); 

  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBeGreaterThan(0);
 

})

/* test.only("Teste de SQL injection", async() => {
  await fetch("http://localhost:3000/api/v1/status?databaseName='; SELECT pg_sleep(4); --");
  
}) */
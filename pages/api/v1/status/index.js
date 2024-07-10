import database from "../../../../infra/database.js"

async function status(request, response) {
  const result = await database.query('SELECT 3 + 3 as Sum;');
  console.log(result.rows);
  response.status(200).json({chave: "PRAAFTzão"})
}

export default status;  
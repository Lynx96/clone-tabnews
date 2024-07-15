import database from "infra/database.js"

async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const psqlVersion = await database.Query('SHOW server_version;');
  const version = psqlVersion.rows[0].server_version;  
  console.log(version)
  const usedConnections = await database.Query("SELECT count(*) FROM pg_stat_activity WHERE datname = 'local_db'")
  console.log(usedConnections.rows[0].count)
  const maxConnections = await database.Query("SELECT name, setting FROM pg_settings WHERE name = 'max_connections'")
  console.log(maxConnections.rows[0].setting)
  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        psql_version: version
      }
    },   
    used_connections: parseInt(usedConnections.rows[0].count),
    max_connections: parseInt(maxConnections.rows[0].setting)
  })

 
  
}

export default status;  
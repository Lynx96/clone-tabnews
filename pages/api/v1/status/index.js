import database from "infra/database.js";
import { createRouter } from "next-connect";

import controller from "infra/controller.js";

const router = createRouter();

router.get(getHandler);

export default router.handler(controller.errorHandlers);

async function getHandler(request, response) {
  const updatedAt = new Date().toISOString();

  const psqlVersion = await database.Query("SHOW server_version;");
  const psqlVersionResult = psqlVersion.rows[0].server_version;

  const maxConnections = await database.Query("SHOW max_connections;");
  const maxConnectionsResult = maxConnections.rows[0].max_connections;

  const databaseName = process.env.POSTGRES_DB;

  const usedConnections = await database.Query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });
  const usedConnectionsResult = usedConnections.rows[0].count;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        psql_version: psqlVersionResult,
        max_connections: parseInt(maxConnectionsResult),
        used_connections: parseInt(usedConnectionsResult),
      },
    },
  });
}

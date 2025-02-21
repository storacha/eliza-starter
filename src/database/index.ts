import { PostgresDatabaseAdapter } from "@elizaos/adapter-postgres";
import { SqliteDatabaseAdapter } from "@elizaos/adapter-sqlite";
import { DatabaseAdapter } from "@storacha/elizaos-adapter";
import Database from "better-sqlite3";
import path from "path";

export function initializeDatabase(dataDir: string) {
  if (process.env.STORACHA_AGENT_DELEGATION && process.env.STORACHA_AGENT_PRIVATE_KEY) {
    const db = new DatabaseAdapter({
      agentPrivateKey: process.env.STORACHA_AGENT_PRIVATE_KEY,
      agentDelegation: process.env.STORACHA_AGENT_DELEGATION,
    });
    return db;
  } else if (process.env.POSTGRES_URL) {
    const db = new PostgresDatabaseAdapter({
      connectionString: process.env.POSTGRES_URL,
    });
    return db;
  } else {
    const filePath =
      process.env.SQLITE_FILE ?? path.resolve(dataDir, "db.sqlite");
    // ":memory:";
    const db = new SqliteDatabaseAdapter(new Database(filePath));
    return db;
  }
}

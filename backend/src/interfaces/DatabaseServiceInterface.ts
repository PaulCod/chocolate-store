import { PoolConnection } from "mysql2/promise"

interface IDatabaseService {
  // connect(): void
  getConnection(): Promise<PoolConnection>
}

export default IDatabaseService
import { Connection } from "mysql2"

interface IDatabaseService {
  // connect(): void
  getConnection(): Connection
}

export default IDatabaseService
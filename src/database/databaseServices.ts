import mysql, { Pool, PoolConnection } from 'mysql2/promise';
import IDatabaseService from '../interfaces/DatabaseServiceInterface';

class DatabaseServices implements IDatabaseService {
  private pool: Pool;

  constructor() {
    this.pool = mysql.createPool({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
  }

  async getConnection(): Promise<PoolConnection> {
    try {
      const connection = await this.pool.getConnection();
      console.log('New connection established');
      return connection;
    } catch (err) {
      console.error('Error getting database connection:', err);
      throw err;
    }
  }

  async closePool(): Promise<void> {
    try {
      await this.pool.end();
      console.log('Database pool closed');
    } catch (err) {
      console.error('Error closing database pool:', err);
      throw err;
    }
  }
}

export default DatabaseServices;

import mysql, { Pool, PoolConnection } from 'mysql2';
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

    this.pool.on('connection', (connection) => {
      console.log('New connection established');
    });

    this.pool.on('error', (err) => {
      console.error('Database error:', err);
    });
  }

  async getConnection(): Promise<PoolConnection> {
    return new Promise<PoolConnection>((resolve, reject) => {
      this.pool.getConnection((err, connection) => {
        if (err) {
          console.error('Error getting database connection:', err);
          return reject(err);
        }
        resolve(connection);
      });
    });
  }

  async closePool(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.pool.end((err) => {
        if (err) {
          console.error('Error closing database pool:', err);
          return reject(err);
        }
        console.log('Database pool closed');
        resolve();
      });
    });
  }
}

export default DatabaseServices;

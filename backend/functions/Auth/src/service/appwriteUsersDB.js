import { Query, TablesDB, ID } from 'node-appwrite';
import { getClient } from '../providers/appwrite.js';
import { AppwriteConfig } from '../env.js';

class AppwriteUsersDBService {
  constructor() {
    this.client = getClient();
    this.databases = new TablesDB(this.client);
  }

  async checkExistingUser(email) {
    try {
      const userRes = await this.databases.listRows({
        databaseId: AppwriteConfig.databaseId,
        tableId: AppwriteConfig.usersTableId,
        queries: [Query.equal('email', email)],
      });
      return userRes;
    } catch (error) {
      throw new Error('Error checking existing user: ' + error.message);
    }
  }

  async createNewUser(id, userData) {
    try {
      const usersRes = await this.databases.createRow({
        databaseId: AppwriteConfig.databaseId,
        tableId: AppwriteConfig.usersTableId,
        rowId: ID.unique(),
        data: userData,
      });

      return usersRes;
    } catch (error) {
      throw new Error('Error creating new user: ' + error.message);
    }
  }
}

export default AppwriteUsersDBService;

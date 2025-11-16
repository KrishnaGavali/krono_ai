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

  async getBasicUserDetailsById(userId) {
    try {
      const userRes = await this.databases.getRow({
        databaseId: AppwriteConfig.databaseId,
        tableId: AppwriteConfig.usersTableId,
        rowId: userId,
        queries: [Query.select(['name', 'email', 'profile_url'])],
      });

      return userRes;
    } catch (error) {
      throw new Error('Error fetching user details: ' + error.message);
    }
  }
}

export default AppwriteUsersDBService;

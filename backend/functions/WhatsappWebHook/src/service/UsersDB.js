import { getClient } from '../providers/appwrite.js';
import { TablesDB, Query } from 'node-appwrite';

class AppwriteUserDB {
  constructor() {
    this.client = getClient();
    this.userDB = new TablesDB(this.client);
  }

  async UserWithPhoneExists(phone) {
    try {
      const res = await this.userDB.listRows({
        databaseId: process.env.APPWRITE_DATABASE_ID,
        tableId: process.env.APPWRITE_USER_TABLE_ID,
        queries: [Query.equal('phone', phone)],
      });

      if (res.total > 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error('Error checking user by phone: ' + error.message);
    }
  }

  async UpdateUserPhone(userId, phone) {
    try {
      const res = await this.userDB.updateRow({
        databaseId: process.env.APPWRITE_DATABASE_ID,
        tableId: process.env.APPWRITE_USER_TABLE_ID,
        rowId: userId,
        data: { phone: phone, is_phone_connected: true },
      });
      return res;
    } catch (error) {
      throw new Error('Error updating user phone: ' + error.message);
    }
  }
}

export default AppwriteUserDB;

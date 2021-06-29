const mysql = require('mysql2');
var pool, poolPromise;
process.on('exit', function () {
    pool.end()
    console.log('Database connection closed')
})

class Economy {

    /** 
     * @param {object} dbOptions - MySQL connection settings
     * @param {string} dbOptions.host - Host name or IP of your database
     * @param {string} dbOptions.user - Username to access your database
     * @param {string} dbOptions.password - Password for your username to access your database
     * @param {string} dbOptions.database - Name of your database
     * @param {string} [dbOptions.table] - Name of table that will be created/used.
     * @param {string} [dbOptions.poolLimit = 30] - Max limit of connections in pool, higher value means that more connections at one time can be queryd - Default: 10
     */

    static async setDataBase(dbOptions) {
        if (!dbOptions) return Promise.resolve(new SyntaxError('Database options were not provided!'))
        if (typeof dbOptions != 'object') return Promise.resolve(new TypeError('Database options must be a collection!'))
        if (!dbOptions.host || !dbOptions.user || !dbOptions.password) return Promise.resolve(new SyntaxError(`you forgot to pass: ${dbOptions.host?'Host, ':''}${dbOptions.user?'Username, ':''}${dbOptions.password?'password':''}`));
        pool = mysql.createPool({
            host: dbOptions.host,
            user: dbOptions.user,
            password: dbOptions.password,
            port: 3306,
            database: dbOptions.database || 'mysql-glob-economy',
            connectionLimit: dbOptions.poolLimit || 30,
            queueLimit: 0,
        })
        poolPromise = pool.promise();

        await this.genTable(dbOptions.table);
        return Promise.resolve(poolPromise);
    }

    /** 
     * @param {string} tableName - Name of table to generate
     */

    static async genTable(tableName) {
        //console.log('gen table 1')
        let [...m] = await poolPromise.query(`CREATE TABLE IF NOT EXISTS \`${tableName ? tableName : 'member_balance_glob_economy'}\` ( \`member_id\` INT NOT NULL AUTO_INCREMENT , \`user_id\` TEXT NOT NULL , \`pocket_balance\` DOUBLE NOT NULL DEFAULT '0'  , \`bank_balance\` DOUBLE NOT NULL DEFAULT '0' , \`bank_limit\` DOUBLE NOT NULL DEFAULT '1000' , PRIMARY KEY (\`member_id\`), UNIQUE \`discord_user_id\` (\`user_id\`(100))) ENGINE = InnoDB;`).catch((...e) => console.log(e))
        //console.log('gen tbale 2')
        return Promise.resolve(true)
    }
    /** 
     * @param {string} tableName - Name of table to remove
     */
    static async dropTable(tableName) {
        //console.log('drop table 1')
        let [...m] = await poolPromise.query(`DROPP TABLE IF EXISTS \`${tableName ? tableName : 'member_balance_glob_economy'}\``).catch((...e) => console.log(e))
        //console.log('drop table 2')
        return Promise.resolve(true)
    }
    /** 
     * @param {string} tableName - Name of table to reset
     */
    static async resetTable(tableName) {
        //console.log('reset table 1')
        await this.dropTable(tableName)
        await this.genTable(tableName)
        //console.log('reset table 2')
        return Promise.resolve(true)
    }
    /*
        Future Update Prep
        let [...i] = await poolPromise.query(`CREATE TABLE IF NOT EXISTS `member_inventory_glob_economy` ( `member_id` TEXT NOT NULL , `user_id` DOUBLE NOT NULL ,  `inventory` JSON NULL DEFAULT NULL , UNIQUE (`member_id`(100)))`)
        let [...i] = await poolPromise.query(`CREATE TABLE IF NOT EXISTS `item_shop_glob_economy` ( `item_unique_id` TEXT NOT NULL , `item_name` DOUBLE NOT NULL ,  `price` JSON NOT NULL DEFAULT NULL , `availability` JSON NULL DEFAULT NULL , PRIMARY KEY (`item_unique_id`))`)
        }
    //*/


    /**
     * @param {string} userID - ID of the target
     */

    static async findUser(userID) {
        //console.log('findUser 1')
        if (!userID) return Promise.resolve(false)
        //console.log('findUser 2')
        if (isNaN(parseFloat(userID))) return Promise.resolve(false)
        //console.log('findUser 3')
        let [...all] = await poolPromise.query(`SELECT * FROM \`member_balance_glob_economy\` WHERE \`user_id\` =${encodeURI(userID)}`).catch((...e) => console.log(e))
        //console.log(all[0][0])
        //console.log('findUser 4')
        if (all[0][0]) return Promise.resolve(true)
        else return Promise.resolve(false)

    }

    /**
     * @param {string} userID - ID of the target
     */

    static async createProfile(userID) {
        //console.log('createProfile 1')
        if (!userID) return Promise.resolve(false)

        //console.log('createProfile 2')
        if (isNaN(parseFloat(userID))) return Promise.resolve(false)

        //console.log('createProfile 3')
        const user = await this.findUser(userID)

        //console.log('createProfile 4')
        if (user) return Promise.resolve(false)
        else {
            //console.log('createProfile 5')
            let [...all] = await poolPromise.query(`INSERT INTO \`member_balance_glob_economy\` (\`user_id\`) VALUES (${encodeURI(userID)})`).catch((...e) => console.log(e))
            return Promise.resolve(all[0][0])
        }
    }

    /**
     * @param {string} userID - ID of the target
     */

    static async deleteProfile(userID) {
        //console.log('deleteProfile 1')
        if (!userID) return Promise.resolve(false)
        //console.log('deleteProfile 2')
        if (isNaN(parseFloat(userID))) return Promise.resolve(false)
        //console.log('deleteProfile 3')
        const user = await this.findUser(userID)
        //console.log('deleteProfile 4')
        if (!user) Promise.resolve('The userID does not exist in the Database')
        else {
            //console.log('deleteProfile 5')
            let [...all] = await poolPromise.query(`DELETE FROM \`member_balance_glob_economy\` WHERE \`user_id\`=${encodeURI(userID)}`).catch((...e) => console.log(e))
            return Promise.resolve(all[0][0])
        }
    }

    /**
     * @param {string} userID - ID of the target
     */

    static async getBalance(userID) {
        //console.log('getBalance 1')
        if (!userID) return Promise.resolve(false)
        //console.log('getBalance 2')
        if (isNaN(parseFloat(userID))) return Promise.resolve(false)
        //console.log('getBalance 3')
        const user = await this.findUser(userID)
        //console.log('getBalance 4')
        //console.log(user)
        //console.log('getBalance 5')
        if (!user) return Promise.resolve(false)
        else {
            //console.log('getBalance 6')
            let [...all] = await poolPromise.query(`SELECT * FROM \`member_balance_glob_economy\` WHERE \`user_id\`=${encodeURI(userID)}`).catch((...e) => console.log(e))
            return Promise.resolve(all[0][0])
        }
    }

    /**
     * @param {string} userID ID of the target
     * @param {string} target Variable that is targeted to be updated: pocket, bank, limit
     * @param {number} amount Amount to add/remove to/from selected target
     * @param {string} [action=1] 
     */

    static async updateUserData(userID, target, amount, action) {
        //console.log('updateUserData 1')
        const user = await this.findUser(userID)
        //console.log('updateUserData 2')
        if (!user) return Promise.resolve(false)
        else {
            //console.log('updateUserData 3')
            const currentBalance = await this.getBalance(userID)
            //console.log('updateUserData 4')
            if (!currentBalance) {
                //console.log('updateUserData 5')
                return Promise.resolve(false)
            }

            let newBalance, targeted;
            //console.log('updateUserData 6')

            if ([2, 'bank balance', 'bank', 'bank_balance'].includes(target.toLowerCase())) {
                targeted = 'bank_balance'
                //console.log('updateUserData 7')
            }
            if ([3, 'bank limit', 'limit', 'bank_limit'].includes(target.toLowerCase())) {
                //console.log('updateUserData 7')
                targeted = 'bank_limit'
            } else if ([1, 'pocket balance', 'pocket', 'pocket_balance'].includes(target.toLowerCase()) || !target) {
                //console.log('updateUserData 7')
                targeted = 'pocket_balance'
            }
            //console.log('updateUserData 8')

            if ([2, 'decrease', 'remove', 'substract', 'sub', 'dec', 'rem', 'reduction', 'reduce', 'red'].includes(action.toLowerCase())) {
                //console.log('updateUserData 9')
                newBalance = currentBalance[targeted] - amount
            } else if ([1, 'increase', 'add', 'inc', 'gain', 'growth', 'profit', 'accession'].includes(action.toLowerCase()) || !action) {
                //console.log('updateUserData 9')
                newBalance = currentBalance[targeted] + amount
            }
            //console.log('updateUserData 10')

            let [...all] = await poolPromise.query(`UPDATE \`member_balance_glob_economy\` SET ?=? WHERE \`user_id\`=?`, [encodeURI(targeted), encodeURI(newBalance), encodeURI(userID)]).catch((...e) => console.log(e))
            return Promise.resolve(all[0])
        }
    }
}
module.exports = Economy
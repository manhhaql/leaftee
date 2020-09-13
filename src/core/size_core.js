 import ErrorParser from '../helper/error_parser';
import MysqlManager from './mysql/mysql_manager';

class SizeCore {
    constructor() {
        this.getSize = this.getSize.bind(this);
    }

    getSize(options) {
        return new Promise((resolve, reject) => {
            MysqlManager.pool.getConnection((error, connection) => {
                if(error) {
                    return reject(ErrorParser.handleMysqlError(error))
                };

                let whereData = [];
                if(options.id !== undefined) {
                    whereData.push(options.id)
                };
                
                let query = 'SELECT id, name FROM sizes';

                if(whereData.length) {
                    query += ' WHERE'
                    let includeAnd = false
                    if(options.id !== undefined) {
                        query += `${includeAnd ? ' AND' : ''} sizes.id = ?`,
                        includeAnd = true
                    };
                };
                
                connection.query(
                    query,
                    whereData.concat([]),
                    (error, result, fields)=>{
                        connection.destroy();
                        if(error) {
                            return reject(ErrorParser.handleMysqlError(error))
                        }
                        resolve(result);
                    }
                )
            })
        })
    };
};

export default SizeCore;
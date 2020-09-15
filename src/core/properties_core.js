 import ErrorParser from '../helper/error_parser';
import MysqlManager from './mysql/mysql_manager';

class PropertiesCore {
    constructor() {
        this.getSize = this.getSize.bind(this);
        this.getType = this.getType.bind(this);
        this.getColor = this.getColor.bind(this);
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

    getType(options) {
        return new Promise((resolve, reject) => {
            MysqlManager.pool.getConnection((error, connection) => {
                if(error) {
                    return reject(ErrorParser.handleMysqlError(error))
                };

                let whereData = [];
                if(options.id !== undefined) {
                    whereData.push(options.id)
                };
                
                let query = 'SELECT id, name FROM types';

                if(whereData.length) {
                    query += ' WHERE'
                    let includeAnd = false
                    if(options.id !== undefined) {
                        query += `${includeAnd ? ' AND' : ''} types.id = ?`,
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

    getColor(options) {
        return new Promise((resolve, reject) => {
            MysqlManager.pool.getConnection((error, connection) => {
                if(error) {
                    return reject(ErrorParser.handleMysqlError(error))
                };

                let whereData = [];
                if(options.id !== undefined) {
                    whereData.push(options.id)
                };
                
                let query = 'SELECT id, name FROM colors';

                if(whereData.length) {
                    query += ' WHERE'
                    let includeAnd = false
                    if(options.id !== undefined) {
                        query += `${includeAnd ? ' AND' : ''} colors.id = ?`,
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

export default PropertiesCore;
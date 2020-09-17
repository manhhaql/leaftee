import ErrorParser from '../helper/error_parser';
import MysqlManager from './mysql/mysql_manager';

class UploadCore {
  constructor() {
    this.saveImageToDB = this.saveImageToDB.bind(this);
  }

  saveImageToDB(options) {
    return new Promise((resolve, reject) => {
      MysqlManager.pool.getConnection((error, connection) => {
        if (error) {
          return reject(ErrorParser.handleMysqlError(error))
        };

        let query = 'INSERT INTO product_images set ?';

        connection.query(
          query,
          {
            product_sku_id: options.product_sku_id,
            url: options.url
          },
          (error, result, fields) => {
            connection.destroy();
            if (error) {
              return reject(ErrorParser.handleMysqlError(error))
            }
            resolve(result);
          }
        )
      })
    })
  };
};

export default UploadCore;
import Express from 'express';
import Joi from 'joi';
import Multer from 'multer';

import ErrorParser from '../helper/error_parser';
import * as responseCode from '../constant/response_code';
import * as fileConstant from '../constant/file';
import * as folderConstant from '../constant/folder';

import * as cloudStorage from '../core/cloud_storage';
import UploadCore from '../core/upload_core';

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

const uploadImageToStorage = (file) => {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject('No image file');
      }
      let newFileName = `${file.originalname}_${Date.now()}`;

      let fileUpload = cloudStorage.bucket.file(`${folderConstant.IMAGES}/${newFileName}`);

      const blobStream = fileUpload.createWriteStream({
        metadata: {
          contentType: file.mimetype
        }
      });

      blobStream.on('error', (error) => {
        reject(error);
      });

      blobStream.on('finish', () => {
        const url = `https://storage.googleapis.com/${cloudStorage.bucket.name}/${fileUpload.name}`;
        resolve(url);
      });

      blobStream.end(file.buffer);
    })
  }

class UploadRoute {
    constructor() {

        this.uploadCore = new UploadCore();

        this.router = Express.Router();
        this.routes();
    };

    upload(req, res, next) {

        const { error: paramError, value: paramValues } = Joi.validate(req.body, Joi.object().keys({
            product_sku_id: Joi.number().integer().required()
        }).unknown());

        if(paramError) {
            return res.status(400).json(ErrorParser.handleJoiError(paramError))
        }

        if (!req.files || !req.files.file || !req.files.file.length) {
            let error = {
                code: responseCode.ERR_VALIDATION,
                error: 'file is required'
            };
            return res.status(400).json(error);
        };

        let selectedFile = req.files.file[0];
        let url;

        if (!selectedFile.mimetype.includes(fileConstant.FILE_TYPE_IMAGE)) {
            let error = {
                code: responseCode.ERR_VALIDATION,
                error: 'File type is not image'
            };

            return res.status(400).json(error);
        };

        uploadImageToStorage(selectedFile)
        .then((result)=>{

            url = result;
            return new Promise((resolve, reject)=>{
                this.uploadCore.saveImageToDB({
                    product_sku_id: paramValues.product_sku_id,
                    url: url
                }).then((result)=>{
                    resolve(result)
                }).catch((error)=>{
                    reject(error)
                })
            })
        }).then((result)=>{
            return res.status(200).json({
                code: responseCode.SUCCESS,
                data: {
                    product_sku_id: paramValues.product_sku_id,
                    url: url
                }
            });
        }).catch((error)=>{
            return res.status(400).json(error)
        })
    };

    routes() {
        this.router.post('/', multer.fields([{ name: 'file', maxCount: 1 }]), this.upload.bind(this));
    };
};

export default UploadRoute;
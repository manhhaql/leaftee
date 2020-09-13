import Express from 'express';
import Joi from 'joi';

import ErrorParser from '../helper/error_parser';
import * as responseCode from '../constant/response_code';

import SizeCore from '../core/size_core';

class SizeRoute {
    constructor() {
        this.sizeCore = new SizeCore();

        this.router = Express.Router();
        this.routes();
    };

    get_size(req, res, next) {
        const {error: paramError, value: paramValues} = Joi.validate(req.query, Joi.object().keys({
            id: Joi.number().integer().min(1)
        }).unknown());

        if(paramError) {
            return res.status(400).json(ErrorParser.handleJoiError(paramError))
        }

        this.sizeCore.getSize({
            id: paramValues.id
        }).then((result) => {
            return res.status(200).json({
                code: responseCode.SUCCESS,
                data: result
            })
        }).catch((error) => {
            return res.status(400).json(error)
        })
    };

    routes() {
        this.router.get('/', this.get_size.bind(this));
    };
};

export default SizeRoute;
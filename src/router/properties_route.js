import Express from 'express';
import Joi from 'joi';

import ErrorParser from '../helper/error_parser';
import * as responseCode from '../constant/response_code';

import PropertiesCore from '../core/properties_core';

class PropertiesRoute {
    constructor() {
        this.propertiesCore = new PropertiesCore();

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

        this.propertiesCore.getSize({
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

    get_type(req, res, next) {
        const {error: paramError, value: paramValues} = Joi.validate(req.query, Joi.object().keys({
            id: Joi.number().integer().min(1)
        }).unknown());

        if(paramError) {
            return res.status(400).json(ErrorParser.handleJoiError(paramError))
        }

        this.propertiesCore.getType({
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

    get_color(req, res, next) {
        const {error: paramError, value: paramValues} = Joi.validate(req.query, Joi.object().keys({
            id: Joi.number().integer().min(1)
        }).unknown());

        if(paramError) {
            return res.status(400).json(ErrorParser.handleJoiError(paramError))
        }

        this.propertiesCore.getColor({
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
        this.router.get('/size', this.get_size.bind(this));
        this.router.get('/type', this.get_type.bind(this));
        this.router.get('/color', this.get_color.bind(this));
    };
};

export default PropertiesRoute;
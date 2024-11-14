import { Request, Response, NextFunction } from 'express'

import ApiError from '../helpers/apiError'

export default function (
    error: ApiError,
    req: Request,
    res: Response,
    next: NextFunction
) {

    return res.status(error.statusCode | 500).json({
        status: 'error',
        statusCode: error.statusCode,
        message: error.message,
    })
}

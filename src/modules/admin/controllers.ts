import { Request, Response, NextFunction } from 'express';
import { InternalServerError } from '../../helpers/apiError';
import BusinessAuthModel from '../authBusiness/business.model';
import CategoryModel from '../category/category.model';
import subcategoryModel from '../subcategory/subcategory.model';


export const businessStats = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await BusinessAuthModel.find(req["validData"]);
        return res.status(200).json(data);
    } catch (error) {
        return next(new InternalServerError((error as Error).message));
    }
};

export const categoryStats = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await CategoryModel.find(req["validData"]);
        return res.status(200).json(data);
    } catch (error) {
        return next(new InternalServerError((error as Error).message));
    }
};

export const subCategoryStats = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await subcategoryModel.find(req["validData"]);
        return res.status(200).json(data);
    } catch (error) {
        return next(new InternalServerError((error as Error).message));
    }
};

import { Request, Response, NextFunction } from "express";
import BusinessStatsModel, { IBusinessStats } from "./businessStats.model";
import { InternalServerError } from "../../helpers/apiError";

export async function createRecord(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { type, businessId, userId } = req["validData"] as IBusinessStats;
  try {
    const data = await BusinessStatsModel.create({
      type,
      businessId: businessId.toString(),
      userId: userId.toString(),
    });
    return res.status(201).json({
      message: "Record created successfully",
      data: data,
    });
  } catch (error) {
    return next(new InternalServerError((error as Error).message));
  }
}

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await BusinessStatsModel.find(req["validData"]);
    return res.status(200).json(data);
  } catch (error) {
    return next(new InternalServerError((error as Error).message));
  }
};

import { Request, Response } from "express";
import ReviewModel from "./review.model";
import UserModel from "../authentication/user.model";

import jwt from "jsonwebtoken";
import NextFunction from 'express';
import { InternalServerError, NotFoundError } from "../../helpers/apiError";

export const addRecord = async (req: Request, res: Response) => {
  try {
    const { rating, title, description, userId, businessId } = req.body;
    if (!rating || !title || !description || !userId || !businessId) {
      throw new Error("All fields must be filled");
    }
    const data = await ReviewModel.create({
      rating,
      title,
      description,
      userId,
      businessId,
    });

    res.status(200).json({
      data,
      message: "Record added successfully",
    });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const getApproved = async (req: Request, res: Response) => {
  try {
    const data = await ReviewModel.find({ ...req.query, approved: true });

    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: (error as Error).message });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const data = await ReviewModel.find({ ...req.query });

    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: (error as Error).message });
  }
};

export const getCount = async (req: Request, res: Response) => {
  try {
    const approved = await ReviewModel.countDocuments({ approved: true });
    const pending = await ReviewModel.countDocuments({ approved: false });

    return res.status(200).json({ approved, pending });
  } catch (error) {
    return res.status(404).json({ message: (error as Error).message });
  }
};

export const getReviewsByBusinessId = async (req: Request, res: Response) => {
  try {
    const businessId = req.params._id;
    const reviews = await ReviewModel.find({ businessId: businessId, approved: true }).lean();

    if (reviews.length === 0) {
      return res
        .status(200)
        .json([]);
    }

    // Fetch user data for each review
    const reviewsWithUserData = await Promise.all(
      reviews.map(async (review) => {
        const user = await UserModel.findById(review.userId).lean();
        return {
          ...review,
          user: user
            ? {
              _id: user._id,
              name: user.name,
              email: user.email,
              // Add any other user fields you want to include
            }
            : null,
        };
      })
    );

    res.status(200).json(reviewsWithUserData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteRecord = async (req: Request, res: Response) => {
  try {
    const data = await ReviewModel.findById(req.body._id);
    if (!data) {
      return res.status(404).json({ message: "Record not found" });
    }
    await ReviewModel.deleteOne({ _id: req.body._id });
    res.status(200).json({ message: "Record deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const approveReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req["validData"];
    const review = await ReviewModel.findById(id);
    if (!review) {
      return next(new NotFoundError("Review not found"));
    }
    review.approved = true;
    await review.save();

    return res.status(200).json({ status: "success", message: "Review approved successfully", data: review });
  } catch (error) {
    return next(new InternalServerError((error as Error).message));
  }
};


import Express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import Auth from "./profileBusiness.model";
import CategoryModel from "../category/category.model";
import SubcategoryModel from "../subcategory/subcategory.model";
import { NotFoundError } from "../../helpers/apiError";
import { cloudinary } from "../../helpers/upload";

import BusinessAuthModel from "../authBusiness/business.model";

const { ObjectId } = mongoose.Types;

export const addRecord = async (req: Request, res: Response) => {
  try {
    const {
      category,
      subcategory,
      businessName,
      website,
      email,
      phone,
      city,
      lat,
      address,
      country,
      businessId,
      description,
      fromTime,
      toTime,
      lang,
      logo,
      businesshours,
      isOpen24_7,
    } = req.body;

    const oldData = await Auth.findOne({ businessId });
    if (oldData) {
      await Auth.updateOne(
        { businessId },
        {
          $set: {
            category,
            subcategory,
            businessName,
            website,
            email,
            phone,
            city,
            lat,
            address,
            country,
            businessId,
            description,
            fromTime,
            toTime,
            lang,
            logo,
            businesshours,
            isOpen24_7,
          },
        }
      );
    } else {
      await Auth.create({
        category,
        subcategory,
        businessName,
        website,
        email,
        phone,
        city,
        lat,
        address,
        country,
        businessId,
        description,
        fromTime,
        toTime,
        lang,
        logo,
        isOpen24_7,
        businesshours: JSON.parse(businesshours),
      });
    }

    return res.status(200).json({
      message: "Profile updated successfully",
      data: await Auth.findOne({ businessId }),
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateRecord = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      category,
      subcategory,
      businessName,
      website,
      email,
      phone,
      city,
      lat,
      address,
      country,
      businessId,
      description,
      isOpen24_7,
      fromTime,
      toTime,
      location,
      logo,
    } = req["validData"];

    const oldData = await Auth.findOne({ businessId });

    if (!oldData) {
      return next(new NotFoundError("Profile not found"));
    }

    await Auth.updateOne(
      { businessId },
      {
        $set: {
          category,
          subcategory,
          businessName,
          website,
          email,
          phone,
          city,
          lat,
          address,
          country,
          businessId,
          description,
          isOpen24_7,
          fromTime,
          toTime,
          location,
          logo,
        },
      }
    );

    return res.status(200).json({
      status: "success",
      message: "Profile updated successfully",
      data: await Auth.findOne({ businessId }),
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export async function uploadMultipleFiles(req: Request, res: Response) {
  try {
    const allFiles: any = (req.files as Express.Multer.File[]).map((file) => {
      return file.buffer;
    });
    const uploadPromises = allFiles.map(
      (oneFile: Buffer) =>
        new Promise<{ secure_url: string }>((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "uploads" },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result!);
              }
            }
          );

          uploadStream.end(oneFile);
        })
    );

    const uploadResults = await Promise.all(uploadPromises);

    return res.status(200).json({
      status: "success",
      message: "Files uploaded successfully",
      data: uploadResults.map((one) => one.secure_url),
    });
  } catch (error) {
    return res.json({ status: "error", message: "Error uploading files" });
  }
}

export const updateBusinessImages = async (req: Request, res: Response) => {
  try {
    const { businessId, images } = req.body;

    if (!businessId || !images) {
      throw new Error("Business ID is required");
    }

    const oldData = await Auth.findOne({ businessId });
    if (!oldData) {
      throw new Error("Profile not found");
    }

    const updatedData = await Auth.updateOne(
      { businessId },
      { $set: { images } }
    );

    res.json({
      message: "Files uploaded successfully",
      data: await Auth.findOne({ businessId }),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    const { businessId } = req.params;

    if (!businessId) {
      throw new Error("Business ID is required");
    }

    const profileData = await Auth.findOne({
      businessId: new ObjectId(businessId),
    });

    const authProfile = await BusinessAuthModel.findById(businessId);

    const completeProfile = {
      // Business Details from Business Model
      ...profileData.toObject(), // Spread all business model fields

      // Authentication Details from Business Auth Model
      authDetails: authProfile
        ? {
            name: authProfile.name,
            email: authProfile.email,
            phone: authProfile.phone,
            website: authProfile.website,
          }
        : null,
    };

    if (!profileData) {
      res.status(404).json({ message: "Profile not found" });
    } else {
      res.status(200).json(completeProfile);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const cateogyBusiness = async (req: Request, res: Response) => {
  try {
    const { category } = req.query;

    if (!category) {
      throw new Error("Category ID is required");
    }

    // Populate method ka use karke category details ko directly include karein
    const profilesData = await Auth.find({ category }).populate({
      path: "category",
      model: "category", // CategoryModel ka model name
      select: "name category_image", // Specific fields jo chahiye
    });

    if (!profilesData || profilesData.length === 0) {
      return res
        .status(404)
        .json({ message: "No profiles found for this category" });
    } else {
      return res.status(200).json(profilesData);
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const subCateogyBusiness = async (req: Request, res: Response) => {
  try {
    const { subcategory } = req.query;

    if (!subcategory) {
      throw new Error("Subcategory ID is required");
    }

    const profilesData = await Auth.find({ subcategory });

    // Length check added
    if (!profilesData || profilesData.length === 0) {
      return res
        .status(404)
        .json({ message: "No profiles found for this subcategory" });
    } else {
      return res.status(200).json(profilesData);
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const searchAll = async (req: Request, res: Response) => {
  try {
    const { query } = req.query;

    if (!query) {
      throw new Error("query is required");
    }

    const regexQuery = new RegExp(query, "i");

    const businessProfiles = await Auth.find({
      businessName: { $regex: regexQuery },
    });
    const categories = await CategoryModel.find({
      name: { $regex: regexQuery },
    });
    const subCategories = await SubcategoryModel.find({
      sub_name: { $regex: regexQuery },
    });

    return res.status(200).json({
      businessProfiles,
      categories,
      subCategories,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const businessProfiles = await Auth.find({});
    return res.status(200).json({
      businessProfiles,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

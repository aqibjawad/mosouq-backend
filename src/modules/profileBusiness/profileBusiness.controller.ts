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
      seoTitle,
      seoDescrp,
      tags, // Add tags to destructuring
    } = req.body;

    // Convert tags string to array if it comes as comma-separated string
    const tagsArray =
      typeof tags === "string"
        ? tags.split(",").map((tag) => tag.trim())
        : tags;

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
            seoTitle,
            seoDescrp,
            tags: tagsArray, // Add tags to update
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
        seoTitle,
        seoDescrp,
        businesshours: JSON.parse(businesshours),
        tags: tagsArray, // Add tags to create
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
      seoTitle,
      seoDescrp,
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
            company: authProfile.company,
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

    // Fetch profiles with category details
    const profilesData = await Auth.find({ category }).populate({
      path: "category",
      model: "category",
      select: "name category_image",
    });

    if (!profilesData || profilesData.length === 0) {
      return res
        .status(404)
        .json({ message: "No profiles found for this category" });
    }

    // Fetch auth details for each profile based on businessId
    const enhancedProfilesData = await Promise.all(
      profilesData.map(async (profile) => {
        // Changed this line to use BusinessAuthModel instead of Auth
        const authProfile = await BusinessAuthModel.findById(
          profile.businessId,
          "name email phone website company"
        );

        return {
          ...profile.toObject(),
          authDetails: authProfile
            ? {
                name: authProfile.name,
                email: authProfile.email,
                phone: authProfile.phone,
                website: authProfile.website,
                company: authProfile.company,
              }
            : null,
        };
      })
    );

    return res.status(200).json(enhancedProfilesData);
  } catch (error) {
    console.error("Error in cateogyBusiness:", error);
    return res.status(400).json({ error: error.message });
  }
};
export const subCateogyBusiness = async (req: Request, res: Response) => {
  try {
    const { subcategory } = req.query;

    if (!subcategory) {
      throw new Error("Subcategory ID is required");
    }

    // const profilesData = await Auth.find({ subcategory });
    const profilesData = await Auth.find({ subcategory }).populate({
      path: "subcategory",
      model: "subcategory",
      select: "sub_name subcategory_image",
    });

    // Length check added
    if (!profilesData || profilesData.length === 0) {
      return res
        .status(404)
        .json({ message: "No profiles found for this subcategory" });
    }

    const enhancedProfilesData = await Promise.all(
      profilesData.map(async (profile) => {
        // Changed this line to use BusinessAuthModel instead of Auth
        const authProfile = await BusinessAuthModel.findById(
          profile.businessId,
          "name email phone website company"
        );

        return {
          ...profile.toObject(),
          authDetails: authProfile
            ? {
                name: authProfile.name,
                email: authProfile.email,
                phone: authProfile.phone,
                website: authProfile.website,
                company: authProfile.company,
              }
            : null,
        };
      })
    );

    return res.status(200).json(enhancedProfilesData);
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

    // Get all business IDs to fetch auth details
    const businessIds = businessProfiles.map((profile) => profile.businessId);

    // Fetch all auth profiles in one query
    const authProfiles = await BusinessAuthModel.find({
      _id: {
        $in: businessIds,
        // No need to convert to ObjectId since businessId is already an ObjectId
      },
    });

    // Create a map of business ID to auth profile for easier lookup
    const authProfileMap = new Map(
      authProfiles.map((profile) => [profile._id.toString(), profile])
    );

    // Combine business and auth details
    const completeProfiles = businessProfiles.map((profile) => {
      const authProfile = authProfileMap.get(profile.businessId?.toString());

      return {
        ...profile.toObject(),
        authDetails: authProfile
          ? {
              name: authProfile.name,
              email: authProfile.email,
              phone: authProfile.phone,
              website: authProfile.website,
              company: authProfile.company,
            }
          : null,
      };
    });

    return res.status(200).json({
      businessProfiles: completeProfiles,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

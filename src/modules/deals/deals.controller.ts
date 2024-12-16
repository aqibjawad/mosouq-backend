import Express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import Deals from "./deals.model";
import { NotFoundError } from "../../helpers/apiError";
import { cloudinary } from "../../helpers/upload";

const { ObjectId } = mongoose.Types;

export const createDeal = async (req: Request, res: Response) => {
  try {
    const {
      name,
      type,
      address,
      lat,
      lang,
      description,
      consultation,
      businessName,
      websitebusinessName,
      website,
      price,
      discount,
      dealId,
    } = req.body;

    const oldData = await Deals.findOne({ dealId });
    if (oldData) {
      await Deals.updateOne(
        { dealId },
        {
          $set: {
            type,
            lat,
            lang,
            description,
            consultation,
            businessName,
            websitebusinessName,
            website,
            price,
            discount,
          },
        }
      );
    } else {
      await Deals.create({
        type,
        lat,
        lang,
        description,
        consultation,
        businessName,
        websitebusinessName,
        website,
        price,
        discount,
      });
    }

    return res.status(200).json({
      message: "Deal updated successfully",
      data: await Deals.findOne({ dealId }),
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// export const createDeal = async (req, res) => {
//   const { name, type, address, lat, lang, description, consultation, businessName, website, price, discount } = req.body;

//   try {
//     const dealData = { name, type, address, lat, lang, description, consultation, businessName, website, price, discount };
//     const savedBusiness = await Deals.create(dealData);

//     res.status(201).json({
//       message: "Deal created successfully",
//       deal: savedBusiness,
//     });

//   } catch (error) {
//     console.error("Error occurred while creating company:", error);
//     res.status(500).json({ error: "An internal server error occurred" });
//   }
// };

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

export const updateDealImages = async (req: Request, res: Response) => {
  try {
    const { dealId, images } = req.body;

    if (!dealId || !images) {
      return res.status(400).json({ error: "Deal ID and images are required" });
    }

    // Use findById instead of findOne with dealId
    const oldData = await Deals.findById(dealId);

    if (!oldData) {
      return res.status(404).json({ error: "Deal not found" });
    }

    const updatedData = await Deals.findByIdAndUpdate(
      dealId,
      { $set: { images } },
      { new: true } // This returns the updated document
    );

    res.json({
      message: "Files uploaded successfully",
      data: updatedData,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const getDeals = async (req, res) => {
  try {
    const deals = await Deals.find();
    res.status(200).json(deals);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteDeal = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedDeal = await Deals.findByIdAndDelete(id);
    if (!deletedDeal) {
      return res.status(404).json({ message: "Deals not found" });
    }
    res.status(200).json({ message: "Deals deleted successfully" });
  } catch (error) {
    console.error("Error occurred while deleting Deals:", error);
    res.status(500).json({ error: "An internal server error occurred" });
  }
};

export const getDealById = async (req, res) => {
  const { id } = req.params;

  try {
    const deal = await Deals.findById(id);

    if (!deal) {
      return res.status(404).json({ message: "Deal not found" });
    }

    res.status(200).json(deal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

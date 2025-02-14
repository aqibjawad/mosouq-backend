import { Request, Response } from "express";
import Faq from "./faqs.model";
import mongoose from "mongoose";

interface CreateFaqRequest {
  businessId: string;
}

const faqController = {
  // Create FAQs for a business
  createFaqs: async (
    req: Request<{}, {}, CreateFaqRequest>,
    res: Response
  ): Promise<void> => {
    try {
      const { businessId, faqs } = req.body;

      // Validate input
      if (!businessId || !faqs || !Array.isArray(faqs)) {
        res.status(400).json({
          success: false,
          message: "Invalid input data",
        });
        return;
      }

      // Validate businessId is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(businessId)) {
        res.status(400).json({
          success: false,
          message: "Invalid business ID format",
        });
        return;
      }

      // Check if FAQs already exist for this business
      const existingFaqs = await Faq.findOne({
        businessId: new mongoose.Types.ObjectId(businessId),
      });

      if (existingFaqs) {
        // Update existing FAQs
        existingFaqs.faqs = faqs;
        const updatedFaqs = await existingFaqs.save();

        res.status(200).json({
          success: true,
          message: "FAQs updated successfully",
          data: updatedFaqs,
        });
        return;
      }

      // Create new FAQs
      const newFaqs = await Faq.create({
        businessId: new mongoose.Types.ObjectId(businessId),
        faqs,
      });

      res.status(201).json({
        success: true,
        message: "FAQs created successfully",
        data: newFaqs,
      });
    } catch (error) {
      console.error("Error in createFaqs:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },

  // Get FAQs by business ID
  getFaqsByBusinessId: async (
    req: Request<{ businessId: string }>,
    res: Response
  ): Promise<void> => {
    try {
      const { businessId } = req.params;

      // Validate businessId format
      if (!mongoose.Types.ObjectId.isValid(businessId)) {
        res.status(400).json({
          success: false,
          message: "Invalid business ID format",
        });
        return;
      }

      const faqs = await Faq.findOne({
        businessId: new mongoose.Types.ObjectId(businessId),
      });

      if (!faqs) {
        res.status(404).json({
          success: false,
          message: "No FAQs found for this business",
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: faqs,
      });
    } catch (error) {
      console.error("Error in getFaqsByBusinessId:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },
};

export default faqController;

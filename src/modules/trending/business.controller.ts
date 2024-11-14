import { Request, Response } from "express";
import Business from "./business.model";
import sendMail from "../../helpers/email";

// Function to create a new business
export const createBusiness = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, type, location, description, consultation, email, category, subcategory, business_image } = req.body;

  try {
    const businessData = {
      name,
      type,
      location,
      description,
      consultation,
      business_image,
      email,
      category,
      subcategory
    };
    const savedBusiness = await Business.create(businessData);

    console.log("Business created successfully:", savedBusiness);

    sendMail({
      email,
      subject: "Verify Account",
      message: `
             <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                        <h2>Your Business Has Been Created</h2>
                        <p>Hello ${name},</p>
                        <p>We're excited to inform you that your business has been successfully created in our system.</p>
                        <p>Business Details:</p>
                        <ul>
                            <li>Name: ${name}</li>
                            <li>Type: ${type}</li>
                            <li>Location: ${location}</li>
                        </ul>
                        <p>If you have any questions or need to make changes, please don't hesitate to contact our support team.</p>
                    </div>
           `,
    });

    res.status(201).json({
      message: "Business created successfully",
      business: savedBusiness,
    });
  } catch (error) {
    console.error("Error occurred while creating business:", error);
    res.status(500).json({ error: "An internal server error occurred" });
  }
};

// Function to get all businesses
export const getBusiness = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const businesses = await Business.find();
    res.status(200).json(businesses);
    console.log(businesses);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Function to delete a business by ID
export const deleteBusiness = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const deletedBusiness = await Business.findByIdAndDelete(id);
    if (!deletedBusiness) {
      res.status(404).json({ message: "Business not found" });
      return;
    }
    res.status(200).json({ message: "Business deleted successfully" });
  } catch (error) {
    console.error("Error occurred while deleting business:", error);
    res.status(500).json({ error: "An internal server error occurred" });
  }
};

// Function to update a business by ID (commented out)
// const updateBusiness = async (req: Request, res: Response): Promise<void> => {
//     const { id } = req.params;
//     const { name } = req.body;
//     const business_image = req.file ? req.file.location : null;
//     try {
//         const updateData = { name };
//         if (business_image) {
//             updateData.business_image = business_image;
//         }
//         const updatedBusiness = await Business.findByIdAndUpdate(id, updateData, { new: true });
//         if (!updatedBusiness) {
//             res.status(404).json({ message: "Business not found" });
//             return;
//         }
//         res.status(200).json({
//             message: "Business updated successfully",
//             business: updatedBusiness,
//         });
//     } catch (error) {
//         console.error("Error occurred while updating business:", error);
//         res.status(500).json({ error: "An internal server error occurred" });
//     }
// };

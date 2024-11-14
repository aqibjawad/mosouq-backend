import { Request, Response } from 'express';
import Dubai from './dubai.model';

export const createDubai = async (req: Request, res: Response) => {
    const { name, description, dubai_image } = req.body;

    try {
        const companyData = { name, description, dubai_image };
        const savedCompany = await Dubai.create(companyData);

        res.status(201).json({
            message: "Deal created successfully",
            category: savedCompany,
        });

    } catch (error) {
        console.error("Error occurred while creating company:", error);
        res.status(500).json({ error: "An internal server error occurred" });
    }
};

export const getDubai = async (req: Request, res: Response) => {
    try {
        const dubai = await Dubai.find();
        res.status(200).json(dubai);
        console.log(dubai);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const deleteDubai = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deletedDubai = await Dubai.findByIdAndDelete(id);
        if (!deletedDubai) {
            return res.status(404).json({ message: "Dubai not found" });
        }
        res.status(200).json({ message: "Dubai deleted successfully" });
    } catch (error) {
        console.error("Error occurred while deleting Dubai:", error);
        res.status(500).json({ error: "An internal server error occurred" });
    }
};

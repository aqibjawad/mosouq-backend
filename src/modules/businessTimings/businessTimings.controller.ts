import { Request, Response } from 'express';
import Auth from './businessTimings.model';


export const updateBusinessTimings = async (req: Request, res: Response) => {
  try {
    const { businessId, mondayStart, mondayEnd, tuesdayStart, tuesdayEnd, wednesdayStart, wednesdayEnd, thursdayStart, thursdayEnd, fridayStart, fridayEnd, saturdayStart, saturdayEnd, sundayStart, sundayEnd } = req.body;

    if (!businessId) {
      throw new Error('Business ID is required');
    }

    const oldData = await Auth.findOne({ businessId });
    if (!oldData) {
      throw new Error('Profile not found');
    }

    const updatedData = await Auth.updateOne({ businessId }, { $set: { mondayStart, mondayEnd, tuesdayStart, tuesdayEnd, wednesdayStart, wednesdayEnd, thursdayStart, thursdayEnd, fridayStart, fridayEnd, saturdayStart, saturdayEnd, sundayStart, sundayEnd } });

    res.json({
      message: 'updated successfully',
      data: updatedData,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to upload files' });
  }
};

export const getBusinessTimings = async (req: Request, res: Response) => {
  try {
    const { businessId } = req.query;

    if (!businessId) {
      throw new Error('Business ID is required');
    }

    const oldData = await Auth.findOne({ businessId });
    if (!oldData) {
      throw new Error('Profile not found');
    }

    res.json({
      message: 'updated successfully',
      data: oldData,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to upload files' });
  }
};


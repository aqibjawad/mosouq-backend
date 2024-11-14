import { Request, Response } from 'express';
import Companies from './integCompanies.model';

export const createCompany = async (req: Request, res: Response) => {
  const { link, integration_comp_image } = req.body;

  try {
    const companyData = { link, integration_comp_image };
    const savedCompany = await Companies.create(companyData);

    res.status(201).json({
      message: 'Company created successfully',
      company: savedCompany,
    });
  } catch (error) {
    console.error('Error occurred while creating company:', error);
    res.status(500).json({ error: 'An internal server error occurred' });
  }
};

export const getCompanies = async (req: Request, res: Response) => {
  try {
    const companies = await Companies.find();
    res.status(200).json(companies);
    console.log(companies);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

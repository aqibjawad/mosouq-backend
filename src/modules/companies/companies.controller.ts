import Companies from './companies.model';

export const createCompany = async (req, res) => {
  const { link, companies_image } = req.body;
  try {
    const companyData = { link, companies_image };
    const savedCompany = await Companies.create(companyData);

    res.status(201).json({
      message: "Company created successfully",
      category: savedCompany,
    });
  } catch (error) {
    console.error("Error occurred while creating company:", error);
    res.status(500).json({ error: "An internal server error occurred" });
  }
};

export const getCompanies = async (req, res) => {
  try {
    const companies = await Companies.find();
    res.status(200).json(companies);
    console.log(companies);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteCompany = async (req, res) => {
  const { id } = req.body;
  try {
    // Check if company exists
    const company = await Companies.findById(id);
    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }

    // Delete the company
    await Companies.findByIdAndDelete(id);

    res.status(200).json({
      message: "Company deleted successfully",
    });
  } catch (error) {
    console.error("Error occurred while deleting company:", error);
    res.status(500).json({ error: "An internal server error occurred" });
  }
};

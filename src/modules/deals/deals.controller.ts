import Deals from './deals.model';

export const createDeal = async (req, res) => {
  const { name, type, address, lat, lang, description, consultation, deal_image } = req.body;

  try {
    const businessData = { name, type, address, lat, lang, description, consultation, deal_image };
    const savedBusiness = await Deals.create(businessData);

    res.status(201).json({
      message: "Deal created successfully",
      deal: savedBusiness,
    });

  } catch (error) {
    console.error("Error occurred while creating company:", error);
    res.status(500).json({ error: "An internal server error occurred" });
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
      return res.status(404).json({ message: 'Deal not found' });
    }

    res.status(200).json(deal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

import Auth from "./business.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendMail from "../../helpers/email";
import { generateRandomSixDigitNumber } from "../../helpers/functions";
import CategoryModel from "../category/category.model";
import SubCategoryModel from "../subcategory/subcategory.model";

const generateToken = (_id: string) =>
  jwt.sign({ _id }, process.env.JWT_SECRET!, { expiresIn: "3d" });

export const signupBusiness = async (req: any, res: any) => {
  try {
    const {
      email,
      name,
      company,
      phone,
      role,
      country,
      terms,
      url,
      title,
      website,
    } = req.body;

    if (await Auth.findOne({ email }).lean())
      throw new Error("Email is already in use");

    const user = await Auth.create({
      email,
      name,
      company,
      phone,
      role,
      country,
      terms,
      url,
      title,
      website,
    });
    const token = generateToken(user.id);
    const otp = generateRandomSixDigitNumber();
    const mailToken = generateToken(`${user._id}:${email}:${otp}`);

    // sendMail({
    //   email,
    //   subject: "Verify Account",
    //   message: `
    //     <div style="font-family: Arial, sans-serif; line-height: 1.6;">
    //       <img src="URL_TO_YOUR_LOGO" alt="Company Logo" style="width: 100px;"/>
    //       <h2>Activate Your Account</h2>
    //       <p>We're happy to have you here, ${name}.</p>
    //       <p>To activate your account, verify that this is your email. Didn't sign up with Trustpilot recently? Please let our Support Team know.</p>
    //       <a href="http://localhost:3002/business-signup-password?token=${mailToken}"
    //       style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px;">Activate Account</a>
    //     </div>
    //   `,
    // });

    sendMail({
      email,
      subject: "Verify Account",
      message: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <img src="URL_TO_YOUR_LOGO" alt="Company Logo" style="width: 100px;"/>
          <h2>Activate Your Account</h2>
          <p>We're happy to have you here, ${name}.</p>
          <p>To activate your account, verify that this is your email. Didn't sign up with Trustpilot recently? Please let our Support Team know.</p>
          <a href="http://localhost:3011/business-signup-password?token=${mailToken}" 
          style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px;">Activate Account</a>
        </div>
      `,
    });

    res.status(200).json({ email, token });
  } catch (error) {
    console.error("Error during user signup:", error);
    res.status(400).json({ error: error.message });
  }
};

export const signupBusinessAdmin = async (req: any, res: any) => {
  try {
    const { email, password, name, company, role, country, website, phone } =
      req.body;

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await Auth.create({
      email,
      password: hashedPassword,
      name,
      company,
      role,
      country,
      website,
      phone,
    });

    const token = generateToken(user.id);
    const otp = generateRandomSixDigitNumber();
    const mailToken = generateToken(`${user._id}:${email}:${otp}`);

    sendMail({
      email,
      subject: "Verify Account",
      message: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Activate Your Account</h2>
          <p>We're happy to have you here, ${name}.</p>
          <p>To activate your account, verify that this is your email. Didn't sign up with Trustpilot recently? Please let our Support Team know.</p>
         <a href="https://business.mosouq.ae/business-signup-password?token=${mailToken}" 
          style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px;">
           Account
          </a>
        </div>
      `,
    });

    // Include the user's _id (which serves as the businessId) in the response
    res.status(200).json({ email, token, businessId: user._id });
  } catch (error) {
    console.error("Error during user signup:", error);
    res.status(400).json({ error: error.message });
  }
};

export const addPassword = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new Error("All fields must be filled");

    const user = await Auth.findOne({ email });
    if (!user) throw new Error("Incorrect Email");

    const hash = await bcrypt.hash(password, 10);
    await Auth.updateOne({ email }, { $set: { password: hash } });

    sendMail({
      email,
      subject: "Password Updated Successfully",
      message: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <img src="URL_TO_YOUR_LOGO" alt="Company Logo" style="width: 100px;"/>
          <p>Hello ${user.name},</p>
          <p>Welcome on Aboard</p>
          <p>Thank you,</p>
        </div>
      `,
    });

    const token = generateToken(user.id);
    res.status(200).json({ message: "Password updated", token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const loginAuth = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new Error("All fields must be filled");

    const user = await Auth.findOne({ email });
    if (!user) throw new Error("Incorrect Email");

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error("Incorrect password");

    const token = generateToken(user.id);
    res.status(200).json({
      token,
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        Role: user.role,
        Country: user.country,
      },
      message: "Login Successful",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const googleLogin = async (req: any, res: any) => {
  try {
    const { googleToken } = req.body;
    if (!googleToken) throw new Error("All fields must be filled");

    const tokenData = jwt.decode(googleToken) as any;
    if (!tokenData) throw new Error("Incorrect Token");

    const { email } = tokenData;
    const user = await Auth.findOne({ email });
    if (!user) throw new Error("Incorrect Email");

    const token = generateToken(user.id);
    res.status(200).json({
      token,
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        Role: user.role,
        Country: user.country,
      },
      message: "Login Successful",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getUsers = async (req: any, res: any) => {
  try {
    const filter: any = req.query.first_name
      ? { first_name: req.query.first_name }
      : {};
    const users = await Auth.find(filter);
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserById = async (req: any, res: any) => {
  try {
    const user = await Auth.findById(req.params._id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const searchBusiness = async (req: any, res: any) => {
  try {
    const { name } = req.query;
    const data = await Auth.find({ name: { $regex: new RegExp(name, "i") } });
    res.status(200).json(data);
  } catch (error) {
    console.error("Error occurred while fetching businesses:", error);
    res.status(404).json({ message: error.message });
  }
};

export const searchAll = async (req: any, res: any) => {
  try {
    const { name } = req.query;
    const [businesses, categories, subCategories] = await Promise.all([
      Auth.find({ name: { $regex: new RegExp(name, "i") } }),
      CategoryModel.find({ name: { $regex: new RegExp(name, "i") } }),
      SubCategoryModel.find({ name: { $regex: new RegExp(name, "i") } }),
    ]);
    res.status(200).json({ data: { businesses, categories, subCategories } });
  } catch (error) {
    console.error("Error occurred while fetching data:", error);
    res.status(404).json({ message: error.message });
  }
};

export const verifyOtp = async (req: any, res: any) => {
  try {
    const { token } = req.query;
    if (!token) throw new Error("All fields must be filled");

    const tokenData = jwt.decode(token) as any;
    if (!tokenData) throw new Error("Incorrect Url");

    const { email, otp } = tokenData;
    const user = await Auth.findOne({ email, otp });
    if (!user)
      return res.status(404).json({ message: "URL expired, please try again" });
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteUserById = async (req: any, res: any) => {
  try {
    const user = await Auth.findById(req.params._id);
    if (!user) return res.status(404).json({ message: "User not found" });
    await Auth.deleteOne({ _id: req.params._id });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

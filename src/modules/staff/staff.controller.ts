import { Request, Response } from 'express';
import Auth from './staff.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import sendMail from '../../helpers/email';



const generateToken = (_id: string) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET as string, { expiresIn: '3d' });
};

export const signupStaff = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      throw new Error('All fields must be filled');
    }

    // Check if email already exists
    const exists = await Auth.findOne({ email }).lean();
    if (exists) {
      throw new Error('Email is already in use');
    }

    // Hash password
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    // Create new user
    const user = await Auth.create({ name, email, phone, password: hash });

    await sendMail({
      email,
      subject: 'Welcome to Mosouq',
      message: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <img src="URL_TO_YOUR_LOGO" alt="Company Logo" style="width: 100px;"/>
          <p>Hello ${user.name},</p>
          <p>Welcome on Aboard, your account has been created. Your password is: ${password}</p>
          <p>Thank you,</p>
        </div>
      `,
    });

    // Generate token
    const token = generateToken(user.id);

    // Send response
    res.status(200).json({ email, token });

  } catch (error) {
    // Error Handling
    console.error('Error during user signup:', error);
    res.status(400).json({ error: error.message });
  }
};

export const loginAuth = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error('All fields must be filled');
    }

    const user = await Auth.findOne({ email });

    if (!user) {
      throw new Error('Incorrect Email');
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new Error('Incorrect password');
    }

    const token = generateToken(user.id);

    res.status(200).json({
      token,
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
      },
      message: 'Login Successful'
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updatePassword = async (req: Request, res: Response) => {
  try {
    const { email, password, newPassword } = req.body;
    if (!email || !password) {
      throw new Error('All fields must be filled');
    }

    const user = await Auth.findOne({ email });

    if (!user) {
      throw new Error('Incorrect Email');
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new Error('Incorrect old password');
    }

    // Hash password
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    await Auth.updateOne({ email }, { $set: { password: hash } });

    res.status(200).json({
      // user: {
      //   _id: user._id,
      //   email: user.email,
      //   name: user.name,
      //   Role: user.role,
      //   Country: user.country
      // },
      message: 'Password updated successfully'
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const verifyLoginOtp = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      throw new Error('All fields must be filled');
    }

    const user = await Auth.findOne({ email });
    if (!user) {
      throw new Error('Incorrect Email');
    }

    if (user.otp !== otp) {
      throw new Error('Incorrect OTP');
    }

    const token = generateToken(user.id);

    res.status(200).json({
      token,
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
      },
      message: 'Login Successful'
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const googleLogin = async (req: Request, res: Response) => {
  try {
    const { googleToken } = req.body;
    console.log(req.body);
    if (!googleToken) {
      throw new Error('All fields must be filled');
    }

    const tokenData = jwt.decode(googleToken);
    if (!tokenData || typeof tokenData === 'string') {
      throw new Error('Incorrect Token');
    }
    const { email } = tokenData as { email: string };

    const user = await Auth.findOne({ email });

    if (!user) {
      throw new Error('Incorrect Email');
    }

    const token = generateToken(user.id);

    return res.status(200).json({
      token,
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
      },
      message: 'Login Successful'
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const filter: { [key: string]: any } = {};

    if (req.query.first_name) {
      filter.first_name = req.query.first_name;
    }

    const user = await Auth.find(filter);

    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await Auth.findById(req.params._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteUserById = async (req: Request, res: Response) => {
  try {
    const user = await Auth.findById(req.params._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await Auth.deleteOne({ _id: req.params._id }); // Delete the user
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

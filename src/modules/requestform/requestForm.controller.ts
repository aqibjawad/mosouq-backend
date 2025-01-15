import { Request, Response } from "express";
import RequestForm from "./requestform.model";
import sendMail from "../../helpers/email";

export async function createRequestForm(req: Request, res: Response) {
  try {
    console.log("Starting createRequestForm with body:", req.body);
    const { businessId, userId, phone, date, time, email } = req.body;

    // Validate required fields
    if (!email || !date || !time) {
      console.log("Missing required fields:", { email, date, time });
      return res.status(400).json({
        status: "error",
        message: "Missing required fields",
      });
    }

    // Create form data
    const formData = { businessId, userId, phone, date, time, email };
    console.log("Creating form with data:", formData);
    const savedForm = await RequestForm.create(formData);
    console.log("Form saved successfully:", savedForm);

    // Send confirmation email with detailed logging
    try {
      console.log("Attempting to send email to:", email);
      const emailContent = `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Request Form Confirmation</h2>
          <p>Thank you for submitting your request. Here are your details:</p>
          <ul>
            <li>Date: ${date}</li>
            <li>Time: ${time}</li>
            <li>Phone: ${phone}</li>
          </ul>
          <p>If you didn't submit this request, please contact our support team.</p>
        </div>
      `;

      console.log("Email content prepared:", emailContent);

      const emailResult = await sendMail({
        email,
        subject: "Request Form Confirmation",
        message: emailContent,
      });

      console.log("Email sent successfully:", emailResult);
    } catch (emailError) {
      console.error("Detailed email sending error:", {
        error: emailError,
        errorMessage: emailError.message,
        errorStack: emailError.stack,
        emailConfig: {
          to: email,
          subject: "Request Form Confirmation",
        },
      });
    }

    return res.status(201).json({
      status: "success",
      message: "Request Form created successfully",
      requestForm: savedForm,
    });
  } catch (error) {
    console.error("Detailed error in createRequestForm:", {
      error,
      errorMessage: error.message,
      errorStack: error.stack,
      requestBody: req.body,
    });

    return res.status(500).json({
      status: "error",
      message: "An internal server error occurred",
    });
  }
}

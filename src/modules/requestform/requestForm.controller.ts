import Express, { Request, Response, NextFunction } from "express";

import RequestForm from "./requestform.model";

import mongoose from "mongoose";

export async function createRequestForm(req, res) {
  const { businessId, userId, phone, date, time } = req.body;
  try {
    const formData = { businessId, userId, phone, date, time };
    const savedForm = await RequestForm.create(formData);
    res.status(201).json({
      status: "success", // Added status field
      message: "Request Form created successfully",
      requestForm: savedForm,
    });
  } catch (error) {
    console.error("Error occurred while creating Request Form:", error);
    res.status(500).json({
      status: "error", // Status for failure case
      error: "An internal server error occurred",
    });
  }
}

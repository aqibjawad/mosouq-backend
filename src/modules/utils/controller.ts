import Express, { Request, Response, NextFunction } from 'express';
import { InternalServerError } from '../../helpers/apiError';
import { cloudinary } from '../../helpers/upload';


export async function uploadSingleFile(req: Request, res: Response) {
    try {
        const file = req["file"].buffer;
        const publicId = `${Date.now()}-${req.file.originalname}`;
        const result = await cloudinary.uploader.upload_stream(
            { folder: 'uploads', resource_type: "auto", public_id: publicId },
            (error: any, result: any) => {
                if (error) {
                    return res.json({ status: "error", message: 'Error uploading image' });
                } else {
                    return res.status(200).json({
                        status: "success",
                        data: {
                            image: result.secure_url
                        },
                    });
                }
            }
        ).end(file);
    } catch (error) {
        console.error('Error processing the image:', error);
        res.json({ status: "error", message: 'Error processing the image' });
    }
};

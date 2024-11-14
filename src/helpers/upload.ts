import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage, Options } from "multer-storage-cloudinary";
import axios from 'axios';
import crypto from 'crypto';

const api_key = '734597188996464';
const api_secret = 'b0A0XL1kvN576Yq-U_8mvrfeiy0'
const cloud_name = 'dvp7draz9'

cloudinary.config({
    cloud_name,
    api_key,
    api_secret
});


const folder = "uploads";

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder,
        format: "auto", // You can change the file format here.
        public_id: (req: any, file: any) =>
            `${Date.now()}-${file.originalname}`

    }
} as Options);


function getCloudinaryPublicId(url: string): string {
    const splitUrl = url.split('/');
    const publicIdWithExtension = splitUrl.slice(-2).join('/');
    const publicId = publicIdWithExtension.split('.')[0];
    return publicId;
}

async function deleteImage(url: string): Promise<void> {
    try {
        const publicId = getCloudinaryPublicId(url);
        if (!publicId) {
            return;
        }
        const result = await cloudinary.uploader.destroy(publicId);
        console.log('Image deleted successfully.');
    } catch (error) {
        console.error('Error deleting image:', error.message);
    }
    return Promise.resolve();
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10, // Set the file size limit to 10MB (10 * 1024 * 1024 bytes)
    },
});

const multipleUpload = multer({ storage }).array('image', 5);

const uploadToMemory = multer({
    limits: { fieldSize: 20 * 1024 * 1024 }
});

const generateSHA1 = (data: string): string => {
    const hash = crypto.createHash("sha1");
    hash.update(data);
    return hash.digest("hex");
}

const generateSignature = (publicId: string, apiSecret: string): string => {
    const timestamp = new Date().getTime();
    return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
};

const handleDeleteImage = async (publicId: string) => {
    const cloudName = 'dbheocnrq';
    const timestamp = new Date().getTime();
    const signature = generateSHA1(generateSignature(publicId, api_secret));
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;

    try {
        const response = await axios.post(url, {
            public_id: publicId,
            signature: signature,
            api_key,
            timestamp: timestamp,
        });
        console.error(response);
    } catch (error) {
        console.error(error);
    }
};

export {
    upload,
    cloudinary,
    deleteImage,
    multipleUpload,
    uploadToMemory,
    handleDeleteImage
};

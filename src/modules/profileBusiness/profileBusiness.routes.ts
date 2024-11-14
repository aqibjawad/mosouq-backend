import 'dotenv/config';
import express from 'express';
import { addRecord, cateogyBusiness, getAll, getProfile, searchAll, subCateogyBusiness, updateBusinessImages, uploadMultipleFiles } from './profileBusiness.controller';
import { validateKeyInputs } from '../../middlewares/validate';
import { uploadToMemory } from '../../helpers/upload';

const router = express.Router();


router.post('/add-business-profile', validateKeyInputs({ key: 'body', inputArr: ["category", "businessName", "website", "email", "phone", "city", "zip", "address", "country", "businessId", "description", "isOpen24_7", "fromTime", "toTime", "location", "-logo"] }), addRecord);
router.post('/updateBusinessProfile', validateKeyInputs({ key: 'body', inputArr: ["-category", "-businessName", "-website", "-email", "-phone", "-city", "-zip", "-address", "-country", "businessId", "-description", "-isOpen24_7", "-fromTime", "-toTime", "-location", "-logo"] }), updateBusinessImages);
router.post("/upload-multiple-files", uploadToMemory.array("files", 10), uploadMultipleFiles)
router.post("/updateBusinessImages", updateBusinessImages)

router.get('/profile/:businessId', getProfile);
router.get('/category-business', cateogyBusiness);
router.get('/subcategory-business', subCateogyBusiness);
router.get('/searchAll', searchAll);
router.get('/getAll', getAll);

export default router;

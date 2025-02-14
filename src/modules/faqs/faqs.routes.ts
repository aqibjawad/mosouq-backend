// faqs.route.ts
import { Router } from 'express';
import faqController from './faqs.controller';

const router = Router();

router.post('/create', faqController.createFaqs);
router.get('/business/:businessId', faqController.getFaqsByBusinessId);

export default router;
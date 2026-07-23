import express from 'express';

import protect from '../middleware/authmiddleware.js';
import { roadmapController,getUserRoadmap, getRoadmapById, deleteRoadmapById } from '../controllers/roadmapController.js';

const router = express.Router();

router.post('/generate', protect, roadmapController);
router.get('/myroadmap', protect, getUserRoadmap);
router.get("/:id", protect,  getRoadmapById);
router.delete("/:id", protect, deleteRoadmapById);

export default router;
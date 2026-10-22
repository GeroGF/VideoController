import { Router } from "express";
import { getCollection, getCollectionWithId, getVideo, getVideoWithId, postVideo, postCollection, putCollection, deleteVideo, deleteCollection } from "../controllers/video.controller.js";



const router = Router();


router.get("/collection", getCollection);

router.get("/collection/:id", getCollectionWithId);

router.get("/video", getVideo);

router.get("/video/:id", getVideoWithId);

router.post("/video", postVideo)

router.post("/collection", postCollection)

router.put("/collection/:id/:VideoId", putCollection)

router.delete("/video/:id", deleteVideo);

router.delete("/collection/:id", deleteCollection);


export default router;
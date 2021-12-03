const Router = require("express");
const fileController = require("../controllers/fileController");
const router = new Router();
const authMiddleware = require("../middleware/auth.middleware");

router.post('', authMiddleware, fileController.createDir);
router.post('/upload', authMiddleware, fileController.uploadFile);
router.post('/avatar', authMiddleware, fileController.uploadAvatar);
router.get('', authMiddleware, fileController.fetFiles);
router.get('/download', authMiddleware, fileController.downloadFile);
router.get('/search', authMiddleware, fileController.searchFile);
router.delete('/', authMiddleware, fileController.deleteFile);
router.delete('/avatar', authMiddleware, fileController.deleteAvatar);

module.exports = router;
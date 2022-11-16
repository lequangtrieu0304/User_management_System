const express = require('express');
const router = express.Router();

const player = require('../controllers/playerControllers');

router.get('/', player.viewPlayers);
router.get('/add-player', player.form);
router.post('/find-player', player.findPlayer)
router.post('/add-player', player.createPlayer)
router.get('/editPlayer/:id', player.editPlayer)
router.post('/editPlayer/:id', player.updatePlayer)
router.get('/:id', player.deletePlayer)

module.exports = router;
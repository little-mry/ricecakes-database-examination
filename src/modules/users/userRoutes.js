import {Router} from 'express'
import { signUpUser, loginUser, getUserChannels } from './userController.js'

const router = Router()

//skapa användare
router.post('/signup', signUpUser)

router.post('/login', loginUser)

//hämta user-info
router.get('/:userId', getUserInfo)

//hämta alla kanaler som en användare prenumererar på
router.get('/:userId/channels', getUserChannels)

export default router;


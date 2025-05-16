import {Router} from 'express'
import { signUpUser, loginUser, getUserInfo } from './userController.js'


const router = Router()

//skapa användare
//funkar
router.post('/signup', signUpUser)

//funkar
router.post('/login', loginUser)

//hämta user-info
//funkar
router.get('/:userId', getUserInfo)



export default router;


import {Router} from 'express';

const feedbackHandler = Router();

feedbackHandler.post('/feed', (req, res) => {
    const userFeedback = req.body;
  
    if (!userFeedback) {
        res.status(400).json({message: 'feedback was lost'}); 
    }

    res.status(200).json({message: 'Feedback was recieved'});
    console.log(userFeedback);
});

export default feedbackHandler;

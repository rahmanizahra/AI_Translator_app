const router = require('express').Router();
const db = require('./data.js');
const controller = require('./index.js');
const verifyToken = require('../../middleware/verifyToken.js');

router.post('/translate',verifyToken, async (req, res) => {
  const{username, password} = req.body;
  const user = await db.getUser(username);
  if (user) {
    const isCorrectPassword = await controller.verifyPassword(password, user.password);
    if (isCorrectPassword) {
      const token = await controller.generateToken(user.username);
      res.json({ token });
    } else {
      res.json({ success: false });
    }
  } else {
    res.json({ success: false });
  }
  const { language, message } = req.body;
  try {
    // Implement translation logic using OpenAI API
    const correctedText = await correctTextWithGPT3(message);
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: `Translate as accurate as possible this into ${language}: ${correctedText}`,
        },
      ],
      temperature: 0.3,
      max_tokens: 100,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });
    const translatedText = response.choices[0].message.content.trim();
    var sql ='INSERT INTO translations (language, originalText, correctedText, translatedText) VALUES (?, ?, ?, ?)'
    var params =[language, message, correctedText, translatedText]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "translatedText": translatedText,
            "data": result,
            "id" : this.lastID
        })
    });
  } catch (error) {
    console.error('Translation error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.post('/rewrite',verifyToken, async (req, res) => {
  const{username, password} = req.body;
  const user = await db.getUser(username);
  if (user) {
    const isCorrectPassword = await controller.verifyPassword(password, user.password);
    if (isCorrectPassword) {
      const token = await controller.generateToken(user.username);
      res.json({ token });
    } else {
      res.json({ success: false });
    }
  } else {
    res.json({ success: false });
  }
  const { message,language } = req.body;
  try {
    // Implement rewriting logic using OpenAI API
    const correctedText = await correctTextWithGPT3(message);
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: `Paraphrase the following message: ${correctedText} into ${language}`,
        },
      ],
      max_tokens: 100,
      temperature: 1,
    });
    const rewrittenText = response.choices[0].message.content.trim();
    res.json({ rewrittenText });
  } catch (error) {
    console.error('Rewriting error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
module.exports = router;
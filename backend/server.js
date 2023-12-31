// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const OpenAI = require('openai'); 
require('dotenv').config(); 
const app = express();
const port = 3001; 
const verifyToken = require('./middleware/verifyToken.js');
const handleErrors = require('./middleware/handleError.js');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set Swagger
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = require('./swagger.json');
const swaggerDocs = swaggerJsDoc(swaggerOptions);
const {SwaggerTheme} = require('swagger-themes');
const theme=new SwaggerTheme('v3');
const options={
  explorer: true, 
  customCss: theme.getBuffer('material'),
};
// load routes
const userRoutes = require('./components/user/routes.js');
const translateRoutes = require('./components/translate/routes.js');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, options));
app.use('/api/user', userRoutes);
app.use('/api',verifyToken, translateRoutes);
app.use(handleErrors);


app.post('/api/translations', async (req, res) => {
  const { language, originalText, correctedText, translatedText } = req.body;
 var sql ='INSERT INTO translations (language, originalText, correctedText, translatedText) VALUES (?, ?, ?, ?)'
    var params =[language, originalText, correctedText, translatedText]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": result,
            "id" : this.lastID
        })
    });
});
app.get('/api/translations', async (req, res) => {
    var sql = "SELECT * FROM translations"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});



//app.post('/api/translate', async (req, res) => {
//  const { language, message } = req.body;
//  try {
//    // Implement translation logic using OpenAI API
//    const correctedText = await correctTextWithGPT3(message);
//    const response = await openai.chat.completions.create({
//      model: 'gpt-3.5-turbo',
//      messages: [
//        {
//          role: 'user',
//          content: `Translate as accurate as possible this into ${language}: ${correctedText}`,
//        },
//      ],
//      temperature: 0.3,
//      max_tokens: 100,
//      top_p: 1.0,
//      frequency_penalty: 0.0,
//      presence_penalty: 0.0,
//    });

//    const translatedText = response.choices[0].message.content.trim();
//    //res.json({ translatedText });
//    var sql ='INSERT INTO translations (language, originalText, correctedText, translatedText) VALUES (?, ?, ?, ?)'
//    var params =[language, message, correctedText, translatedText]
//    db.run(sql, params, function (err, result) {
//        if (err){
//            res.status(400).json({"error": err.message})
//            return;
//        }
//        res.json({
//            "message": "success",
//            "translatedText": translatedText,
//            "data": result,
//            "id" : this.lastID
//        })
//    });
//  } catch (error) {
//    console.error('Translation error:', error);
//    res.status(500).json({ error: 'Internal Server Error' });
//  }
//});

//app.post('/api/rewrite', async (req, res) => {
//  const { message,language } = req.body;
//  try {
//    // Implement rewriting logic using OpenAI API
//    const correctedText = await correctTextWithGPT3(message);
//    const response = await openai.chat.completions.create({
//      model: 'gpt-3.5-turbo',
//      messages: [
//        {
//          role: 'user',
//          content: `Paraphrase the following message: ${correctedText} into ${language}`,
//        },
//      ],
//      max_tokens: 100,
//      temperature: 1,
//    });
//    const rewrittenText = response.choices[0].message.content.trim();
//    res.json({ rewrittenText });
//  } catch (error) {
//    console.error('Rewriting error:', error);
//    res.status(500).json({ error: 'Internal Server Error' });
//  }
//});
//app.get('/api/translations', async (req, res) => {
//  try {
//    const [translations] = await db.query('SELECT * FROM translations ORDER BY timestamp DESC');
//    res.json({ translations });
//  } catch (error) {
//    console.error('Error fetching translations:', error);
//    res.status(500).json({ error: 'Internal Server Error' });
//  }
//});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



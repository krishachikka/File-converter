const express = require('express');
const multer = require('multer');
const fs = require('fs');
const { converterPDFToJson } = require('./converters/pdfConverser');
const { converterDOCXToJson } = require('./converters/docxConverser');
const cors = require('cors');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors()); // Place this before route definitions
app.use(express.static('public'));

app.post('/upload', upload.single('file'), (req, res) => {
  const filePath = req.file.path;
  const bufferFile = fs.readFileSync(filePath);

  const fileExtension = req.file.originalname.split('.').pop().toLowerCase();

  let converter;
  if (fileExtension === 'pdf') {
    converter = converterPDFToJson;
  } else if (fileExtension === 'docx') {
    converter = converterDOCXToJson;
  } else {
    fs.unlinkSync(filePath); // Ensure the file is deleted if unsupported type
    return res.status(400).send('Unsupported file type.');
  }

  converter(bufferFile)
    .then((json) => {
      res.json(json);
      fs.unlinkSync(filePath); // Delete the uploaded file
    })
    .catch((error) => {
      console.error('Error converting file to JSON:', error);
      res.status(500).send('Error processing the file.');
      fs.unlinkSync(filePath); // Delete the uploaded file on error
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

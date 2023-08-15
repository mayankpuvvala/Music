const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' });

// Serve the music player HTML file at the root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'music.html'));
});

app.use(express.static(path.join(__dirname, 'public')));

app.post('/upload', upload.single('file'), (req, res) => {
  // Move the uploaded file from the temporary directory to the public directory
  const oldPath = req.file.path;
  const newPath = path.join(__dirname, req.file.originalname);
  fs.rename(oldPath, newPath, (err) => {
    if (err) throw err;
    res.send('File uploaded successfully!');
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

import express from 'express';

const file = express.Router();

const unimplementedHandler = (req, res) => {
  res.status(501).send('Unimplemented.').end();
};

file.get('/:id', unimplementedHandler);

file.post('/upload', unimplementedHandler);

file.get('/list', unimplementedHandler);

file.delete('/delete/:id', unimplementedHandler);

file.get('/download/:id', unimplementedHandler);

file.put('/update/:id', unimplementedHandler);

export default file;

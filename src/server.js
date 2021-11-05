import app from './app';

const port = process.env.APP_PORT;
app.listen(port, () => {
  console.log('Servidor ON: ', process.env.APP_URL);
});

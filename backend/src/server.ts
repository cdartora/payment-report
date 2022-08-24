import app from "./api";

const { PORT = 3001 } = process.env;

app.listen(PORT, () => {
  console.log(`Servidor ouvindo porta ${PORT}`);
})
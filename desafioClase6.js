const express = require("express");
const productos = require("./desafioClase4");
const app = express();
const PORT = 8080;
const server = app.listen(PORT, () => {
	console.log(
		`Aplicación Express Escuchando en el puerto ${server.address().port}`
	);
});
server.on("Error 404 Page Not Found", (error) =>
	console.log(`Se tiene el siguiente Error: ${error}`)
);
app.get("/productos", async (req, resp) => {
	const allProducts = await productos.getAll();
	resp.send(allProducts);
});
app.get("/productoRandom", async (req, resp) => {
	const allProducts = await productos.getAll();
	const random = Math.floor(Math.random() * allProducts.length);
	const randomProduct = await allProducts[random];
	resp.send(randomProduct);
});

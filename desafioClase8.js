const express = require("express");
const productos = require("./desafioClase4");
const { Router } = express;
const app = express();
const PORT = 8080;
const routerProducts = Router();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", routerProducts);
app.use("/api/static", express.static(__dirname + "/public"));

const server = app.listen(PORT, () => {
	console.log(
		`Aplicación Express Escuchando en el puerto ${server.address().port}`
	);
});

server.on("Error 404 Page Not Found", (error) =>
	console.log(`Se tiene el siguiente Error: ${error}`)
);

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/public/index.html");
});

routerProducts.get("/productos", async (req, resp) => {
	const allProducts = await productos.getAll();
	resp.send(allProducts);
});

routerProducts.post("/productos", async (req, resp) => {
	const reqString = JSON.stringify(req.body);
	const reqParse = JSON.parse(reqString);
	const newId = await productos.save(reqParse);
	reqParse.id = newId;
	resp.send(reqParse);
});

routerProducts.get("/productos/:id", async (req, res) => {
	const id = parseInt(req.params.id);
	const result = await productos.getById(id);
	if (result !== null) {
		res.send(result);
	} else {
		res.send({ error: "Objeto no encontrado" });
	}
});

routerProducts.delete("/productos/:id", async (req, res) => {
	const id = parseInt(req.params.id);
	const result = await productos.deleteById(id);
	if (result !== null) {
		res.send({ res: result });
	} else {
		res.send({ error: "Objeto no encontrado" });
	}
});

routerProducts.put("/productos/:id", async (req, res) => {
	const id = parseInt(req.params.id);
	const reqString = JSON.stringify(req.body);
	const reqParse = JSON.parse(reqString);
	const result = await productos.putById(reqParse, id);
	if (result !== null) {
		res.send(result);
	} else {
		res.send({ error: "Objeto no encontrado" });
	}
});

/*
app.get("/productoRandom", async (req, resp) => {
	const allProducts = await productos.getAll();
	const random = Math.floor(Math.random() * allProducts.length);
	const randomProduct = await allProducts[random];
	resp.send(randomProduct);
});*/

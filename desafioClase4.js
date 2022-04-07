const fs = require("fs");
const fileName = "./desafio.txt";

async function saveFile(object) {
	try {
		const file = await fs.promises.readFile(fileName, "utf-8");
		const fileParse = JSON.parse(file);
		object.id = fileParse[fileParse.length - 1].id + 1;
		fileParse.push(object);
		const fileString = JSON.stringify(fileParse, null, 2);
		writeFile(fileString, "Object Added");
		return object.id;
	} catch (error) {
		const readError = new Error(
			`There was an error while reading the file: ${error}`
		);
		console.error(readError);
		writeFileError(object, "File Created");
		return 1;
	}
}

async function writeFileError(object, finalMessage) {
	object.id = 1;
	const objectsList = [];
	objectsList.push(object);
	stringList = JSON.stringify(objectsList, null, 2);

	try {
		await fs.promises.writeFile(fileName, stringList);
		console.log(finalMessage);
	} catch (error) {
		const writeError = new Error(
			`There was an error while writing the file: ${error}`
		);
		console.error(writeError);
	}
}

async function writeFile(list, finalMessage) {
	try {
		await fs.promises.writeFile(fileName, list);
		console.log(finalMessage);
	} catch (error) {
		const writeError = new Error(
			`There was an error while writing the file: ${error}`
		);
		console.error(writeError);
	}
}

async function all() {
	try {
		const file = await fs.promises.readFile(fileName, "utf-8");
		const parseFile = JSON.parse(file);
		return parseFile;
	} catch (error) {
		const readError = new Error(
			`There was an error while reading the file: ${error}`
		);
		console.error(readError);
	}
}
async function deleteAllFiles(finalMessage) {
	try {
		const emptyList = [];
		const emptyListString = JSON.stringify(emptyList, null, 2);
		await fs.promises.writeFile(fileName, emptyListString);
		console.log(finalMessage);
	} catch (error) {
		const writeError = new Error(
			`There was an error while writing the file: ${error}`
		);
		console.error(writeError);
	}
}
async function getId(id) {
	try {
		const file = await fs.promises.readFile(fileName, "utf-8");
		const fileParse = JSON.parse(file);
		const result = fileParse.filter((product) => product.id == id);
		if (result.length > 0) {
			return result[0];
		} else {
			throw `There isn't any object with that ID`;
		}
	} catch (error) {
		const idError = new Error(`There was an Error: ${error}`);
		console.error(idError);
		return null;
	}
}
async function deleteId(id) {
	try {
		const file = await fs.promises.readFile(fileName, "utf-8");
		const fileParse = JSON.parse(file);
		const result = fileParse.filter((product) => product.id != id);
		if (result.length < fileParse.length) {
			console.log(result);
			const fileString = JSON.stringify(result, null, 2);
			writeFile(fileString, `The product with the ID ${id} was deleted`);
		} else {
			console.log("There isn't any object with that ID");
		}
	} catch (error) {
		const idError = new Error(
			`There isn't any object with that ID: ${error}`
		);
		console.error(idError);
	}
}

class Contenedor {
	async save(object) {
		const result = await saveFile(object);
		return result;
	}
	async getById(id) {
		const result = await getId(id);
		console.log(result);
		return result;
	}
	async getAll() {
		const result = await all();
		return result;
	}
	async deleteById(id) {
		const result = await deleteId(id);
		return result;
	}
	async deleteAll() {
		await deleteAllFiles("All Objects Deleted");
	}
}

productos = new Contenedor();
module.exports = productos;

/*productos.save({
	title: "Monitor Samsung",
	price: 150,
	thumbnail: "https://monitor",
});*/
/*productos.getById(1);*/
//console.log(productos.getById(3));
/*productos.getAll();*/
//productos.deleteById(10);
/*productos.deleteAll();*/

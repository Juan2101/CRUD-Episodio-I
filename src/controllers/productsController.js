const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		return res.render(path.join(__dirname, "..", "views", "products"), {products, toThousand})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
        let product = products.find(producto => producto.id === +req.params.id)

		return res.render(path.join(__dirname, "..", "views", "detail"), {product , toThousand})
	},

	// Create - Form to create
	create: (req, res) => {
		return res.render(path.join(__dirname, "..", "views", "product-create-form"))
	},
	
	// Create -  Method to store
	store: (req, res) => {
		return res.send("Producto agregado")
	},

	// Update - Form to edit
	edit: (req, res) => {
        let product = products.find(producto => producto.id === +req.params.id)

		return res.render(path.join(__dirname, "..", "views", "product-edit-form"), {product})
	},
	// Update - Method to update
	update: (req, res) => {
		return res.send("Producto editado")
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		return res.send("producto eliminado")
	}
};

module.exports = controller;
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

		let product = {
			id: +products.length + 1,
			name: req.body.name,
			price: +req.body.price,
			discount: +req.body.discount,
			category: req.body.category,
			description: req.body.description,
			image: "default-image.png"
		}

		products.push(product)

		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2), "utf-8")

		return res.redirect("/products")
	},

	// Update - Form to edit
	edit: (req, res) => {
        let product = products.find(producto => producto.id === +req.params.id)

		return res.render(path.join(__dirname, "..", "views", "product-edit-form"), {product})
	},
	// Update - Method to update
	update: (req, res) => {

		let {name, price, discount, category, description} = req.body   

		products.forEach(product => {
			if (product.id === +req.params.id) {
				product.name = name
				product.price = +price
				product.discount = +discount
				product.category = category
				product.description = description
			}
		});
		
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2), "utf-8")

		return res.redirect("/products/detail/" + req.params.id)
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {

		let delate = products.filter(product => product.id !== +req.params.id)

		fs.writeFileSync(productsFilePath, JSON.stringify(delate, null, 2), "utf-8")

		return res.redirect("/products")
	}
};

module.exports = controller;
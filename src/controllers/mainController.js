const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		return res.render(path.join(__dirname, "..", "views", "index"), {products, toThousand})
	},
	search: (req, res) => {
		let keyWord = req.query.keywords
		let resultado = []

		products.forEach(product => {
			product.name.includes(keyWord) || product.category.includes(keyWord) || product.description.includes(keyWord)  ? resultado.push(product) : null
		});

		console.log(resultado.length);

		return res.render(path.join(__dirname, "..", "views", "results"), {resultado, keyWord, toThousand})
	},
};

module.exports = controller;

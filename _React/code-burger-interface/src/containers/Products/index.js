import React, { useEffect, useState } from "react";

import api from "../../services/api";

import ProductsLogo from "../../assets/products-logo.svg";

import formatCurrency from "../../utils/formatCurrency";

import {
	Container,
	ProductsImg,
	CategoryButton,
	CategoriesMenu,
	ProductsContainer
} from "./styles";

import { CardProduct } from "../../components";

export function Products() {

	const [categories, setCategories] = useState([])

	const [products, setProducts] = useState([])

	const [activeCategory, setActiveCategory] = useState(0)

	const [filteredProducts, setFilteredProducts] = useState([])

	useEffect(() => {
		async function loadCategories() {
			const { data } = await api.get("categories")

			const newCategories = [{ id: 0, name: 'Todas' }, ...data]

			setCategories(newCategories)
		};

		async function loadProducts() {
			const { data: allProducts } = await api.get("products")

			const newProducts = allProducts.map(product => {
				return { ...product, formatedPrice: formatCurrency(product.price) }
			})

			setProducts(newProducts)
		};

		loadProducts()
		loadCategories()
	}, [])

	useEffect(() => {
		if (activeCategory === 0) {
			setFilteredProducts(products)
		} else {
			const newFilteredProducts = products.filter(
				product => product.category_id === activeCategory)
			setFilteredProducts(newFilteredProducts)
		}
	}, [activeCategory, products])

	return (
		<Container>
			<ProductsImg src={ProductsLogo} alt="logo do home de produtos" />
			<CategoriesMenu>
				{categories && categories.map(category =>
					<CategoryButton type="button" key={category.id} isActiveCategory={activeCategory === category.id}
						onClick={() => { setActiveCategory(category.id) }}
					>{category.name}</CategoryButton>)}
			</CategoriesMenu>
			<ProductsContainer>
				{filteredProducts && filteredProducts.map(product => (
					<CardProduct key={product.id} product={product}></CardProduct>
				))}
			</ProductsContainer>
		</Container>
	)
}

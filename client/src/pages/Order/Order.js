import Axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { get, set } from "react-hook-form";
import { FaRedo, FaRegCheckCircle, FaRegTimesCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Breadcrumb, ErrorMessage, Preloader } from "../../components";
import { getDiscountPrice } from "../../helpers/product";
import useFetch from "../../hooks/use-fetch";

const Order = () => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// get userid from local storage
	const customer_profile_id = localStorage.getItem("user-id");
	const [productInfo, setProductInfo] = useState([]);

	useEffect(() => {
		// get order from database
		Axios.get(
			`${process.env.REACT_APP_API_URL}/order/getorder/${customer_profile_id}`
		)
			.then((response) => {
				setData(response.data);
				setLoading(false);
			})
			.catch((error) => {
				setError(error.message);
				setLoading(false);
			});
		Axios.get(
			`${process.env.REACT_APP_API_URL}/shopperproduct/getshopperproduct`
		)
			.then((response) => {
				setProductInfo(response.data);
				setLoading(false);
			})
			.catch((error) => {
				setError(error.message);
				setLoading(false);
			});
	}, [customer_profile_id]);

	return (
		<div className="body-wrapper space-pt--70 space-pb--120">
			<Breadcrumb pageTitle="Orders" prevUrl="/home" />
			<div className="order-product-area">
				{data?.map((single) => {
					console.log(productInfo);
					return (
						<div
							className="cart-product border-bottom--medium"
							key={single.id}
						>
							<div className="cart-product__image">
								<img
									src={
										process.env.PUBLIC_URL +
										single.productImage
									}
									className="img-fluid"
									alt=""
								/>
							</div>
							<div className="cart-product__content">
								{productInfo?.map((product) => {
									var prod_id = single.product_id;
									// prod id is a string of numbers separated by commas
									var prodID = prod_id.toString();
									// split the string into an array of numbers
									var prodIDArray = prodID.split(",");
									// loop through the array of numbers
									// if the product id matches the id in the array
									// then display the product name

									while (prodIDArray.length > 0) {
										if (product.id == prodIDArray[0]) {
											return (
												<h4 className="title">
													<Link
														to={
															process.env
																.PUBLIC_URL +
															`/product/${product.id}`
														}
													>
														{product.name}
													</Link>
												</h4>
											);
										}
										console.log(prodIDArray[0]);
										prodIDArray.shift();
									}
								})}
								<span className="category">
									{single.productCategory}
								</span>
								<div className="price">
									{
										<span className="discounted-price">{`$${single.price}`}</span>
									}
								</div>
							</div>
							<div className="cart-product__status">
								<p>
									<span>
										{single.order_status === "completed" ? (
											<FaRegCheckCircle />
										) : single.order_status ===
										  "cancelled" ? (
											<FaRegTimesCircle />
										) : (
											<FaRedo />
										)}
									</span>{" "}
									{single.order_status}
								</p>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Order;

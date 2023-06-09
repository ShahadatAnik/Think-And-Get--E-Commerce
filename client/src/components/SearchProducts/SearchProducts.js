import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";

import { getProducts, getDiscountPrice } from "../../helpers/product";
import { addToWishlist } from "../../store/slices/wishlist-slice";

const SearchProducts = ({ limit }) => {
    const { products } = useSelector((state) => state.product);
    const { wishlistItems } = useSelector((state) => state.wishlist);
    const prods = getProducts(products, limit);
    const dispatch = useDispatch();

    if (!prods?.length) return <p>No products found</p>;

    return (
        <div className="search-products-area">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        {/* featured products */}
                        <div className="search-products-wrapper space-mt--30 space-mb-m--20">
                            <div className="row">
                                {prods.map((single) => {
                                    const wishlistItem = wishlistItems.find(
                                        (wishlistItem) =>
                                            wishlistItem.id === single.id
                                    );
                                    return (
                                        <div className="col-6" key={single.id}>
                                            <div className="grid-product space-mb--20">
                                                <div className="grid-product__image">
                                                    <Link
                                                        to={
                                                            process.env
                                                                .PUBLIC_URL +
                                                            `/product/${single.id}`
                                                        }
                                                    >
                                                        <img
                                                            src={
                                                                process.env
                                                                    .PUBLIC_URL +
                                                                single.image[0]
                                                            }
                                                            className="img-fluid"
                                                            alt=""
                                                        />
                                                    </Link>
                                                    <button
                                                        className={`icon ${
                                                            wishlistItem !==
                                                            undefined
                                                                ? "active"
                                                                : ""
                                                        }`}
                                                        disabled={
                                                            wishlistItem !==
                                                            undefined
                                                        }
                                                        onClick={() =>
                                                            dispatch(
                                                                addToWishlist(
                                                                    single
                                                                )
                                                            )
                                                        }
                                                    >
                                                        <ReactSVG src="assets/img/icons/heart-dark.svg" />
                                                    </button>
                                                </div>
                                                <div className="grid-product__content">
                                                    <h3 className="title">
                                                        <Link
                                                            to={
                                                                process.env
                                                                    .PUBLIC_URL +
                                                                `/product/${single.id}`
                                                            }
                                                        >
                                                            {single.name}
                                                        </Link>
                                                    </h3>
                                                    <span className="category">
                                                        {single.category.map(
                                                            (
                                                                item,
                                                                index,
                                                                arr
                                                            ) => {
                                                                return (
                                                                    item +
                                                                    (index !==
                                                                    arr.length -
                                                                        1
                                                                        ? ", "
                                                                        : "")
                                                                );
                                                            }
                                                        )}
                                                    </span>
                                                    <div className="price">
                                                        {single.discount &&
                                                        single.discount > 0 ? (
                                                            <Fragment>
                                                                <span className="main-price me-1">{`$${single.price}`}</span>
                                                                <span className="discounted-price">{`$${getDiscountPrice(
                                                                    single.price,
                                                                    single.discount
                                                                )}`}</span>
                                                            </Fragment>
                                                        ) : (
                                                            <span className="discounted-price">{`$${single.price}`}</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

SearchProducts.propTypes = {
    limit: PropTypes.number,
};

export default SearchProducts;

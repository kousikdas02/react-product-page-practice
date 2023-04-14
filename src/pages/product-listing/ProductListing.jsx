import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./ProductListing.scss";
import { Link } from "react-router-dom";

const ProductListing = () => {
    const BaseUrl = "https://dummyjson.com";
    const [products, setProducts] = useState([]);

    
    const getAllProducts = async () => {
        try {
            const response = await axios.get(`${BaseUrl}/products/`);
            setProducts(response?.data.products);
        } catch (error) {
            console.log("error", error);
        }
    };
    
    useEffect(() => {
        
        getAllProducts()
    }, []);

    console.log(products);

    return (
        <>
            <Container>
                <div className='common_wrappper pt-3 pb-3'>
                    <h1>Product Listing Page</h1>

                    <Row>
                        {products.map((productsData) => {
                            return (
                                <>
                                    <Col
                                        lg={4}
                                        className='mb-2'
                                        key={productsData.id}>
                                        <div className='product_card'>
                                            <div className='productThumbnail'>
                                                <Link
                                                    to={`products/${productsData.id}`}>
                                                    <span>
                                                        <img
                                                            src={
                                                                productsData.thumbnail
                                                            }
                                                            alt=''
                                                        />
                                                    </span>
                                                </Link>
                                            </div>
                                            <h5 className='product_title'>
                                                <Link to={`products/${productsData.id}`}>
                                                    {productsData?.title}
                                                </Link>
                                            </h5>

                                            {productsData.price > 1000 ? (
                                                <p>
                                                    ₹
                                                    {Math.round(
                                                        `${productsData.price -
                                                        (productsData.price *
                                                            productsData.discountPercentage) /
                                                        100
                                                        }`
                                                    )}{" "}
                                                    <strike className='oldPrice'>
                                                        {productsData.price}
                                                    </strike>{" "}
                                                    <span className='oldPrice'>
                                                        (
                                                        {
                                                            productsData.discountPercentage
                                                        }
                                                        % off)
                                                    </span>
                                                </p>
                                            ) : (
                                                <p>₹{productsData.price}</p>
                                            )}
                                        </div>
                                    </Col>
                                </>
                            );
                        })}
                    </Row>
                </div>
            </Container>
        </>
    );
};

export default ProductListing;

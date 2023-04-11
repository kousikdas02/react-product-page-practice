import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

const ProductListing = () => {
    const BaseUrl = "https://dummyjson.com";
    const [products, setProducts] = useState([]);

    const getAllProducts = async() => {
        try {
            const response = await axios.get(`${BaseUrl}/products`)
            setProducts(response?.data)
        } catch (error) {
            console.log('error', error);
        }
    }

    useEffect(() => {
        getAllProducts()
    }, [])

    console.log(products);
    
    return (
        <>
            <Container>
                <div className="common_wrappper pt-3 pb-3">
                    <h1>Product Listing Page</h1>

                    <Row>
                        {
                            products.map((productsData) => {
                                return(
                                    <>
                                        <Col lg={4} className="mb-2">
                                            <div className="product_card">
                                                <h3 className="product_title">Product Name: {productsData?.title}</h3>
                                            </div>
                                        </Col>
                                    </>
                                )
                            })
                        }
                    </Row>
                </div>
            </Container>

        </>
    );
};

export default ProductListing;

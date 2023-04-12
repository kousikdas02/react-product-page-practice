import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
    const { id } = useParams();
    const BaseUrl = "https://dummyjson.com";
    const [singleProduct, setSingleProduct] = useState([]);

    const getSingleProduct = async() => {
        try {
            const response = await axios.get(`${BaseUrl}/products/${id}`)
            setSingleProduct(response?.data)
        } catch (error) {
            console.log("error", error);
        }
    }
    
    useEffect(() => {
      getSingleProduct()
    }, [])
    
    console.log(singleProduct)

    return (
        <>
            <h1>{singleProduct.title}</h1>
        </>
    );
};

export default ProductDetails;

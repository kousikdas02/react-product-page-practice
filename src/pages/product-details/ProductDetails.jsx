import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "./ProductDetails.scss";
import "font-awesome/css/font-awesome.min.css";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { register } from "swiper/element/bundle";
import Rating from "react-rating";
// register Swiper custom elements
register();

const ProductDetails = () => {
    const { id } = useParams();
    const BaseUrl = "https://dummyjson.com";
    const [singleProduct, setSingleProduct] = useState([]);

    /**
     * This function uses axios to make an API call to retrieve a single product and sets the response data
     * to the state variable "singleProduct".
     */
    const getSingleProduct = async () => {
        try {
            const response = await axios.get(`${BaseUrl}/products/${id}`);
            setSingleProduct(response?.data);
        } catch (error) {
            console.log("error", error);
        }
    };

    /* `useEffect(() => { getSingleProduct(); }, []);` is a React hook that is used to perform side effects
in functional components. In this case, it is used to call the `getSingleProduct` function when the
component mounts for the first time (since the dependency array is empty). This is equivalent to the
`componentDidMount` lifecycle method in class components. */
    useEffect(() => {
        getSingleProduct();
    }, []);

    console.log(singleProduct);
    console.log(singleProduct);

    /* `const [thumbsSwiper, setThumbsSwiper] = useState(null);` is declaring a state variable
`thumbsSwiper` using the `useState` hook with an initial value of `null`. The `setThumbsSwiper`
function is used to update the value of `thumbsSwiper`. This state variable is used to store a
reference to the Swiper instance used for the thumbnail images in the product slider. It is
initialized to `null` because the reference to the Swiper instance is not available until the
component has mounted and the Swiper component has been rendered. Once the Swiper component has been
rendered, the `onSwiper` prop is used to set the value of `thumbsSwiper` to the Swiper instance. */
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return (
        <>
            <div className='productDetails'>
                <Container>
                    <Row>
                        <Col lg={5}>
                            <div className='productSlider'>
                                <Swiper
                                    style={{
                                        "--swiper-navigation-color": "#000",
                                        "--swiper-pagination-color": "#000",
                                    }}
                                    spaceBetween={10}
                                    navigation={false}
                                    thumbs={{
                                        swiper:
                                            thumbsSwiper &&
                                            !thumbsSwiper.destroyed
                                                ? thumbsSwiper
                                                : null,
                                    }}
                                    modules={[FreeMode, Navigation, Thumbs]}
                                    className='mySwiper2'>
                                    {singleProduct.images?.map(
                                        (image, index) => {
                                            console.log(image);
                                            return (
                                                <>
                                                    <SwiperSlide key={index}>
                                                        <img
                                                            src={image}
                                                            alt=''
                                                        />
                                                    </SwiperSlide>
                                                </>
                                            );
                                        }
                                    )}
                                </Swiper>
                                <Swiper
                                    onSwiper={setThumbsSwiper}
                                    spaceBetween={10}
                                    slidesPerView={4}
                                    freeMode={true}
                                    watchSlidesProgress={true}
                                    modules={[FreeMode, Navigation, Thumbs]}
                                    className='mySwiper'>
                                    {singleProduct.images?.map(
                                        (image, index) => {
                                            console.log(image);
                                            return (
                                                <>
                                                    <SwiperSlide
                                                        key={singleProduct.id}>
                                                        <img
                                                            src={image}
                                                            alt=''
                                                        />
                                                    </SwiperSlide>
                                                </>
                                            );
                                        }
                                    )}
                                </Swiper>
                            </div>
                        </Col>
                        <Col lg={7}>
                            <div className='productDetails'>
                                <h1>{singleProduct.title}</h1>
                                <Rating
                                    className='productRating'
                                    emptySymbol='fa fa-star-o '
                                    fullSymbol='fa fa-star '
                                    readonly
                                    initialRating={singleProduct.rating}
                                />
                                
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default ProductDetails;

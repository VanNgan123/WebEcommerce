import React from "react";
import { Carousel } from "react-bootstrap";
import { Container, Box, Grid, Typography, Button } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";

const Banner=()=>{
    return (
        <Box mb={5} component="section" sx={{paddingTop:'123px', width:'100%' ,margin:'0px auto',boxSizing:'border-box'}}>
        <Carousel style={{ width: '100%', overflow: 'hidden' }}>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://shopdunk.com/images/uploaded/banner/banner%202024/Thang_9/thang9_2/Html%20iphone%2016%20sr/banner%20iphone%2016%20pro-TG_PC.png"
              alt="Slide 1"
              style={{ height: "476px", objectFit: "cover" }} //476px
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://shopdunk.com/images/uploaded/banner/banner%202024/Thang_9/thang9_2/15prmpc.png"
              alt="Slide 2"
              style={{ height: "476px", objectFit: "cover" }}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://shopdunk.com/images/uploaded/banner/banner%202024/Thang_9/thang9_2/ipadhompc.png"
              alt="Slide 3"
              style={{ height: "476px", objectFit: "cover" }}
            />
          </Carousel.Item>
           <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://shopdunk.com/images/uploaded/banner/banner%202024/Thang_9/thang9_2/sonypc.png"
              alt="Slide 4"
              style={{ height: "476px", objectFit: "cover" }}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://shopdunk.com/images/uploaded/banner/banner%202024/Thang_7/banner%20iPhone%2015%20Pro_PC.png"
              alt="Slide 4"
              style={{ height: "476px", objectFit: "cover" }}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://shopdunk.com/images/uploaded/banner/banner%202024/Thang_9/thang9_2/watchomepc.png"
              alt="Slide 4"
              style={{ height: "476px", objectFit: "cover" }}
            />
          </Carousel.Item>
        </Carousel>
      </Box>
    )
}
export default Banner;
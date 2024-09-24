import React from 'react';
import Header from '../../layout/Header';
import { Container } from '@mui/material';
import Contents from './components/Contents';
import Footer from '../../layout/Footer';
import Banner from './components/Banner';

const Home = () => {
  return (
    <>
      <Header />
      <Banner />
      <Contents />
      <Footer />
    </>
    // <Container sx={{ width: '100%' }}>
      
    // </Container>
  );
};

export default Home;

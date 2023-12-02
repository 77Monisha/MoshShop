import Products from '../components/Products';
import { useParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';

const HomeScreens = () => {
  const { keyword , pageNumber } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({keyword, pageNumber  });

  return (
    <>
    { isLoading ? (
    <Loader/>
    ): error ? (<Message variant='danger'>{ error?.data?.message || error.error } </Message>) : 
    (<>
      <h1>Latest Products </h1>
      <Row>
          { data.products.map((product) => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                      <Products product={product}/>
              </Col>
          ))}
      </Row>
      <Paginate pages={data.pages} page={data.page} keyword = {keyword ? keyword : '' }/>
    </>)}
        
    </>
  )
}

export default HomeScreens
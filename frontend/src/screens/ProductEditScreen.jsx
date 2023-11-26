import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { toast } from 'react-toastify';
import { useUpdateProductMutation, useGetProductDetailsQuery } from '../slices/productsApiSlice';

const ProductEditScreen = () => {
  const { id: productId } = useParams();

  const [name, setName ] = useState('');
  const [price, setPrice ] = useState(0);
  const [category, setCategory ] = useState('');
  const [description, setDescription ] = useState('');
  const [brand, setBrand ] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [image, setImage ] = useState('');

  const { data: product, isLoading, error, refetch} =  useGetProductDetailsQuery(productId);
  
  const [updateProduct, { isLoading: loadingUpdate}] = useUpdateProductMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if(product){
      setName(product.name);
      setBrand(product.brand);
      setCategory(product.category);
      setDescription(product.description);
      setPrice(product.price);
      setImage(product.image);
      setCountInStock(product.countInStock);
    }
  }, [product]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({
        productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      }).unwrap(); // NOTE: here we need to unwrap the Promise to catch any rejection in our catch block
      toast.success('Product updated');
      refetch();
      navigate('/admin/productlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  return (
    <>
      <Link to={'/admin/productlist'} className="btn btn-light my-3">Go Back</Link>
      <FormContainer>
        <h1>Edit Product</h1>
        { loadingUpdate && <Loader/>}

        {isLoading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" className="my-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
              type="name"
              placeholder="Enter Name"
              value={name}
              onChange={(e)=> setName(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId="brand" className="my-3">
              <Form.Label>Brand</Form.Label>
              <Form.Control
              type="text"
              placeholder="Enter Brand"
              value={brand}
              onChange={(e)=> setBrand(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId="description" className="my-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
              type="text"
              placeholder="Enter Description"
              value={description}
              onChange={(e)=> setDescription(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId="price" className="my-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
              type="number"
              placeholder="Enter Price"
              value={price}
              onChange={(e)=> setPrice(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId="category" className="my-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
              type="text"
              placeholder="Enter Category"
              value={category}
              onChange={(e)=> setCategory(e.target.value)}></Form.Control>
            </Form.Group>
            {/* Image placeholder  */}
            <Form.Group controlId="countInStock" className="my-3">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
              type="number"
              placeholder="Enter Count In Stock"
              value={countInStock}
              onChange={(e)=> setCountInStock(e.target.value)}></Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary" className="my-3">Update</Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default ProductEditScreen
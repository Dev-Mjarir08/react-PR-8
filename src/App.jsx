import React, { useEffect, useState } from 'react'
import { data, Route, Routes, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Add_Products from './pages/Add_Products'
import View_Products from './pages/View_Products'
import Login from './pages/Login'
import Register from './pages/Register'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import { toast, ToastContainer } from 'react-toastify'

const App = () => {

  const [product, setProduct] = useState({})
  const [list, setList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState({})
  const [category, setCategory] = useState([
    "Electronics",
    "Fashion",
    "Mobile",
    "Beauty",
    "Home",
    "Toys",
    "Food & Health ",
    "Sports",
    "Books & Meadia",
    "Furniture"
  ])
  const navigator = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setProduct({ ...product, [name]: value })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validation()) return

    if (editId != null) {
      let newList = [...list];

      newList = list.map((item) => {
        if (editId == item.id) {
          return product
        } else {
          return item;
        }
      });

      setList(newList);
      toast.success("data updated")
      

      localStorage.setItem(
        "products",
        JSON.stringify(newList)
      );

      setEditId(null);
    } else {
      const newList = [...list, { ...product, id: Date.now() }];

      setList(newList);
      setProduct({})
      toast.success("Product Added")

      localStorage.setItem(
        "products",
        JSON.stringify(newList)
      );
    }
  };

  const handleDelete = (id) => {
    const newList = list.filter(item => item.id != id)
    setList(newList)
    localStorage.setItem("products", JSON.stringify(newList))
    toast.warn("product Deleted")
  }

  const handleEdit = (id) => {
    const data = list.find(item => item.id == id)
    setProduct(data)
    setEditId(id)
    navigator('/add-products')
  }
  useEffect(() => {
    const oldData = JSON.parse(
      localStorage.getItem("products")
    );
    if (oldData) {
      setList(oldData);
    }
  }, []);

  const validation = () => {
    let error = {};

    if (!product.title)
      error.title = "Title is Required";

    if (!product.imgurl)
      error.imgurl = "Image URL is Required";

    if (!product.price)
      error.price = "Price is Required";

    if (!product.category)
      error.category = "Category is Required";

    if (!product.description)
      error.description = "Description is Required";

    setError(error);

    return Object.keys(error).length === 0;
  };

  return (

    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home list={list}/>} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/add-products' element={<Add_Products
          handleSubmit={handleSubmit}
          product={product}
          handleChange={handleChange}
          category={category}
          error={error}
          editId={editId}
        />} />
        <Route path='/view-products' element={<View_Products

          list={list}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          category={category}
        />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App

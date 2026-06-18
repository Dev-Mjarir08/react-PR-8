import React from 'react'

const Add_Products = ({ product, category, handleChange, handleSubmit, error,editId }) => {
    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <h2 className='text-center mb-5 mt-5'>{editId?"Edit Product": "Add Product"}</h2>
                    <div className="col-md-6">
                        <form action="" onSubmit={handleSubmit} method="post">
                            <div className="mb-3">
                                <label htmlFor="productName" className="form-label">
                                 Add Product
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="productName"
                                    placeholder="Enter product name"
                                    name='title'
                                    onChange={handleChange}
                                    value={product.title || ""}
                                />
                                  {error.title && (
                                    <small className="text-danger">
                                        {error.title}
                                    </small>
                                )}
                            </div>
                          


                            <div className="mb-3">
                                <label htmlFor="productPrice" className="form-label">
                                    Product Price
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="productPrice"
                                    placeholder="Enter product price"
                                    name='price'
                                    onChange={handleChange}
                                    value={product.price || ""}
                                />
                                 {error.price && (
                                    <small className="text-danger">
                                        {error.price}
                                    </small>
                                )}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">
                                    Category
                                </label>

                                <select
                                    name="category"
                                    className="form-select"
                                    value={product.category || ""}
                                    onChange={handleChange}
                                >
                                    <option value="">
                                        Select Category
                                    </option>

                                    {category?.map((item, index) => (
                                        <option
                                            key={index}
                                            value={item}
                                        >
                                            {item}
                                        </option>
                                    ))}
                                </select>
                                 {error.category && (
                                    <small className="text-danger">
                                        {error.category}
                                    </small>
                                )}

                            </div>

                            <div className="mb-3">
                                <label htmlFor="productImage" className="form-label">
                                    Product Image URL
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="productImage"
                                    placeholder="Enter image URL"
                                    name='imgurl'
                                    onChange={handleChange}
                                    value={product.imgurl || ""}
                                />
                                 {error.imgurl && (
                                    <small className="text-danger">
                                        {error.imgurl}
                                    </small>
                                )}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="productDescription" className="form-label">
                                    Description
                                </label>
                                <textarea
                                    className="form-control"
                                    id="productDescription"
                                    rows="3"
                                    placeholder="Enter product description"
                                    name='description'
                                    onChange={handleChange}
                                    value={product.description || ""}
                                ></textarea>
                                 {error.description && (
                                    <small className="text-danger">
                                        {error.description}
                                    </small>
                                )}
                            </div>

                            <button type="submit" className="btn btn-primary">
                               {
                                editId?"Update":"Add Product"
                               }
                            </button>
                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Add_Products

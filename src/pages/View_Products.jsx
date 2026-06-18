import React, { useEffect, useState } from 'react'

const View_Products = ({ list, handleEdit, handleDelete, category }) => {
  const [search, setSearch] = useState("")
  const [data, setData] = useState([])
  const [limit, setLimit] = useState(5)
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("")


  const firstIndex = (page - 1) * limit;
  const lastIndex = firstIndex + limit;
  const totalPages = Math.ceil(data.length / limit);

  const handleSearch = () => {
    const searchData = list.filter((value) => {
      if (value.title.toLowerCase().includes(search.toLowerCase()))
        return value;
    })
    setData(searchData)
  }

  const filterProduct = () => {
    let filterData = list.filter((item) =>
      item.category.toLowerCase().includes(filter.toLowerCase())
    );

    setData(filterData);
  };

  useEffect(() => {
    handleSearch();
  }, [search, filter, list]);

  return (
    <>
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="mb-0">Product List</h2>

          <div className=" d-flex  gap-5">
            <div className="col-md-6 d-flex gap-2">
              <button className="btn btn-primary">
                Search
              </button>
              <input
                type="text"
                className="form-control"
                placeholder="Search Product..."
                style={{ width: "250px" }}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

           <div className="col-md-6 d-flex gap-2">
             <button className="btn btn-secondary" onClick={filterProduct}>
              Filter
            </button>
            <select
              className="form-select"
              style={{ width: "200px" }}
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="">All Categories</option>

              {category.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
           </div>
          </div>
        </div>

        <table className="table table-bordered table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.slice(firstIndex, lastIndex).map((item, index) => {
                const { id, title, imgurl, price, category } = item;

                return (
                  <tr key={id}>
                    <td>{firstIndex + index + 1}</td>
                    <td>
                      <img
                        src={imgurl}
                        alt={title}
                        width="60"
                        height="60"
                      />
                    </td>
                    <td>{title}</td>
                    <td>{price}</td>
                    <td>{category}</td>
                    <td>
                      <button
                        onClick={() => handleEdit(id)}
                        className="btn btn-warning btn-sm me-2"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(id)}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="text-center fw-bold text-danger">
                  Data Not Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <nav>
          <ul className="pagination justify-content-end">
            <li className="page-item ">
              <button className={`page-link ${page <= 1 ? "disabled" : ""}`} onClick={() => page > 1 && setPage(page - 1)}>
                Previous
              </button>
            </li>
            {
              [...Array(totalPages)].map((_, index) => {
                return (
                  <li className={`page-item ${page === index + 1 ? "active" : ""}`}>
                    <button
                      className="page-link"
                      onClick={() => setPage(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                )
              })
            }

            <li className="page-item">
              <button className={`page-link ${page >= totalPages ? "disabled" : ""}`} onClick={() => setPage(page + 1)}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  )
}

export default View_Products

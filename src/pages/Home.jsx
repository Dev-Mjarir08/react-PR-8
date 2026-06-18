import React from 'react'

const Home = ({ list }) => {
    return (
        <>
            <div className="container">
                <div className="row mt-5 g-4">
                    {list.map((item) => {
                        const { id, imgurl, title, price, category, description } = item;

                        return (
                            <div className="col-lg-4 col-md-6" key={id}>
                                <div className="card h-100 shadow-sm border-0">

                                    <img
                                        src={imgurl}
                                        className="card-img-top"
                                        alt={title}
                                        style={{
                                            height: "220px",
                                            objectFit: "contain",
                                        }}
                                    />

                                    <div className="card-body d-flex flex-column">
                                        <div className="d-flex justify-content-center m-3">
                                            
                                        <span className="d-flex justify-content-center badge bg-success mb-2 w-50">
                                            {category}
                                        </span>
                                        </div>

                                        <h5 className="card-title">{title}</h5>

                                        <p className="card-text text-muted flex-grow-1">
                                            {description?.slice(0, 80)}...
                                        </p>

                                        <h5 className="text-success mb-3">
                                            ₹{price}
                                        </h5>

                                        <div className="d-flex gap-2 mt-auto">
                                            <button
                                                className="btn btn-warning w-50"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="btn btn-danger w-50"
                                            >
                                                Delete
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>


            </div>
        </>
    )
}

export default Home

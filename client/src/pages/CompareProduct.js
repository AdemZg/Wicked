import BreadCrumb from "../components/BreadCrumb"
import Colors from "../components/Colors";
import Meta from "../components/Meta";

const CompareProduct = () => {
  return (
    <div>
        <Meta title = 'Compare Products' />
        <BreadCrumb title='Compare Products'/>
        <div className="compare-product-wrapper py-5 home-wrapper-2">
            <div className="container-xxl">
                <div className="row">
                    <div className="col-3">
                        <div className="compare-product-card position-relative">
                            <img src="/images/cross.svg" alt="cross" className="position-absolute cross img-fluid" />
                            <div className="product-card-image">
                                <img src="/images/watch.jpg" alt="watch" />
                            </div>
                            <div className="compare-product-details">
                                <h5 className="title">HONOR T1 7.0 1GB RAM 8GB ROM 7 Inch With Wi-Fi +3G Tablet</h5>
                                <h6 className="price mb-3 mt-3">$100.0</h6>
                                <div className="product-detail">
                                    <h5 className="mb-0">Brand:</h5>
                                    <p>Havels</p>
                                </div>
                                <div className="product-detail">
                                    <h5 className="mb-0">Type:</h5>
                                    <p>Watch</p>
                                </div>
                                <div className="product-detail">
                                    <h5 className="mb-0">Availability:</h5>
                                    <p>In Stock</p>
                                </div>
                                <div className="product-detail">
                                    <h5 className="mb-0">Color:</h5>
                                    <Colors />
                                </div>
                                <div className="product-detail">
                                    <h5 className="mb-0">Size:</h5>
                                    <div className="d-flex gap-10">
                                        <p className="mb-0">S</p>
                                        <p className="mb-0">M</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="compare-product-card position-relative">
                            <img src="/images/cross.svg" alt="cross" className="position-absolute cross img-fluid" />
                            <div className="product-card-image">
                                <img src="/images/watch.jpg" alt="watch" />
                            </div>
                            <div className="compare-product-details">
                                <h5 className="title">HONOR T1 7.0 1GB RAM 8GB ROM 7 Inch With Wi-Fi +3G Tablet</h5>
                                <h6 className="price mb-3 mt-3">$100.0</h6>
                                <div className="product-detail">
                                    <h5 className="mb-0">Brand:</h5>
                                    <p>Havels</p>
                                </div>
                                <div className="product-detail">
                                    <h5 className="mb-0">Type:</h5>
                                    <p>Watch</p>
                                </div>
                                <div className="product-detail">
                                    <h5 className="mb-0">Availability:</h5>
                                    <p>In Stock</p>
                                </div>
                                <div className="product-detail">
                                    <h5 className="mb-0">Color:</h5>
                                    <Colors />
                                </div>
                                <div className="product-detail">
                                    <h5 className="mb-0">Size:</h5>
                                    <div className="d-flex gap-10">
                                        <p className="mb-0">S</p>
                                        <p className="mb-0">M</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CompareProduct
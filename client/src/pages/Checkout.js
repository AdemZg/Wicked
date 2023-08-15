import React, { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { BsArrowLeft } from "react-icons/bs"
import { useDispatch, useSelector } from 'react-redux'
import { createOrder, getUserCart } from '../features/user/userSlice'
import { useFormik } from 'formik'
import { object, string } from 'yup'
import { MdAddShoppingCart } from "react-icons/md"
import axios from 'axios'
import { config } from '../utils/baseUrl'


const Checkout = () => {
    const dispatch = useDispatch()
    const { userCart, user } = useSelector((state) => state.auth)
    const [totalAmount, setTotalAmount] = useState(null)
    const [shippingInfo, setShippingInfo] = useState(null)
    const [paymentInfo, setPaymentInfo] = useState({razorpayPaymentId:"",razorpayOrderId:""})
    const [cartProduct, setCartProduct] = useState([])
    useEffect(() => {
        if(user){
            dispatch(getUserCart())
        }
    }, [user])
    useEffect(() => {
        let sum = 0
        userCart?.map((product) => {
            sum = sum + (product.price * product.quantity)
        })
        setTotalAmount(sum)
    } ,[userCart])
    useEffect(() => {
        let items = []
        for(let i = 0; i <userCart?.length; i++) {
             items.push({
                product: userCart[i]?.productId?._id,
                quantity: userCart[i]?.quantity,
                color: userCart[i]?.color?._id,
                price: userCart[i]?.price
             })       
             setCartProduct(items)
        }
    },[])
    const formik = useFormik({
        initialValues: {
          country: '',
          firstName:'',
          lastName:'',
          address: '',
          other:'',
          city: '',
          state:'',
          pincode:''
        },
        validationSchema: object({
          country: string().required('Country is required'),
          firstName: string().required('First Name is required'),
          lastName: string().required('Last Name is required'),
          address: string().required('Address is required'),
          other: string().required('Other is required'),
          city: string().required('City is required'),
          state: string().required('State is required'),
          pincode: string().required('ZipCode is required')
        }),
        onSubmit: values => {
          setShippingInfo(values)
          setTimeout(() => {
            checkoutHandler()
          },300)
        },
      })
      const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement('script')
            script.src=src
            script.onload = () => {
                resolve(true)
            }
            script.onerror = () => {
                resolve(false)
            }
            document.body.appendChild(script)
        })
      }
      const checkoutHandler = async () => {
        const response = await loadScript("https://checkout.razorpay.com/v1/checkout.js")
        if(!response){
            alert("Razorpay SDK failed to Load")
            return
        }
        try{
            const result = await axios.post("http://localhost:5000/api/user/order/checkout", { amount: totalAmount + 10 }, config)
        const { amount, id: order_id, currency } = result.data.order
        const options = {
            key: "rzp_test_vblEgzparscRbJ", // Enter the Key ID generated from the Dashboard
            amount: amount,
            currency: currency,
            name: "Adem Zaghouane",
            description: "Test Transaction",
            order_id: order_id,
            handler: async function (response) {
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                };
                const result = await axios.post("http://localhost:5000/api/user/order/payment-verification", data, config);
                setPaymentInfo({ razorpayPaymentId: response.razorpay_payment_id, razorpayOrderId: response.razorpay_order_id })
                dispatch(createOrder({totalPrice: totalAmount, totalPriceAfterDiscount: totalAmount, orderItems: cartProduct, paymentInfo,shippingInfo}))
            },
            prefill: {
                name: "Adem Zaghouane",
                email: "adem.zaghouane@polytechnicien.tn",
                contact: "9999999999",
            },
            notes: {
                address: "Wicked Transform 24 Street",
            },
            theme: {
                color: "#FEBD69",
            },
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open()
        }
        catch(err){
            console.log(err);
        }
      }
  return (
    <div className='checout-wrapper py-5 home-wrapper-2'>
        <div className="container-xxl">
            <div className="row">
                <div className="col-7">
                <Link style={{fontSize:'15px', color:'#777777', fontWeight:'600'}} to="/product" className='d-flex gap-10 align-items-center mb-3 hover-effect'>
                    <MdAddShoppingCart className='fs-4' />
                    Continue Shopping
                </Link>
                    <div className="checkout-left-data">
                        <h3 className='website-name'>Clip it & Ship it</h3>
                        <nav style={{"--bs-breadcrumb-divider": ">"}} aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link className='text-dark total-price' to='/cart'>Cart</Link></li>
                                &nbsp; /
                                <li className="breadcrumb-item total-price active" aria-current="page">Information</li>
                                &nbsp; / 
                                <li className="breadcrumb-item total-price active" aria-current="page">Shipping</li>
                                &nbsp; /
                                <li className="breadcrumb-item total-price active" aria-current="page">Payment</li>
                            </ol>
                        </nav>
                        <h4 className="title">Contact information</h4>
                        <p style={{fontSize:'15px', color:'#777777', fontWeight:'600'}} className="user-details">{user?.firstname} {user?.lastname} ({user?.email})</p>
                        <h4 className='mb-3'>Shipping Address</h4>
                        <form onSubmit={formik.handleSubmit} className='d-flex gap-15 flex-wrap justify-content-between'>
                            <div className='w-100'>
                                <select value={formik.values.country} onChange={formik.handleChange("country")} name="country"  className='form-control form-select'>
                                    <option disabled value="">Select Country</option>
                                    <option value="tunisia">Tunisia</option>
                                </select>
                                <div style={{fontSize:'13px', color:'red'}} className="error">{formik.touched.country && formik.errors.country ? (<div>{formik.errors.country}</div>) : null}</div>
                            </div>
                            <div className='flex-grow-1'>
                                <input value={formik.values.firstName} onChange={formik.handleChange("firstName")} name="firstName" placeholder='First Name' type="text" className="form-control" />
                                <div style={{fontSize:'13px', color:'red'}} className="error">{formik.touched.firstName && formik.errors.firstName ? (<div>{formik.errors.firstName}</div>) : null}</div>
                            </div>
                            <div className='flex-grow-1'>
                                <input value={formik.values.lastName} onChange={formik.handleChange("lastName")} name="lastName" placeholder='Last Name' type="text" className="form-control" />
                                <div style={{fontSize:'13px', color:'red'}} className="error">{formik.touched.lastName && formik.errors.lastName ? (<div>{formik.errors.lastName}</div>) : null}</div>
                            </div>
                            <div className='w-100'>
                                <input value={formik.values.address} onChange={formik.handleChange("address")} name="address" placeholder='Address' type="text" className="form-control" />
                                <div style={{fontSize:'13px', color:'red'}} className="error">{formik.touched.address && formik.errors.address ? (<div>{formik.errors.address}</div>) : null}</div>
                            </div>
                            <div className='w-100'>
                                <input value={formik.values.other} onChange={formik.handleChange("other")} name="other" placeholder='Apartement, Suite etc' type="text" className="form-control" />
                                <div style={{fontSize:'13px', color:'red'}} className="error">{formik.touched.other && formik.errors.other ? (<div>{formik.errors.other}</div>) : null}</div>
                            </div>
                            <div className='flex-grow-1'>
                                <input value={formik.values.city} onChange={formik.handleChange("city")} name="city" placeholder='City' type="text" className="form-control" />
                                <div style={{fontSize:'13px', color:'red'}} className="error">{formik.touched.city && formik.errors.city ? (<div>{formik.errors.city}</div>) : null}</div>
                            </div>
                            <div className='flex-grow-1'>
                                <select value={formik.values.state} onChange={formik.handleChange("state")} name="state" className='form-control form-select'>
                                    <option disabled value="">Select State</option>
                                    <option value="sousse">Sousse</option>
                                </select>
                                <div style={{fontSize:'13px', color:'red'}} className="error">{formik.touched.state && formik.errors.state ? (<div>{formik.errors.state}</div>) : null}</div>
                            </div>
                            <div className='flex-grow-1'>
                                <input value={formik.values.pincode} onChange={formik.handleChange("pincode")} name="pincode" placeholder='Zipcode' type="text" className="form-control" />
                                <div style={{fontSize:'13px', color:'red'}} className="error">{formik.touched.pincode && formik.errors.pincode ? (<div>{formik.errors.pincode}</div>) : null}</div>
                            </div>
                            <div className="w-100 mt-3">
                                <div className="d-flex justify-content-between align-items-center">
                                    <Link style={{fontSize:'15px', color:'#777777', fontWeight:'600'}} to="/cart" className='d-flex gap-10 align-items-center hover-effect'>
                                        <BsArrowLeft className='fs-4' />
                                        Return To Cart
                                    </Link>
                                    <button className='button border-0' type='submit'>Place Order</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col-5">
                    <div className='border-bottom py-4'>
                        {userCart && userCart?.map((product, index) => (
                            <div style={{height:'80px'}} key={index} className="d-flex gap-30 align-items-center order-section">
                                <div className='w-75 d-flex gap-10'>
                                    <div style={{width:'50px', height:'50px'}} className='position-relative'>
                                        <span style={{top:"-8px", right:'-5px', color:"black"}} className='badge bg-warning rounded-circle position-absolute'>{product?.quantity}</span>
                                        <img width={50} height={50} src={product?.productId?.images[0]?.url} alt="" />
                                    </div>
                                    <div>
                                        <h5 className="total-price">{product?.productId?.title}</h5>
                                    </div>
                                </div>
                                <div className='flex-grow-1'>
                                    <h5 className='total'>$ {product?.quantity * product?.price}</h5>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='border-bottom py-4'>
                        <div className='d-flex justify-content-between align-items-center'>
                            <p className='total-price'>Subtotal</p>
                            <p className='total-price'>$ {totalAmount ? totalAmount : "0"}</p>
                        </div>
                        <div className='d-flex justify-content-between align-items-center'>
                            <p className='mb-0 total-price'>Shipping</p>
                            <p className='mb-0 total-price'>$ 10</p>
                        </div>
                    </div>
                    <div className='d-flex justify-content-between align-items-center py-4'>
                        <h4>Total</h4>
                        <h4>$ {totalAmount ? totalAmount+10 : "0"}</h4>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Checkout
import { Link } from "react-router-dom"
import {BsLinkedin,BsGithub,BsYoutube,BsInstagram} from 'react-icons/bs'


const Footer = () => {
  return (
    <>
    <footer className="py-4">
      <div className="container-xxl">
        <div className="row align-items-center">
          <div className="col-5">
            <div className="footer-top-data d-flex align-items-center gap-30">
              <img src="/images/newsletter.png" alt="newsletter" />
              <h2 className="mb-0 text-white"> Sign up doe Newsletter</h2>
            </div>
          </div>
          <div className="col-7">
          <div className="input-group">
              <input type="text" className="form-control" placeholder="Your email adress." aria-label="Search Product Here..." aria-describedby="basic-addon2" />
              <span className="input-group-text" id="basic-addon2">Subscribe</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
    <footer className="footer-middle py-4">
      <div className="container-xxl">
        <div className="row">
          <div className="col-4">
            <h4 className="text-white mb-4">Contact us</h4>
            <div>
              <address className="text-white fs-6">HNO : 26 lake fake Villbr <br />PinCode: 98984</address>
              <Link className="mt-3 mb-3 text-white d-block">tel:+216 98489156</Link>
              <Link className="mt-3 mb-3 text-white d-block">testing@gmail.com</Link>
            </div>
            <div className="social-icons d-flex gap-30 align-items-center mt-5">
              <Link><BsGithub className="text-white fs-4"/></Link>
              <Link><BsLinkedin className="text-white fs-4"/></Link>
              <Link><BsInstagram className="text-white fs-4"/></Link>
              <Link><BsYoutube className="text-white fs-4"/></Link>
            </div>
          </div>
          <div className="col-3">
            <h4 className="text-white mb-4">Information</h4>
            <div className="footer-links d-flex flex-column">
              <Link to='/privacy-policy' className='text-white py-2 mb-1'>Privacy Policy</Link>
              <Link to='/refund-policy' className='text-white py-2 mb-1'>Refund Policy</Link>
              <Link to='/shipping-policy' className='text-white py-2 mb-1'>Shipping Policy</Link>
              <Link to='/terms-conditions' className='text-white py-2 mb-1'>Terms & Conditions</Link>
              <Link to='/blogs' className='text-white py-2 mb-1'>Blogs</Link>
            </div>
          </div>
          <div className="col-3">
            <h4 className="text-white mb-4">Account</h4>
            <div className="footer-links d-flex flex-column">
              <Link className='text-white py-2 mb-1'>About us</Link>
              <Link className='text-white py-2 mb-1'>Faq</Link>
              <Link className='text-white py-2 mb-1'>Contact</Link>
            </div>
          </div>
          <div className="col-2">
            <h4 className="text-white mb-4">Quick links</h4>
            <div className="footer-links d-flex flex-column">
              <Link className='text-white py-2 mb-1'>Laptops</Link>
              <Link className='text-white py-2 mb-1'>Headphones</Link>
              <Link className='text-white py-2 mb-1'>Tablets</Link>
              <Link className='text-white py-2 mb-1'>Watch</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
    <footer className="py-4">
      <div className="container-xxl">
        <div className="row">
          <div className="col-12">
            <p className="text-center text-white mb-0">&copy; {new  Date().getFullYear()}; Powered by Adem</p>
          </div>
        </div>
      </div>
    </footer>
    </>
  )
}

export default Footer
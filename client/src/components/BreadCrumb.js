import { Link } from "react-router-dom"


const BreadCrumb = (props) => {
    const {title} = props
  return (
    <div className="breadcrumb">
        <div className="container-xxl">
            <div className="row ">
                <div className="col-12 ">
                    <p className="mb-0 pt-3"><Link className='text-dark' to='/'>Home&nbsp;/&nbsp;</Link>{title}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default BreadCrumb
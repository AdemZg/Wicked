import { useState } from "react"
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Colors = ({colors,setColor}) => {
  const [active, setActive] = useState(null)
  return (
    <div>
        <ul className="colors ps-0">
          {colors && colors?.map((color, i) => (
            <li onClick={(e) => {
              setColor(color?._id)
              setActive(color?._id)
            }} 
              style={{backgroundColor: color?.title, cursor:'pointer'}}  key={i}>
            {active === color?._id && (
              <CheckCircleIcon style={{padding:'6px', color:'white',marginLeft:'0.5px'}}/>
            )}
            </li>
          ))}
        </ul>
    </div>
  )
}

export default Colors
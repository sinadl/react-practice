import Button from './button/Button'
import { useNavigate } from "react-router-dom"

export default function ButtonBack() {
  const navigate = useNavigate()
  return (<Button type='back'         
  onClick={(e)=>{
    e.preventDefault();
    navigate(-1);
  }} >Back</Button>)
}

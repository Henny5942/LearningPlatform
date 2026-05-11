import React, { useEffect ,useState} from 'react'
import SingleSubCategy from './SingleSubCategy'
import axios from 'axios'

const AllSubCategories = ({category}) => {
  const [subCategories, setSubCategories] = useState([])
    try{
    const fetchCategories = async ()=>{
        const {data}= await axios.get("http://localhost:2500/api/subCategories/")
        if(data)
            setSubCategories(data.filter(sub=>sub.category_id===category._id))
    }
    useEffect(()=>{
        fetchCategories()
    },[])
    }catch(err){
        console.error(err);
        alert("שגיאה בהתחברות לשרת");
    }
  return (
    <div>
      {subCategories.map(subCategory => (
        <SingleSubCategy key={subCategory._id} subCategory={subCategory} />
      ))}
    </div>
  )
}

export default AllSubCategories
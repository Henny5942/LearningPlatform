import { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext';
import HistoryItem from '../components/history/HistoryItem';

const History = () => {
   const { token } = useContext(AuthContext);
  const [history, setHistory] = useState([])
  useEffect(() => {
    const fetchHistory = async () => {
        try {
            // שליפת כל הprompts של המשתמש הנוכחי
            const { data } = await axios.get("http://localhost:2500/api/prompts/user/", {
                headers: { Authorization: `Bearer ${token}` } //שליחת הטוקן
            });
            if (data) 
              setHistory(data);

        } catch (err) {
            console.error("Error fetching history:", err);
        }
    };

    if (token) {
        fetchHistory();
    }
  }, [token]);
  return (
    <div>
      {history.length!==0 && <h2>השיעורים שלי:</h2>}
      {history.map(prompt=>(<HistoryItem key={prompt._id} item={prompt} />))}
      {history.length===0 && <h2 style={{display:'flex' ,justifyContent: 'center'}}>לא נמצאו שיעורים</h2>}
    </div>
  )
}

export default History
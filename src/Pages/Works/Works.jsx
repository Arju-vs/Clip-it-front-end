import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import './Works.css';
import { getOneWorkAPI } from "../../../services/allAPI";
import Navbar from '../../Components/Landing/Navbar'

const WorkDetails = () => {
  const { id } = useParams();
  const [work, setWork] = useState(null);

  useEffect(() => {
    const fetchWork = async () => {
      try {
        const res = await getOneWorkAPI(id);
        setWork(res.data);
      } catch (err) {
        console.error("Failed to fetch work:", err);
      }
    };
    fetchWork();
  }, [id]);

  if (!work) return <div className="text-light text-center mt-5">Loading...</div>;

  return (
    <>
    <Navbar />
      <div className="work-details-container section-dark">
        <h1 className="work-title text-center">{work.title}</h1>
  
        {work.image && (
          <div className="text-center my-4">
            <img
              src={work.image}
              alt={work.title}
              className="img-fluid"
              style={{ maxHeight: "400px", borderRadius: "12px" }}
            />
          </div>
        )}
  
        <div className="work-content text-light px-3 px-md-5 mb-5" style={{ fontSize: "1.1rem", lineHeight: "1.8" }}>
          {work.content}
        </div>
      </div>
    </>
  )
};

export default WorkDetails;

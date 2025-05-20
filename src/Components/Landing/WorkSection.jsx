
import { getWorksAPI } from '../../../services/allAPI';
import './WorksSection.css';
import { useEffect, useState, } from 'react';
import { Link, useNavigate } from 'react-router-dom'
const WorkSection = () => {
  const [works, setWorks] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    fetchWorks();
  }, []);

  const fetchWorks = async () => {
    try {
      const response = await getWorksAPI();
      setWorks(response.data); // assuming response.data is an array
    } catch (error) {
      console.error("Failed to fetch works", error);
    }
  };

  return (
    <section className="section-dark">
      <h2 className="section-title">What's Special here?</h2>
      <div className="card-grid">
        {
          works.length > 0 ? (
            works.map((work, index) => (
              <div className="card-glow" key={work._id || index}>
                <h3>{work.title}</h3>
              <p>
                  {
                    work.content.length > 50 ? (
                      <>
                        {work.content.slice(0, 50)}
                        <Link
                          to={`/works/${work._id}`}
                          className="show-more-inline"
                        >
                          ...Show more
                        </Link>
                      </>
                    ) : work.content
                  }
                </p>
                {
                  work.image &&
                  <img src={work.image} alt={work.title} className="img-fluid my-2" style={{ borderRadius: "10px", maxHeight: "150px" }} />
                }
              </div>
            ))
          ) : (
            <p className="text-light">No work available</p>
          )
        }
      </div>
    </section>
  );
};

export default WorkSection;

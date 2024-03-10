import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProjectDetails = () => {
    const [projectData, setProjectData] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/Project/getProjectDetails/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    console.log(data.projectDetails[0], "Received project details"); // Log received data
                    if (data.projectDetails && data.projectDetails.length > 0) {
                        setProjectData(data.projectDetails[0]);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();

        return () => {
            // Cleanup function if necessary
        };
    }, [id]);

    return (
        <div>
            {projectData && projectData.name}
            <div>
                {projectData && projectData.teamMembers && projectData.teamMembers.map((member, index) => (
                    <div key={index}>{member}</div>
                ))}
            </div>
        </div>
    );
};

export default ProjectDetails;

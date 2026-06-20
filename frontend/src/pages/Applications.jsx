import Navbar from "../components/Navbar";
import {
    useState,
    useEffect
}
from "react";

import {
    getApplications,
    createApplication,
    deleteApplication,
    updateApplication
}
from "../services/applicationService";

import {
    getCompanies
}
from "../services/companyService";

function Applications() {

    const [applications,setApplications]=useState([]);
    const [companies,setCompanies]=useState([]);
    const [companyId,setCompanyId]=useState("");
    const [status,setStatus]=useState("Applied");
    const [editingId,setEditingId]=useState(null);

    const fetchApplications =
    async () => {

        try {

            const data =
                await getApplications({
            status: status
        });

            setApplications(data);

        } catch (error) {

            console.log(error);

        }

    };

    const fetchCompanies =
async () => {

    try {

        const data =
            await getCompanies();

        setCompanies(
            data.companies
        );

    } catch (error) {

        console.log(error);

    }

};

const handleAddApplication =
async () => {

    try {

        const applicationData = {

            company_id:
                companyId,

            status:
                status

        };

        await createApplication(
            applicationData
        );

        alert(
            "Application Added"
        );

        fetchApplications();

    } catch (error) {

        console.log(error);

    }

};
const handleDeleteApplication =
async (id) => {

    try {

        await deleteApplication(id);

        alert(
            "Application Deleted"
        );

        fetchApplications();

    } catch (error) {

        console.log(error);

    }

};

const handleUpdateApplication =
async () => {

    try {

        await updateApplication(
            editingId,
            {
                status
            }
        );

        alert(
            "Application Updated"
        );

        setEditingId(null);

        fetchApplications();

    } catch (error) {

        console.log(error);

    }

};

    useEffect(() => {

    fetchApplications();
    fetchCompanies();

    }, [status]);
    console.log(companies);
    return (
    <>
        <Navbar />

        <div className="container">

            <div className="page-header">

                <h1>
                    Applications
                </h1>

                <button
                    className="primary-btn"
                    onClick={fetchApplications}
                >
                    Refresh
                </button>

            </div>

            <div className="application-filter">

                <select
                    value={status}
                    onChange={(e) =>
                        setStatus(e.target.value)
                    }
                >
                    <option value="">
                        All Statuses
                    </option>

                    <option value="Applied">
                        Applied
                    </option>

                    <option value="OA Cleared">
                        OA Cleared
                    </option>

                    <option value="Interview Scheduled">
                        Interview Scheduled
                    </option>

                    <option value="Rejected">
                        Rejected
                    </option>

                    <option value="Selected">
                        Selected
                    </option>

                </select>

                <button
                    className="primary-btn"
                    onClick={fetchApplications}
                >
                    Filter
                </button>

            </div>

            <div className="application-form">

                <h2>
                    {
                        editingId
                            ? "Update Application"
                            : "Add Application"
                    }
                </h2>

                <select
                    value={companyId}
                    onChange={(e) =>
                        setCompanyId(e.target.value)
                    }
                >

                    <option value="">
                        Select Company
                    </option>

                    {
                        companies.map(
                            (company) => (

                                <option
                                    key={company.id}
                                    value={company.id}
                                >
                                    {company.company_name}
                                </option>

                            )
                        )
                    }

                </select>

                <select
                    value={status}
                    onChange={(e) =>
                        setStatus(e.target.value)
                    }
                >

                    <option>
                        Applied
                    </option>

                    <option>
                        OA Cleared
                    </option>

                    <option>
                        Interview Scheduled
                    </option>

                    <option>
                        Rejected
                    </option>

                    <option>
                        Selected
                    </option>

                </select>

                {
                    editingId ? (

                        <button
                            className="update-btn"
                            onClick={
                                handleUpdateApplication
                            }
                        >
                            Update Application
                        </button>

                    ) : (

                        <button
                            className="primary-btn"
                            onClick={
                                handleAddApplication
                            }
                        >
                            Add Application
                        </button>

                    )
                }

            </div>

            <table className="companies-table">

                <thead>

                    <tr>

                        <th>Company</th>

                        <th>Status</th>

                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {
                        
                        applications.map(
                            (application) => (

                                <tr
                                    key={application.id}
                                >

                                    <td>
                                        {application.company_name}
                                    </td>

                                    <td>

                                        <span
                                            className={`status-badge ${application.status
                                                .toLowerCase()
                                                .replaceAll(" ", "-")
                                            }`}
                                        >
                                            {application.status}
                                        </span>

                                    </td>

                                    <td>

                                        <button
                                            className="edit-btn"
                                            onClick={() => {

                                                setEditingId(
                                                    application.id
                                                );

                                                setStatus(
                                                    application.status
                                                );

                                            }}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="delete-btn"
                                            onClick={() =>
                                                handleDeleteApplication(
                                                    application.id
                                                )
                                            }
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            )
                        )
                    }

                </tbody>

            </table>

        </div>

    </>
);

}

export default Applications;
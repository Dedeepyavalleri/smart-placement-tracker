import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";

import { getCompanies,addCompany, deleteCompany,updateCompany }
from "../services/companyService";

import { toast } from "react-toastify";
import Footer from "../components/Footer";

function Companies() {

    const [companies, setCompanies] =
        useState([]);

    const [companyName, setCompanyName] = useState("");
    const [role, setRole] = useState("");
    const [packageValue, setPackageValue] = useState("");
    const [deadline, setDeadline] = useState("");
    const [editingId, setEditingId] =useState(null);
    const [search, setSearch] = useState("");

    const fetchCompanies =
        async () => {

            try {

                const data =
                    await getCompanies(search);
                
                console.log(data);

                setCompanies(data.companies);

            } catch (error) {

                console.log(error);

            }

        };
    const handleAddCompany = async () => {

    try {

        const companyData = {
            company_name: companyName,
            role,
            package: packageValue,
            deadline
        };

        await addCompany(companyData);

        toast.success("Company Added Successfully");

        fetchCompanies();

    } catch (error) {

        console.log(error);
        toast.error("Failed to Add Company");

    }

};

const handleDelete = async (id) => {

    try {

        await deleteCompany(id);

        toast.success("Company Deleted Successfully");

        fetchCompanies();

    } catch (error) {

        console.log(error);
        toast.error("Failed to delete Company");

    }

};

const handleUpdateCompany =
    async () => {

        try {

            const companyData = {

                company_name:
                    companyName,

                role,

                package:
                    packageValue,

                deadline

            };

            await updateCompany(
                editingId,
                companyData
            );

            toast.success("Company Updated Successfully");

            setEditingId(null);

            fetchCompanies();

        } catch (error) {

            console.log(error);
            toast.error("Failed to update Company");

        }

    };

    useEffect(() => {

        fetchCompanies();

    }, [search]);

    const getDaysRemaining = (deadline) => {

    const today =
        new Date();

    const endDate =
        new Date(deadline);

    const diff =
        endDate - today;

    return Math.ceil(
        diff /
        (1000 * 60 * 60 * 24)
    );

};

const getDeadlineClass =
    (days) => {

        if(days <= 7){

            return "deadline-red";

        }

        if(days <= 15){

            return "deadline-orange";

        }

        return "deadline-green";

};

const handleEditCompany = (company) => {

    setEditingId(company.id);

    setCompanyName(
        company.company_name
    );

    setRole(
        company.role
    );

    setPackageValue(
        company.package
    );

    setDeadline(
        company.deadline.split("T")[0]
    );

};

    return (
    <>
        <Navbar />

        <div className="container">

            <div className="page-header">

                <h1>Companies</h1>

                <button
                    className="primary-btn"
                    onClick={fetchCompanies}
                >
                    Refresh
                </button>

            </div>

            <input
                className="search-input"
                type="text"
                placeholder="Search company..."
                value={search}
                onChange={(e) =>
                    setSearch(e.target.value)
                }
            />

            <div className="company-form">

                <h2>
                    {
                        editingId
                            ? "Update Company"
                            : "Add Company"
                    }
                </h2>

                <input
                    type="text"
                    placeholder="Company Name"
                    value={companyName}
                    onChange={(e) =>
                        setCompanyName(e.target.value)
                    }
                />

                <input
                    type="text"
                    placeholder="Role"
                    value={role}
                    onChange={(e) =>
                        setRole(e.target.value)
                    }
                />

                <input
                    type="text"
                    placeholder="Package"
                    value={packageValue}
                    onChange={(e) =>
                        setPackageValue(e.target.value)
                    }
                />

                <input
                    type="date"
                    value={deadline}
                    onChange={(e) =>
                        setDeadline(e.target.value)
                    }
                />

                {
                    editingId ? (
                        <button
                            className="update-btn"
                            onClick={handleUpdateCompany}
                        >
                            Update Company
                        </button>
                    ) : (
                        <button
                            className="primary-btn"
                            onClick={handleAddCompany}
                        >
                            Add Company
                        </button>
                    )
                }

            </div>

            <table className="companies-table">

                <thead>

                    <tr>

                        <th>Company</th>

                        <th>Role</th>

                        <th>Package</th>

                        <th>Deadline</th>

                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {
                        companies.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="5"
                                    style={{
                                        textAlign: "center",
                                        padding: "30px"
                                    }}
                                >
                                    No Companies Found
                                </td>

                            </tr>

                        ) : (

                            companies.map(
                                (company) => (

                                    <tr key={company.id}>

                                        <td>
                                            {company.company_name}
                                        </td>

                                        <td>
                                            {company.role}
                                        </td>

                                        <td>
                                            {company.package}
                                        </td>

                                        <td>

                                            <span
                                                className={
                                                    getDeadlineClass(
                                                        getDaysRemaining(
                                                            company.deadline
                                                        )
                                                    )
                                                }
                                            >

                                                {
                                                    getDaysRemaining(
                                                        company.deadline
                                                    )
                                                } Days Left

                                            </span>

                                        </td>

                                        <td>

                                            <button
                                                className="edit-btn"
                                                onClick={() =>
                                                    handleEditCompany(
                                                        company
                                                    )
                                                }
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="delete-btn"
                                                onClick={() =>
                                                    handleDelete(
                                                        company.id
                                                    )
                                                }
                                            >
                                                Delete
                                            </button>

                                        </td>

                                    </tr>

                                )
                            )

                        )
                    }

                </tbody>

            </table>

        </div>

        <Footer />

    </>
);
}

export default Companies;

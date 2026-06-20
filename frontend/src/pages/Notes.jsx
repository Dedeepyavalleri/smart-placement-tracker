import Navbar from "../components/Navbar";
import {
    useState,
    useEffect
}
from "react";

import {
    getNotes,
    createNote,
    deleteNote,
    updateNote
}
from "../services/noteService";
import Footer from "../components/Footer";

function Notes() {

    const [notes,setNotes]=useState([]);
    const [title,setTitle]=useState("");
    const [content,setContent]=useState("");
    const [editingId,setEditingId]=useState(null);

    const fetchNotes =
    async () => {

        try {

            const data =
                await getNotes();

            setNotes(data);

        } catch (error) {

            console.log(error);

        }

    };

    const handleAddNote =
async () => {

    try {

        await createNote({

            title,
            content

        });

        alert(
            "Note Added"
        );

        setTitle("");
        setContent("");

        fetchNotes();

    } catch (error) {

        console.log(error);

    }

};

const handleDeleteNote =
async (id) => {

    try {

        await deleteNote(id);

        alert(
            "Note Deleted"
        );

        fetchNotes();

    } catch (error) {

        console.log(error);

    }

};

const handleUpdateNote =
async () => {

    try {

        await updateNote(
            editingId,
            {
                title,
                content
            }
        );

        alert(
            "Note Updated"
        );

        setEditingId(null);

        setTitle("");

        setContent("");

        fetchNotes();

    } catch (error) {

        console.log(error);

    }

};

    useEffect(() => {

        fetchNotes();

    }, []);

    return (
    <>
        <Navbar />

        <div className="container">

            <div className="page-header">

                <h1>
                    Notes
                </h1>

            </div>

            <div className="note-form">

                <h2>
                    {
                        editingId
                            ? "Update Note"
                            : "Add Note"
                    }
                </h2>

                <input
                    type="text"
                    placeholder="Enter Title"
                    value={title}
                    onChange={(e) =>
                        setTitle(e.target.value)
                    }
                />

                <textarea
                    rows="5"
                    placeholder="Enter Content"
                    value={content}
                    onChange={(e) =>
                        setContent(e.target.value)
                    }
                />

                {
                    editingId ? (

                        <button
                            className="update-btn"
                            onClick={
                                handleUpdateNote
                            }
                        >
                            Update Note
                        </button>

                    ) : (

                        <button
                            className="primary-btn"
                            onClick={
                                handleAddNote
                            }
                        >
                            Add Note
                        </button>

                    )
                }

            </div>

            <div className="notes-grid">

                {
                    notes.length === 0 ?

    (
        <div className="empty-state">

            <h3>
                No Notes Available
            </h3>

            <p>
                Create your first note.
            </p>

        </div>
    )

    :
                    notes.map(
                        (note) => (

                            <div
                                key={note.id}
                                className="note-card"
                            >

                                <h3>
                                    {note.title}
                                </h3>

                                <p>
                                    {note.content}
                                </p>

                                <div className="note-actions">

                                    <button
                                        className="edit-btn"
                                        onClick={() => {

                                            setEditingId(
                                                note.id
                                            );

                                            setTitle(
                                                note.title
                                            );

                                            setContent(
                                                note.content
                                            );

                                        }}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="delete-btn"
                                        onClick={() =>
                                            handleDeleteNote(
                                                note.id
                                            )
                                        }
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        )
                    )
                }

            </div>

        </div>
        <Footer />

    </>
);

}

export default Notes;
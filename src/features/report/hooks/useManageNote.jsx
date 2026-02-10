import { useState } from "react";
import { addNote, deleteNote } from '../../../services/noteService';
import toast from "react-hot-toast";

export default function useManageNote(type) {

    const [newNote, setNewNote] = useState('');

    const handleAddNote = async (text, setNotes) => {
        try {
            const payLoad = {};
            payLoad.type = type;
            payLoad.text = text;
            const res = await addNote(payLoad);
            console.log(res)
            if (res.success) {
                toast.success(`${type} added successfully!`);
                setNotes((notes) => [...notes, res.data]);
                setNewNote('')
            }
        } catch (err) {
            console.error("Failed to add report:", err);
            const message = err?.response?.data?.message || err?.message || "Failed to add report";
            toast.error(message);
        }
    };

    const handleDeleteNote = async (nId, setNotes) => {
        try {
            const res = await deleteNote(nId);
            if (res.success) {
                toast.success(`${type} note deleted successfully!`);
                setNotes((notes) =>
                    notes.filter((note) => note._id !== nId)
                );
            }
        } catch (err) {
            console.error("Failed to add report:", err);
            const message = err?.response?.data?.message || err?.message || "Failed to add report";
            toast.error(message);
        }
    }

    return {
        newNote,
        setNewNote,
        handleAddNote,
        handleDeleteNote
    }
}
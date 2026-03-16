import { useState } from "react";

function CustomDesignationSelect({
    designation = [],
    setDesgn,
    onDelete,
    setValue,
    name = "designation"
}) {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState("");

    const handleSelect = (item) => {
        setSelected(item.name);
        setOpen(false);

        if (setValue) {
            setValue(name, item.name);
        }
    };

    const handleDelete = (e, id) => {
        e.stopPropagation();
        onDelete && onDelete(id, setDesgn);
        setSelected("");
        setOpen(false);
    };

    return (
        <div className="relative w-full max-w-lg">
            <div
                onClick={() => setOpen((prev) => !prev)}
                className="border border-gray-300 rounded-md px-4 py-2 bg-white cursor-pointer"
            >
                {selected || "Select designation"}
            </div>

            {open && (
                <div className="absolute w-full bg-white border border-gray-300 rounded-md mt-1 shadow z-10">
                    {designation?.length === 0 ? (
                        <div className="px-3 py-2 text-gray-500 text-sm">
                            No designation found. Add designation.
                        </div>
                    ) : (
                        designation?.map((each) => (
                            <div
                                key={each._id}
                                className="flex justify-between items-center px-3 py-2 hover:bg-gray-100"
                            >
                                <span
                                    onClick={() => handleSelect(each)}
                                    className="flex-1 cursor-pointer"
                                >
                                    {each.name}
                                </span>

                                <button
                                    type="button"
                                    onClick={(e) => handleDelete(e, each._id)}
                                    className="text-red-500 font-bold ml-2"
                                >
                                    ✕
                                </button>
                            </div>
                        ))
                    )}

                </div>
            )}
        </div>
    );
}

export default CustomDesignationSelect;
import React, { useMemo } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import Select from 'react-select';
import { Trash2, PlusCircle, Tag, Plus } from 'lucide-react';
import useFetch from '../../../hooks/useFetch';
import useManageNote from '../hooks/useManageNote';

function ReportItems({
    fieldName,
    type,
    valueOptions = []
}) {
    const { control, setValue, watch } = useFormContext();

    /* FETCH NOTES */
    const { data: notes = [], setData: setNotes } = useFetch('/note', {
        params: { type }
    });

    /* NOTE MANAGEMENT */
    const { newNote, setNewNote, handleAddNote } = useManageNote(type);

    /* FIELD ARRAY */
    const { fields, append, remove } = useFieldArray({
        control,
        name: fieldName
    });

    /* QUICK NOTE OPTIONS */
    const noteOptions = useMemo(
        () =>
            notes.map(note => ({
                label: note.text,
                value: note.text
            })),
        [notes]
    );

    /* METRIC OPTIONS */
    const metricOptions = useMemo(
        () =>
            valueOptions.map(opt => ({
                label: opt.label,
                value: opt.value
            })),
        [valueOptions]
    );

    /* HANDLERS */
    const handleSelectNote = (selected, index) => {
        setValue(`${fieldName}.${index}.content`, selected?.value || '');
    };

    const handleSelectMetric = (selected, index) => {
        setValue(`${fieldName}.${index}.value`, selected?.value || '');
    };

    const onAdd = () => {
        handleAddNote(newNote, setNotes);
    }

    return (
        <div className="space-y-4">
            {fields.map((field, index) => {
                const contentValue = watch(`${fieldName}.${index}.content`);
                const metricValue = watch(`${fieldName}.${index}.value`);

                return (
                    <div
                        key={field.id}
                        className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-3"
                    >
                        {/* QUICK NOTE SELECT */}
                        <div>
                            <label className="text-xs font-semibold text-gray-500 uppercase">
                                Quick note
                            </label>
                            <Select
                                options={noteOptions}
                                placeholder="Select a saved note..."
                                isClearable
                                className="mt-1 text-sm"
                                value={
                                    contentValue
                                        ? { label: contentValue, value: contentValue }
                                        : null
                                }
                                onChange={(val) => handleSelectNote(val, index)}
                            />
                        </div>

                        {/* METRIC SELECT */}
                        <div className="w-48">
                            <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase">
                                <Tag size={14} /> Metric
                            </label>
                            <Select
                                options={metricOptions}
                                placeholder="Select metric..."
                                isClearable
                                className="mt-1 text-sm"
                                value={
                                    metricValue
                                        ? metricOptions.find(o => o.value === metricValue)
                                        : null
                                }
                                onChange={(val) => handleSelectMetric(val, index)}
                            />
                        </div>

                        {/* REMOVE */}
                        {fields.length > 1 && (
                            <button
                                type="button"
                                onClick={() => remove(index)}
                                className="text-red-500 text-sm flex items-center gap-1"
                            >
                                <Trash2 size={14} /> Remove
                            </button>
                        )}
                    </div>
                );
            })}

            {/* ADD ITEM */}
            <button
                type="button"
                onClick={() => append({ content: '', value: '' })}
                className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed py-3 text-sm text-gray-600 hover:border-indigo-400"
            >
                <PlusCircle size={18} />
                Add Another Item
            </button>

            {/* ADD NEW NOTE */}
            <div className="bg-gray-50 p-4 rounded-xl border space-y-2">
                <label className="text-xs font-semibold text-gray-500 uppercase">
                    Add new note
                </label>
                <div className="flex gap-2">
                    <input
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        placeholder="Type new note..."
                        className="flex-1 rounded-lg border px-3 py-2 text-sm"
                    />
                    <button
                        type="button"
                        onClick={onAdd}
                        className="px-3 py-2 rounded-lg bg-gray-900 text-white text-sm flex items-center gap-1"
                    >
                        <Plus size={14} /> Add
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ReportItems;

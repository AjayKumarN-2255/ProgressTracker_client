import React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { Trash2, PlusCircle, AlignLeft, Tag } from 'lucide-react'; 

function ReportItems({ fieldName, placeholderText = "Describe the achievement or issue...", valueOptions = [] }) {
    const { control, register } = useFormContext();

    const { fields, append, remove } = useFieldArray({
        control,
        name: fieldName,
    });

    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-4">
                {fields.map((field, index) => (
                    <div
                        key={field.id}
                        className="group relative bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:border-indigo-300 transition-all duration-200"
                    >
                        <div className="flex flex-col md:flex-row gap-4 items-start">

                            {/* 1. Content Textarea (Takes up most space) */}
                            <div className="flex-1 w-full">
                                <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                                    <AlignLeft size={14} /> Description
                                </label>
                                <textarea
                                    {...register(`${fieldName}.${index}.content`)}
                                    rows={2}
                                    placeholder={placeholderText}
                                    className={`w-full rounded-lg border bg-gray-50 px-3 py-2.5 text-sm text-gray-900 shadow-sm focus:bg-white 
                                        focus:ring-2 outline-none transition-all resize-none`}
                                />
                            </div>

                            <div className="w-full md:w-48 shrink-0">
                                <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                                    <Tag size={14} /> Metric / Value
                                </label>
                                <div className="relative">
                                    <select
                                        {...register(`${fieldName}.${index}.value`)}
                                        className={`w-full appearance-none rounded-lg border bg-white px-3 py-2.5 text-sm text-gray-700 shadow-sm focus:ring-2 outline-none transition-all cursor-pointer
                                            `}
                                    >
                                        <option value="">Select...</option>
                                        {valueOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    {/* Custom Arrow for Select */}
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                    </div>
                                </div>
                            </div>

                            {/* 3. Remove Button */}
                            {fields.length > 1 && (
                                <div className="flex md:pt-7 justify-end md:justify-start">
                                    <button
                                        type="button"
                                        onClick={() => remove(index)}
                                        className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                                        title="Remove item"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* "Add New" Button - Dashed Style */}
            <button
                type="button"
                onClick={() => append({ content: "", value: "" })}
                className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50/50 py-3 text-sm font-medium text-gray-600 transition-all hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-600 active:scale-[0.99]"
            >
                <PlusCircle size={18} />
                Add Another Item
            </button>
        </div>
    );
}

export default ReportItems;
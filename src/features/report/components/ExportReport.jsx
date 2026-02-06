import React from 'react';
import { Download } from 'lucide-react';

function ExportReport({handleExportReport}) {
    return (
        <div className="flex justify-center">
            <button
                type='button'
                onClick={handleExportReport}
                className="
          flex items-center gap-2
          px-4 py-2 text-sm font-semibold
          text-gray-800
          bg-white
          border border-gray-200
          rounded-lg
          shadow
          hover:shadow-md
          hover:bg-gray-50
          transition-all
        "
            >
                <Download size={16} className="text-gray-600" />
                Export
            </button>
        </div>
    );
}

export default ExportReport;

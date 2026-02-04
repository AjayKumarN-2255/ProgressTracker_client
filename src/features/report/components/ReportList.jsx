import React, { useEffect } from 'react';
import useManageReport from '../hooks/useMangeReport';
import { formatDateReadable } from '../../../utils/dateFormatter';
import useFilter from '../hooks/useFilter';
import useFetch from '../../../hooks/useFetch';
import DateFilter from './DateFilter';
import { Loader, Pencil } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import UserSelector from './UserSelector';
import ProjectSelector from './ProjectSelector';

export default function ReportList({ currentUserId, userRole }) {

  const { filterType, filterValue, filterYear, applyProjectFilter,
    setFilterType, setFilterValue, setFilterYear, projectId,
    applyDateFilter, clearDateFilter, userId, applyUserFilter
  } = useFilter();

  const shouldFetchUsers = !currentUserId;
  const { data: employees } = useFetch('/user', {
    params: { role: 'employee' },
    enabled: shouldFetchUsers
  });

  const { data: reports, loading } = useManageReport({ userId });
  const { data: projects } = useFetch('/project');
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUserId) {
      navigate(`/${userRole}/dashboard?type=CURRENT&userId=${currentUserId}`)
    } else {
      navigate(`/${userRole}/dashboard?type=CURRENT`)
    }
  }, [])

  if (loading) {
    return (
      <div className='w-full h-screen flex justify-center items-center'>
        <Loader />
      </div>
    )
  }

  return (
    <div className="space-y-12 p-10 w-full bg-gray-50/50">
      <div className="w-full p-4 bg-gray-50 rounded-lg shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">

          {/* LEFT SIDE – User Selector (Admin only) */}
          {!currentUserId && (
            <div className="w-full lg:max-w-xs">
              <UserSelector users={employees} selectedUserId={userId}
                applyUserFilter={applyUserFilter} />
            </div>
          )}

          <div className="w-full lg:max-w-xs">
            <ProjectSelector projects={projects} selectedProjectId={projectId}
              applyProjectFilter={applyProjectFilter} />
          </div>

          {/* RIGHT SIDE – Date Filter */}
          <div className="w-full lg:w-auto">
            <DateFilter
              filterType={filterType}
              filterValue={filterValue}
              filterYear={filterYear}
              setFilterType={setFilterType}
              setFilterValue={setFilterValue}
              setFilterYear={setFilterYear}
              applyDateFilter={applyDateFilter}
              clearDateFilter={clearDateFilter}
            />
          </div>

        </div>
      </div>

      {(!reports || reports.length === 0) ? (
        <div className="text-center p-10 text-gray-400 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          {userId
            ? 'No reports found for this user.'
            : 'Select a user to view reports.'}
        </div>
      ) : reports.map((report, ind) => {
        const { _id, projectId, reviewMonth, reviewerId, employeeId, milestones, patternsToAddress, memos } = report;

        const sumMilestones = milestones.reduce((sum, item) => sum + (item.value || 0), 0);
        const sumPatterns = patternsToAddress.reduce((sum, item) => sum + (item.value || 0), 0);
        const sumMemos = memos.reduce((sum, item) => sum + (item.value || 0), 0);

        const totalScore = sumMilestones + (sumPatterns + sumMemos);

        const maxRows = Math.max(milestones.length, patternsToAddress.length, memos.length, 5);
        const getCell = (arr, index) => arr[index] || { content: '', value: '' };

        return (
          <div key={_id} className="flex flex-col lg:flex-row gap-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">

            {/* --- LEFT PANEL: Project Info & Score --- */}
            <div className="lg:w-1/4 flex flex-col gap-6 shrink-0">
              <div>
                <div className='flex w-full justify-between'>
                  <p className="text-sm text-gray-500 font-medium mb-1">
                    Project {(ind + 1).toString().padStart(2, '0')}
                  </p>
                  {userRole !== "employee" &&
                    <button
                      onClick={() => navigate(`/${userRole}/edit-report/${_id}`)}
                      className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800"
                    >
                      <Pencil size={16} />
                      Edit
                    </button>
                  }
                </div>

                <h2 className="text-3xl font-extrabold text-gray-800 leading-tight">
                  {projectId.name}
                </h2>
                <p className="text-sm text-gray-500 font-medium mt-1">
                  Review Month : {formatDateReadable(reviewMonth)}
                </p>
                {/* EDIT BUTTON */}
              </div>

              <div className="flex justify-between pe-6 gap-2">
                <div>
                  <p className="text-xs text-gray-500 font-medium">Employee :</p>
                  <h2 className="text-sm font-semibold text-gray-700">
                    {employeeId?.name || 'N/A'}
                  </h2>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Reviewed By :</p>
                  <h2 className="text-sm font-semibold text-gray-700">
                    {reviewerId?.name || 'N/A'}
                  </h2>
                </div>

              </div>


              <div>
                <p className="text-sm text-gray-500 font-medium mb-2">Score</p>
                <div className={`text-6xl font-bold py-8 px-6 w-full text-center rounded-sm ${totalScore < 0 ? 'bg-red-200 text-red-900' : 'bg-green-100 text-green-900'
                  }`}>
                  {totalScore}
                </div>
              </div>
            </div>

            {/* --- RIGHT PANEL: Data Table --- */}
            <div className="lg:w-3/4 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr>
                    {/* Milestones Header */}
                    <th className="bg-orange-400 text-white font-semibold py-3 px-3 text-left w-[25%] border-r-8 border-white">
                      Milestones Reached
                    </th>
                    <th className="bg-orange-200 text-orange-900 font-semibold py-3 px-3 text-center w-[8%] border-r-8 border-white">
                      Weight
                    </th>

                    {/* Patterns Header */}
                    <th className="bg-gray-600 text-white font-semibold py-3 px-3 text-left w-[25%] border-r-8 border-white">
                      Patterns to address
                    </th>
                    <th className="bg-gray-400 text-white font-semibold py-3 px-3 text-center w-[8%] border-r-8 border-white">
                      Weight
                    </th>

                    {/* Memos Header */}
                    <th className="bg-red-600 text-white font-semibold py-3 px-3 text-left w-[25%] border-r-8 border-white">
                      Memos
                    </th>
                    <th className="bg-red-300 text-red-900 font-semibold py-3 px-3 text-center w-[8%]">
                      Weight
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {Array.from({ length: maxRows }).map((_, idx) => {
                    const m = getCell(milestones, idx);
                    const p = getCell(patternsToAddress, idx);
                    const memo = getCell(memos, idx);

                    return (
                      <tr key={idx} className="group hover:bg-gray-50 transition-colors">
                        {/* Milestone Columns */}
                        <td className="py-2 px-3 h-12 border-b border-gray-200 border-r-8 border-r-white align-middle">
                          {m.content}
                        </td>
                        <td className="py-2 px-3 h-12 border-b border-gray-200 border-r-8 border-r-white text-center align-middle font-medium bg-gray-50/50">
                          {m.value}
                        </td>

                        {/* Pattern Columns */}
                        <td className="py-2 px-3 h-12 border-b border-gray-200 border-r-8 border-r-white align-middle">
                          {p.content}
                        </td>
                        <td className="py-2 px-3 h-12 border-b border-gray-200 border-r-8 border-r-white text-center align-middle font-medium bg-gray-50/50">
                          {p.value}
                        </td>

                        {/* Memo Columns */}
                        <td className="py-2 px-3 h-12 border-b border-gray-200 border-r-8 border-r-white align-middle">
                          {memo.content}
                        </td>
                        <td className="py-2 px-3 h-12 border-b-[.2px] border-gray-200 text-center align-middle font-medium bg-gray-50/50">
                          {memo.value}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>

                <tfoot>
                  <tr className="font-bold text-gray-700 bg-gray-50">
                    <td className="py-4 px-3 text-right border-r-8 border-white">Total</td>
                    <td className="py-4 px-3 text-center border-r-8 border-white">{sumMilestones}</td>

                    <td className="py-4 px-3 text-right border-r-8 border-white">Total</td>
                    <td className="py-4 px-3 text-center border-r-8 border-white">{sumPatterns}</td>

                    <td className="py-4 px-3 text-right border-r-8 border-white">Total</td>
                    <td className="py-4 px-3 text-center">{sumMemos}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

          </div>
        );
      })}
    </div>
  );
}
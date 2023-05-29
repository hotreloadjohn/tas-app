import AssignModulePic from "../assets/assign_mod.png";

const AssignedModulesPage = () => {
  return (
    <div className="overflow-x-auto p-6 z-0">
      <table className="table w-full">
        <caption className="caption-bottom bg-gray-300 pb-4">
          <h1 className="text-lg my-4 font-semibold">
            Total Hours Per Week: 6
          </h1>
          <div className="flex justify-center gap-2">
            <div className="w-1 p-2 bg-purple-400"></div>
            <h2>You are Module Cordinator</h2>
          </div>
        </caption>
        {/* head */}
        <thead>
          <tr>
            <th className="text-sm">Allocated Classes</th>
            <th className="text-sm">lecture</th>
            <th className="text-sm">Hr/Class</th>
            <th className="text-sm">tutorial</th>
            <th className="text-sm">Hr/Class</th>
            <th className="text-sm">Practical</th>
            <th className="text-sm">Hr/Class</th>
            <th className="text-sm">DLT</th>
            <th className="text-sm">Hr/Class</th>
            <th className="text-sm">Total Class Hours</th>
            <th className="text-sm">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          <tr className="text-center">
            <td className="text-left whitespace-normal">
              ST0505 DIT: Enterprise Systems Development (ESDE) Year 2A
            </td>
            <td>0</td>
            <td>0</td>
            <td>1</td>
            <td>3</td>
            <td>1</td>
            <td>3</td>
            <td>0</td>
            <td>0</td>
            <td>6</td>
            <td>
              <label htmlFor="my-modal-3" className="btn">
                Edit
              </label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="my-modal-3" className="modal-toggle" />
              <div className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                  <label
                    htmlFor="my-modal-3"
                    className="btn btn-sm btn-circle absolute right-2 top-2"
                  >
                    ✕
                  </label>
                  <h3 className="font-bold text-lg">
                    Congratulations random Internet user!
                  </h3>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                  />

                  <div className="modal-action">
                    <label htmlFor="my-modal-3" className="btn bg-red-400">
                      Cancel
                    </label>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          {/* row 2 */}
          <tr className="text-center">
            <td className="text-left bg-purple-400">
              ST1234 DIT: xxxxxx Year 2A
            </td>
            <td className="bg-purple-400">0</td>
            <td className="bg-purple-400">0</td>
            <td className="bg-purple-400">1</td>
            <td className="bg-purple-400">3</td>
            <td className="bg-purple-400">1</td>
            <td className="bg-purple-400">3</td>
            <td className="bg-purple-400">0</td>
            <td className="bg-purple-400">0</td>
            <td className="bg-purple-400">6</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AssignedModulesPage;

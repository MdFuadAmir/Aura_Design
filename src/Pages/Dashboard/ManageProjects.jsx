import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router";
import {
  FaPlus,
  FaTrashAlt,
  FaEye,
  FaGlobe,
  FaLock,
  FaCalendarAlt,
  FaExternalLinkAlt,
  FaTools,
} from "react-icons/fa";
import { useState } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Pagination from "../../Shared/Pagination";
import ComponentLoader from "../../Shared/ComponentLoader";

const ManageProjects = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch Projects
  const { data: projectsData = { projects: [], total: 0 }, isLoading } =
    useQuery({
      queryKey: ["manage-projects", currentPage],
      queryFn: async () => {
        const res = await axiosSecure.get(
          `/projects?page=${currentPage}&limit=${itemsPerPage}`,
        );
        return res.data;
      },
    });

  const toggleStatus = useMutation({
    mutationFn: async ({ id, currentStatus }) => {
      const newStatus =
        currentStatus === "Published" ? "Unpublished" : "Published";
      return await axiosSecure.patch(`/projects/${id}`, { status: newStatus });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["manage-projects"]);
      toast.success("Project visibility updated!");
    },
  });

  // Delete Project Mutation
  const deleteProject = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.delete(`/projects/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["manage-projects"]);
      toast.success("Project removed successfully.");
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it!",
      background: "#071c13",
      color: "#fff",
    }).then((result) => {
      if (result.isConfirmed) deleteProject.mutate(id);
    });
  };

  if (isLoading) return <ComponentLoader />;

  return (
    <div className="p-6 lg:p-10 bg-[#f2f9f5] dark:bg-[#04120c] min-h-screen font-sans">
      {/* Header Section */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black uppercase dark:text-white tracking-tighter">
            Manage <span className="text-emerald-500">Projects</span>
          </h2>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
            Showcasing Total: {projectsData.total} Masterpieces
          </p>
        </div>

        <Link
          to="/dashboard/add-project"
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all shadow-lg shadow-emerald-500/20 w-fit"
        >
          <FaPlus /> Add New Project
        </Link>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto bg-white dark:bg-[#071c13]/40 border border-emerald-500/10 rounded-4xl shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-emerald-500/10 bg-emerald-500/5 text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
              <th className="px-6 py-5">Project Details</th>
              <th className="px-6 py-5">Category</th>
              <th className="px-6 py-5">Status</th>
              <th className="px-6 py-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-emerald-500/5">
            {projectsData.projects.map((project) => (
              <tr
                key={project._id}
                className="hover:bg-emerald-500/5 transition-colors group"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={project.projectgallery[0]}
                      className="w-16 h-12 rounded-xl object-cover border border-emerald-500/10"
                      alt={project.title}
                    />
                    <div className="max-w-50 md:max-w-xs">
                      <p className="text-sm font-bold dark:text-white truncate uppercase tracking-tighter">
                        {project.title}
                      </p>
                      <p className="text-[9px] text-gray-400 flex items-center gap-1 mt-1 font-bold">
                        <FaCalendarAlt size={8} className="text-emerald-500" />{" "}
                        {new Date(project.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-[10px] font-black text-gray-500 dark:text-emerald-500/60 uppercase tracking-tighter">
                    {project.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`text-[8px] font-black uppercase px-3 py-1 rounded-lg border ${
                      project.status === "Published"
                        ? "text-emerald-500 border-emerald-500/20 bg-emerald-500/5"
                        : "text-amber-500 border-amber-500/20 bg-amber-500/5"
                    }`}
                  >
                    {project.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-1">
                    {/* Status Toggle Button */}
                    <button
                      onClick={() =>
                        toggleStatus.mutate({
                          id: project._id,
                          currentStatus: project.status,
                        })
                      }
                      className={`p-2.5 rounded-xl transition-all ${project.status === "Published" ? "text-amber-500 hover:bg-amber-500/10" : "text-emerald-500 hover:bg-emerald-500/10"}`}
                      title="Change Visibility"
                    >
                      {project.status === "Published" ? (
                        <FaLock size={14} />
                      ) : (
                        <FaGlobe size={14} />
                      )}
                    </button>

                    {/* View Button */}
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="p-2.5 text-blue-500 hover:bg-blue-500/10 rounded-xl transition-all"
                    >
                      <FaEye size={14} />
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(project._id)}
                      className="p-2.5 text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                    >
                      <FaTrashAlt size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8">
        <Pagination
          totalItems={projectsData.total}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-999 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#071c13] w-full max-w-4xl rounded-[3rem] overflow-hidden shadow-2xl relative border border-emerald-500/20 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:scale-110 transition-all z-10 font-bold"
            >
              ✕
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-6">
              {/* Left: Gallery Section */}
              <div className="p-8 pb-0 lg:pb-8">
                <div className="space-y-4">
                  <img
                    src={selectedProject.projectgallery[0]}
                    className="w-full h-64 object-cover rounded-4xl border border-emerald-500/10 shadow-lg"
                    alt=""
                  />
                  <div className="grid grid-cols-3 gap-3">
                    {selectedProject.projectgallery
                      .slice(1, 4)
                      .map((img, i) => (
                        <img
                          key={i}
                          src={img}
                          className="h-20 w-full object-cover rounded-2xl border border-emerald-500/5 hover:opacity-80 transition-all cursor-pointer"
                          alt=""
                        />
                      ))}
                  </div>
                </div>
              </div>

              {/* Right: Info Section */}
              <div className="p-8 lg:pl-0 lg:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[9px] font-black bg-emerald-500 text-white px-4 py-1.5 rounded-full uppercase tracking-widest">
                    {selectedProject.category}
                  </span>
                  <span className="text-[9px] font-bold text-gray-400 uppercase flex items-center gap-2">
                    <FaCalendarAlt className="text-emerald-500" />{" "}
                    {new Date(selectedProject.createdAt).toDateString()}
                  </span>
                </div>

                <h3 className="text-3xl font-black dark:text-white mb-2 uppercase tracking-tighter leading-none">
                  {selectedProject.title}
                </h3>
                <p className="text-emerald-500 font-bold text-[10px] mb-6 uppercase tracking-[0.2em]">
                  Client: {selectedProject.clientName || "Undisclosed"}
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <FaTools className="text-emerald-500 mt-1" size={14} />
                    <div>
                      <p className="text-[10px] font-black dark:text-gray-400 uppercase tracking-widest">
                        Tools Used
                      </p>
                      <p className="text-xs dark:text-emerald-100/70 font-bold">
                        {selectedProject.toolsUsed?.join(", ")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaExternalLinkAlt
                      className="text-emerald-500 mt-1"
                      size={14}
                    />
                    <div>
                      <p className="text-[10px] font-black dark:text-gray-400 uppercase tracking-widest">
                        Live Link
                      </p>
                      <a
                        href={selectedProject.projectLink}
                        target="_blank"
                        className="text-xs text-blue-500 font-bold hover:underline"
                      >
                        {selectedProject.projectLink}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 p-5 bg-emerald-500/5 rounded-2xl border border-emerald-500/5">
                  <p className="text-[10px] uppercase text-emerald-500 font-black tracking-widest">
                    Description
                  </p>
                  <p className="text-[12px] text-gray-500 dark:text-emerald-100/60 leading-relaxed italic">
                    "{selectedProject.description}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProjects;

"use client";

import { useState } from "react";
import { useGetProjectsQuery, useCreateProjectMutation, useUpdateProjectMutation, useDeleteProjectMutation } from "@/store/api/projectsApi";
import PopupModal from "@/app/components/ui/PopupModal";
import Table from "@/app/components/ui/Table";

interface Project {
  _id: string;
  project_name: string;
  project_summary: string;
  client_name: string;
  completion_date: string;
  thumbnail_image_url: string;
  project_overview: string;
  technology_used: { tech_name: string }[];
  pages_images_urls: string[];
  project_concepts: {
    concept: string;
    start_title: string;
    start_desc: string;
    end_title: string;
    end_desc: string;
  }[];
  second_thumbnail_url: string;
  key_feature: string;
  the_results: { value: string; desc: string }[];
  createdAt: string;
  updatedAt: string;
}

export default function AdminProjects() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const { data: projectsData, isLoading, refetch } = useGetProjectsQuery({ page, limit, search: searchTerm });
  const [createProject] = useCreateProjectMutation();
  const [updateProject] = useUpdateProjectMutation();
  const [deleteProject] = useDeleteProjectMutation();

  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    project_name: "",
    project_summary: "",
    client_name: "",
    completion_date: "",
    thumbnail_image_url: "",
    project_overview: "",
    technology_used: [{ tech_name: "" }],
    pages_images_urls: [""],
    project_concepts: [{ concept: "", start_title: "", start_desc: "", end_title: "", end_desc: "" }],
    second_thumbnail_url: "",
    key_feature: "",
    the_results: [{ value: "", desc: "" }],
  });

  const projects = projectsData?.projects || [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const projectData = {
        ...formData,
        technology_used: formData.technology_used.filter(tech => tech.tech_name.trim()),
        pages_images_urls: formData.pages_images_urls.filter(url => url.trim()),
        project_concepts: formData.project_concepts.filter(concept => concept.concept.trim()),
        the_results: formData.the_results.filter(result => result.value.trim()),
      };

      if (editingProject) {
        await updateProject({ id: editingProject._id, project: projectData });
      } else {
        await createProject(projectData);
      }
      setShowForm(false);
      setEditingProject(null);
      resetForm();
      refetch();
    } catch (error) {
      console.error("Error saving project:", error);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      project_name: project.project_name,
      project_summary: project.project_summary,
      client_name: project.client_name,
      completion_date: project.completion_date.split('T')[0], // Format for date input
      thumbnail_image_url: project.thumbnail_image_url,
      project_overview: project.project_overview,
      technology_used: project.technology_used.length > 0 ? project.technology_used : [{ tech_name: "" }],
      pages_images_urls: project.pages_images_urls.length > 0 ? project.pages_images_urls : [""],
      project_concepts: project.project_concepts.length > 0 ? project.project_concepts : [{ concept: "", start_title: "", start_desc: "", end_title: "", end_desc: "" }],
      second_thumbnail_url: project.second_thumbnail_url,
      key_feature: project.key_feature,
      the_results: project.the_results.length > 0 ? project.the_results : [{ value: "", desc: "" }],
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      try {
        await deleteProject(id);
        refetch();
      } catch (error) {
        console.error("Error deleting project:", error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      project_name: "",
      project_summary: "",
      client_name: "",
      completion_date: "",
      thumbnail_image_url: "",
      project_overview: "",
      technology_used: [{ tech_name: "" }],
      pages_images_urls: [""],
      project_concepts: [{ concept: "", start_title: "", start_desc: "", end_title: "", end_desc: "" }],
      second_thumbnail_url: "",
      key_feature: "",
      the_results: [{ value: "", desc: "" }],
    });
  };

  const cancelEdit = () => {
    setShowForm(false);
    setEditingProject(null);
    resetForm();
  };

  // Helper functions for managing arrays
  const addTechnology = () => {
    setFormData(prev => ({
      ...prev,
      technology_used: [...prev.technology_used, { tech_name: "" }]
    }));
  };

  const removeTechnology = (index: number) => {
    setFormData(prev => ({
      ...prev,
      technology_used: prev.technology_used.filter((_, i) => i !== index)
    }));
  };

  const addImageUrl = () => {
    setFormData(prev => ({
      ...prev,
      pages_images_urls: [...prev.pages_images_urls, ""]
    }));
  };

  const removeImageUrl = (index: number) => {
    setFormData(prev => ({
      ...prev,
      pages_images_urls: prev.pages_images_urls.filter((_, i) => i !== index)
    }));
  };

  const addProjectConcept = () => {
    setFormData(prev => ({
      ...prev,
      project_concepts: [...prev.project_concepts, { concept: "", start_title: "", start_desc: "", end_title: "", end_desc: "" }]
    }));
  };

  const removeProjectConcept = (index: number) => {
    setFormData(prev => ({
      ...prev,
      project_concepts: prev.project_concepts.filter((_, i) => i !== index)
    }));
  };

  const addResult = () => {
    setFormData(prev => ({
      ...prev,
      the_results: [...prev.the_results, { value: "", desc: "" }]
    }));
  };

  const removeResult = (index: number) => {
    setFormData(prev => ({
      ...prev,
      the_results: prev.the_results.filter((_, i) => i !== index)
    }));
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Projects Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          Add Project
        </button>
      </div>

      {/* Form Modal */}
      <PopupModal
        isOpen={showForm}
        onClose={cancelEdit}
        title={editingProject ? "Edit Project" : "Add New Project"}
        size="xl"
      >
        <form onSubmit={handleSubmit} className="space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Project Name</label>
              <input
                type="text"
                required
                value={formData.project_name}
                onChange={(e) => setFormData({ ...formData, project_name: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Client Name</label>
              <input
                type="text"
                required
                value={formData.client_name}
                onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Project Summary</label>
            <textarea
              required
              rows={3}
              value={formData.project_summary}
              onChange={(e) => setFormData({ ...formData, project_summary: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Completion Date</label>
              <input
                type="date"
                required
                value={formData.completion_date}
                onChange={(e) => setFormData({ ...formData, completion_date: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Thumbnail Image URL</label>
              <input
                type="url"
                required
                value={formData.thumbnail_image_url}
                onChange={(e) => setFormData({ ...formData, thumbnail_image_url: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Project Overview</label>
            <textarea
              required
              rows={4}
              value={formData.project_overview}
              onChange={(e) => setFormData({ ...formData, project_overview: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Technology Used */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">Technology Used</label>
              <button
                type="button"
                onClick={addTechnology}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                + Add Technology
              </button>
            </div>
            {formData.technology_used.map((tech, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Technology name"
                  value={tech.tech_name}
                  onChange={(e) => {
                    const newTech = [...formData.technology_used];
                    newTech[index].tech_name = e.target.value;
                    setFormData({ ...formData, technology_used: newTech });
                  }}
                  className="flex-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                {formData.technology_used.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeTechnology(index)}
                    className="text-red-600 hover:text-red-800 px-2"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Pages Images URLs */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">Pages Images URLs</label>
              <button
                type="button"
                onClick={addImageUrl}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                + Add Image URL
              </button>
            </div>
            {formData.pages_images_urls.map((url, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="url"
                  placeholder="Image URL"
                  value={url}
                  onChange={(e) => {
                    const newUrls = [...formData.pages_images_urls];
                    newUrls[index] = e.target.value;
                    setFormData({ ...formData, pages_images_urls: newUrls });
                  }}
                  className="flex-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                {formData.pages_images_urls.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeImageUrl(index)}
                    className="text-red-600 hover:text-red-800 px-2"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Project Concepts */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">Project Concepts</label>
              <button
                type="button"
                onClick={addProjectConcept}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                + Add Concept
              </button>
            </div>
            {formData.project_concepts.map((concept, index) => (
              <div key={index} className="border border-gray-200 rounded-md p-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Concept {index + 1}</span>
                  {formData.project_concepts.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeProjectConcept(index)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Concept"
                    value={concept.concept}
                    onChange={(e) => {
                      const newConcepts = [...formData.project_concepts];
                      newConcepts[index].concept = e.target.value;
                      setFormData({ ...formData, project_concepts: newConcepts });
                    }}
                    className="border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <input
                    type="text"
                    placeholder="Start Title"
                    value={concept.start_title}
                    onChange={(e) => {
                      const newConcepts = [...formData.project_concepts];
                      newConcepts[index].start_title = e.target.value;
                      setFormData({ ...formData, project_concepts: newConcepts });
                    }}
                    className="border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div className="mt-2">
                  <textarea
                    placeholder="Start Description"
                    rows={2}
                    value={concept.start_desc}
                    onChange={(e) => {
                      const newConcepts = [...formData.project_concepts];
                      newConcepts[index].start_desc = e.target.value;
                      setFormData({ ...formData, project_concepts: newConcepts });
                    }}
                    className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <input
                    type="text"
                    placeholder="End Title"
                    value={concept.end_title}
                    onChange={(e) => {
                      const newConcepts = [...formData.project_concepts];
                      newConcepts[index].end_title = e.target.value;
                      setFormData({ ...formData, project_concepts: newConcepts });
                    }}
                    className="border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div className="mt-2">
                  <textarea
                    placeholder="End Description"
                    rows={2}
                    value={concept.end_desc}
                    onChange={(e) => {
                      const newConcepts = [...formData.project_concepts];
                      newConcepts[index].end_desc = e.target.value;
                      setFormData({ ...formData, project_concepts: newConcepts });
                    }}
                    className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Second Thumbnail URL</label>
              <input
                type="url"
                required
                value={formData.second_thumbnail_url}
                onChange={(e) => setFormData({ ...formData, second_thumbnail_url: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Key Feature</label>
              <input
                type="text"
                required
                value={formData.key_feature}
                onChange={(e) => setFormData({ ...formData, key_feature: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          {/* The Results */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">Results</label>
              <button
                type="button"
                onClick={addResult}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                + Add Result
              </button>
            </div>
            {formData.the_results.map((result, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Value"
                  value={result.value}
                  onChange={(e) => {
                    const newResults = [...formData.the_results];
                    newResults[index].value = e.target.value;
                    setFormData({ ...formData, the_results: newResults });
                  }}
                  className="flex-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={result.desc}
                  onChange={(e) => {
                    const newResults = [...formData.the_results];
                    newResults[index].desc = e.target.value;
                    setFormData({ ...formData, the_results: newResults });
                  }}
                  className="flex-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                {formData.the_results.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeResult(index)}
                    className="text-red-600 hover:text-red-800 px-2"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={cancelEdit}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              {editingProject ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </PopupModal>

      <Table
        columns={[
          { header: 'Project Name', accessor: 'project_name' },
          { header: 'Client', accessor: 'client_name' },
          { header: 'Completion Date', accessor: (item: Project) => new Date(item.completion_date).toLocaleDateString() },
          {
            header: 'Actions',
            accessor: (item: Project) => (
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            ),
          },
        ]}
        data={projects}
        totalCount={projectsData?.total || 0}
        isLoading={isLoading}
        onPageChange={setPage}
        onLimitChange={setLimit}
        onSearch={setSearchTerm}
      />
    </div>
  );
}
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { useGetProjectsQuery, useCreateProjectMutation, useUpdateProjectMutation, useDeleteProjectMutation } from "@/store/api/projectsApi";
import { useCreateImageMutation } from "@/store/api/imagesApi";
import { uploadFileUsingAxios } from "@/lib/uploadFile";
import PopupModal from "@/app/components/ui/PopupModal";
import Table from "@/app/components/ui/Table";
import Image from "next/image";

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
  project_concept_name: string;
  project_concepts: {
    start_title: string;
    start_desc: string;
    end_title: string;
    end_desc: string;
  }[];
  second_thumbnail_url: string;
  key_feature: string;
  the_results: { value: string; desc: string }[];
  company_logo_url: string;
  client_comment: string;
  client_company_name: string;
  time_duration: string;
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
  const [createImage] = useCreateImageMutation();

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
    project_concept_name: "",
    project_concepts: [{ start_title: "", start_desc: "", end_title: "", end_desc: "" }],
    second_thumbnail_url: "",
    key_feature: "",
    the_results: [{ value: "", desc: "" }],
    company_logo_url: "",
    client_comment: "",
    client_company_name: "",
    time_duration: "",
  });

  // States for file upload and preview
  const [selectedThumbnail, setSelectedThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [selectedSecondThumbnail, setSelectedSecondThumbnail] = useState<File | null>(null);
  const [secondThumbnailPreview, setSecondThumbnailPreview] = useState<string | null>(null);
  const [selectedCompanyLogo, setSelectedCompanyLogo] = useState<File | null>(null);
  const [companyLogoPreview, setCompanyLogoPreview] = useState<string | null>(null);
  const [selectedPagesImages, setSelectedPagesImages] = useState<(File | null)[]>([]);
  const [pagesImagesPreviews, setPagesImagesPreviews] = useState<(string | null)[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [thumbnailUploadMethod, setThumbnailUploadMethod] = useState<"upload" | "url">("upload");
  const [secondThumbnailUploadMethod, setSecondThumbnailUploadMethod] = useState<"upload" | "url">("upload");
  const [companyLogoUploadMethod, setCompanyLogoUploadMethod] = useState<"upload" | "url">("upload");
  const [pagesImagesUploadMethods, setPagesImagesUploadMethods] = useState<("upload" | "url")[]>(["upload"]);

  const projects = projectsData?.projects || [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    try {
      let thumbnailImageUrl = formData.thumbnail_image_url;
      let secondThumbnailUrl = formData.second_thumbnail_url;
      let companyLogoUrl = formData.company_logo_url;
      const pagesImagesUrls = [...formData.pages_images_urls];

      // Upload thumbnail image if selected
      if (thumbnailUploadMethod === "upload" && selectedThumbnail) {
        const { uploadUrl, filePath } = await fetch("/api/signed-url", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mimeType: selectedThumbnail.type }),
        }).then((res) => res.json());

        await uploadFileUsingAxios({
          url: uploadUrl,
          file: selectedThumbnail,
          fileType: selectedThumbnail.type,
        });

        const fullImageUrl = `${process.env.NEXT_PUBLIC_DO_SPACE_CDN_URL}/${filePath}`;
        await createImage({
          title: `${formData.project_name} Thumbnail`,
          url: fullImageUrl,
          alt: `${formData.project_name} thumbnail`,
          category: "thumbnails",
        });
        thumbnailImageUrl = fullImageUrl;
      }

      // Upload second thumbnail image if selected
      if (secondThumbnailUploadMethod === "upload" && selectedSecondThumbnail) {
        const { uploadUrl, filePath } = await fetch("/api/signed-url", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mimeType: selectedSecondThumbnail.type }),
        }).then((res) => res.json());

        await uploadFileUsingAxios({
          url: uploadUrl,
          file: selectedSecondThumbnail,
          fileType: selectedSecondThumbnail.type,
        });

        const fullImageUrl = `${process.env.NEXT_PUBLIC_DO_SPACE_CDN_URL}/${filePath}`;
        await createImage({
          title: `${formData.project_name} Second Thumbnail`,
          url: fullImageUrl,
          alt: `${formData.project_name} second thumbnail`,
          category: "thumbnails",
        });
        secondThumbnailUrl = fullImageUrl;
      }

      // Upload company logo image if selected
      if (companyLogoUploadMethod === "upload" && selectedCompanyLogo) {
        const { uploadUrl, filePath } = await fetch("/api/signed-url", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mimeType: selectedCompanyLogo.type }),
        }).then((res) => res.json());

        await uploadFileUsingAxios({
          url: uploadUrl,
          file: selectedCompanyLogo,
          fileType: selectedCompanyLogo.type,
        });

        const fullImageUrl = `${process.env.NEXT_PUBLIC_DO_SPACE_CDN_URL}/${filePath}`;
        await createImage({
          title: `${formData.client_company_name} Company Logo`,
          url: fullImageUrl,
          alt: `${formData.client_company_name} company logo`,
          category: "logos",
        });
        companyLogoUrl = fullImageUrl;
      }

      // Upload pages images if selected
      for (let i = 0; i < selectedPagesImages.length; i++) {
        if (pagesImagesUploadMethods[i] === "upload" && selectedPagesImages[i]) {
          const { uploadUrl, filePath } = await fetch("/api/signed-url", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ mimeType: selectedPagesImages[i]!.type }),
          }).then((res) => res.json());

          await uploadFileUsingAxios({
            url: uploadUrl,
            file: selectedPagesImages[i]!,
            fileType: selectedPagesImages[i]!.type,
          });

          const fullImageUrl = `${process.env.NEXT_PUBLIC_DO_SPACE_CDN_URL}/${filePath}`;
          await createImage({
            title: `${formData.project_name} Page Image ${i + 1}`,
            url: fullImageUrl,
            alt: `${formData.project_name} page image ${i + 1}`,
            category: "pages",
          });
          pagesImagesUrls[i] = fullImageUrl;
        }
      }

      const projectData = {
        ...formData,
        thumbnail_image_url: thumbnailImageUrl,
        second_thumbnail_url: secondThumbnailUrl,
        company_logo_url: companyLogoUrl,
        pages_images_urls: pagesImagesUrls,
        technology_used: formData.technology_used.filter(tech => tech.tech_name.trim()),
        project_concepts: formData.project_concepts.filter(concept => concept.start_title.trim()),
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
    } finally {
      setIsUploading(false);
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
      project_concept_name: project.project_concept_name,
      project_concepts: project.project_concepts.length > 0 ? project.project_concepts : [{ start_title: "", start_desc: "", end_title: "", end_desc: "" }],
      second_thumbnail_url: project.second_thumbnail_url,
      key_feature: project.key_feature,
      the_results: project.the_results.length > 0 ? project.the_results : [{ value: "", desc: "" }],
      company_logo_url: project.company_logo_url,
      client_comment: project.client_comment,
      client_company_name: project.client_company_name,
      time_duration: project.time_duration,
    });

    // Initialize upload methods and arrays for editing
    const pagesCount = project.pages_images_urls.length > 0 ? project.pages_images_urls.length : 1;
    setPagesImagesUploadMethods(new Array(pagesCount).fill("url"));
    setSelectedPagesImages(new Array(pagesCount).fill(null));
    setPagesImagesPreviews(new Array(pagesCount).fill(null));

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
      project_concept_name: "",
      project_concepts: [{ start_title: "", start_desc: "", end_title: "", end_desc: "" }],
      second_thumbnail_url: "",
      key_feature: "",
      the_results: [{ value: "", desc: "" }],
      company_logo_url: "",
      client_comment: "",
      client_company_name: "",
      time_duration: "",
    });
    setSelectedThumbnail(null);
    setThumbnailPreview(null);
    setSelectedSecondThumbnail(null);
    setSecondThumbnailPreview(null);
    setSelectedCompanyLogo(null);
    setCompanyLogoPreview(null);
    setSelectedPagesImages([]);
    setPagesImagesPreviews([]);
    setThumbnailUploadMethod("upload");
    setSecondThumbnailUploadMethod("upload");
    setCompanyLogoUploadMethod("upload");
    setPagesImagesUploadMethods(["upload"]);
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
      project_concepts: [...prev.project_concepts, { start_title: "", start_desc: "", end_title: "", end_desc: "" }]
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

  // Handle file selection and preview generation
  const handleFileSelect = (file: File | null, type: "thumbnail" | "secondThumbnail" | "companyLogo" | "pages", index?: number) => {
    if (file) {
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/svg+xml",
      ];
      if (!allowedTypes.includes(file.type)) {
        alert(
          "Invalid file type. Please select a JPG, PNG, WEBP, or SVG image."
        );
        return;
      }

      if (type === "thumbnail") {
        setSelectedThumbnail(file);
        const reader = new FileReader();
        reader.onload = (e) =>
          setThumbnailPreview(e.target?.result as string);
        reader.readAsDataURL(file);
      } else if (type === "secondThumbnail") {
        setSelectedSecondThumbnail(file);
        const reader = new FileReader();
        reader.onload = (e) =>
          setSecondThumbnailPreview(e.target?.result as string);
        reader.readAsDataURL(file);
      } else if (type === "companyLogo") {
        setSelectedCompanyLogo(file);
        const reader = new FileReader();
        reader.onload = (e) =>
          setCompanyLogoPreview(e.target?.result as string);
        reader.readAsDataURL(file);
      } else if (type === "pages" && index !== undefined) {
        const newSelected = [...selectedPagesImages];
        const newPreviews = [...pagesImagesPreviews];
        newSelected[index] = file;
        const reader = new FileReader();
        reader.onload = (e) => {
          newPreviews[index] = e.target?.result as string;
          setPagesImagesPreviews(newPreviews);
        };
        reader.readAsDataURL(file);
        setSelectedPagesImages(newSelected);
      }
    }
  };

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent, type: "thumbnail" | "secondThumbnail" | "companyLogo" | "pages", index?: number) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file, type, index);
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="px-4 py-6 sm:px-0 text-black">
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
              <label className="block text-sm font-medium text-gray-700">Time Duration</label>
              <input
                type="text"
                required
                value={formData.time_duration}
                onChange={(e) => setFormData({ ...formData, time_duration: e.target.value })}
                placeholder="e.g., 3 months"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center mb-2">
                <label className="block text-sm font-medium text-gray-700 mr-4">
                  Thumbnail Image
                </label>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="thumbnail-upload"
                    name="thumbnailUploadMethod"
                    value="upload"
                    checked={thumbnailUploadMethod === "upload"}
                    onChange={() => setThumbnailUploadMethod("upload")}
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                  />
                  <label
                    htmlFor="thumbnail-upload"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Upload
                  </label>
                </div>
                <div className="flex items-center ml-4">
                  <input
                    type="radio"
                    id="thumbnail-url"
                    name="thumbnailUploadMethod"
                    value="url"
                    checked={thumbnailUploadMethod === "url"}
                    onChange={() => setThumbnailUploadMethod("url")}
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                  />
                  <label
                    htmlFor="thumbnail-url"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    URL
                  </label>
                </div>
              </div>
              {thumbnailUploadMethod === "upload" ? (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, "thumbnail")}
                  className={`border-2 border-dashed p-6 text-center rounded-md transition-colors ${
                    dragOver ? "border-blue-500 bg-blue-50" : "border-gray-300"
                  }`}
                >
                  {thumbnailPreview ? (
                    <img
                      src={thumbnailPreview}
                      alt="thumbnail preview"
                      className="max-w-full h-24 object-cover mx-auto rounded"
                    />
                  ) : editingProject?.thumbnail_image_url ? (
                    <Image
                      src={editingProject.thumbnail_image_url}
                      alt="current thumbnail"
                      width={96}
                      height={96}
                      className="max-w-full h-24 object-cover mx-auto rounded"
                    />
                  ) : (
                    <p>Drop thumbnail here</p>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleFileSelect(e.target.files?.[0] || null, "thumbnail")
                    }
                    className="hidden"
                    id="thumbnail-input"
                  />
                  <label
                    htmlFor="thumbnail-input"
                    className="cursor-pointer text-blue-500 hover:text-blue-600 font-medium"
                  >
                    Select File
                  </label>
                </div>
              ) : (
                <input
                  type="url"
                  required
                  value={formData.thumbnail_image_url}
                  onChange={(e) => setFormData({ ...formData, thumbnail_image_url: e.target.value })}
                  placeholder="Enter thumbnail image URL"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              )}
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
              <label className="block text-sm font-medium text-gray-700">Pages Images</label>
              <button
                type="button"
                onClick={() => {
                  addImageUrl();
                  setPagesImagesUploadMethods(prev => [...prev, "upload"]);
                  setSelectedPagesImages(prev => [...prev, null]);
                  setPagesImagesPreviews(prev => [...prev, null]);
                }}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                + Add Image
              </button>
            </div>
            {formData.pages_images_urls.map((url, index) => (
              <div key={index} className="mb-4 p-4 border border-gray-200 rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Image {index + 1}</span>
                  {formData.pages_images_urls.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        removeImageUrl(index);
                        setPagesImagesUploadMethods(prev => prev.filter((_, i) => i !== index));
                        setSelectedPagesImages(prev => prev.filter((_, i) => i !== index));
                        setPagesImagesPreviews(prev => prev.filter((_, i) => i !== index));
                      }}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id={`pages-upload-${index}`}
                      name={`pagesUploadMethod-${index}`}
                      value="upload"
                      checked={pagesImagesUploadMethods[index] === "upload"}
                      onChange={() => {
                        const newMethods = [...pagesImagesUploadMethods];
                        newMethods[index] = "upload";
                        setPagesImagesUploadMethods(newMethods);
                      }}
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                    />
                    <label
                      htmlFor={`pages-upload-${index}`}
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Upload
                    </label>
                  </div>
                  <div className="flex items-center ml-4">
                    <input
                      type="radio"
                      id={`pages-url-${index}`}
                      name={`pagesUploadMethod-${index}`}
                      value="url"
                      checked={pagesImagesUploadMethods[index] === "url"}
                      onChange={() => {
                        const newMethods = [...pagesImagesUploadMethods];
                        newMethods[index] = "url";
                        setPagesImagesUploadMethods(newMethods);
                      }}
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                    />
                    <label
                      htmlFor={`pages-url-${index}`}
                      className="ml-2 block text-sm text-gray-900"
                    >
                      URL
                    </label>
                  </div>
                </div>
                {pagesImagesUploadMethods[index] === "upload" ? (
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, "pages", index)}
                    className={`border-2 border-dashed p-4 text-center rounded-md transition-colors ${
                      dragOver ? "border-blue-500 bg-blue-50" : "border-gray-300"
                    }`}
                  >
                    {pagesImagesPreviews[index] ? (
                      <img
                        src={pagesImagesPreviews[index]!}
                        alt={`page preview ${index + 1}`}
                        className="max-w-full h-20 object-cover mx-auto rounded"
                      />
                    ) : editingProject?.pages_images_urls[index] ? (
                      <Image
                        src={editingProject.pages_images_urls[index]}
                        alt={`current page ${index + 1}`}
                        width={80}
                        height={80}
                        className="max-w-full h-20 object-cover mx-auto rounded"
                      />
                    ) : (
                      <p>Drop image here</p>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleFileSelect(e.target.files?.[0] || null, "pages", index)
                      }
                      className="hidden"
                      id={`pages-input-${index}`}
                    />
                    <label
                      htmlFor={`pages-input-${index}`}
                      className="cursor-pointer text-blue-500 hover:text-blue-600 font-medium text-sm"
                    >
                      Select File
                    </label>
                  </div>
                ) : (
                  <input
                    type="url"
                    placeholder="Image URL"
                    value={url}
                    onChange={(e) => {
                      const newUrls = [...formData.pages_images_urls];
                      newUrls[index] = e.target.value;
                      setFormData({ ...formData, pages_images_urls: newUrls });
                    }}
                    className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                )}
              </div>
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Project Concept Name</label>
            <input
              type="text"
              required
              value={formData.project_concept_name}
              onChange={(e) => setFormData({ ...formData, project_concept_name: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
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
                <input
                  type="text"
                  placeholder="End Title"
                  value={concept.end_title}
                  onChange={(e) => {
                    const newConcepts = [...formData.project_concepts];
                    newConcepts[index].end_title = e.target.value;
                    setFormData({ ...formData, project_concepts: newConcepts });
                  }}
                  className="border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mt-2"
                />
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
              <div className="flex items-center mb-2">
                <label className="block text-sm font-medium text-gray-700 mr-4">
                  Second Thumbnail
                </label>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="second-thumbnail-upload"
                    name="secondThumbnailUploadMethod"
                    value="upload"
                    checked={secondThumbnailUploadMethod === "upload"}
                    onChange={() => setSecondThumbnailUploadMethod("upload")}
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                  />
                  <label
                    htmlFor="second-thumbnail-upload"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Upload
                  </label>
                </div>
                <div className="flex items-center ml-4">
                  <input
                    type="radio"
                    id="second-thumbnail-url"
                    name="secondThumbnailUploadMethod"
                    value="url"
                    checked={secondThumbnailUploadMethod === "url"}
                    onChange={() => setSecondThumbnailUploadMethod("url")}
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                  />
                  <label
                    htmlFor="second-thumbnail-url"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    URL
                  </label>
                </div>
              </div>
              {secondThumbnailUploadMethod === "upload" ? (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, "secondThumbnail")}
                  className={`border-2 border-dashed p-6 text-center rounded-md transition-colors ${
                    dragOver ? "border-blue-500 bg-blue-50" : "border-gray-300"
                  }`}
                >
                  {secondThumbnailPreview ? (
                    <img
                      src={secondThumbnailPreview}
                      alt="second thumbnail preview"
                      className="max-w-full h-24 object-cover mx-auto rounded"
                    />
                  ) : editingProject?.second_thumbnail_url ? (
                    <Image
                      src={editingProject.second_thumbnail_url}
                      alt="current second thumbnail"
                      width={96}
                      height={96}
                      className="max-w-full h-24 object-cover mx-auto rounded"
                    />
                  ) : (
                    <p>Drop second thumbnail here</p>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleFileSelect(e.target.files?.[0] || null, "secondThumbnail")
                    }
                    className="hidden"
                    id="second-thumbnail-input"
                  />
                  <label
                    htmlFor="second-thumbnail-input"
                    className="cursor-pointer text-blue-500 hover:text-blue-600 font-medium"
                  >
                    Select File
                  </label>
                </div>
              ) : (
                <input
                  type="url"
                  required
                  value={formData.second_thumbnail_url}
                  onChange={(e) => setFormData({ ...formData, second_thumbnail_url: e.target.value })}
                  placeholder="Enter second thumbnail URL"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              )}
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

          {/* Client Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Client Company Name</label>
              <input
                type="text"
                required
                value={formData.client_company_name}
                onChange={(e) => setFormData({ ...formData, client_company_name: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <div className="flex items-center mb-2">
                <label className="block text-sm font-medium text-gray-700 mr-4">
                  Company Logo
                </label>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="company-logo-upload"
                    name="companyLogoUploadMethod"
                    value="upload"
                    checked={companyLogoUploadMethod === "upload"}
                    onChange={() => setCompanyLogoUploadMethod("upload")}
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                  />
                  <label
                    htmlFor="company-logo-upload"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Upload
                  </label>
                </div>
                <div className="flex items-center ml-4">
                  <input
                    type="radio"
                    id="company-logo-url"
                    name="companyLogoUploadMethod"
                    value="url"
                    checked={companyLogoUploadMethod === "url"}
                    onChange={() => setCompanyLogoUploadMethod("url")}
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                  />
                  <label
                    htmlFor="company-logo-url"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    URL
                  </label>
                </div>
              </div>
              {companyLogoUploadMethod === "upload" ? (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, "companyLogo")}
                  className={`border-2 border-dashed p-6 text-center rounded-md transition-colors ${
                    dragOver ? "border-blue-500 bg-blue-50" : "border-gray-300"
                  }`}
                >
                  {companyLogoPreview ? (
                    <img
                      src={companyLogoPreview}
                      alt="company logo preview"
                      className="max-w-full h-24 object-cover mx-auto rounded"
                    />
                  ) : editingProject?.company_logo_url ? (
                    <Image
                      src={editingProject.company_logo_url}
                      alt="current company logo"
                      width={96}
                      height={96}
                      className="max-w-full h-24 object-cover mx-auto rounded"
                    />
                  ) : (
                    <p>Drop company logo here</p>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleFileSelect(e.target.files?.[0] || null, "companyLogo")
                    }
                    className="hidden"
                    id="company-logo-input"
                  />
                  <label
                    htmlFor="company-logo-input"
                    className="cursor-pointer text-blue-500 hover:text-blue-600 font-medium"
                  >
                    Select File
                  </label>
                </div>
              ) : (
                <input
                  type="url"
                  required
                  value={formData.company_logo_url}
                  onChange={(e) => setFormData({ ...formData, company_logo_url: e.target.value })}
                  placeholder="Enter company logo URL"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Client Comment</label>
            <textarea
              required
              rows={3}
              value={formData.client_comment}
              onChange={(e) => setFormData({ ...formData, client_comment: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              disabled={isUploading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              {isUploading
                ? "Uploading..."
                : editingProject
                ? "Update"
                : "Create"}
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

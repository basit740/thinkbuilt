/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import {
  useGetReviewsQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} from "@/store/api/reviewsApi";
import { useCreateImageMutation } from "@/store/api/imagesApi";
import { uploadFileUsingAxios } from "@/lib/uploadFile";
import PopupModal from "@/app/components/ui/PopupModal";
import Table from "@/app/components/ui/Table";
import Image from "next/image";

interface Review {
  _id: string;
  founderName: string;
  review: string;
  companyName: string;
  companyLogoUrl?: string;
  founderImageUrl?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function AdminReviews() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: reviewsData,
    isLoading,
    refetch,
  } = useGetReviewsQuery({ page, limit, search: searchTerm });
  const [createReview] = useCreateReviewMutation();
  const [updateReview] = useUpdateReviewMutation();
  const [deleteReview] = useDeleteReviewMutation();
  const [createImage] = useCreateImageMutation();

  const [showForm, setShowForm] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [formData, setFormData] = useState({
    founderName: "",
    review: "",
    companyName: "",
    companyLogoUrl: "",
    founderImageUrl: "",
  });

  // States for file upload and preview
  const [selectedCompanyLogo, setSelectedCompanyLogo] = useState<File | null>(
    null
  );
  const [companyLogoPreview, setCompanyLogoPreview] = useState<string | null>(
    null
  );
  const [selectedFounderImage, setSelectedFounderImage] = useState<File | null>(
    null
  );
  const [founderImagePreview, setFounderImagePreview] = useState<string | null>(
    null
  );
  const [isUploading, setIsUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [logoUploadMethod, setLogoUploadMethod] = useState<"upload" | "url">(
    "upload"
  );
  const [founderImageUploadMethod, setFounderImageUploadMethod] = useState<
    "upload" | "url"
  >("upload");

  const reviews = reviewsData?.reviews || [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    try {
      let companyLogoUrl = formData.companyLogoUrl;
      let founderImageUrl = formData.founderImageUrl;

      // Upload company logo if selected
      if (logoUploadMethod === "upload" && selectedCompanyLogo) {
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
          title: `${formData.companyName} Logo`,
          url: fullImageUrl,
          alt: `${formData.companyName} logo`,
          category: "logos",
        });
        companyLogoUrl = fullImageUrl;
      }

      // Upload founder image if selected
      if (founderImageUploadMethod === "upload" && selectedFounderImage) {
        const { uploadUrl, filePath } = await fetch("/api/signed-url", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mimeType: selectedFounderImage.type }),
        }).then((res) => res.json());

        await uploadFileUsingAxios({
          url: uploadUrl,
          file: selectedFounderImage,
          fileType: selectedFounderImage.type,
        });

        const fullImageUrl = `${process.env.NEXT_PUBLIC_DO_SPACE_CDN_URL}/${filePath}`;
        await createImage({
          title: `${formData.founderName} Image`,
          url: fullImageUrl,
          alt: `${formData.founderName} image`,
          category: "founders",
        });
        founderImageUrl = fullImageUrl;
      }

      const dataToSend = { ...formData, companyLogoUrl, founderImageUrl };

      if (editingReview) {
        await updateReview({ id: editingReview._id, review: dataToSend });
      } else {
        await createReview(dataToSend);
      }

      setShowForm(false);
      setEditingReview(null);
      resetForm();
      refetch();
    } catch (error) {
      console.error("Error saving review:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleEdit = (review: Review) => {
    setEditingReview(review);
    setFormData({
      founderName: review.founderName,
      review: review.review,
      companyName: review.companyName,
      companyLogoUrl: review.companyLogoUrl || "",
      founderImageUrl: review.founderImageUrl || "",
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this review?")) {
      try {
        await deleteReview(id);
        refetch();
      } catch (error) {
        console.error("Error deleting review:", error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      founderName: "",
      review: "",
      companyName: "",
      companyLogoUrl: "",
      founderImageUrl: "",
    });
    setSelectedCompanyLogo(null);
    setCompanyLogoPreview(null);
    setSelectedFounderImage(null);
    setFounderImagePreview(null);
  };

  const cancelEdit = () => {
    setShowForm(false);
    setEditingReview(null);
    resetForm();
  };

  // Handle file selection and preview generation
  const handleFileSelect = (file: File | null, type: "logo" | "founder") => {
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
      if (type === "logo") {
        setSelectedCompanyLogo(file);
        const reader = new FileReader();
        reader.onload = (e) =>
          setCompanyLogoPreview(e.target?.result as string);
        reader.readAsDataURL(file);
      } else {
        setSelectedFounderImage(file);
        const reader = new FileReader();
        reader.onload = (e) =>
          setFounderImagePreview(e.target?.result as string);
        reader.readAsDataURL(file);
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

  const handleDrop = (e: React.DragEvent, type: "logo" | "founder") => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file, type);
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Reviews Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          Add Review
        </button>
      </div>

      {/* Form Modal */}
      <PopupModal
        isOpen={showForm}
        onClose={cancelEdit}
        title={editingReview ? "Edit Review" : "Add New Review"}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4 text-black">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Founder Name
              </label>
              <input
                type="text"
                required
                value={formData.founderName}
                onChange={(e) =>
                  setFormData({ ...formData, founderName: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Company Name
              </label>
              <input
                type="text"
                required
                value={formData.companyName}
                onChange={(e) =>
                  setFormData({ ...formData, companyName: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Review
            </label>
            <textarea
              required
              rows={4}
              value={formData.review}
              onChange={(e) =>
                setFormData({ ...formData, review: e.target.value })
              }
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center mb-2">
                <label className="block text-sm font-medium text-gray-700 mr-4">
                  Company Logo
                </label>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="logo-upload"
                    name="logoUploadMethod"
                    value="upload"
                    checked={logoUploadMethod === "upload"}
                    onChange={() => setLogoUploadMethod("upload")}
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                  />
                  <label
                    htmlFor="logo-upload"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Upload
                  </label>
                </div>
                <div className="flex items-center ml-4">
                  <input
                    type="radio"
                    id="logo-url"
                    name="logoUploadMethod"
                    value="url"
                    checked={logoUploadMethod === "url"}
                    onChange={() => setLogoUploadMethod("url")}
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                  />
                  <label
                    htmlFor="logo-url"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    URL
                  </label>
                </div>
              </div>
              {logoUploadMethod === "upload" ? (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, "logo")}
                  className={`border-2 border-dashed p-6 text-center rounded-md transition-colors ${
                    dragOver ? "border-blue-500 bg-blue-50" : "border-gray-300"
                  }`}
                >
                  {companyLogoPreview ? (
                    <img
                      src={companyLogoPreview}
                      alt="logo preview"
                      className="max-w-full h-24 object-cover mx-auto rounded"
                    />
                  ) : editingReview?.companyLogoUrl ? (
                    <Image
                      src={editingReview.companyLogoUrl}
                      alt="current logo"
                      width={96}
                      height={96}
                      className="max-w-full h-24 object-cover mx-auto rounded"
                    />
                  ) : (
                    <p>Drop logo here</p>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleFileSelect(e.target.files?.[0] || null, "logo")
                    }
                    className="hidden"
                    id="logo-input"
                  />
                  <label
                    htmlFor="logo-input"
                    className="cursor-pointer text-blue-500 hover:text-blue-600 font-medium"
                  >
                    Select File
                  </label>
                </div>
              ) : (
                <input
                  type="text"
                  value={formData.companyLogoUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, companyLogoUrl: e.target.value })
                  }
                  placeholder="Enter company logo URL"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                />
              )}
            </div>
            <div>
              <div className="flex items-center mb-2">
                <label className="block text-sm font-medium text-gray-700 mr-4">
                  Founder Image
                </label>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="founder-image-upload"
                    name="founderImageUploadMethod"
                    value="upload"
                    checked={founderImageUploadMethod === "upload"}
                    onChange={() => setFounderImageUploadMethod("upload")}
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                  />
                  <label
                    htmlFor="founder-image-upload"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Upload
                  </label>
                </div>
                <div className="flex items-center ml-4">
                  <input
                    type="radio"
                    id="founder-image-url"
                    name="founderImageUploadMethod"
                    value="url"
                    checked={founderImageUploadMethod === "url"}
                    onChange={() => setFounderImageUploadMethod("url")}
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                  />
                  <label
                    htmlFor="founder-image-url"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    URL
                  </label>
                </div>
              </div>
              {founderImageUploadMethod === "upload" ? (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, "founder")}
                  className={`border-2 border-dashed p-6 text-center rounded-md transition-colors ${
                    dragOver ? "border-blue-500 bg-blue-50" : "border-gray-300"
                  }`}
                >
                  {founderImagePreview ? (
                    <img
                      src={founderImagePreview}
                      alt="founder preview"
                      className="max-w-full h-32 w-40 object-cover object-top mx-auto rounded"
                    />
                  ) : editingReview?.founderImageUrl ? (
                    <Image
                      src={editingReview.founderImageUrl}
                      alt="current founder image"
                      width={96}
                      height={96}
                      className="max-w-full h-24 object-cover mx-auto rounded"
                    />
                  ) : (
                    <p>Drop founder image here</p>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleFileSelect(e.target.files?.[0] || null, "founder")
                    }
                    className="hidden"
                    id="founder-image-input"
                  />
                  <label
                    htmlFor="founder-image-input"
                    className="cursor-pointer text-blue-500 hover:text-blue-600 font-medium"
                  >
                    Select File
                  </label>
                </div>
              ) : (
                <input
                  type="text"
                  value={formData.founderImageUrl}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      founderImageUrl: e.target.value,
                    })
                  }
                  placeholder="Enter founder image URL"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                />
              )}
            </div>
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
                : editingReview
                ? "Update"
                : "Create"}
            </button>
          </div>
        </form>
      </PopupModal>

      <Table
        columns={[
          { header: "Founder Name", accessor: "founderName" },
          { header: "Company Name", accessor: "companyName" },
          { header: "Review", accessor: "review" },
          {
            header: "Actions",
            accessor: (item) => (
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
        data={reviews}
        totalCount={reviewsData?.total || 0}
        isLoading={isLoading}
        onPageChange={setPage}
        onLimitChange={setLimit}
        onSearch={setSearchTerm}
      />
    </div>
  );
}

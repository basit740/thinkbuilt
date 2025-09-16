import { apiSlice } from "./apiSlice";

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

export const projectsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query<{ projects: Project[], total: number }, { page?: number; limit?: number; search?: string }>({
      query: ({ page = 1, limit = 10, search = '' } = {}) => {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
          search,
        });
        return `/projects?${params.toString()}`;
      },
      providesTags: ["Projects"],
    }),
    getProject: builder.query<{ project: Project }, string>({
      query: (id) => `/projects/${id}`,
      providesTags: (result, error, id) => [{ type: "Projects", id }],
    }),
    createProject: builder.mutation<{ message: string; project: Project }, Partial<Project>>({
      query: (project) => ({
        url: "/projects",
        method: "POST",
        body: project,
      }),
      invalidatesTags: ["Projects"],
    }),
    updateProject: builder.mutation<{ message: string; project: Project }, { id: string; project: Partial<Project> }>({
      query: ({ id, project }) => ({
        url: `/projects/${id}`,
        method: "PUT",
        body: project,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Projects", id }, "Projects"],
    }),
    deleteProject: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/projects/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Projects"],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectsApi;
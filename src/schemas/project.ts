import { z } from "zod";

const technologyUsedSchema = z.object({
  tech_name: z.string().min(1, "Technology name is required").max(100, "Technology name too long"),
});

const projectConceptSchema = z.object({
  concept: z.string().min(1, "Concept is required").max(200, "Concept too long"),
  start_title: z.string().min(1, "Start title is required").max(200, "Start title too long"),
  start_desc: z.string().min(1, "Start description is required"),
  end_title: z.string().min(1, "End title is required").max(200, "End title too long"),
  end_desc: z.string().min(1, "End description is required"),
});

const resultSchema = z.object({
  value: z.string().min(1, "Value is required").max(100, "Value too long"),
  desc: z.string().min(1, "Description is required"),
});

export const createProjectSchema = z.object({
  project_name: z.string().min(1, "Project name is required").max(200, "Project name too long"),
  project_summary: z.string().min(1, "Project summary is required").max(500, "Project summary too long"),
  client_name: z.string().min(1, "Client name is required").max(100, "Client name too long"),
  completion_date: z.string().min(1, "Completion date is required").refine((date) => !isNaN(Date.parse(date)), "Invalid date format"),
  thumbnail_image_url: z.string().url("Invalid thumbnail image URL"),
  project_overview: z.string().min(1, "Project overview is required"),
  technology_used: z.array(technologyUsedSchema).min(1, "At least one technology is required").max(20, "Too many technologies"),
  pages_images_urls: z.array(z.string().url("Invalid image URL")).max(50, "Too many page images"),
  project_concepts: z.array(projectConceptSchema).min(1, "At least one project concept is required").max(10, "Too many project concepts"),
  second_thumbnail_url: z.string().url("Invalid second thumbnail image URL"),
  key_feature: z.string().min(1, "Key feature is required"),
  the_results: z.array(resultSchema).min(1, "At least one result is required").max(10, "Too many results"),
});

export const updateProjectSchema = createProjectSchema.partial();

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
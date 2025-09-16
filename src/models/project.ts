import mongoose, { Document, Schema } from "mongoose";

export interface IProject extends Document {
  project_name: string;
  project_summary: string;
  client_name: string;
  completion_date: Date;
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
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<IProject>(
  {
    project_name: {
      type: String,
      required: true,
      trim: true,
    },
    project_summary: {
      type: String,
      required: true,
      trim: true,
    },
    client_name: {
      type: String,
      required: true,
      trim: true,
    },
    completion_date: {
      type: Date,
      required: true,
    },
    thumbnail_image_url: {
      type: String,
      required: true,
      trim: true,
    },
    project_overview: {
      type: String,
      required: true,
    },
    technology_used: [{
      tech_name: {
        type: String,
        required: true,
        trim: true,
      }
    }],
    pages_images_urls: [{
      type: String,
      trim: true,
    }],
    project_concepts: [{
      concept: {
        type: String,
        required: true,
        trim: true,
      },
      start_title: {
        type: String,
        required: true,
        trim: true,
      },
      start_desc: {
        type: String,
        required: true,
      },
      end_title: {
        type: String,
        required: true,
        trim: true,
      },
      end_desc: {
        type: String,
        required: true,
      },
    }],
    second_thumbnail_url: {
      type: String,
      required: true,
      trim: true,
    },
    key_feature: {
      type: String,
      required: true,
    },
    the_results: [{
      value: {
        type: String,
        required: true,
        trim: true,
      },
      desc: {
        type: String,
        required: true,
      },
    }],
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.models.Project || mongoose.model<IProject>("Project", projectSchema);

export default Project;
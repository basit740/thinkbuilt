import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/libs/dbConfig";
import Project from "@/models/project";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

// GET /api/projects - Get all projects (admin only)
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connect();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const searchTerm = searchParams.get('search') || '';

    interface ProjectQuery {
      $or?: { [key: string]: { $regex: string; $options: string } }[];
    }

    const query: ProjectQuery = {};

    if (searchTerm) {
      query.$or = [
        { project_name: { $regex: searchTerm, $options: 'i' } },
        { project_summary: { $regex: searchTerm, $options: 'i' } },
        { client_name: { $regex: searchTerm, $options: 'i' } },
        { project_overview: { $regex: searchTerm, $options: 'i' } },
      ];
    }

    const projects = await Project.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Project.countDocuments(query);

    return NextResponse.json({ projects, total }, { status: 200 });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/projects - Create new project (admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connect();

    const body = await request.json();

    // Validate required fields
    const requiredFields = [
      'project_name', 'project_summary', 'client_name', 'completion_date',
      'thumbnail_image_url', 'project_overview', 'technology_used',
      'pages_images_urls', 'project_concept_name', 'project_concepts', 'second_thumbnail_url',
      'key_feature', 'the_results', 'company_logo_url', 'client_comment', 'client_company_name', 'time_duration'
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    const project = new Project({
      ...body,
      completion_date: new Date(body.completion_date),
    });

    await project.save();

    return NextResponse.json(
      { message: "Project created successfully", project },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
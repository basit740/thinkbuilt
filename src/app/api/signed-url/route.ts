import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "crypto";
import { getExtension } from "../../../utils/helpers/getExtension";
import { ApiResponse } from "../../../helper/ApiResponse";

// Initialize S3 client for DigitalOcean Spaces
const s3Client = new S3Client({
  endpoint: process.env.DO_SPACE_END_POINT,
  forcePathStyle: false,
  region: process.env.DO_SPACE_REGION,
  credentials: {
    accessKeyId: process.env.DO_SPACE_ACCESS_KEY!,
    secretAccessKey: process.env.DO_SPACE_SECRET_KEY!,
  },
});

const bucketName = process.env.DO_SPACE_BUCKET_NAME!;

/**
 * POST /api/signed-url - Generate signed URL for image upload
 * @param req - Request containing mimeType
 * @returns Response with uploadUrl and filePath
 */
export async function POST(req: NextRequest) {
  try {
    const { mimeType } = await req.json();

    // Validate mimeType
    if (!mimeType) {
      return new ApiResponse(400, "MimeType is required").toNextResponse();
    }

    // Get file extension from mimeType
    const extension = getExtension(mimeType);

    // Generate unique file path
    const filePath = `tbs/${randomUUID()}.${extension}`;

    // Create put object command
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: filePath,
      ContentType: mimeType,
      ACL: "public-read",
    });

    // Generate signed URL
    const uploadUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 3600, // 1 hour
    });

    return NextResponse.json({ uploadUrl, filePath });
  } catch (error) {
    console.error("Error generating signed URL:", error);
    return new ApiResponse(500, "Error Getting Signed Url").toNextResponse();
  }
}
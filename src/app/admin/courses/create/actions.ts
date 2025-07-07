"use server";

import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import { courseSchema, CourseSchemaType } from "@/lib/zodSchema";

export async function CreateCourse(
  values: CourseSchemaType
): Promise<ApiResponse> {
  try {
    const validation = courseSchema.safeParse(values);

    if (!validation.success) {
      throw {
        status: "error",
        message: "Invalid Form Data",
      };
    }

    const data = await prisma.course.create({
      data: {
        ...validation.data,
        userId: "",
      },
    });

    return {
      status: "success",
      message: "Course created successfully",
    };
  } catch (error) {
    return {
      status: "error",
      message: "Failed to create course",
    };
  }
}

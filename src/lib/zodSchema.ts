import z from "zod";

export const courseLevels = ["Beginner", "Intermediate", "Advanced"] as const;
export const courseStatus = ["Draft", "Published", "Archived"] as const;
export const courseCategories = [
  "Development",
  "Finance",
  "Business",
  "IT & Software",
  "Personal Developement",
  "Communication Skills",
  "Marketing",
  "Health & Fitness",
  "Design",
  "Office Productivity",
  "Music",
  "Teaching and Academic",
] as const;

export const courseSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(100, { message: "Title must be no more than 100 characters long" }),
  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters long" })
    .max(2000, {
      message: "Description must be no more than 2000 characters long",
    }),
  fileKey: z.string().min(1, { message: "File key is required" }),
  price: z.coerce.number().min(1, { message: "Price must be at least $1" }),
  duration: z.coerce
    .number()
    .min(500, { message: "Duration must be at least 500 minutes" }),
  level: z.enum(courseLevels, {
    message: "Level must be one of: Beginner, Intermediate, or Advanced",
  }),
  category: z.enum(courseCategories, { message: "Category is required" }),
  smallDescription: z
    .string()
    .min(3, { message: "Small description must be at least 3 characters long" })
    .max(200, {
      message: "Small description must be no more than 200 characters long",
    }),
  slug: z
    .string()
    .min(3, { message: "Slug must be at least 3 characters long" }),
  status: z.enum(courseStatus, {
    message: "Status must be one of: Draft, Published, or Archived",
  }),
});

export const chapterSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" }),
  courseId: z.string().uuid({ message: "Invalid course Id" }),
});

export const lessonSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" }),
  courseId: z.string().uuid({ message: "Invalid Course Id" }),
  chapterId: z.string().uuid({ message: "Invalid Chapter Id" }),
  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters long" })
    .optional(),
  thumbnailKey: z.string().optional(),
  videoKey: z.string().optional(),
});

export type CourseSchemaType = z.infer<typeof courseSchema>;
export type ChapterSchemaType = z.infer<typeof chapterSchema>;
export type LessonSchemaType = z.infer<typeof lessonSchema>;

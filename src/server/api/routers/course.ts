import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const courseRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ctx}) => {
    const courses = await ctx.prisma.course.findMany({
      select: {
        id: true,
        name: true,
      }
    })

    if (!courses) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "No courses found",
      });
    }

    return courses;
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { id } = input;
      console.log("ID: ",id)
      const course = await ctx.prisma.course.findUnique({
        where: {
          id,
        },
        select: {
          name: true,
          holes: {
            select: {
              id: true,
              number: true,
              par: true,
              handicap: true,
            },
            orderBy: {
              number: 'asc',
            }
          },
        },
      });

      if (!course) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Could not find course by ID",
        });
      }

      return course;
    }),
});

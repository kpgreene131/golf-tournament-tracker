import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const courseRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { id } = input;
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
          },
        },
      });

      if (!course) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Could not find course by ID",
        });
      }

      return { course };
    }),
});

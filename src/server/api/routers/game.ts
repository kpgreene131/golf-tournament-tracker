import { useMutation } from "@tanstack/react-query";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const gameRouter = createTRPCRouter({
    create: publicProcedure.input(z.object({players: z.object({name: z.string(), handicap: z.number()}).array()}))useMutation.(async {
        r
    }),
})
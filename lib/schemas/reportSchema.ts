import { z } from "zod";

export const reportSchema = z.object({
    user: z.string(),
    reason: z.string()
});
import { pgTable, text, serial, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const resources = pgTable("resources", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  url: text("url").notNull(),
  category: text("category").notNull(), // 'math' or 'coding'
  type: text("type").notNull(), // 'website' or 'app'
  imageUrl: text("image_url"),
});

export const insertResourceSchema = createInsertSchema(resources).omit({ id: true });

export type Resource = typeof resources.$inferSelect;
export type InsertResource = z.infer<typeof insertResourceSchema>;

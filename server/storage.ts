import { db } from "./db";
import { resources, type Resource, type InsertResource } from "@shared/schema";
import { eq, like, or } from "drizzle-orm";

export interface IStorage {
  getResources(category?: string, search?: string): Promise<Resource[]>;
  getResource(id: number): Promise<Resource | undefined>;
  createResource(resource: InsertResource): Promise<Resource>;
}

export class DatabaseStorage implements IStorage {
  async getResources(category?: string, search?: string): Promise<Resource[]> {
    let query = db.select().from(resources);
    
    if (category && category !== 'all') {
      // @ts-ignore
      query.where(eq(resources.category, category));
    }

    if (search) {
      // Simple search implementation
      // @ts-ignore
      query.where(or(
        like(resources.title, `%${search}%`),
        like(resources.description, `%${search}%`)
      ));
    }

    return await query;
  }

  async getResource(id: number): Promise<Resource | undefined> {
    const [resource] = await db.select().from(resources).where(eq(resources.id, id));
    return resource;
  }

  async createResource(insertResource: InsertResource): Promise<Resource> {
    const [resource] = await db.insert(resources).values(insertResource).returning();
    return resource;
  }
}

export const storage = new DatabaseStorage();

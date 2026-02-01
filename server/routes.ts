import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get(api.resources.list.path, async (req, res) => {
    const category = req.query.category as string | undefined;
    const search = req.query.search as string | undefined;
    const resources = await storage.getResources(category, search);
    res.json(resources);
  });

  app.get(api.resources.get.path, async (req, res) => {
    const resource = await storage.getResource(Number(req.params.id));
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    res.json(resource);
  });

  app.post(api.resources.create.path, async (req, res) => {
    try {
      const input = api.resources.create.input.parse(req.body);
      const resource = await storage.createResource(input);
      res.status(201).json(resource);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // Seed initial data
  seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existing = await storage.getResources();
  if (existing.length === 0) {
    const initialResources = [
      {
        title: "Khan Academy",
        description: "Comprehensive math lessons for all levels, from basic arithmetic to advanced calculus.",
        url: "https://www.khanacademy.org/math",
        category: "math",
        type: "website"
      },
      {
        title: "freeCodeCamp",
        description: "Learn to code for free with interactive lessons, projects, and certifications.",
        url: "https://www.freecodecamp.org",
        category: "coding",
        type: "website"
      },
      {
        title: "Desmos Graphing Calculator",
        description: "Powerful and free online graphing calculator.",
        url: "https://www.desmos.com/calculator",
        category: "math",
        type: "website"
      },
      {
        title: "MDN Web Docs",
        description: "Resources for developers, by developers. The best place to learn web technologies.",
        url: "https://developer.mozilla.org",
        category: "coding",
        type: "website"
      },
      {
        title: "Photomath",
        description: "Scan math problems for instant step-by-step solutions.",
        url: "https://photomath.com",
        category: "math",
        type: "app"
      },
      {
        title: "Sololearn",
        description: "Learn to code on the go with bite-sized lessons.",
        url: "https://www.sololearn.com",
        category: "coding",
        type: "app"
      },
      {
        title: "Paul's Online Math Notes",
        description: "Extensive notes and tutorials for Algebra, Calculus, and Differential Equations.",
        url: "https://tutorial.math.lamar.edu",
        category: "math",
        type: "website"
      },
      {
        title: "The Odin Project",
        description: "A full stack curriculum that is free and open source.",
        url: "https://www.theodinproject.com",
        category: "coding",
        type: "website"
      }
    ];

    for (const r of initialResources) {
      await storage.createResource(r);
    }
    console.log("Database seeded with initial resources");
  }
}

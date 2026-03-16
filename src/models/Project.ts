import mongoose, { Schema, model, models } from "mongoose";

const ProjectSchema = new Schema({
  name: { type: String, default: "DIRECTOR_MAIN_BOARD" },
  scenes: { type: Array, default: [] }, // Flexible array
  updatedAt: { type: Date, default: Date.now }
});

export const Project = models.Project || model("Project", ProjectSchema);
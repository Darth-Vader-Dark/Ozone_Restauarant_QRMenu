import mongoose, { Schema, Document } from 'mongoose';

export interface IMenuItem {
  id: string;
  name: string;
  description: string;
  descriptionRw: string;
  price: number;
  image: string;
}

export interface IMenuCategory {
  id: string;
  name: string;
  nameRw: string;
  items: IMenuItem[];
}

export interface IMenuCategoryDocument extends Document {
  id: string;
  name: string;
  nameRw: string;
  items: IMenuItem[];
  createdAt: Date;
  updatedAt: Date;
}

const MenuItemSchema = new Schema<IMenuItem>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  descriptionRw: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
});

const MenuCategorySchema = new Schema<IMenuCategoryDocument>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  nameRw: { type: String, required: true },
  items: [MenuItemSchema],
}, {
  timestamps: true,
});

export default mongoose.models.MenuCategory || mongoose.model<IMenuCategoryDocument>('MenuCategory', MenuCategorySchema);

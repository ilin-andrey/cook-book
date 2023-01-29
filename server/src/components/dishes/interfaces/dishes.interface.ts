export interface Dish {
  id: string;
  title: string;
  description: string;
  duration: number; // in seconds
  complexity: number;
  imageUrl: string | null;
}
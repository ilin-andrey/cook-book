export interface Dish {
  id: string;
  title: string;
  description: string;
  duration: number; // in seconds
  complexity: number; // from 1 to 5
  imageUrl: string;
}

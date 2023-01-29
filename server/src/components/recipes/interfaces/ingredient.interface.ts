export enum BaseUnits {
  pieces = "pieces",
  mg = "mg",
  ml = "ml",
}

export interface RecipeIngredient {
  id: string;
  ingredientId: string;
  amount: number;
  units: BaseUnits;
}

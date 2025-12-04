// Building configuration type
export interface BuildingConfig {
  id: string;
  tileType: number;
  positions: { x: number; y: number }[];
  label: string;
  description: string;
  route: string;
  color: string;
  colorDark: string;
  autoNavigate?: boolean; // If true, automatically navigate when player steps on it
  customLabel?: string; // Custom label to display on the building (e.g., date for blog posts)
  customData?: any; // Additional data for the building (e.g., post content)
  imagePath?: string; // Optional image path to render instead of colored box
}


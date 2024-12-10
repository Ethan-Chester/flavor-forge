export interface Recipe {
    id: number;
    name: string; 
    image_path: string;
    ingredients: Array<{ id: number; name: string }>; 
    tags: Array<{ id: number; name: string }>; 
    steps: Array<{ id: number; step_num: number; content: string }>; 
    likes: number;
  }
  
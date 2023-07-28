export interface Book {
  id: number;
  author_id: number;
  cover_image: string;
  isbn: string;
  pages: number;
  releaseDate: string;
  title: string;
  read?: boolean;
}

import { Post } from 'src/utils/typeorm';
export interface IPostService {
  createPost: () => Promise<Post>;
}

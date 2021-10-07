import fs from 'fs'
import path from 'path';
import matter, { GrayMatterFile } from 'gray-matter';
import { IdObject } from '../model/id-object';
import { PostParam } from '../model/post-param';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData(): IdObject[] {
  // Get file names under /posts
  const fileNames: string[] = fs.readdirSync(postsDirectory);
  const allPostsData: IdObject[] = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id: string = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath: string = path.join(postsDirectory, fileName);
    const fileContents : string = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult: GrayMatterFile<string> = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data
    }
  });

  // Sort posts by date
  return allPostsData.sort(({ date: a }, { date: b }) => {
    let result = 0;
    if (a < b) {
      result = 1;
    } else if (a > b) {
      result = -1;
    }
    return result;
  });
}

export function getAllPostIds(): PostParam[] {
  const fileNames: string[] = fs.readdirSync(postsDirectory);

  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  });
}

export function getPostData(id: string): IdObject {
  const fullPath: string = path.join(postsDirectory, `${id}.md`);
  const fileContents: string = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult: GrayMatterFile<string> = matter(fileContents);

  // Combine the data with the id
  return {
    id,
    ...matterResult.data
  }
}


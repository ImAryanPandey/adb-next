// Use next-sanity's built-in image builder (Cleanest way)
import createImageUrlBuilder from '@sanity/image-url';
import { dataset, projectId } from './client';

// Define the type manually if the package is being fussy, 
// or use the specific one if available. 
// This acts as a 'pass-through' to satisfy TypeScript.
type SanityImageSource = Parameters<ReturnType<typeof createImageUrlBuilder>['image']>[0];

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
});

export const urlFor = (source: SanityImageSource) => {
  return imageBuilder.image(source);
};
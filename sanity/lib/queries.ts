import { groq } from "next-sanity";

export const POSTS_QUERY = groq`
  *[_type == "post"] | order(date desc) {
    _id,
    title,
    "slug": slug.current,
    kind,
    date,
    location,
    excerpt,
    content,
    coords,
 audio{
  asset->{
    url
  }
},   audioTitle,
    images[]{
      asset->{
        _id,
        url
      }
    },
    transcriptSegments
  }
`;

export const MAP_POSTS_QUERY = groq`
  *[_type == "post" && defined(coords.lat) && defined(coords.lng)] | order(date asc) {
    _id,
    title,
    date,
    location,
    "slug": slug.current,
    coords
  }
`;

export const POST_BY_SLUG_QUERY = groq`
  *[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    kind,
    date,
    location,
    excerpt,
    content,
    coords,
    audio{
     asset->{
      url
     }
    },    
    audioTitle,
    images[]{
      asset->{
        _id,
        url
      }
    },
    transcriptSegments
  }
`;
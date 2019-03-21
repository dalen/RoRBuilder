export const SET_SLUG = 'set_slug';

export function setSlug(slug: string) {
  return {
    type: SET_SLUG,
    payload: slug,
  };
}

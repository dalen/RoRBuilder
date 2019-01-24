export const SET_SLUG = 'set_slug';

export function setSlug(slug) {
  return {
    type: SET_SLUG,
    payload: slug,
  };
}

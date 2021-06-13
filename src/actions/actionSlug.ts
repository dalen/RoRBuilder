export const SET_SLUG = 'set_slug';

export function setSlug(slug: string): {
  type: 'set_slug';
  payload: string;
} {
  return {
    type: SET_SLUG,
    payload: slug,
  };
}

export type ActionSlug = ReturnType<typeof setSlug>;

export const SET_SHARING_LINK = 'set_sharing_link';

export function setSharingLink(
  link: string,
): {
  type: 'set_sharing_link';
  payload: string;
} {
  return {
    type: SET_SHARING_LINK,
    payload: link,
  };
}

export type ActionSharingLink = ReturnType<typeof setSharingLink>;

export const SET_SHARING_LINK = 'set_sharing_link';

export function setSharingLink(link: string) {
  return {
    type: SET_SHARING_LINK,
    payload: link,
  } as const;
}

export type ActionSharingLink = ReturnType<typeof setSharingLink>;

import type { ReactElement } from 'react';

export const ErrorMessage = ({
  message,
  name,
  customText,
}: {
  message?: string;
  name?: string;
  customText?: string | null;
}): ReactElement => (
  <div className="notification is-danger">
    <p>Something went wrong :(</p>
    {name && <pre>{name}</pre>}
    {message && <pre>{message}</pre>}
    {customText}
  </div>
);

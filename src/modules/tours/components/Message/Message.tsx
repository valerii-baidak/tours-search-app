import type { ReactNode } from 'react';
import clsx from 'clsx';

import styles from './Message.module.css';

type Props = {
  children: ReactNode;
  isError?: boolean;
};

export const Message = ({ children, isError = false }: Props) => (
  <div className={clsx(styles.message, isError && styles.error)}>{children}</div>
);

export default Message;

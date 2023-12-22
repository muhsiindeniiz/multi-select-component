import { PropsWithChildren } from 'react';

export type LoadingProps = PropsWithChildren & {
    message?: React.ReactNode
    height?: string
};

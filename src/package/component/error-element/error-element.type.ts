import { PropsWithChildren } from 'react';

export type ErrorElementProps = PropsWithChildren & {
    title: string;
    description: string;
    showNavigateBack?: boolean;
};

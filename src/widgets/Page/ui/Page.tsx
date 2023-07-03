import { Box, Container } from '@mui/material';
import { ReactNode } from 'react';

interface PageProps {
    children: ReactNode;
}

export const Page = ({ children }: PageProps) => {
    return (
        <Container maxWidth="xl">
            <Box padding="24px" display="flex">
                {children}
            </Box>
        </Container>
    );
};

import { Box } from '@mui/material';
import { memo } from 'react';
import { Word as WordType } from '../../model/types/WordSchema';
import { wordColors } from '../../model/consts/wordColors';

type WordProps = WordType;

export const WordItem = memo(({ value, complexity }: WordProps) => {
    return (
        <Box
            p="12px"
            borderRadius="12px"
            sx={{ bgcolor: wordColors[complexity] }}
            width="100%"
            textAlign="center"
            fontSize="22px"
            color="white"
        >
            {value}
        </Box>
    );
});

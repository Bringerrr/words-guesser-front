import { Box, List, ListItem } from '@mui/material';
import { WordItem, Word } from '@/entities/Word';

interface WordsListProps {
    words: Word[];
    show: boolean;
}

export const WordsLists = ({ words, show }: WordsListProps) => {
    const groupByComplexity = () => {
        const groups: Word[][] = [[], [], []];

        words.forEach((word) => {
            const complexity = word.complexity - 1;
            groups[complexity].push(word);
        });

        return groups;
    };

    const showWordsGrid = show && words && words?.length > 0;

    const groupedWords = groupByComplexity();

    return showWordsGrid ? (
        <Box display="flex" gap="0px" flexDirection="column">
            <List sx={{ display: 'flex' }}>
                {groupedWords[0].map((word) => (
                    <ListItem sx={{ display: 'flex' }} key={word.id}>
                        <WordItem {...word} />
                    </ListItem>
                ))}
            </List>
            <List sx={{ display: 'flex' }}>
                {groupedWords[1].map((word) => (
                    <ListItem sx={{ display: 'flex' }} key={word.id}>
                        <WordItem {...word} />
                    </ListItem>
                ))}
            </List>
            <List sx={{ display: 'flex' }}>
                {groupedWords[2].map((word) => (
                    <ListItem sx={{ display: 'flex' }} key={word.id}>
                        <WordItem {...word} />
                    </ListItem>
                ))}
            </List>
        </Box>
    ) : null;
};

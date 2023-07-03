const interfaceConst = 'interface';

module.exports = (componentName) => `import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './${componentName}.module.scss';
import { memo } from 'react';
import { Box } from '@mui/material';

${interfaceConst} ${componentName}Props {
    className?: string;
}

export const ${componentName} = memo((props: ${componentName}Props) => {
    const { className } = props;
    
    return (
        <Box className={classNames(cls.${componentName}, {}, [className])}>
           
        </Box>
    );
});`;

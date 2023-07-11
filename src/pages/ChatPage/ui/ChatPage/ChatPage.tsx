import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { Page } from '@/widgets/Page';
import { ChatRoom } from '@/widgets/ChatRoom';

interface ChatPageProps {
    className?: string;
}

export const ChatPage = memo((props: ChatPageProps) => {
    const { className } = props;

    const params = useParams();

    console.log('params', params);

    return (
        <Page>
            <ChatRoom id={params?.id} />
        </Page>
    );
});

type Props = {
    conversationId?: string;
    onBack?: () => void;
}

const ChatInfo = ({ conversationId, onBack }: Props) => {
    return (
        <div className="bg-amber-500/50 w-1/4">ChatInfo</div>
    )
}

export default ChatInfo
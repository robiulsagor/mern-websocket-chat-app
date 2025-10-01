type Props = {
    conversationId: string;
    onBack?: () => void;
    onShowInfo?: () => void;
}

const ChatWindow = ({ conversationId, onBack, onShowInfo }: Props) => {
    return (
        <div className="border-r border-gray-800 flex-1">
            hello
            <button onClick={onBack}>Back</button>
            <button onClick={onShowInfo}>Show Info</button>
        </div>
    )
}

export default ChatWindow
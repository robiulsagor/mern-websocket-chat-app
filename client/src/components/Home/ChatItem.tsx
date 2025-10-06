import type { ChatItemInterface } from "@/types/chat"
import { Avatar, AvatarImage } from "../ui/avatar"

const ChatItem = ({ chat }: { chat: ChatItemInterface }) => {
    return (
        <button className="flex items-center gap-3 w-full rounded-lg p-2 text-left hover:bg-slate-200 cursor-pointer transition-all">
            <Avatar className="w-10 h-10">
                <AvatarImage src={chat.avatar} />
            </Avatar>

            <div>
                <p className="text-sm text-slate-800 font-medium">{chat.name}</p>
                <p className="text-xs text-muted-foreground truncate">
                    {chat.lastMessage ?? "No messages yet"}
                </p>
            </div>
        </button>
    )
}

export default ChatItem
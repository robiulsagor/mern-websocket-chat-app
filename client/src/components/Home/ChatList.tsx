import { CircleUser } from "lucide-react"
import { ScrollArea } from "../ui/scroll-area"
import SearchMessage from "./SearchMessage"
import type { ChatItemInterface } from "@/types/chat"
import { useState } from "react"
import ChatItem from "./ChatItem"

const ChatList = ({ chatList, loading, onSelectChat }: { chatList: ChatItemInterface[]; loading: boolean; onSelectChat: (id: string) => void }) => {
    const [searchTerm, setSearchTerm] = useState<string>("")
    const [isSearching, setIsSearching] = useState<boolean>(false)
    const [searchedItems, setSearchedItems] = useState<ChatItemInterface[]>([])


    return (
        <div className="h-screen w-full md:w-1/3 lg:w-1/4 bg-white border-r">
            <div className="flex-1">
                <h2 className="text-xl text-slate-700 font-bold pl-4 py-4 border-b border-b-slate-300">Beauty Chat</h2>
                <SearchMessage
                    chatList={chatList} setSearchedItems={setSearchedItems}
                    searchTerm={searchTerm} setSearchTerm={setSearchTerm}
                    setIsSearching={setIsSearching} />


                <ScrollArea className="h-[calc(100vh-150px)]">
                    <div className="space-y-2 p-2">
                        {
                            loading ? "Loading..." : isSearching ? "Searching..." : searchTerm && searchedItems.length === 0 ? "No results found" : searchedItems.length > 0 ? searchedItems.map(chat => (
                                <ChatItem key={chat.id} chat={chat} />
                            )) : chatList.length === 0 ? "No chats available" : chatList.map(chat => (
                                <ChatItem key={chat.id} chat={chat} />
                            ))
                        }
                    </div>
                </ScrollArea>

            </div>
            <div className="p-4">
                <div className="flex items-center gap-1" >
                    <CircleUser size={32} />
                    Robiul Islam Sagar
                </div>
            </div>
        </div>
    )
}

export default ChatList
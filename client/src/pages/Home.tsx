import ChatInfo from "@/components/Home/ChatInfo"
import ChatList from "@/components/Home/ChatList"
import ChatWindow from "@/components/Home/ChatWindow"
import { dummyChats } from "@/data/data"
import type { ChatItemInterface } from "@/types/chat"
import { useEffect, useState } from "react"
import { Helmet } from "react-helmet"

const Home = () => {
    const [chatList, setChatList] = useState<ChatItemInterface[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [activeChat, setActiveChat] = useState<string | null>("null")


    const [mobileView, setMobileView] = useState<"chatList" | "chatWindow" | "chatInfo">("chatList")
    console.log(mobileView);

    useEffect(() => {
        setTimeout(() => {
            setChatList(dummyChats);
            setLoading(false);
        }, 1200);
    }, [])


    return (
        <>
            <Helmet>
                <title>Chat  | Beauty Chat</title>
            </Helmet>

            <section className=" h-screen w-full gap-5  bg-slate-800">
                {/* Desktop View */}
                <div className="hidden md:flex w-full">
                    <ChatList
                        chatList={chatList}
                        loading={loading}
                        onSelectChat={(id) => {
                            setActiveChat(id);
                            setMobileView("chatWindow");
                        }} />

                    <div className="flex-1 border border-green-700">
                        {
                            activeChat ? <ChatWindow
                                conversationId={activeChat} /> : <div className="flex-1 flex items-center justify-center text-gray-500">Select a chat to start messaging</div>
                        }
                    </div>

                    {/* User info */}
                    {
                        activeChat && <ChatInfo />
                    }
                </div>


                {/* Mobile View */}



            </section>
        </>
    )
}

export default Home
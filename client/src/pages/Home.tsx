import ChatInfo from "@/components/Home/ChatInfo"
import ChatList from "@/components/Home/ChatList"
import ChatWindow from "@/components/Home/ChatWindow"
import { useState } from "react"

const Home = () => {
    const [activeChat, setActiveChat] = useState<string | null>("null")

    const [mobileView, setMobileView] = useState<"chatList" | "chatWindow" | "chatInfo">("chatList")

    return (
        <section className="flex h-screen justify-between gap-3">
            {/* Desktop View */}
            <div className="hidden md:flex w-full">
                <ChatList
                    onSelectChat={(id) => {
                        setActiveChat(id);
                        setMobileView("chatWindow");
                    }} />

                <div className="flex flex-1 border border-green-700">
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
            <div className="flex md:hidden w-full">
                {mobileView === "chatList" && (
                    <div className="w-full">
                        <ChatList
                            onSelectChat={(id) => {
                                setActiveChat(id);
                                setMobileView("chatWindow");
                            }}
                        />
                    </div>
                )}

                {mobileView === "chatWindow" && activeChat && (
                    <div className="w-full">
                        <ChatWindow
                            conversationId={activeChat}
                            onBack={() => setMobileView("chatList")}
                            onShowInfo={() => setMobileView("chatInfo")}
                        />
                    </div>
                )}

                {mobileView === "chatInfo" && activeChat && (
                    <div className="w-full">
                        <ChatInfo
                            conversationId={activeChat}
                            onBack={() => setMobileView("chatWindow")}
                        />
                    </div>
                )}
            </div>


        </section>
    )
}

export default Home
/* eslint-disable react-hooks/exhaustive-deps */
import type { ChatItemInterface } from "@/types/chat"
import { Search, X } from "lucide-react"
import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react"

interface SearchMessageProps {
    chatList: ChatItemInterface[];
    setSearchedItems: (items: ChatItemInterface[]) => void;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    setIsSearching: (searching: boolean) => void;
}

const SearchMessage = ({ chatList, setSearchedItems, searchTerm, setSearchTerm, setIsSearching }: SearchMessageProps) => {

    const handleSearch = (query: string) => {
        if (!searchTerm) {
            setSearchedItems([])
            setIsSearching(false)
            return
        }
        const filteredItems = chatList.filter(chat => chat.name.toLowerCase().includes(query.toLowerCase()));
        setSearchedItems(filteredItems)
        setIsSearching(false)
    }

    useEffect(() => {
        setIsSearching(true)
        const search = setTimeout(() => {
            handleSearch(searchTerm)
        }, 200);
        return () => clearTimeout(search);
    }, [searchTerm])

    return (
        <div className="border relative flex gap-1 mx-5 rounded mt-2">
            <Search size={20} className="text-slate-500 absolute top-1/2 -translate-y-1/2 left-2" />
            <input type="text" name="" id="" placeholder="Search...." className="w-full py-1.5 pl-10 border-0 outline-0"
                value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

            <AnimatePresence>
                {
                    searchTerm && (
                        <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} transition={{ duration: 0.2, ease: "easeInOut" }}
                        >
                            <X size={20} className={`text-slate-500 absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer `} onClick={() => setSearchTerm("")} />
                        </motion.div>
                    )
                }

            </AnimatePresence>
        </div>
    )
}

export default SearchMessage
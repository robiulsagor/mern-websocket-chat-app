import { Check } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"

const SuccessMessage = ({ text, info = "Redirecting" }: { text: string, info?: string }) => {
    return (
        <AnimatePresence>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Check className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-green-600 font-semibold text-center">{text} </p>
                <p className="text-gray-600 text-center text-sm">{info}</p>
            </motion.div>
        </AnimatePresence>
    )
}

export default SuccessMessage
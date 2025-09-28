import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ✅ Mock API Routes
app.get("/api/ping", (req: Request, res: Response) => {
    res.json({ message: "pong" });
});

app.post("/api/register", (req: Request, res: Response) => {
    const { email } = req.body;
    if (email === "fail@test.com") {
        return res.status(400).json({ error: "Email already taken" });
    }
    res.json({ success: true, message: "User registered (mock)" });
});

app.post("/api/login", (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (password !== "123456") {
        return res.status(401).json({ error: "Invalid credentials" });
    }
    res.json({ token: "mock-token-123" });
});

app.listen(PORT, () => {
    console.log(`🚀 Mock API running on http://localhost:${PORT}`);
});

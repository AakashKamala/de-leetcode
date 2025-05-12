"use strict";
// import express from 'express';
// import bodyParser from 'body-parser';
// import cors from 'cors';
// import { runCode } from './dockerRunner';
// import { submitSolution } from './solanaService';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const app = express();
// const PORT = 5000;
// app.use(cors());
// app.use(bodyParser.json());
// app.post('/submit', async (req, res) => {
//   const { code, expectedOutput, questionId, userPublicKey } = req.body;
// //   console.log(req.body)
//   if (!code || !expectedOutput || !questionId || !userPublicKey) {
//     return res.status(400).json({ success: false, message: 'Missing required fields' });
//   }
//   try {
//     const output = await runCode(code);
//     console.log(output)
//     if (output.trim() === expectedOutput.trim()) {
//       const tx = await submitSolution(userPublicKey, questionId);
//       return res.json({ success: true, message: 'Correct!', tx });
//     } else {
//       return res.json({ success: false, message: 'Incorrect output', output });
//     }
//   } catch (err) {
//     console.log("gggghhhh")
//     console.error(err);
//     res.status(500).json({ success: false, message: 'Error processing request' });
//   }
// });
// app.get("/", (req, res)=>{
//     res.json({"msg":"alive"})
// })
// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dockerRunner_1 = require("./dockerRunner");
const solanaService_1 = require("./solanaService");
const questions_1 = require("./data/questions");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// Get all questions
app.get('/api/questions', (req, res) => {
    // Return questions without the expected output (security)
    const safeQuestions = questions_1.questions.map(({ expectedOutput, ...rest }) => rest);
    res.json(safeQuestions);
});
// Get a specific question
app.get('/api/questions/:id', (req, res) => {
    const questionId = parseInt(req.params.id);
    const question = questions_1.questions.find(q => q.id === questionId);
    if (!question) {
        return res.status(404).json({ success: false, message: 'Question not found' });
    }
    // Return the question without the expected output
    const { expectedOutput, ...safeQuestion } = question;
    res.json(safeQuestion);
});
// Submit a solution
app.post('/api/submit', async (req, res) => {
    const { code, questionId, userPublicKey } = req.body;
    if (!code || !questionId || !userPublicKey) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }
    // Find the question
    const question = questions_1.questions.find(q => q.id === questionId);
    if (!question) {
        return res.status(404).json({ success: false, message: 'Question not found' });
    }
    try {
        // Run the code in Docker
        const output = await (0, dockerRunner_1.runCode)(code);
        console.log('Code output:', output);
        // Compare with expected output
        if (output.trim() === question.expectedOutput.trim()) {
            // Submit to Solana blockchain
            const tx = await (0, solanaService_1.submitSolution)(userPublicKey, questionId);
            return res.json({
                success: true,
                message: 'Correct! Solution submitted to blockchain.',
                tx
            });
        }
        else {
            return res.json({
                success: false,
                message: 'Incorrect output',
                output,
                expected: question.expectedOutput
            });
        }
    }
    catch (err) {
        console.error('Error processing submission:', err);
        res.status(500).json({
            success: false,
            message: 'Error processing submission',
            error: err.message
        });
    }
});
// Health check endpoint
app.get("/api/health", (req, res) => {
    res.json({ status: "healthy" });
});
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});


import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { runCode } from './dockerRunner';
import { submitSolution } from './solanaService';
import { questions } from './data/questions';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.get('/api/questions', (req, res) => {
  const safeQuestions = questions.map(({ expectedOutput, ...rest }) => rest);
  res.json(safeQuestions);
});

app.get('/api/questions/:id', (req, res) => {
  const questionId = parseInt(req.params.id);
  const question = questions.find(q => q.id === questionId);
  
  if (!question) {
    return res.status(404).json({ success: false, message: 'Question not found' });
  }
  
  const { expectedOutput, ...safeQuestion } = question;
  res.json(safeQuestion);
});

app.post('/api/submit', async (req, res) => {
  const { code, questionId, userPublicKey } = req.body;

  if (!code || !questionId || !userPublicKey) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  const question = questions.find(q => q.id === questionId);
  if (!question) {
    return res.status(404).json({ success: false, message: 'Question not found' });
  }

  try {
    const output = await runCode(code);
    console.log('Code output:', output);

    if (output.trim() === question.expectedOutput.trim()) {
      const tx = await submitSolution(userPublicKey, questionId);
      return res.json({ 
        success: true, 
        message: 'Correct! Solution submitted to blockchain.',
        tx 
      });
    } else {
      return res.json({ 
        success: false, 
        message: 'Incorrect output', 
        output,
        expected: question.expectedOutput 
      });
    }
  } catch (err: any) {
    console.error('Error processing submission:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Error processing submission',
      error: err.message 
    });
  }
});

app.get("/api/health", (req, res) => {
    res.json({ status: "healthy" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
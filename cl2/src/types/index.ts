
export interface Question {
    id: number;
    title: string;
    description: string;
    difficulty: string;
    starterCode: string;
  }
  
  export interface SubmissionResult {
    success: boolean;
    message: string;
    tx?: string;
    output?: string;
    expected?: string;
  }
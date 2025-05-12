"use strict";
// import {
//     Connection,
//     Keypair,
//     PublicKey,
//     SystemProgram,
//     Transaction,
//     sendAndConfirmTransaction,
//     TransactionInstruction,
//   } from '@solana/web3.js';
//   import * as borsh from 'borsh';
//   import path from 'path';
//   import fs from 'fs';
// import BN from 'bn.js';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitSolution = submitSolution;
//   // const PROGRAM_ID = new PublicKey('4zZ3yn2dJxjGmrcgCWuV9CS71eCAdsanR7dBRVgiQSmB'); // Replace with your actual program ID
//   const PROGRAM_ID = new PublicKey('4zZ3yn2dJxjGmrcgCWuV9CS71eCAdsanR7dBRVgiQSmB'); 
//   const SEED = 'user_profile';
//   const connection = new Connection('http://127.0.0.1:8899', 'confirmed');
//   // Load backend wallet keypair
//   const keypairPath = path.join(__dirname, '..', 'keypair.json');
//   const secretKey = Uint8Array.from(JSON.parse(fs.readFileSync(keypairPath, 'utf-8')));
//   const backendKeypair = Keypair.fromSecretKey(secretKey);
//   // Instruction class for SubmitSolution
//   class SubmitSolutionInstruction {
//     instruction = 0;
//     question_id: number;
//     constructor(qid: number) {
//       this.question_id = qid;
//     }
//   }
//   const InstructionSchema = new Map([
//     [
//       SubmitSolutionInstruction,
//       {
//         kind: 'struct',
//         fields: [
//           ['instruction', 'u8'],
//           ['question_id', 'u64'],
//         ],
//       },
//     ],
//   ]);
//   export const submitSolution = async (userPubkey: string, questionId: number): Promise<string> => {
//     try {
//       console.log("Received pubkey:", userPubkey);
//       console.log("Question ID:", questionId);
//       const userKey = new PublicKey(userPubkey);
//       const programKeypair = backendKeypair; // FIXED
//       const programId = PROGRAM_ID;          // FIXED
//       const [pda] = PublicKey.findProgramAddressSync(
//         [Buffer.from("user_profile"), userKey.toBuffer()],
//         programId
//       );
//       const instruction = new SubmitSolutionInstruction(questionId);
//       const instructionData = borsh.serialize(InstructionSchema, instruction);
//       const transaction = new Transaction().add(
//         new TransactionInstruction({
//           keys: [
//             // { pubkey: userKey, isSigner: true, isWritable: false },
//             { pubkey: userKey, isSigner: false, isWritable: false },
//             { pubkey: pda, isSigner: false, isWritable: true },
//             { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
//           ],
//           programId,
//           data: Buffer.from(instructionData),
//         })
//       );
//       console.log("Sending transaction...");
//       const txSig = await sendAndConfirmTransaction(connection, transaction, [programKeypair]);
//       console.log("Transaction successful:", txSig);
//       return txSig;
//     } catch (err) {
//       console.error("submitSolution error:", err);
//       throw new Error("Transaction failed");
//     }
//   };
// import {
//   Connection,
//   Keypair,
//   PublicKey,
//   SystemProgram,
//   Transaction,
//   sendAndConfirmTransaction,
//   TransactionInstruction,
// } from '@solana/web3.js';
// import * as borsh from 'borsh';
// import path from 'path';
// import fs from 'fs';
// import BN from 'bn.js';
// // const PROGRAM_ID = new PublicKey('4zZ3yn2dJxjGmrcgCWuV9CS71eCAdsanR7dBRVgiQSmB');
// // const PROGRAM_ID = new PublicKey('9BaedrxaYdn4t9jyRfL5z7ScktUooicQty1ogqz21HDk');
// const PROGRAM_ID = new PublicKey('E8bE3S2A5H61khZ13NiN6L3PMxtFjGudT9VsSxPkuFft');
// const SEED = 'user_profile';
// const connection = new Connection('http://127.0.0.1:8899', 'confirmed');
// const keypairPath = path.join(__dirname, '..', 'keypair.json');
// const secretKey = Uint8Array.from(JSON.parse(fs.readFileSync(keypairPath, 'utf-8')));
// const backendKeypair = Keypair.fromSecretKey(secretKey);
// class SubmitSolutionInstruction {
//   instruction = 0; // Match enum discriminant in Rust
//   question_id: BN;
//   constructor(questionId: number) {
//     this.question_id = new BN(questionId);
//   }
// }
// const InstructionSchema = new Map([
//   [
//     SubmitSolutionInstruction,
//     {
//       kind: 'struct',
//       fields: [
//         ['instruction', 'u8'],     // 0 = SubmitSolution
//         ['question_id', 'u64'],    // BN maps to u64
//       ],
//     },
//   ],
// ]);
// // export const submitSolution = async (userPubkey: string, questionId: number): Promise<string> => {
// //   try {
// //     const userKey = new PublicKey(userPubkey);
// //     const [pda, bump] = PublicKey.findProgramAddressSync(
// //       [Buffer.from(SEED), userKey.toBuffer()],
// //       PROGRAM_ID
// //     );
// //     const pdaInfo = await connection.getAccountInfo(pda);
// //     // Airdrop to backend wallet on localhost
// //     const version = await connection.getVersion();
// //     if (version['solana-core'].includes('test-validator')) {
// //       await connection.requestAirdrop(backendKeypair.publicKey, 1_000_000_000); // 1 SOL
// //     }
// //     const instructions: TransactionInstruction[] = [];
// //     if (!pdaInfo) {
// //       const space = 1000; // Same as your Rust logic
// //       const lamports = await connection.getMinimumBalanceForRentExemption(space);
// //       const createIx = SystemProgram.createAccount({
// //         fromPubkey: backendKeypair.publicKey,
// //         newAccountPubkey: pda,
// //         lamports,
// //         space,
// //         programId: PROGRAM_ID,
// //       });
// //       instructions.push(createIx);
// //     }
// //     const submitIxData = new SubmitSolutionInstruction(questionId);
// //     const serializedData = borsh.serialize(InstructionSchema, submitIxData);
// //     const submitIx = new TransactionInstruction({
// //       keys: [
// //         // { pubkey: userKey, isSigner: true, isWritable: false }, // signer
// //         // { pubkey: userKey, isSigner: false, isWritable: false }, // signer
// //         { pubkey: backendKeypair.publicKey, isSigner: true, isWritable: false },
// //         { pubkey: pda, isSigner: false, isWritable: true },     // PDA
// //         { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
// //       ],
// //       programId: PROGRAM_ID,
// //       data: Buffer.from(serializedData),
// //     });
// //     instructions.push(submitIx);
// //     const tx = new Transaction().add(...instructions);
// //     const txSig = await sendAndConfirmTransaction(connection, tx, [backendKeypair]);
// //     // const userKeypairPath = path.join(__dirname, '..', 'keypair.json');
// //     // const userSecretKey = Uint8Array.from(JSON.parse(fs.readFileSync(userKeypairPath, 'utf-8')));
// //     // const userKeypair = Keypair.fromSecretKey(userSecretKey);
// //     // const txSig = await sendAndConfirmTransaction(connection, tx, [backendKeypair, userKeypair]);
// //     console.log('✅ Transaction Signature:', txSig);
// //     return txSig;
// //   } catch (err: any) {
// //     console.error('❌ submitSolution error:', err.message);
// //     if (err.logs) {
// //       console.error('Program logs:', err.logs);
// //     }
// //     throw new Error("Transaction failed");
// //   }
// // };
// export const submitSolution = async (userPubkey: string, questionId: number): Promise<string> => {
//   try {
//     const userKey = new PublicKey(userPubkey);
//     const [pda] = PublicKey.findProgramAddressSync(
//       [Buffer.from(SEED), userKey.toBuffer()],
//       PROGRAM_ID
//     );
//     // const version = await connection.getVersion();
//     // if (version['solana-core'].includes('test-validator')) {
//     //   await connection.requestAirdrop(backendKeypair.publicKey, 1_000_000_000);
//     // }
//     // const version = await connection.getVersion();
//     // if (version['solana-core'].includes('test-validator')) {
//     //   const airdropSig = await connection.requestAirdrop(backendKeypair.publicKey, 1_000_000_000);
//     //   await connection.confirmTransaction(airdropSig, 'confirmed');
//     //   const balance = await connection.getBalance(backendKeypair.publicKey);
//     //   console.log("Backend wallet balance:", balance / 1e9, "SOL");
//     // }
//     const airdropSig = await connection.requestAirdrop(backendKeypair.publicKey, 1_000_000_000);
//     const blockhash = await connection.getLatestBlockhash();
//     await connection.confirmTransaction({
//       signature: airdropSig,
//       ...blockhash,
//     });
//     const balance = await connection.getBalance(backendKeypair.publicKey);
//     console.log("Backend Wallet Balance:", balance / 1e9, "SOL");
//     const submitIxData = new SubmitSolutionInstruction(questionId);
//     const serializedData = borsh.serialize(InstructionSchema, submitIxData);
//     const submitIx = new TransactionInstruction({
//       keys: [
//         { pubkey: userKey, isSigner: false, isWritable: false },              // Passed as user
//         { pubkey: pda, isSigner: false, isWritable: true },                   // PDA
//         { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
//       ],
//       programId: PROGRAM_ID,
//       data: Buffer.from(serializedData),
//     });
//     const tx = new Transaction().add(submitIx);
//     const txSig = await sendAndConfirmTransaction(connection, tx, [backendKeypair]);
//     console.log('✅ Transaction Signature:', txSig);
//     return txSig;
//   } catch (err: any) {
//     console.error('❌ submitSolution error:', err.message);
//     if (err.logs) {
//       console.error('Program logs:', err.logs);
//     }
//     throw new Error("Transaction failed");
//   }
// };
// import {
//   Connection,
//   Keypair,
//   PublicKey,
//   SystemProgram,
//   Transaction,
//   sendAndConfirmTransaction,
//   TransactionInstruction,
//   Commitment,
// } from '@solana/web3.js';
// import * as borsh from 'borsh';
// import path from 'path';
// import fs from 'fs';
// import BN from 'bn.js';
// // Use your deployed program's public key
// // const PROGRAM_ID = new PublicKey('E8bE3S2A5H61khZ13NiN6L3PMxtFjGudT9VsSxPkuFft');
// // const PROGRAM_ID = new PublicKey('2hHqg6He4FBtfLgoVfQW1VPB7tQCzaWrggGYoGJK3ap6');
// const PROGRAM_ID = new PublicKey('CdX3ZFAmwHjcS3QrcHV3tgv4w2k2oShjx7BhC2fYFpDg');
// const SEED = 'user_profile';
// const connection = new Connection('http://127.0.0.1:8899', 'confirmed');
// const keypairPath = path.join(__dirname, '..', 'keypair.json');
// const secretKey = Uint8Array.from(JSON.parse(fs.readFileSync(keypairPath, 'utf-8')));
// const backendKeypair = Keypair.fromSecretKey(secretKey);
// class SubmitSolutionInstruction {
//   instruction = 0; // 0 corresponds to SubmitSolution in your Rust enum
//   question_id: BN;
//   constructor(questionId: number) {
//     this.question_id = new BN(questionId);
//   }
// }
// const InstructionSchema = new Map([
//   [
//     SubmitSolutionInstruction,
//     {
//       kind: 'struct',
//       fields: [
//         ['instruction', 'u8'],  // discriminant (0)
//         ['question_id', 'u64'],
//       ],
//     },
//   ],
// ]);
// export const submitSolution = async (unusedUserPubkey: string, questionId: number): Promise<string> => {
//   try {
//     // For a backend-driven model, we use the backend wallet as the payer.
//     const payerKey = backendKeypair.publicKey;
//     // Compute the PDA using the payer's public key.
//     const [pda] = PublicKey.findProgramAddressSync(
//       [Buffer.from(SEED), payerKey.toBuffer()],
//       PROGRAM_ID
//     );
//     // Airdrop if running on a test validator. (Ensure the backend wallet has funds)
//     const version = await connection.getVersion();
//     if (version['solana-core'].includes('test-validator')) {
//       const airdropSig = await connection.requestAirdrop(payerKey, 1_000_000_000);
//       const latestBlockhash = await connection.getLatestBlockhash();
//       await connection.confirmTransaction({
//         signature: airdropSig,
//         ...latestBlockhash,
//       });
//     }
//     // (Optional) Check and log the backend wallet balance.
//     const balance = await connection.getBalance(payerKey);
//     console.log("Backend Wallet Balance:", balance / 1e9, "SOL");
//     // Serialize the instruction data
//     const submitIxData = new SubmitSolutionInstruction(questionId);
//     const serializedData = borsh.serialize(InstructionSchema, submitIxData);
//     // Construct the instruction:
//     // 1. First account: the payer (must be a signer)
//     // 2. Second account: the PDA account (writable)
//     // 3. Third account: the System Program
//     const submitIx = new TransactionInstruction({
//       keys: [
//         { pubkey: payerKey, isSigner: true, isWritable: false },
//         { pubkey: pda, isSigner: false, isWritable: true },
//         { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
//       ],
//       programId: PROGRAM_ID,
//       data: Buffer.from(serializedData),
//     });
//     // Create and send the transaction using the backendKeypair as the sole signer.
//     const tx = new Transaction().add(submitIx);
//     const txSig = await sendAndConfirmTransaction(connection, tx, [backendKeypair]);
//     console.log('✅ Transaction Signature:', txSig);
//     return txSig;
//   } catch (err: any) {
//     console.error('❌ submitSolution error:', err.message);
//     if (err.logs) {
//       console.error('Program logs:', err.logs);
//     }
//     throw new Error("Transaction failed");
//   }
// };
// import {
//   Connection,
//   Keypair,
//   PublicKey,
//   SystemProgram,
//   Transaction,
//   sendAndConfirmTransaction,
//   TransactionInstruction,
// } from '@solana/web3.js';
// import * as borsh from 'borsh';
// import fs from 'fs';
// import path from 'path';
// import BN from 'bn.js';
// // your deployed program ID
// const PROGRAM_ID = new PublicKey('jHTEmdoqXRgbucMkLTnzCetGJ2vRbW38LLVDfweEJjD');
// const SEED = 'user_profile';
// const connection = new Connection('http://127.0.0.1:8899', 'confirmed');
// // backend’s keypair (payer)
// const keypairPath = path.join(__dirname, '..', 'keypair.json');
// const secret = Uint8Array.from(JSON.parse(fs.readFileSync(keypairPath, 'utf-8')));
// const backendKeypair = Keypair.fromSecretKey(secret);
// class SubmitSolution {
//   instruction = 0;
//   question_id: BN;
//   constructor(qid: number) { this.question_id = new BN(qid); }
// }
// const InstructionSchema = new Map([
//   [ SubmitSolution, { kind: 'struct', fields: [['instruction','u8'], ['question_id','u64']] } ]
// ]);
// export async function submitSolution(userPubkey: string, questionId: number) {
//   // 1) derive PDA for this user
//   const userKey = new PublicKey(userPubkey);
//   const [pda] = PublicKey.findProgramAddressSync(
//     [Buffer.from(SEED), userKey.toBuffer()],
//     PROGRAM_ID
//   );
//   // 2) optionally airdrop on test-validator
//   const ver = await connection.getVersion();
//   if (ver['solana-core'].includes('test-validator')) {
//     const sig = await connection.requestAirdrop(backendKeypair.publicKey, 1e9);
//     const lb = await connection.getLatestBlockhash();
//     await connection.confirmTransaction({ signature: sig, ...lb });
//   }
//   // 3) serialize instruction data
//   const data = borsh.serialize(InstructionSchema, new SubmitSolution(questionId));
//   // 4) build the instruction
//   const ix = new TransactionInstruction({
//     programId: PROGRAM_ID,
//     keys: [
//       // payer
//       { pubkey: backendKeypair.publicKey, isSigner: true, isWritable: false },
//       // user (seed)
//       { pubkey: userKey,               isSigner: false, isWritable: false },
//       // user’s PDA
//       { pubkey: pda,                   isSigner: false, isWritable: true  },
//       // system program
//       { pubkey: SystemProgram.programId,isSigner: false, isWritable: false },
//     ],
//     data: Buffer.from(data),
//   });
//   // 5) send & confirm
//   const tx = new Transaction().add(ix);
//   const txid = await sendAndConfirmTransaction(connection, tx, [backendKeypair]);
//   console.log('✅ tx:', txid);
//   return txid;
// }
// import {
//   Connection,
//   Keypair,
//   PublicKey,
//   SystemProgram,
//   Transaction,
//   sendAndConfirmTransaction,
//   TransactionInstruction,
// } from '@solana/web3.js';
// import * as borsh from 'borsh';
// import fs from 'fs';
// import path from 'path';
// import BN from 'bn.js';
// // your deployed program ID
// const PROGRAM_ID = new PublicKey('3hqMmjiAnPXSKvWrRudLUYG83crETK14kWQBGxbc8PMH');
// const SEED = 'user_profile';
// const connection = new Connection('http://127.0.0.1:8899', 'confirmed');
// // backend's keypair (payer)
// const keypairPath = path.join(__dirname, '..', 'keypair.json');
// const secret = Uint8Array.from(JSON.parse(fs.readFileSync(keypairPath, 'utf-8')));
// const backendKeypair = Keypair.fromSecretKey(secret);
// class SubmitSolution {
//   instruction = 0;
//   question_id;
//   constructor(qid: any) { 
//     // Ensure BN is used for consistent serialization
//     this.question_id = new BN(qid); 
//   }
// }
// const InstructionSchema = new Map([
//   [ SubmitSolution, { kind: 'struct', fields: [['instruction','u8'], ['question_id','u64']] } ]
// ]);
// export async function submitSolution(userPubkey: any, questionId: any) {
//   try {
//     // 1) derive PDA for this user
//     const userKey = new PublicKey(userPubkey);
//     const [pda] = PublicKey.findProgramAddressSync(
//       [Buffer.from(SEED), userKey.toBuffer()],
//       PROGRAM_ID
//     );
//     // 2) optionally airdrop on test-validator
//     const ver = await connection.getVersion();
//     if (ver['solana-core'].includes('test-validator')) {
//       const sig = await connection.requestAirdrop(backendKeypair.publicKey, 1e9);
//       const lb = await connection.getLatestBlockhash();
//       await connection.confirmTransaction({ signature: sig, ...lb });
//     }
//     // 3) serialize instruction data
//     const data = borsh.serialize(
//       InstructionSchema, 
//       new SubmitSolution(questionId)
//     );
//     // 4) build the instruction
//     const ix = new TransactionInstruction({
//       programId: PROGRAM_ID,
//       keys: [
//         // payer
//         { pubkey: backendKeypair.publicKey, isSigner: true, isWritable: false },
//         // user (seed)
//         { pubkey: userKey,               isSigner: false, isWritable: false },
//         // user's PDA
//         { pubkey: pda,                   isSigner: false, isWritable: true  },
//         // system program
//         { pubkey: SystemProgram.programId,isSigner: false, isWritable: false },
//       ],
//       data: Buffer.from(data),
//     });
//     // 5) send & confirm
//     const tx = new Transaction().add(ix);
//     // Get latest blockhash for better reliability
//     const latestBlockhash = await connection.getLatestBlockhash();
//     tx.recentBlockhash = latestBlockhash.blockhash;
//     tx.lastValidBlockHeight = latestBlockhash.lastValidBlockHeight;
//     tx.feePayer = backendKeypair.publicKey;
//     const txid = await sendAndConfirmTransaction(
//       connection, 
//       tx, 
//       [backendKeypair],
//       { commitment: 'confirmed' }
//     );
//     console.log('✅ tx:', txid);
//     return txid;
//   } catch (err: any) {
//     console.error('Error in submitSolution:', err);
//     if (err.logs) {
//       console.error('Transaction logs:', err.logs);
//     }
//     throw err;
//   }
// }
const web3_js_1 = require("@solana/web3.js");
const borsh = __importStar(require("borsh"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const bn_js_1 = __importDefault(require("bn.js"));
// your deployed program ID
// const PROGRAM_ID = new PublicKey('AJNtHtrbA51XuUEhybNU5Q1Y5dYrRYF6UmetMASD8ZPK');
// NmtKAC94a7fkRSxesqFbXtTfXu7yLmBNk4NDMr4b8kz
const PROGRAM_ID = new web3_js_1.PublicKey('NmtKAC94a7fkRSxesqFbXtTfXu7yLmBNk4NDMr4b8kz');
const SEED = 'user_profile';
// const connection = new Connection('http://127.0.0.1:8899', 'confirmed');
const connection = new web3_js_1.Connection('https://api.devnet.solana.com', 'confirmed');
// backend's keypair (payer)
const keypairPath = path_1.default.join(__dirname, '..', 'keypair.json');
const secret = Uint8Array.from(JSON.parse(fs_1.default.readFileSync(keypairPath, 'utf-8')));
const backendKeypair = web3_js_1.Keypair.fromSecretKey(secret);
class SubmitSolution {
    constructor(qid) {
        this.instruction = 0;
        // Ensure BN is used for consistent serialization
        this.question_id = new bn_js_1.default(qid);
    }
}
const InstructionSchema = new Map([
    [SubmitSolution, { kind: 'struct', fields: [['instruction', 'u8'], ['question_id', 'u64']] }]
]);
async function submitSolution(userPubkey, questionId) {
    try {
        // 1) derive PDA for this user
        const userKey = new web3_js_1.PublicKey(userPubkey);
        const [pda] = web3_js_1.PublicKey.findProgramAddressSync([Buffer.from(SEED), userKey.toBuffer()], PROGRAM_ID);
        // 2) optionally airdrop on test-validator
        const ver = await connection.getVersion();
        if (ver['solana-core'].includes('test-validator')) {
            const sig = await connection.requestAirdrop(backendKeypair.publicKey, 1e9);
            const lb = await connection.getLatestBlockhash();
            await connection.confirmTransaction({ signature: sig, ...lb });
        }
        // 3) serialize instruction data
        const data = borsh.serialize(InstructionSchema, new SubmitSolution(questionId));
        // 4) build the instruction
        const ix = new web3_js_1.TransactionInstruction({
            programId: PROGRAM_ID,
            keys: [
                // payer
                { pubkey: backendKeypair.publicKey, isSigner: true, isWritable: false },
                // user (seed)
                { pubkey: userKey, isSigner: false, isWritable: false },
                // user's PDA
                { pubkey: pda, isSigner: false, isWritable: true },
                // system program
                { pubkey: web3_js_1.SystemProgram.programId, isSigner: false, isWritable: false },
            ],
            data: Buffer.from(data),
        });
        // 5) send & confirm
        const tx = new web3_js_1.Transaction().add(ix);
        // Get latest blockhash for better reliability
        const latestBlockhash = await connection.getLatestBlockhash();
        tx.recentBlockhash = latestBlockhash.blockhash;
        tx.lastValidBlockHeight = latestBlockhash.lastValidBlockHeight;
        tx.feePayer = backendKeypair.publicKey;
        const txid = await (0, web3_js_1.sendAndConfirmTransaction)(connection, tx, [backendKeypair], { commitment: 'confirmed' });
        console.log('✅ tx:', txid);
        return txid;
    }
    catch (err) {
        console.error('Error in submitSolution:', err);
        if (err.logs) {
            console.error('Transaction logs:', err.logs);
        }
        throw err;
    }
}

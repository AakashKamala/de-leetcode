
import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
  TransactionInstruction,
} from '@solana/web3.js';
import * as borsh from 'borsh';
import fs from 'fs';
import path from 'path';
import BN from 'bn.js';

const PROGRAM_ID = new PublicKey('NmtKAC94a7fkRSxesqFbXtTfXu7yLmBNk4NDMr4b8kz');
const SEED = 'user_profile';

const connection = new Connection('http://127.0.0.1:8899', 'confirmed');


const keypairPath = path.join(__dirname, '..', 'keypair.json');
const secret = Uint8Array.from(JSON.parse(fs.readFileSync(keypairPath, 'utf-8')));
const backendKeypair = Keypair.fromSecretKey(secret);

class SubmitSolution {
  instruction = 0;
  question_id;
  constructor(qid: any) { 

    this.question_id = new BN(qid); 
  }
}

const InstructionSchema = new Map([
  [ SubmitSolution, { kind: 'struct', fields: [['instruction','u8'], ['question_id','u64']] } ]
]);

export async function submitSolution(userPubkey: any, questionId: any) {
  try {
    // 1) derive PDA for this user
    const userKey = new PublicKey(userPubkey);
    const [pda] = PublicKey.findProgramAddressSync(
      [Buffer.from(SEED), userKey.toBuffer()],
      PROGRAM_ID
    );

    const ver = await connection.getVersion();
    if (ver['solana-core'].includes('test-validator')) {
      const sig = await connection.requestAirdrop(backendKeypair.publicKey, 1e9);
      const lb = await connection.getLatestBlockhash();
      await connection.confirmTransaction({ signature: sig, ...lb });
    }

    const data = borsh.serialize(
      InstructionSchema, 
      new SubmitSolution(questionId)
    );

    const ix = new TransactionInstruction({
      programId: PROGRAM_ID,
      keys: [

        { pubkey: backendKeypair.publicKey, isSigner: true, isWritable: false },

        { pubkey: userKey,               isSigner: false, isWritable: false },

        { pubkey: pda,                   isSigner: false, isWritable: true  },

        { pubkey: SystemProgram.programId,isSigner: false, isWritable: false },
      ],
      data: Buffer.from(data),
    });

    const tx = new Transaction().add(ix);
    
    const latestBlockhash = await connection.getLatestBlockhash();
    tx.recentBlockhash = latestBlockhash.blockhash;
    tx.lastValidBlockHeight = latestBlockhash.lastValidBlockHeight;
    tx.feePayer = backendKeypair.publicKey;
    
    const txid = await sendAndConfirmTransaction(
      connection, 
      tx, 
      [backendKeypair],
      { commitment: 'confirmed' }
    );
    
    console.log('✅ tx:', txid);
    return txid;
  } catch (err: any) {
    console.error('Error in submitSolution:', err);
    if (err.logs) {
      console.error('Transaction logs:', err.logs);
    }
    throw err;
  }
}
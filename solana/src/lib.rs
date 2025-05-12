use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    msg,
    program::{invoke_signed},
    program_error::ProgramError,
    pubkey::Pubkey,
    system_instruction,
    sysvar::{rent::Rent, Sysvar},
};

// Add a prefix to store the actual data length for proper deserialization
#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct UserData {
    // Store data size to know how much to read later
    pub data_size: u32,
    pub solved_questions: Vec<u64>,
}

#[derive(BorshDeserialize)]
pub enum Instruction {
    SubmitSolution { question_id: u64 },
}

pub const SEED: &[u8] = b"user_profile";

entrypoint!(process_instruction);
fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    let instr = Instruction::try_from_slice(instruction_data)
        .map_err(|_| ProgramError::InvalidInstructionData)?;
    match instr {
        Instruction::SubmitSolution { question_id } => {
            submit_solution(program_id, accounts, question_id)
        }
    }
}

fn submit_solution(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    question_id: u64,
) -> ProgramResult {
    let account_info_iter = &mut accounts.iter();

    let payer = next_account_info(account_info_iter)?;
    if !payer.is_signer {
        msg!("Payer must be a signer");
        return Err(ProgramError::MissingRequiredSignature);
    }

    let user = next_account_info(account_info_iter)?;

    let user_data_acc = next_account_info(account_info_iter)?;

    let system_prog = next_account_info(account_info_iter)?;

    let (pda, bump) =
        Pubkey::find_program_address(&[SEED, user.key.as_ref()], program_id);
    if pda != *user_data_acc.key {
        msg!("Invalid PDA for this user");
        return Err(ProgramError::InvalidArgument);
    }

    let is_uninit = user_data_acc.owner != program_id;

    if is_uninit {
        let rent = Rent::get()?;
        let space = 1000;
        let lamports = rent.minimum_balance(space);

        invoke_signed(
            &system_instruction::create_account(
                payer.key,
                user_data_acc.key,
                lamports,
                space as u64,
                program_id,
            ),
            &[payer.clone(), user_data_acc.clone(), system_prog.clone()],
            &[&[SEED, user.key.as_ref(), &[bump]]],
        )?;

        let mut data = UserData {
            data_size: 0, 
            solved_questions: vec![question_id],
        };
        
        let serialized = data.try_to_vec()
            .map_err(|_| ProgramError::InvalidAccountData)?;
            
        data.data_size = serialized.len() as u32;
        
        let serialized = data.try_to_vec()
            .map_err(|_| ProgramError::InvalidAccountData)?;
        
        let mut account_data = user_data_acc.data.borrow_mut();
        account_data[..serialized.len()].copy_from_slice(&serialized);
            
        msg!("Created profile for {} and stored question {} (data size: {})", 
            user.key, question_id, data.data_size);
    } else {
        let user_data = {
            let data_slice = user_data_acc.data.borrow();
            if data_slice.len() < 4 {
                msg!("Account data too small");
                return Err(ProgramError::InvalidAccountData);
            }
            
            let mut size_bytes = [0u8; 4];
            size_bytes.copy_from_slice(&data_slice[0..4]);
            let stored_size = u32::from_le_bytes(size_bytes) as usize;
            
            if stored_size > data_slice.len() || stored_size < 4 {
                msg!("Invalid stored data size: {}", stored_size);
                return Err(ProgramError::InvalidAccountData);
            }
            
            match UserData::try_from_slice(&data_slice[..stored_size]) {
                Ok(data) => data,
                Err(err) => {
                    msg!("Error deserializing user data: {:?}", err);
                    return Err(ProgramError::InvalidAccountData);
                }
            }
        }; 

        if user_data.solved_questions.contains(&question_id) {
            msg!("User {} already solved {}", user.key, question_id);
            return Ok(());
        }

        let mut updated_data = UserData {
            data_size: 0, 
            solved_questions: user_data.solved_questions.clone(), // Clone to avoid ownership issues
        };
        
        updated_data.solved_questions.push(question_id);
        
        let serialized = updated_data.try_to_vec()
            .map_err(|_| ProgramError::InvalidAccountData)?;
            
        updated_data.data_size = serialized.len() as u32;
        
        let serialized = updated_data.try_to_vec()
            .map_err(|_| ProgramError::InvalidAccountData)?;
        
        {
            let account_data = user_data_acc.data.borrow();

            if serialized.len() > account_data.len() {
                msg!("Data too large for account");
                return Err(ProgramError::InvalidAccountData);
            }
        } 
        
        let mut account_data = user_data_acc.data.borrow_mut();
        account_data[..serialized.len()].copy_from_slice(&serialized);
            
        msg!("Appended question {} to {} (data size: {})", 
            question_id, user.key, updated_data.data_size);
    }

    Ok(())
}
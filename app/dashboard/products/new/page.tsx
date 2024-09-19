'use client';

import React, { useState } from 'react';
import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import { PublicKey, SystemProgram } from '@solana/web3.js';
import { Program, AnchorProvider, Idl } from '@project-serum/anchor';
import idl from '@/lib/idl.json';
import { upload } from '@/actions/page';
import { FileUpload } from '../_components/file-upload';

const programId = new PublicKey('48Hky5sZbmNEHy7sB3MkCzxcrhMUTyTXKenQEftd2VYc');
const feeReceiverAddress = new PublicKey("CovFLcdngBTA2N9jbd3kRuid94HzSzF2NJ5Y54bAJSNd");

function CreateProductEntry() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [ipfsHash, setIpfsHash] = useState('');
  const [lastEntry, setLastEntry] = useState<null | { title: string; description: string; url: string; owner: string; ipfsHash: string }>(null);
  const wallet = useAnchorWallet();
  const { connection } = useConnection();

  const handleFileUpload = async (files: File[]) => {
    setFiles(files);
    console.log(files);
  };

  const createEntry = async () => {
    if (!wallet) {
      alert('Please connect your wallet');
      return;
    }

    const provider = new AnchorProvider(connection, wallet, {});
    const program = new Program(idl as Idl, programId, provider);

    try {
      const formData = new FormData();
      formData.append("file", files[0]);
      formData.append("userId", wallet.publicKey.toString());
      const { hash } = await upload(formData);
      setIpfsHash(hash);

      const [productEntryPda] = PublicKey.findProgramAddressSync(
        [Buffer.from(title), wallet.publicKey.toBuffer()],
        programId
      );

      const tx = await program.methods.createEntry(title, description, url, hash)
        .accounts({
          productEntry: productEntryPda,
          owner: wallet.publicKey,
          feeReceiver: feeReceiverAddress,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      console.log('Transaction signature', tx);
      alert('Product entry created successfully!');
      
      await logEntry(productEntryPda, program);

      setTitle('');
      setDescription('');
      setUrl('');
      setFiles([]);
      setIpfsHash('');
    } catch (error) {
      console.error('Error creating product entry:', error);
      alert('Failed to create product entry');
    }
  };

  const logEntry = async (entryPda: PublicKey, program: Program<Idl>) => {
    try {
      const entryAccount = await program.account.productEntryState.fetch(entryPda);
      console.log('Fetched entry:', entryAccount);
      setLastEntry({
        title: entryAccount.title,
        description: entryAccount.description,
        url: entryAccount.url,
        owner: entryAccount.owner.toString(),
        ipfsHash: entryAccount.ipfsHash,
      });
    } catch (error) {
      console.error('Error fetching entry:', error);
    }
  };

  return (
    <div className="w-[80vw] mx-auto p-5 flex flex-col items-center">
      <h2 className="text-center text-2xl font-bold mb-6 text-white">Create Product Entry</h2>
      <div className="mb-4 w-full">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={50}
          className="w-full p-3 text-lg border border-gray-300 rounded-lg bg-white text-black"
        />
      </div>
      <div className="mb-4 w-full">
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={100}
          className="w-full p-3 text-lg border border-gray-300 rounded-lg bg-white text-black min-h-[100px]"
        />
      </div>
      <div className="mb-4 w-full">
        <input
          type="url"
          placeholder="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          maxLength={200}
          className="w-full p-3 text-lg border border-gray-300 rounded-lg bg-white text-black"
        />
      </div>
      <FileUpload onChange={handleFileUpload} />
      <button
        onClick={createEntry}
        disabled={!wallet || files.length === 0}
        className={`w-[50%] p-3 text-lg font-semibold text-white rounded-lg 
        ${wallet && files.length > 0 ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-500 opacity-50 cursor-not-allowed'}`}
      >
        Create Entry
      </button>
      <p className="mt-4 text-sm text-gray-300">Note: Creating an entry will incur a fee of 0.1 SOL</p>
    </div>
  );
}

export default CreateProductEntry;
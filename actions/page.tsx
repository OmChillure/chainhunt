"use server";
import { PinataSDK } from "pinata-web3";

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT!,
  pinataGateway: process.env.PINATA_GATEWAY,
});

export const upload = async (data: FormData) => {
  try {
    const uploadResult = await pinata.upload.file(data.get("file") as File);
    console.log(uploadResult);
    return { hash: uploadResult.IpfsHash };
  } catch (error) {
    console.error("Image upload error:", error);
    throw new Error('Image upload failed');
  }
};

export const getFile = async (hash: string) => {
  if (!hash) {
    console.error("No IPFS hash provided");
    return null;
  }
  try {
    const data = await pinata.gateways.get(hash);
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error getting file:", error);
    return null;
  }
};
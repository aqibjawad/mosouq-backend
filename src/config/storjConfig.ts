interface StorjConfig {
  accessKey: string;
  secretKey: string;
  endpoint: string;
  bucketName: string;
  encryptionPassphrase: string;
}

const storjConfig: StorjConfig = {
  accessKey: 'jvs4n4ki3lhq7sg273thn3xjyo2q',
  secretKey: 'j3ljds7dok3o5zh3tdvhri3rwxefbpukzl7752l7els6c4rkxo7to',
  endpoint: 'https://gateway.storjshare.io',
  bucketName: 'mosouq', // Replace with your desired bucket name
  encryptionPassphrase: 'display section kid dizzy drip hurt cement piece antenna donkey water blouse', // Replace with your desired encryption passphrase
};

export default storjConfig;
import dontenv from 'dotenv'
import CryptoJS from 'crypto-js'

dontenv.config()
const keySecretToCrypto: string  = process.env.secretKeyToCrypto

class Encryptor {
    private clave: string
    constructor(clave: string) {
        this.clave = clave
    }

    public toEncrypt(): string {

        return CryptoJS.AES.encrypt(keySecretToCrypto , this.clave).toString()
    }

    public toDecrypt(): string {
        const bytes = CryptoJS.AES.decrypt(keySecretToCrypto ,this.clave)
         return bytes.toString(CryptoJS.enc.Utf8);
    }
}
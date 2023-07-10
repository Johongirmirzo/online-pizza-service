import {defineStore} from "pinia";
import { IMessage } from "~/types/message";

export const useMessageStore = defineStore("client-res-messages", ()=>{
    const messages = useState("message", ()=> []);

    
    const storeMessage = (message: IMessage)=>{
        messages.value.push(message);
    }
    const getMessage = (messageId: number)=> messages.value.find((message: IMessage)=> message.id === messageId)!

    const deleteMessage = (messageId: number)=>{
        messages.value = messages.value.filter((message: IMessage)=> message.id !== messageId);
    }
    const clearAllMessages = ()=>{
        messages.value = [];
    }
    return {messages, storeMessage, deleteMessage, getMessage, clearAllMessages}
}, { persist: true})
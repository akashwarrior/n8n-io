import { generateText } from "ai";
import { createXai } from "@ai-sdk/xai";
import axios, { AxiosError } from "axios";
import { createOpenAI } from "@ai-sdk/openai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { createGoogleGenerativeAI } from '@ai-sdk/google'
import type { GoogleGenerativeAIModelId } from "@ai-sdk/google/internal";

enum PLATFORM {
    GAMIL = "GMAIL",
    WHATSAPP = "WHATSAPP",
    TELEGRAM = "TELEGRAM",
    LLM_MODEL = "LLM_MODEL",
}

enum MODEL_PROVIDERS {
    GEMINI = "GEMINI",
    ANTHROPIC = "ANTHROPIC",
    OPEN_AI = "OPEN_AI",
    GROK = "GROK",
}

interface Credentials {
    [PLATFORM.GAMIL]: { OAUTH_ACCESS_TOKEN: string },
    [PLATFORM.LLM_MODEL]: { API_KEY: string },
    [PLATFORM.WHATSAPP]: { AUTH_HEADER: string },
    [PLATFORM.TELEGRAM]: { BOT_ACCESS_TOKEN: String },
}

interface ResponseType {
    response?: string,
    error?: string,
}

class TaskManager {
    private readonly credentials: Credentials;
    constructor(credentials: Credentials) {
        this.credentials = credentials
    }

    public async sendMessage({
        platform,
        to,
        message,
    }: {
        platform: Exclude<PLATFORM, PLATFORM.LLM_MODEL>,
        to: string,
        message: string,
    }): Promise<ResponseType> {
        switch (platform) {
            case PLATFORM.GAMIL:
                try {
                    const gmailToken = this.credentials[platform].OAUTH_ACCESS_TOKEN

                    const mailResponse = await axios.post(
                        `https://gmail.googleapis.com/gmail/v1/users/${to}/messages/send`,
                        {
                            "id": "gmail.users.messages.send",
                            "path": "gmail/v1/users/akashwarrior1@gmail.com/messages/send",
                            "flatPath": "gmail/v1/users/akashwarrior1@gmail.com/messages/send",
                            "httpMethod": "POST",
                            "parameters": {
                                "userId": {
                                    "description": "The user's email address. The special value `me` can be used to indicate the authenticated user.",
                                    "default": "me",
                                    "location": "path",
                                    "required": true,
                                    "type": "string"
                                }
                            },
                            "parameterOrder": [
                                "userId"
                            ],
                            "supportsMediaUpload": true,
                            "mediaUpload": {
                                "accept": [
                                    "message/*"
                                ],
                                "maxSize": "36700160",
                                "protocols": {
                                    "resumable": {
                                        "multipart": true,
                                        "path": "/resumable/upload/gmail/v1/users/akashwarrior1@gmail.com/messages/send"
                                    },
                                    "simple": {
                                        "multipart": true,
                                        "path": "/upload/gmail/v1/users/akashwarrior1@gmail.com/messages/send"
                                    }
                                }
                            },
                            "request": {
                                "$ref": "Message"
                            },
                            "response": {
                                "$ref": "Message"
                            },
                            "scopes": [
                                "https://mail.google.com/",
                                "https://www.googleapis.com/auth/gmail.addons.current.action.compose",
                                "https://www.googleapis.com/auth/gmail.compose",
                                "https://www.googleapis.com/auth/gmail.modify",
                                "https://www.googleapis.com/auth/gmail.send"
                            ],
                            "description": "Sends the specified message to the recipients in the `To`, `Cc`, and `Bcc` headers. For example usage, see [Sending email](https://developers.google.com/workspace/gmail/api/guides/sending)."
                        },
                        {
                            headers: {
                                Authorization: ""
                            }
                        }
                    )

                    return { response: "Mail sent" }
                } catch (e) {
                    return { error: "Invalid Platform selection" }
                }

            case PLATFORM.WHATSAPP:
                try {
                    const whatsappToken = this.credentials[platform].AUTH_HEADER;
                    const whatsAppResponse = await axios.post(
                        "https://graph.facebook.com/v23.0/106540352242922/messages",
                        {   // body
                            messaging_product: "whatsapp",
                            recipient_type: "individual",
                            to: to,
                            type: "text",
                            text: {
                                preview_url: true,
                                body: message
                            }
                        },
                        {
                            headers: {
                                Authorization: "Bearer " + whatsappToken,
                            },
                        }
                    )
                    if (whatsAppResponse.status === 200) {
                        return { response: "Message Sent" }
                    }
                    throw new Error("Failed to sent message")
                } catch (e) {
                    return { error: (e as AxiosError).message }
                }

            case PLATFORM.TELEGRAM:
                try {
                    const telegramToken = this.credentials[platform].BOT_ACCESS_TOKEN;
                    const telegramResponse = await axios.post(
                        `https://api.telegram.org/bot${telegramToken}/sendMessage?chat_id=${to}&text=${message}`,
                    )
                    if (telegramResponse.status === 200) {
                        return { response: "Message Sent" }
                    }
                    throw new Error("Failed to sent message")
                } catch (e) {
                    return { error: (e as AxiosError).message }
                }
            default:
                return { error: "Invalid Platform selection" }
        }
    }

    public async generateResponse({ provider, model, prompt, systemPrompt }: {
        provider: MODEL_PROVIDERS,
        model: GoogleGenerativeAIModelId, // TODO: change type
        prompt: string,
        systemPrompt?: string
    }): Promise<ResponseType> {
        const ai = this.getModel({ provider });

        if (!ai) {
            return { error: "Invalid model selection" }
        }

        try {
            const { text } = await generateText({
                model: ai(model),
                system: systemPrompt,
                prompt: prompt,
            })

            return { response: text };
        } catch (e) {
            console.log("Error while model response", e);
            return { error: "" };
        }
    }

    private getModel({ provider }: { provider: MODEL_PROVIDERS }) {
        const apiKey = this.credentials[PLATFORM.LLM_MODEL].API_KEY;
        if (!apiKey) {
            return null;
        }

        switch (provider) {
            case MODEL_PROVIDERS.GEMINI:
                return createGoogleGenerativeAI({ apiKey: apiKey })

            case MODEL_PROVIDERS.ANTHROPIC:
                return createAnthropic({ apiKey: apiKey })

            case MODEL_PROVIDERS.OPEN_AI:
                return createOpenAI({ apiKey: apiKey })

            case MODEL_PROVIDERS.GROK:
                return createXai({ apiKey: apiKey })

            default:
                return null
        }
    }
}

const taskManager = new TaskManager({
    GMAIL: { OAUTH_ACCESS_TOKEN: "" },
    LLM_MODEL: { API_KEY: "" },
    TELEGRAM: { BOT_ACCESS_TOKEN: "" },
    WHATSAPP: { AUTH_HEADER: "" }
})


const { response, error } = await taskManager.generateResponse({
    provider: MODEL_PROVIDERS.GEMINI,
    model: 'gemma-3-27b-it',
    prompt: "what's up",
})

console.log({
    res: response,
    error: error,
});
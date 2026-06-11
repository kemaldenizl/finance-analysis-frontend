export type ChatResponse = {
    response: {
        answer: string;
        intent: string;
        generation_method: string;
    }
}

export type ChatRequest = {
    analysis_id: string;
    question: string;
}

export type ChatActionState = {
    success: boolean;
    message?: string;
    data?: ChatResponse;
};
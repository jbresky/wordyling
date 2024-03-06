interface Sentence {
    id: number;
    sentence: string;
    category: string;
    word_id: number;
    language_id: number;
    userId: number;
}

interface Word {
    id: number
    word: string
    nativeWord: string
    category: string
    pronunciation: string | null
    user_id: number
    createdAt: Date
    language_id: number
    Sentence?: Sentence[]
}
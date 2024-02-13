interface Word {
    id: number
    word: string
    nativeWord: string
    category: string
    pronunciation: string | null
    user_id: number
    createdAt: Date
    language_id: number
}
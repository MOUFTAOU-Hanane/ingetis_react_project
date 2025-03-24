import React, { useState } from 'react';

interface CommentFormProps {
    onSubmit: (commentText: string) => Promise<void>;
}

const CommentForm: React.FC<CommentFormProps> = ({ onSubmit }) => {
    const [commentText, setCommentText] = useState<string>('');

    const handleSubmit = async () => {
        if (!commentText.trim()) return;
        
        await onSubmit(commentText);
        setCommentText('');
    };

    return (
        <div className="mt-2 flex items-center gap-2">
            <input
                type="text"
                placeholder="Ajouter un commentaire..."
                className="flex-1 p-2 rounded-lg bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-300"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
            />
            <button
                className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-4 py-2 transition-colors"
                onClick={handleSubmit}
            >
                Envoyer
            </button>
        </div>
    );
};

export default CommentForm;
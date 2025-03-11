import React, { useState } from 'react';

interface Comment {
    id: number;
    eventId: number;
    author: string;
    text: string;
    date: string;
}

interface EventCommentProps {
    eventId: number;
}

const EventComment: React.FC<EventCommentProps> = ({ eventId }) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

    const handleCommentSubmit = () => {
        if (!newComment.trim()) return;
        const comment: Comment = {
            id: Date.now(),
            eventId,
            author: 'Utilisateur',
            text: newComment,
            date: new Date().toISOString(),
        };
        setComments([...comments, comment]);
        setNewComment('');
    };

    return (
        <div className="mt-4 p-4 bg-white/10 backdrop-blur-md rounded-xl">
            <h3 className="text-lg font-semibold">Commentaires</h3>
            <div className="mt-2 flex items-center gap-2">
                <input
                    type="text"
                    placeholder="Ajouter un commentaire..."
                    className="flex-1 p-2 rounded-lg bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-300"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <button
                    className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-4 py-2 transition-colors"
                    onClick={handleCommentSubmit}
                >
                    Envoyer
                </button>
            </div>
            <div className="mt-4">
                <button
                    className="bg-gray-600 hover:bg-gray-700 text-white rounded-lg px-4 py-1 transition-colors"
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                >
                    Trier par date ({sortOrder === 'asc' ? '↑' : '↓'})
                </button>
                <div className="mt-2 space-y-2">
                    {comments
                        .sort((a, b) =>
                            sortOrder === 'asc'
                                ? new Date(a.date).getTime() - new Date(b.date).getTime()
                                : new Date(b.date).getTime() - new Date(a.date).getTime()
                        )
                        .map((comment) => (
                            <div key={comment.id} className="p-2 bg-white/20 rounded-lg">
                                <p className="text-sm text-white">
                                    <strong>{comment.author}</strong> - {new Date(comment.date).toLocaleString()}
                                </p>
                                <p className="text-white mt-1">{comment.text}</p>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default EventComment;

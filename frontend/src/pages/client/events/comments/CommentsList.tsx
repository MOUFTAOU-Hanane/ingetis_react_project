// components/events/comments/CommentsList.tsx
import React from 'react';
import CommentItem from './CommentItem';
import { IComment } from '../../../../interfaces';

interface CommentsListProps {
    comments: IComment[];
    sortOrder: 'asc' | 'desc';
    onSortChange: () => void;
    onDeleteClick: (comment: IComment) => void;
}

const CommentsList: React.FC<CommentsListProps> = ({
    comments,
    sortOrder,
    onSortChange,
    onDeleteClick
}) => {
    if (comments.length <= 0) {
        return null;
    }

    const sortedComments = [...comments].sort((a, b) =>
        sortOrder === 'asc'
        ? new Date(a.date_commentaire).getTime() - new Date(b.date_commentaire).getTime()
        : new Date(b.date_commentaire).getTime() - new Date(a.date_commentaire).getTime()
    );

    return (
        <div className="mt-4">
            {comments.length > 1 && (
                <button
                    className="bg-gray-600 hover:bg-gray-700 text-white rounded-lg px-4 py-1 transition-colors"
                    onClick={onSortChange}
                >
                    Trier par date ({sortOrder === 'asc' ? '↑' : '↓'})
                </button>
            )}
            <div className="mt-2 space-y-2">
                {sortedComments.map((comment) => (
                    <CommentItem
                        key={comment.id_comment}
                        comment={comment}
                        onDeleteClick={onDeleteClick}
                    />
                ))}
            </div>
        </div>
    );
};

export default CommentsList;
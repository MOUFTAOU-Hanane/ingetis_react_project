// components/events/comments/CommentItem.tsx
import React from 'react';
import { Trash } from 'lucide-react';
import { IComment } from '../../../../interfaces';

interface CommentItemProps {
  comment: IComment;
  onDeleteClick: (comment: IComment) => void;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, onDeleteClick }) => {
    return (
        <div className="p-2 bg-white/20 rounded-lg flex justify-between items-start">
            <div>
                <p className="text-sm text-white">
                    <strong>{comment.user?.nom}</strong> - {new Date(comment.created).toLocaleString()}
                </p>
                <p className="text-white mt-1">{comment.commentaire}</p>
            </div>
            <div>
                <Trash
                    size={16}
                    className="cursor-pointer text-red-600"
                    onClick={() => onDeleteClick(comment)}
                />
            </div>
        </div>
    );
};

export default CommentItem;
// components/events/comments/CommentItem.tsx
import React from 'react';
import { Trash } from 'lucide-react';
import { IComment } from '../../../../interfaces';
import { useAuth } from '../../../../context/AuthContext';

interface CommentItemProps {
  comment: IComment;
  onDeleteClick: (comment: IComment) => void;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, onDeleteClick }) => {
    const { user }  = useAuth();
    return (
        <div className="p-2 bg-white/20 rounded-lg flex justify-between items-start">
            <div>
                <p className="text-sm text-white">
                    <strong>{comment.user?.nom}</strong> {new Date(comment.date_commentaire).toLocaleString()}
                </p>
                <p className="text-white mt-1">{comment.commentaire}</p>
            </div>
            {user && (user?.role === 'admin' || comment.user?.id_user == user.id_user) && (
                <div>
                    <Trash
                        size={16}
                        className="cursor-pointer text-red-600"
                        onClick={() => onDeleteClick(comment)}
                    />
                </div>
                )
            }
        </div>
    );
};

export default CommentItem;
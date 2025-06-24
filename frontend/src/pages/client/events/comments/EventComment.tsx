import React, { useEffect, useState } from 'react';
import { IComment, IEvent } from '../../../../interfaces';
import { useAuth } from '../../../../context/AuthContext';
import { toast } from 'react-toastify';
import CommentsList from './CommentsList';
import CommentForm from './CommentForm';
import ConfirmationModal from '../../../../components/ConfirmationModal';
import { commentService } from '../../../../services/commentService';

interface EventCommentProps {
    event: IEvent;
}

const EventComment: React.FC<EventCommentProps> = ({ event }) => {
    const [comments, setComments] = useState<IComment[]>(event.comments);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [deleteState, setDeleteState] = useState<{
        comment: IComment | null;
        openModal: boolean;
    }>({
        comment: null,
        openModal: false
    });

    const { user } = useAuth();

    const handleCommentSubmit = async (commentText: string) => {
        try {
            const response = await commentService.create(
                event.id_event,
                commentText,
                user?.id_user
            );
            
            const newCommentObject: IComment = {
                id_comment: response.id_comment,
                event,
                commentaire: commentText,
                user: user ?? undefined,
                date_commentaire: new Date(Date.now())
            };
            
            setComments([...comments, newCommentObject]);
        } catch (error) {
            toast.error("Échec de l'ajout du commentaire.");
        }
    };

    const handleDelete = async () => {
        if (!deleteState.comment) return;

        try {
            await commentService.delete(deleteState.comment.id_comment);
            setComments((prev) => 
                prev.filter((c) => c.id_comment !== deleteState.comment?.id_comment)
            );
            toast.success("Commentaire supprimé avec succès !");
        } catch (error) {
            toast.error("Échec de la suppression du commentaire.");
        } finally {
            setDeleteState({
                comment: null,
                openModal: false
            });
        }
    };

    const confirmDeleting = (comment: IComment) => {
        setDeleteState({
            comment,
            openModal: true
        });
    };

    const toggleSortOrder = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    return (
        <div className="mt-2 py-4 px-8">
            <hr className="mb-8 text-gray-600" />
            
            <CommentsList
                comments={comments}
                sortOrder={sortOrder}
                onSortChange={toggleSortOrder}
                onDeleteClick={confirmDeleting}
            />
            
            <CommentForm onSubmit={handleCommentSubmit} />
            
            <ConfirmationModal
                isOpen={deleteState.openModal}
                title={deleteState.comment?.commentaire ?? "Commentaire indéfini"}
                type="commentaire"
                onConfirm={handleDelete}
                onCancel={() => setDeleteState({ comment: null, openModal: false })}
                setObjectToDelete={() => {
                    if (deleteState.comment) {
                        setDeleteState({
                            ...deleteState,
                            comment: deleteState.comment
                        });
                    }
                }}
                setIsConfirmationOpen={(isOpen) => {
                    setDeleteState({
                        ...deleteState,
                        openModal: isOpen
                    });
                }}
                objectToDelete={deleteState.comment ? { id: deleteState.comment.id_comment } : null}
                setObject={setComments}
                objects={comments}
                idKey="id_comment"
            />
        </div>
    );
};

export default EventComment;
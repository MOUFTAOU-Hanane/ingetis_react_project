import React, { useEffect, useState } from 'react';
import { IComment, IEvent } from '../../../interfaces';
import { useAuth } from '../../../context/AuthContext';
import { Trash } from 'lucide-react';
import ConfirmationModal from '../../../components/ConfirmationModal';
import { toast } from 'react-toastify';
import apiClient from '../../../apiClient';

interface EventCommentProps {
    event: IEvent;
}

const EventComment: React.FC<EventCommentProps> = ({ event }) => {
    const [comments, setComments] = useState<IComment[]>([]);
    const [newComment, setNewComment] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [deleteState, setDeleteState] = useState<{
        comment: IComment | null;  
        openModal: boolean;
    }>({
        comment: null,  
        openModal: false
    });

    const { user } = useAuth();

    const handleCommentSubmit = async () => {
        if (!newComment.trim()) return;
        
        try {
            const response = await apiClient.post('/comments', {
                event_id: event.id_event,
                commentaire: newComment,
                user_id: user?.id_user
            });
            
            const newCommentObject: IComment = {
                id_comment: response.data.id_comment,
                event,
                commentaire: newComment,
                user: user ?? undefined,
                created: new Date(Date.now())
            };
            
            setComments([...comments, newCommentObject]);
            setNewComment('');
            
        } catch (error) {
            console.error("Erreur lors de l'ajout du commentaire:", error);
            toast.error("Échec de l'ajout du commentaire.");
        }
    };

    const handleDelete = async () => {
        if (!deleteState.comment) return;

        try {
            await apiClient.delete(`/comments/${deleteState.comment.id_comment}`);
            setComments((prev) => prev.filter((c) => c.id_comment !== deleteState.comment?.id_comment));
            toast.success("Commentaire supprimé avec succès !");
        } catch (error) {
            console.error("Erreur de suppression:", error);
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

    const setObjectToDelete = () => {
        // On s'assure que le commentaire actuel est bien défini dans l'état
        if (deleteState.comment) {
            setDeleteState({
                ...deleteState,
                comment: deleteState.comment
            });
        }
    };

    const setIsConfirmationOpen = (isOpen: boolean) => {
        setDeleteState({
            ...deleteState,
            openModal: isOpen
        });
    };

    // Charger les commentaires au montage du composant
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await apiClient.get(`/comments/event/${event.id_event}`);
                setComments(response.data);
            } catch (error) {
                console.error("Erreur lors du chargement des commentaires:", error);
                toast.error("Impossible de charger les commentaires.");
            }
        };
        
        fetchComments();
    }, [event.id_event]);

    return (
        <div className="mt-2 py-4 px-8">
            <hr className='mb-8 text-gray-600'/>
            {comments.length > 1 && 
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
                                    ? new Date(a.created).getTime() - new Date(b.created).getTime()
                                    : new Date(b.created).getTime() - new Date(a.created).getTime()
                            )
                            .map((comment) => (
                                <div key={comment.id_comment} className="p-2 bg-white/20 rounded-lg flex justify-between items-start">
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
                                            onClick={() => confirmDeleting(comment)} 
                                        />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            }
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
            
            <ConfirmationModal
                isOpen={deleteState.openModal}
                title={deleteState.comment?.commentaire ?? "Commentaire indéfini"}
                type="commentaire"
                onConfirm={handleDelete}
                onCancel={() => setDeleteState({ comment: null, openModal: false })}
                setObjectToDelete={setObjectToDelete}
                setIsConfirmationOpen={setIsConfirmationOpen}
                objectToDelete={deleteState.comment ? { id: deleteState.comment.id_comment } : null} 
                setObject={setComments}
                objects={comments}
                idKey='id_comment'
            />
        </div>
    );
};

export default EventComment;
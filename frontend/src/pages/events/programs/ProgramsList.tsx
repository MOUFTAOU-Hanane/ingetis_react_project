import React from 'react';
import { 
    List, 
    ListItem, 
    ListItemText, 
    IconButton
} from "@mui/material";
import { AlertTriangle, Edit, Trash2 } from "lucide-react";
import { IProgram } from '../../../interfaces';
import { formatDateTime } from '../../../helpers/utils';

interface ProgramsListProps {
    programs: IProgram[];
    onEditProgram: (program: IProgram) => void;
    onDeleteProgram: (programId: number) => void;
}

const ProgramsList: React.FC<ProgramsListProps> = ({ 
    programs, 
    onEditProgram, 
    onDeleteProgram, 
}) => {
    if (programs.length === 0) {
        return (
            <div className="flex gap-2 items-center justify-center p-4">
                <AlertTriangle color="red" size={20} />
                <span className="text-red-500">
                    Veuillez ajouter les programmes afin de valider votre évènement
                </span>
            </div>
        );
    }

    return (
        <List>
            {programs.map((program) => (
                <ListItem
                    key={program.id_program}
                    secondaryAction={
                        <>
                            <IconButton edge="end" onClick={() => onEditProgram(program)}>
                                <Edit size={20} color="blue" />
                            </IconButton>
                                <IconButton
                                    edge="end"
                                    onClick={() => program.id_program && onDeleteProgram(program.id_program)}
                                >
                                    <Trash2 size={20} color="red" />
                            </IconButton>
                        </>
                    }
                    sx={{ borderBottom: "1px solid #eee" }}
                >
                    <ListItemText
                        primary={program.titre}
                        secondary={formatDateTime(program.date_heure).toString()}
                        primaryTypographyProps={{ fontWeight: 'bold' }}
                    />
                </ListItem>
            ))}
        </List>
    );
};

export default ProgramsList;
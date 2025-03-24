import { Box, IconButton, List, ListItem, ListItemText } from "@mui/material";
import { Edit, Trash2 } from "lucide-react";
import { ICatalog } from "../../../interfaces";

interface ICatalogsListProps {
    handleOpenModal: () => void;
    handleDeleteCatalog: () => void;
    catalog: ICatalog;
}
const CatalogsList: React.FC<ICatalogsListProps> = ({handleOpenModal, handleDeleteCatalog, catalog}) => {
    return (
        <Box sx={{ maxWidth: 600, margin: "auto", p: 3, backgroundColor: "white", borderRadius: "12px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
            <List>
                <ListItem secondaryAction={
                    <>
                        <IconButton edge="end" onClick={handleOpenModal}>
                            <Edit size={20} color="blue" />
                        </IconButton>
                        <IconButton edge="end" onClick={handleDeleteCatalog}>
                            <Trash2 size={20} color="red" />
                        </IconButton>
                    </>
                }>
                    <ListItemText primary={catalog.nom_catalogue} secondary={catalog.description} />
                </ListItem>
            </List>
        </Box>
    )
}

export default CatalogsList;
import React, { useEffect, useState, useContext } from 'react';
import { Container, Typography, Accordion, AccordionSummary, AccordionDetails, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [prompts, setPrompts] =useState([]);
    const { token } = useContext(AuthContext);

    useEffect(() => {
        //שליפת המשתמשים
        const fetchUsers = async () => {
            try {
                const {data} = await axios.get('http://localhost:2500/api/users/');
                setUsers(data);
            } catch (err) {
                console.error("Error retrieving users");
            }
        };
        //שליפת הפרומפטים
        const fetchPrompts = async () => {
            try {
                const {data} = await axios.get('http://localhost:2500/api/prompts/');
                setPrompts(data);
            } catch (err) {
                console.error("Error retrieving prompts");
            }
        };
        fetchUsers();
        fetchPrompts();
    }, [token]);

    return (
        <Container sx={{ mt: 5 }}>
            <Typography variant="h4" gutterBottom>ניהול משתמשים ומערכת</Typography>
            {/* הצגת כל המשתמשים */}
            {users.map(user => (
                <Accordion key={user._id} sx={{ mb: 2 }}>
                    <AccordionSummary expandMoreIcon={<ExpandMoreIcon />}>
                        <Typography sx={{ fontWeight: 'bold' }}>
                            {user.username}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography variant="subtitle1">היסטוריית שאלות:</Typography>
                        <Table component={Paper} size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>שאלה</TableCell>
                                    <TableCell>קטגוריה</TableCell>
                                    <TableCell>תת קטגוריה</TableCell>
                                    <TableCell>תאריך</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {/* הצגת הפרומפטים של המשתמש */}
                                {prompts
                                    .filter(p => p.user_id === user._id)
                                    .map(prompt => (
                                        <TableRow key={prompt._id}>
                                            <TableCell>{prompt.prompt}</TableCell>
                                            <TableCell>{prompt.category_id?.name}</TableCell>
                                            <TableCell>{prompt.sub_category_id?.name}</TableCell>
                                            <TableCell>{new Date(prompt.createdAt).toLocaleDateString()}</TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Container>
    );
};

export default AdminDashboard;
import React, { useState, useEffect } from 'react';
import {
  Container, Box, Typography, TextField, Button, Paper, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ChatIcon from '@mui/icons-material/Chat';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const WebFuzzForgeCommunity = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestionTitle, setNewQuestionTitle] = useState('');
  const [newQuestionDescription, setNewQuestionDescription] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatResponse, setChatResponse] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState({ open: false, questionIndex: null, answerIndex: null });

  // Load questions from localStorage on component mount
  useEffect(() => {
    const storedQuestions = localStorage.getItem('questions');
    if (storedQuestions) {
      setQuestions(JSON.parse(storedQuestions));
    }
  }, []);

  // Save questions to localStorage whenever questions state changes
  useEffect(() => {
    localStorage.setItem('questions', JSON.stringify(questions));
  }, [questions]);

  const handleAddQuestion = () => {
    if (newQuestionTitle.trim() && newQuestionDescription.trim()) {
      const newQuestion = { title: newQuestionTitle, description: newQuestionDescription, answers: [] };
      setQuestions([...questions, newQuestion]);
      setNewQuestionTitle('');
      setNewQuestionDescription('');
    }
  };

  const handleAddAnswer = (index) => {
    if (newAnswer.trim()) {
      const updatedQuestions = [...questions];
      updatedQuestions[index].answers.push(newAnswer);
      setQuestions(updatedQuestions);
      setNewAnswer('');
      setSelectedQuestion(null);
    }
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
    setDeleteDialogOpen({ open: false });
  };

  const handleDeleteAnswer = (questionIndex, answerIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answers.splice(answerIndex, 1);
    setQuestions(updatedQuestions);
    setDeleteDialogOpen({ open: false });
  };

  const handleChatSubmit = async () => {
    // const question = "i am going to ask a question now answerme only in text and dont write any code example just tell me theory and small snippet for example if required not full code." + chatInput
    try {
      const response = await axios.post('http://panel.mait.ac.in:3012/generate', { prompt: chatInput });
      setChatResponse(response.data.text);
      setChatInput('');
    } catch (error) {
      console.error('Error fetching chatbot response:', error);
    }
  };

  const openDeleteDialog = (questionIndex, answerIndex = null) => {
    setDeleteDialogOpen({ open: true, questionIndex, answerIndex });
  };

  return (
    <Container>
      <Typography variant="h3" align="center" gutterBottom>
        WebFuzzForge Community
      </Typography>

      {/* Question Input */}
      <Box display="flex" flexDirection="column" gap={2} mb={4}>
        <TextField
          fullWidth
          label="Question Title"
          value={newQuestionTitle}
          onChange={(e) => setNewQuestionTitle(e.target.value)}
        />
        <TextField
          fullWidth
          label="Question Description"
          multiline
          rows={4}
          value={newQuestionDescription}
          onChange={(e) => setNewQuestionDescription(e.target.value)}
        />
        <Button variant="contained" onClick={handleAddQuestion}>Submit Question</Button>
      </Box>

      {/* Questions List */}
      {questions.map((item, index) => (
        <Paper key={index} variant="outlined" sx={{ mb: 2, p: 2 }}>
          <Box display="flex" justifyContent="space-between">
            <Box>
              <Typography variant="h6">{item.title}</Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>{item.description}</Typography>
            </Box>
            <IconButton onClick={() => openDeleteDialog(index)}>
              <DeleteIcon color="error" />
            </IconButton>
          </Box>

          {/* Display Answers */}
          {item.answers.length > 0 && (
            <Box mt={2}>
              <Typography variant="subtitle1">Answers:</Typography>
              {item.answers.map((answer, i) => (
                <Box key={i} display="flex" justifyContent="space-between">
                  <Typography variant="body2" sx={{ mb: 1 }}>{answer}</Typography>
                  <IconButton size="small" onClick={() => openDeleteDialog(index, i)}>
                    <DeleteIcon color="error" fontSize="small" />
                  </IconButton>
                </Box>
              ))}
            </Box>
          )}

          {/* Add Answer Input */}
          {selectedQuestion === index ? (
            <Box mt={2}>
              <TextField
                fullWidth
                label="Your Answer..."
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
              />
              <Button variant="contained" sx={{ mt: 1 }} onClick={() => handleAddAnswer(index)}>Add Answer</Button>
            </Box>
          ) : (
            <Button sx={{ mt: 2 }} onClick={() => setSelectedQuestion(index)}>Answer</Button>
          )}
        </Paper>
      ))}

      {/* Chatbot Button */}
      <IconButton
        color="primary"
        onClick={() => setIsChatOpen(true)}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          backgroundColor: '#3f51b5',
          color: 'white',
          '&:hover': { backgroundColor: '#303f9f' }
        }}
      >
        <ChatIcon />
      </IconButton>

      {/* Chatbot Dialog */}
      <Dialog open={isChatOpen} onClose={() => setIsChatOpen(false)}>
        <DialogTitle>Ask Security Question</DialogTitle>
        <DialogContent className="sm:max-w-[500px] h-[80vh] flex flex-col">
          <TextField
            autoFocus
            margin="dense"
            label="Your Question"
            fullWidth
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
          />
          {chatResponse && (
            <Box mt={2}>
              <Typography variant="body2" color="primary">Response:</Typography>
              <Typography variant="body1">{chatResponse}</Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleChatSubmit} variant="contained" endIcon={<SendIcon />}>Send</Button>
          <Button onClick={() => setIsChatOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen.open}
        onClose={() => setDeleteDialogOpen({ open: false })}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {deleteDialogOpen.answerIndex === null
              ? 'Are you sure you want to delete this question?'
              : 'Are you sure you want to delete this answer?'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteDialogOpen({ open: false })}
          >
            Cancel
          </Button>
          <Button
            color="error"
            onClick={() => deleteDialogOpen.answerIndex === null
              ? handleDeleteQuestion(deleteDialogOpen.questionIndex)
              : handleDeleteAnswer(deleteDialogOpen.questionIndex, deleteDialogOpen.answerIndex)}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default WebFuzzForgeCommunity;

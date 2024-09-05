import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, List, ListItem, ListItemText } from '@mui/material';
import useFuzzer from '../common/useFuzzer';

const DirectoryFuzzer = ({ selectedTestSite }) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const initialDirectories = ['admin', 'config', 'backup', 'test'];
    const [extensions, setExtensions] = useState(['.php', '.html']);  // Extensions input
    const [maxDepth, setMaxDepth] = useState(3);  // Max depth input

    // Get inputs, results, and handlers from the custom hook
    const {
        inputs: directories,
        results,
        loading,
        handleInputChange,
        handleAddInput,
        handleRemoveInput,
        runFuzzer,
    } = useFuzzer(initialDirectories, 'directoryFuzzer', backendUrl, /* token */);

    // Handling extensions input change
    const handleExtensionChange = (index, value) => {
        const newExtensions = [...extensions];
        newExtensions[index] = value;
        setExtensions(newExtensions);
    };

    // Adding new extension input
    const handleAddExtension = () => setExtensions([...extensions, '']);

    // Removing extension input
    const handleRemoveExtension = (index) => {
        setExtensions(extensions.filter((_, i) => i !== index));
    };

    const handleRunFuzzer = () => {
        runFuzzer({
            baseUrl: selectedTestSite ? selectedTestSite.url : '',
            wordlist: directories,
            extensions,
            maxDepth
        });
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h6">Directory Fuzzer</Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Base URL"
                    value={selectedTestSite ? selectedTestSite.url : ''}
                    disabled
                />
            </Grid>

            {/* Input for directories */}
            {directories.map((directory, index) => (
                <Grid container item spacing={2} key={index} alignItems="center">
                    <Grid item xs={10}>
                        <TextField
                            fullWidth
                            value={directory}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                            label={`Directory ${index + 1}`}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Button onClick={() => handleRemoveInput(index)}>Remove</Button>
                    </Grid>
                </Grid>
            ))}
            <Grid item xs={12}>
                <Button onClick={handleAddInput}>Add Directory</Button>
            </Grid>

            {/* Input for extensions */}
            {extensions.map((extension, index) => (
                <Grid container item spacing={2} key={index} alignItems="center">
                    <Grid item xs={10}>
                        <TextField
                            fullWidth
                            value={extension}
                            onChange={(e) => handleExtensionChange(index, e.target.value)}
                            label={`Extension ${index + 1}`}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Button onClick={() => handleRemoveExtension(index)}>Remove</Button>
                    </Grid>
                </Grid>
            ))}
            <Grid item xs={12}>
                <Button onClick={handleAddExtension}>Add Extension</Button>
            </Grid>

            {/* Max Depth Input */}
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    type="number"
                    label="Max Depth"
                    value={maxDepth}
                    onChange={(e) => setMaxDepth(e.target.value)}
                />
            </Grid>

            {/* Run Fuzzer Button */}
            <Grid item xs={12}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleRunFuzzer}
                    disabled={loading}
                >
                    Run Directory Fuzzer
                </Button>
            </Grid>

            {/* Results Section */}
            {results && (
                <Grid item xs={12}>
                    <Typography variant="h6">Results:</Typography>
                    {results.vulnerabilities.length === 0 && results.discovered.length === 0 ? (
                        <Typography>No vulnerabilities or results found for the given test cases.</Typography>
                    ) : (
                        <List>
                            {results.discovered.length > 0 && (
                                <>
                                    <Typography variant="subtitle1">Directories:</Typography>
                                    {results.directories.map((dir, index) => (
                                        <ListItem key={index}>
                                            <ListItemText primary={`Directory: ${dir}`} />
                                        </ListItem>
                                    ))}
                                </>
                            )}
                            {results.vulnerabilities.length > 0 && (
                                <>
                                    <Typography variant="subtitle1">Files:</Typography>
                                    {results.files.map((file, index) => (
                                        <ListItem key={index}>
                                            <ListItemText primary={`File: ${file}`} />
                                        </ListItem>
                                    ))}
                                </>
                            )}
                        </List>
                    )}
                </Grid>
            )}
        </Grid>
    );
};

export default DirectoryFuzzer;

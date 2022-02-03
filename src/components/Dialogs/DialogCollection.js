import { AppBar, Dialog, IconButton, List, Toolbar, Typography , Card } from '@mui/material';
import * as React from 'react';

import { ArrowBack as CloseIcon } from "@material-ui/icons";

export default function DialogCollection({card,handleDialog,open,transition}) {
    return (
        <Dialog
        fullScreen
        open={open}
        onClose={handleDialog}
        TransitionComponent={transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleDialog}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Back
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
          <Card style={{bgcolor: '#fff'}} className="mt-60" variant="outlined">
            {card}
          </Card>
        </List>
      </Dialog>
    );
}
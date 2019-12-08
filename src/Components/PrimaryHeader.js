import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

/**
 * Component for the header
 */

export default function PrimaryHeader() {
    return (
        <div >
            <AppBar position="static">
                <Toolbar/>
            </AppBar>
        </div>
    );
}
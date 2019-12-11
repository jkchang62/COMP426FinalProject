import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Navigation from './Navigation.js';

/**
 * Component for the header
 */

export default function PrimaryHeader() {
    return (
        <div >
            <AppBar position="static">
                <Toolbar>
                    <Navigation/>
                </Toolbar>
            </AppBar>
        </div>
    );
}